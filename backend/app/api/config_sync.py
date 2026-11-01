"""Settings for mirroring a KiCad Project Manager config repository."""

import asyncio
import logging

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core import errors
from app.core.security import AuthenticatedUser, require_admin
from app.services import config_sync_service

logger = logging.getLogger(__name__)

router = APIRouter(dependencies=[Depends(require_admin)])


class ConfigRepositoryRequest(BaseModel):
    url: str = Field(min_length=1, max_length=2048)


class ConfigSyncProblem(BaseModel):
    name: str
    url: str
    error: str


class ConfigSyncStatusResponse(BaseModel):
    """Everything but ``configured`` is absent until a repository is set."""

    configured: bool
    url: str | None = None
    enabled: bool | None = None
    name: str | None = None
    commit: str | None = None
    last_synced_at: str | None = None
    last_status: str | None = None
    last_message: str | None = None
    updated_by: str | None = None
    updated_at: str | None = None
    managed_folders: int | None = None
    managed_projects: int | None = None
    pending_imports: int | None = None
    problems: list[ConfigSyncProblem] | None = None
    job_id: str | None = None


class ConfigRepositoryProject(BaseModel):
    id: str
    name: str
    repo: str
    folder: str
    clone_url: str
    already_imported: bool


class ConfigRepositoryCheckResponse(BaseModel):
    url: str
    name: str
    commit: str
    folder_count: int
    project_count: int
    projects: list[ConfigRepositoryProject]


class ConfigSyncStartedResponse(BaseModel):
    job_id: str
    status: str


class ConfigSyncDisconnectedResponse(BaseModel):
    disconnected: bool


async def _check(url: str) -> dict:
    """Read the repository; what the administrator can fix is already a domain error."""
    try:
        return await asyncio.to_thread(config_sync_service.check_repository, url)
    except errors.DomainError:
        raise
    except Exception:
        logger.exception("Config repository check failed")
        raise errors.UpstreamFailure("The config repository could not be read.")


@router.get("", response_model=ConfigSyncStatusResponse, response_model_exclude_unset=True)
async def get_config_sync():
    return await asyncio.to_thread(config_sync_service.get_status)


@router.post("/test", response_model=ConfigRepositoryCheckResponse)
async def test_config_repository(request: ConfigRepositoryRequest):
    """Read the config without saving anything."""
    return await _check(request.url)


@router.put("", response_model=ConfigSyncStatusResponse, response_model_exclude_unset=True)
async def save_config_repository(
    request: ConfigRepositoryRequest,
    user: AuthenticatedUser = Depends(require_admin),
):
    """Save only a repository that reads cleanly, then sync straight away."""
    checked = await _check(request.url)
    await asyncio.to_thread(config_sync_service.save_settings, checked["url"], updated_by=user.email)
    job_id = await asyncio.to_thread(config_sync_service.start_sync_job, requested_by=user.email)
    status = await asyncio.to_thread(config_sync_service.get_status)
    return {**status, "job_id": job_id}


@router.post("/sync", response_model=ConfigSyncStartedResponse)
async def sync_config_repository(user: AuthenticatedUser = Depends(require_admin)):
    current = await asyncio.to_thread(config_sync_service.get_settings)
    if not current:
        raise errors.NotFound("No config repository is configured")
    job_id = await asyncio.to_thread(config_sync_service.start_sync_job, requested_by=user.email)
    return {"job_id": job_id, "status": "started"}


@router.delete("", response_model=ConfigSyncDisconnectedResponse)
async def disconnect_config_repository():
    """Stop mirroring. Folders and projects already in the workspace stay."""
    removed = await asyncio.to_thread(config_sync_service.disconnect)
    if not removed:
        raise errors.NotFound("No config repository is configured")
    return {"disconnected": True}
