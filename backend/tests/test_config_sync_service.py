from __future__ import annotations

import unittest
from unittest import mock

from app.services import config_sync_service
from app.services.workspace_service import ProjectHasSignedReleasesError


def _entry(name: str, repo: str) -> config_sync_service.ConfigProject:
    return config_sync_service.ConfigProject(
        id="entry-1", name=name, repo=repo, description="", folder=()
    )


def _row(project_id: str, name: str, relative_path: str = ".") -> dict:
    return {
        "id": project_id,
        "name": name,
        "relative_path": relative_path,
        "project_file_rel": f"{name}.kicad_pro",
    }


class PruneUnlistedProjects(unittest.TestCase):
    """A config entry is one board; the rest of its repository leaves Prism."""

    def _prune(self, rows: list[dict], entry, signed: set[str] = frozenset()) -> tuple[int, list[str]]:
        deleted: list[str] = []

        def delete_project(project_id: str, force: bool = False) -> None:
            if project_id in signed:
                raise ProjectHasSignedReleasesError(project_id, 1)
            deleted.append(project_id)

        with (
            mock.patch.object(config_sync_service.workspace, "get_projects_by_repo", return_value=rows),
            mock.patch.object(config_sync_service.workspace, "delete_project", side_effect=delete_project),
            mock.patch("app.services.comments_store_service.comments_store"),
        ):
            removed = config_sync_service._prune_unlisted_projects("repo-1", entry)
        return removed, deleted

    def test_backup_copies_are_deleted(self) -> None:
        rows = [
            _row("prj-root", "27_EL_LV_PowerDistribution"),
            _row("prj-2l", "27_EL_LV_PowerDistribution", "backup_2L_70um_HASL"),
            _row("prj-4l", "27_EL_LV_PowerDistribution", "backup_4L_J2_top"),
        ]
        entry = _entry("27_EL_LV_PowerDistribution", "PCB-Engineering/27_EL_LV_PowerDistribution")
        removed, deleted = self._prune(rows, entry)
        self.assertEqual(removed, 2)
        self.assertEqual(sorted(deleted), ["prj-2l", "prj-4l"])

    def test_a_stray_project_beside_the_board_is_deleted(self) -> None:
        rows = [
            _row("prj-root", "27_EL_LV_WheelIMU"),
            _row("prj-power", "power"),
            _row("prj-restore", "27_EL_LV_WheelIMU", "_restore_backup_2026-10-29T08-37-00-987"),
        ]
        entry = _entry("Wheel IMU", "PCB-Engineering/27_EL_LV_WheelIMU")
        removed, deleted = self._prune(rows, entry)
        self.assertEqual(removed, 2)
        self.assertEqual(sorted(deleted), ["prj-power", "prj-restore"])

    def test_nothing_is_deleted_when_no_project_is_named_like_the_entry(self) -> None:
        rows = [_row("prj-a", "board-a", "a"), _row("prj-b", "board-b", "b")]
        removed, deleted = self._prune(rows, _entry("Something", "org/something"))
        self.assertEqual((removed, deleted), (0, []))

    def test_a_single_project_is_left_alone(self) -> None:
        removed, deleted = self._prune([_row("prj-a", "other")], _entry("board", "org/board"))
        self.assertEqual((removed, deleted), (0, []))

    def test_a_project_with_signed_releases_is_kept(self) -> None:
        rows = [_row("prj-root", "board"), _row("prj-old", "board", "backup_rev1")]
        removed, deleted = self._prune(rows, _entry("board", "org/board"), signed={"prj-old"})
        self.assertEqual((removed, deleted), (0, []))


class ClonedRepositoryOfADroppedEntry(unittest.TestCase):
    def _lookup(self, row: dict, job: dict | None, existing: dict | None = None):
        with (
            mock.patch.object(config_sync_service.v3_jobs, "get", return_value=job),
            mock.patch.object(config_sync_service, "find_existing_repository", return_value=existing),
        ):
            return config_sync_service._cloned_repository(row)

    def test_a_clone_still_running_keeps_the_row(self) -> None:
        row = {"import_job_id": "job-1", "repo_url": "https://example.com/org/board.git"}
        self.assertEqual(
            self._lookup(row, {"status": "running"}), config_sync_service._STILL_CLONING
        )

    def test_a_finished_clone_names_its_repository(self) -> None:
        row = {"import_job_id": "job-1", "repo_url": "https://example.com/org/board.git"}
        self.assertEqual(self._lookup(row, {"status": "completed"}, {"id": "repo-9"}), "repo-9")

    def test_a_failed_or_missing_clone_left_nothing_behind(self) -> None:
        row = {"import_job_id": "job-1", "repo_url": "https://example.com/org/board.git"}
        self.assertIsNone(self._lookup(row, {"status": "failed"}, {"id": "repo-9"}))
        self.assertIsNone(self._lookup({"import_job_id": None, "repo_url": ""}, None))


if __name__ == "__main__":
    unittest.main()
