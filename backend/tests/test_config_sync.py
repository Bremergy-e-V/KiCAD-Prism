"""Config repository sync: reading KiCad Project Manager's list and its routes."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.api import config_sync as config_sync_api  # noqa: E402
from app.core.security import require_admin  # noqa: E402
from app.services.config_sync_service import (  # noqa: E402
    ConfigSyncError,
    parse_team_config,
    project_clone_url,
)
from app.services.git_remote_url import parse_remote_url  # noqa: E402


SAMPLE = {
    "format": 1,
    "name": "Bremergy PCBs",
    "server_url": "https://gitea.example.com",
    "default_owner": "Electronics",
    "folders": [
        {
            "name": "BreMo25",
            "folders": [
                {
                    "name": "LV",
                    "folders": [],
                    "projects": [{"id": "a1", "name": "DIN Extension", "repo": "Electronics/din-ext"}],
                }
            ],
            "projects": [{"id": "b2", "name": "ECU", "repo": "Electronics/ecu", "description": "Main ECU"}],
        }
    ],
    "projects": [{"id": "c3", "name": "Scratch", "repo": "marvin/scratch"}],
}


class ParseTeamConfigTests(unittest.TestCase):
    def test_reads_nested_folders_and_projects(self) -> None:
        config = parse_team_config(SAMPLE)
        self.assertEqual(config.name, "Bremergy PCBs")
        self.assertEqual(config.folders, [("BreMo25",), ("BreMo25", "LV")])
        by_id = {project.id: project for project in config.projects}
        self.assertEqual(by_id["a1"].folder, ("BreMo25", "LV"))
        self.assertEqual(by_id["b2"].folder, ("BreMo25",))
        self.assertEqual(by_id["b2"].description, "Main ECU")
        self.assertEqual(by_id["c3"].folder, ())

    def test_rejects_a_newer_format(self) -> None:
        with self.assertRaises(ConfigSyncError):
            parse_team_config({**SAMPLE, "format": 2})

    def test_rejects_duplicate_project_ids(self) -> None:
        data = {"projects": [{"id": "x", "name": "A", "repo": "o/a"}, {"id": "x", "name": "B", "repo": "o/b"}]}
        with self.assertRaises(ConfigSyncError):
            parse_team_config(data)

    def test_rejects_a_project_without_owner(self) -> None:
        with self.assertRaises(ConfigSyncError):
            parse_team_config({"projects": [{"id": "x", "name": "A", "repo": "a"}]})

    def test_rejects_a_folder_name_with_a_slash(self) -> None:
        with self.assertRaises(ConfigSyncError):
            parse_team_config({"folders": [{"name": "a/b"}]})

    def test_rejects_a_non_object(self) -> None:
        with self.assertRaises(ConfigSyncError):
            parse_team_config([])


class ProjectCloneUrlTests(unittest.TestCase):
    def test_ssh_url_keeps_user_and_port(self) -> None:
        remote = parse_remote_url("ssh://git@gitea.example.com:2222/Electronics/kicad-config.git")
        self.assertEqual(
            project_clone_url(remote, "Electronics/din-ext"),
            "ssh://git@gitea.example.com:2222/Electronics/din-ext.git",
        )

    def test_scp_url(self) -> None:
        remote = parse_remote_url("git@gitea.example.com:Electronics/kicad-config.git")
        self.assertEqual(
            project_clone_url(remote, "marvin/scratch"),
            "git@gitea.example.com:marvin/scratch.git",
        )

    def test_https_url_without_suffix(self) -> None:
        remote = parse_remote_url("https://gitea.example.com/Electronics/kicad-config")
        self.assertEqual(
            project_clone_url(remote, "Electronics/ecu.git"),
            "https://gitea.example.com/Electronics/ecu.git",
        )

    def test_gitlab_subgroup(self) -> None:
        remote = parse_remote_url("https://gitlab.example.com/team/hw/config.git")
        self.assertEqual(
            project_clone_url(remote, "team/hw/boards/main"),
            "https://gitlab.example.com/team/hw/boards/main.git",
        )


class RouterTests(unittest.TestCase):
    def test_every_route_requires_an_administrator(self) -> None:
        dependencies = [dependency.dependency for dependency in config_sync_api.router.dependencies]
        self.assertIn(require_admin, dependencies)

    def test_router_routes(self) -> None:
        routes = {(route.path, method) for route in config_sync_api.router.routes for method in route.methods}
        for expected in (("", "GET"), ("", "PUT"), ("", "DELETE"), ("/test", "POST"), ("/sync", "POST")):
            self.assertIn(expected, routes)

    def test_application_registers_the_router(self) -> None:
        # Importing app.main exits without an auth configuration, so read the
        # registration instead.
        main = (Path(__file__).resolve().parents[1] / "app" / "main.py").read_text(encoding="utf-8")
        self.assertIn(
            'app.include_router(config_sync_router, prefix="/api/settings/config-sync"',
            main,
        )


if __name__ == "__main__":
    unittest.main()
