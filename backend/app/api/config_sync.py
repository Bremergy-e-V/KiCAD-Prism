"""Settings for mirroring a KiCad Project Manager config repository."""

import asyncio
import logging

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import AuthenticatedUser, require_admin
from app.services import config_sync_service
from app.services.config_sync_service import ConfigSyncError
from app.services.git_failures import GitAccessError
from app.services.git_remote_url import RemoteUrlError

logger = logging.getLogger(__name__)

router = APIRouter(dependencies=[Depends(require_admin)])


class ConfigRepositoryRequest(BaseModel):
    url: str = Field(min_length=1, max_length=2048)


async def _check(url: str) -> dict:
    """Read the repository, translating what the administrator can fix into a 400."""
    try:
        return await asyncio.to_thread(config_sync_service.check_repository, url)
    except (RemoteUrlError, GitAccessError, ConfigSyncError) as error:
        raise HTTPException(status_code=400, detail=str(error))
    except Exception:
        logger.exception("Config repository check failed")
        raise HTTPException(status_code=502, detail="The config repository could not be read.")


@router.get("")
async def get_config_sync():
    return await asyncio.to_thread(config_sync_service.get_status)


@router.post("/test")
async def test_config_repository(request: ConfigRepositoryRequest):
    """Read the config without saving anything."""
    return await _check(request.url)


@router.put("")
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


@router.post("/sync")
async def sync_config_repository(user: AuthenticatedUser = Depends(require_admin)):
    current = await asyncio.to_thread(config_sync_service.get_settings)
    if not current:
        raise HTTPException(status_code=404, detail="No config repository is configured")
    job_id = await asyncio.to_thread(config_sync_service.start_sync_job, requested_by=user.email)
    return {"job_id": job_id, "status": "started"}


@router.delete("")
async def disconnect_config_repository():
    """Stop mirroring. Folders and projects already in the workspace stay."""
    removed = await asyncio.to_thread(config_sync_service.disconnect)
    if not removed:
        raise HTTPException(status_code=404, detail="No config repository is configured")
    return {"disconnected": True}
