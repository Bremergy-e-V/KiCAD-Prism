"""Workspace schema migration 100: config_repository_sync.

Frozen. Applied deployments recorded this body in ``ws_schema_migrations``;
edit nothing here, add a new migration instead.

Numbered well past upstream's sequence so a fork-only migration never collides
with one added upstream later.
"""

from __future__ import annotations

from typing import Any


def migrate(conn: Any) -> None:
    """Track the KiCad Project Manager config repository Prism mirrors.

    ``ws_config_sync`` holds the one configured repository and the last config
    read from it. The two mapping tables record which folders and repositories
    the sync created or adopted, so it only ever restructures what it owns and
    leaves manually imported projects and folders alone.
    """

    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS ws_config_sync (
            id             TEXT PRIMARY KEY DEFAULT 'default' CHECK (id = 'default'),
            url            TEXT NOT NULL,
            enabled        BOOLEAN NOT NULL DEFAULT TRUE,
            config_commit  TEXT,
            config_json    JSONB,
            last_synced_at TIMESTAMPTZ,
            last_status    TEXT NOT NULL DEFAULT 'pending',
            last_message   TEXT NOT NULL DEFAULT '',
            updated_by     TEXT NOT NULL DEFAULT '',
            updated_at     TIMESTAMPTZ NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ws_config_sync_folders (
            path      TEXT PRIMARY KEY,
            folder_id TEXT NOT NULL REFERENCES ws_folders(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS ws_config_sync_projects (
            config_project_id   TEXT PRIMARY KEY,
            repo_url            TEXT NOT NULL,
            repo_id             TEXT REFERENCES ws_repositories(id) ON DELETE SET NULL,
            import_job_id       TEXT,
            import_requested_at TIMESTAMPTZ,
            last_error          TEXT NOT NULL DEFAULT ''
        );
        """
    )
