"""System Builder HTTP API (``docs/system-builder/CONTRACTS.md`` §8).

SYS-04 covers systems, instances, port overrides, links, rows, history and
layout. Detection, reviews, validation, snapshots, ICD and imports are added
by their tickets.
"""

from __future__ import annotations

import asyncio
import re
from typing import Any, Callable, List, Literal, Optional, TypeVar

from fastapi import APIRouter, Body, Depends, HTTPException, Query, Request, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from app.core.security import AuthenticatedUser, require_designer, require_viewer
from app.services.systems import service as system_service
from app.services.systems.service import Caller, Result
from app.services.systems.store import MAX_ROWS, Conflict, Invalid, NotFound, StaleVersion
from app.services.systems.visibility import etag

router = APIRouter(dependencies=[Depends(require_viewer)])

T = TypeVar("T")
_IF_MATCH = re.compile(r'^"sys:([A-Za-z0-9_]+):([0-9]{1,18})"$')

Name = Field(min_length=1, max_length=200)


class CreateSystemRequest(BaseModel):
    name: str = Name
    description: str = Field(default="", max_length=4000)
    folderId: Optional[str] = None


class UpdateSystemRequest(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=4000)
    folderId: Optional[str] = None


class CreateInstanceRequest(BaseModel):
    projectId: str = Field(min_length=1, max_length=200)
    label: str = Field(min_length=1, max_length=100)
    baselineCommit: Optional[str] = Field(default=None, max_length=40)
    trackedRef: Optional[str] = Field(default=None, max_length=200)
    pinned: bool = False


class UpdateInstanceRequest(BaseModel):
    label: Optional[str] = Field(default=None, min_length=1, max_length=100)
    pinned: Optional[bool] = None
    trackedRef: Optional[str] = Field(default=None, max_length=200)


class OverrideRequest(BaseModel):
    state: Optional[Literal["hidden", "promoted"]]


class LinkEnd(BaseModel):
    instanceId: str = Field(min_length=1, max_length=200)
    portKey: str = Field(min_length=1, max_length=2000)


class CreateLinkRequest(BaseModel):
    a: LinkEnd
    b: LinkEnd
    name: str = Field(default="", max_length=200)
    harness: Optional[str] = Field(default=None, max_length=200)


class UpdateLinkRequest(BaseModel):
    name: Optional[str] = Field(default=None, max_length=200)
    harness: Optional[str] = Field(default=None, max_length=200)


class RowRequest(BaseModel):
    id: Optional[str] = Field(default=None, max_length=100)
    pinA: str = Field(min_length=1, max_length=100)
    pinB: str = Field(min_length=1, max_length=100)
    signal: str = Field(default="", max_length=200)
    source: Literal["manual", "generator", "import"] = "manual"


class DecisionRequest(BaseModel):
    decision: Literal["accept", "remap", "bind_candidate", "remove_rows"]
    payload: Optional[dict[str, Any]] = None


class RebaseRequest(BaseModel):
    commit: str = Field(min_length=7, max_length=40)


class Position(BaseModel):
    x: float = Field(allow_inf_nan=False)
    y: float = Field(allow_inf_nan=False)


class LayoutRequest(BaseModel):
    positions: dict[str, Position]


def _caller(user: AuthenticatedUser) -> Caller:
    return Caller(role=user.role, email=user.email)


def _expected_version(request: Request, system_id: str) -> int:
    """§8: ``If-Match: "sys:<id>:<version>"``. Missing is 428; anything else stale is 412."""

    raw = request.headers.get("if-match")
    if not raw:
        raise HTTPException(status_code=428, detail="If-Match is required")
    match = _IF_MATCH.match(raw.strip())
    if not match or match.group(1) != system_id:
        return -1  # never current: the store answers 412 with the real version
    return int(match.group(2))


async def _run(system_id: Optional[str], call: Callable[[], T]) -> T:
    try:
        return await asyncio.to_thread(call)
    except StaleVersion as error:
        current = etag(system_id or "", error.current)
        raise HTTPException(
            status_code=412, detail="System has changed; reload it", headers={"ETag": current}
        ) from None
    except NotFound as error:
        message = str(error)
        raise HTTPException(
            status_code=404, detail=message if message.endswith("not found") else "Not found"
        ) from None
    except Conflict as error:
        raise HTTPException(status_code=409, detail=str(error)) from None
    except Invalid as error:
        raise HTTPException(status_code=422, detail=str(error)) from None


def _respond(result: Result, response: Response, status_code: int = 200) -> Any:
    response.headers["ETag"] = result.etag
    response.status_code = status_code
    return result.body


def _no_content(result: Result) -> Response:
    return Response(status_code=204, headers={"ETag": result.etag})


# ---------------------------------------------------------------------------
# Systems


@router.get("")
async def list_systems(user: AuthenticatedUser = Depends(require_viewer)):
    return await _run(None, lambda: system_service.service.list_systems(_caller(user)))


@router.post("", dependencies=[Depends(require_designer)])
async def create_system(
    body: CreateSystemRequest, response: Response, user: AuthenticatedUser = Depends(require_viewer)
):
    result = await _run(None, lambda: system_service.service.create_system(
        _caller(user), name=body.name, description=body.description, folder_id=body.folderId,
    ))
    return _respond(result, response, 201)


@router.get("/{system_id}")
async def get_system(system_id: str, response: Response, user: AuthenticatedUser = Depends(require_viewer)):
    result = await _run(system_id, lambda: system_service.service.document(_caller(user), system_id))
    response.headers["Cache-Control"] = "private, no-cache"
    return _respond(result, response)


@router.patch("/{system_id}", dependencies=[Depends(require_designer)])
async def update_system(
    system_id: str, body: UpdateSystemRequest, request: Request, response: Response,
    user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    fields = {key: getattr(body, key) for key in body.model_fields_set}
    if fields.get("name", "") is None:
        raise HTTPException(status_code=422, detail="name cannot be null")
    if "description" in fields and fields["description"] is None:
        fields["description"] = ""
    result = await _run(system_id, lambda: system_service.service.update_system(
        _caller(user), system_id, version, fields,
    ))
    return _respond(result, response)


@router.delete("/{system_id}", dependencies=[Depends(require_designer)])
async def delete_system(system_id: str, request: Request, user: AuthenticatedUser = Depends(require_viewer)):
    version = _expected_version(request, system_id)
    await _run(system_id, lambda: system_service.service.delete_system(_caller(user), system_id, version))
    return Response(status_code=204)


# ---------------------------------------------------------------------------
# Instances


@router.post("/{system_id}/instances", dependencies=[Depends(require_designer)])
async def add_instance(
    system_id: str, body: CreateInstanceRequest, request: Request, response: Response,
    user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    result = await _run(system_id, lambda: system_service.service.add_instance(
        _caller(user), system_id, version, project_id=body.projectId, label=body.label,
        baseline_commit=body.baselineCommit, tracked_ref=body.trackedRef, pinned=body.pinned,
    ))
    return _respond(result, response, 201)


@router.patch("/{system_id}/instances/{instance_id}", dependencies=[Depends(require_designer)])
async def update_instance(
    system_id: str, instance_id: str, body: UpdateInstanceRequest, request: Request,
    response: Response, user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    fields = {key: getattr(body, key) for key in body.model_fields_set}
    for key in ("label", "pinned"):
        if key in fields and fields[key] is None:
            raise HTTPException(status_code=422, detail=f"{key} cannot be null")
    result = await _run(system_id, lambda: system_service.service.update_instance(
        _caller(user), system_id, version, instance_id, fields,
    ))
    return _respond(result, response)


@router.delete("/{system_id}/instances/{instance_id}", dependencies=[Depends(require_designer)])
async def remove_instance(
    system_id: str, instance_id: str, request: Request,
    cascade: Optional[Literal["links"]] = Query(default=None),
    user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    result = await _run(system_id, lambda: system_service.service.remove_instance(
        _caller(user), system_id, version, instance_id, cascade=cascade == "links",
    ))
    return _no_content(result)


@router.get("/{system_id}/instances/{instance_id}/interface")
async def get_interface(
    system_id: str, instance_id: str, commit: Optional[str] = Query(default=None, max_length=40),
    user: AuthenticatedUser = Depends(require_viewer),
):
    state, body = await _run(system_id, lambda: system_service.service.interface(
        _caller(user), system_id, instance_id, commit,
    ))
    if state == "queued":
        return JSONResponse(status_code=202, content=body)
    return body


@router.post("/{system_id}/instances/{instance_id}/check", dependencies=[Depends(require_designer)])
async def check_instance(
    system_id: str, instance_id: str, user: AuthenticatedUser = Depends(require_viewer),
):
    body = await _run(system_id, lambda: system_service.service.check_now(
        _caller(user), system_id, instance_id,
    ))
    return JSONResponse(status_code=202, content=body)


@router.put(
    "/{system_id}/instances/{instance_id}/ports/{port_key:path}/override",
    dependencies=[Depends(require_designer)],
)
async def set_port_override(
    system_id: str, instance_id: str, port_key: str, body: OverrideRequest, request: Request,
    response: Response, user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    result = await _run(system_id, lambda: system_service.service.set_override(
        _caller(user), system_id, version, instance_id, port_key, body.state,
    ))
    return _respond(result, response)


# ---------------------------------------------------------------------------
# Links and rows


@router.post("/{system_id}/links", dependencies=[Depends(require_designer)])
async def create_link(
    system_id: str, body: CreateLinkRequest, request: Request, response: Response,
    user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    if body.a.instanceId == body.b.instanceId and body.a.portKey == body.b.portKey:
        raise HTTPException(status_code=422, detail="both link ends are the same port")
    result = await _run(system_id, lambda: system_service.service.create_link(
        _caller(user), system_id, version, a=body.a.model_dump(), b=body.b.model_dump(),
        name=body.name, harness=body.harness,
    ))
    return _respond(result, response, 201)


@router.patch("/{system_id}/links/{link_id}", dependencies=[Depends(require_designer)])
async def update_link(
    system_id: str, link_id: str, body: UpdateLinkRequest, request: Request, response: Response,
    user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    fields = {key: getattr(body, key) for key in body.model_fields_set}
    if "name" in fields and fields["name"] is None:
        fields["name"] = ""
    result = await _run(system_id, lambda: system_service.service.update_link(
        _caller(user), system_id, version, link_id, fields,
    ))
    return _respond(result, response)


@router.delete("/{system_id}/links/{link_id}", dependencies=[Depends(require_designer)])
async def delete_link(
    system_id: str, link_id: str, request: Request, user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    result = await _run(system_id, lambda: system_service.service.delete_link(
        _caller(user), system_id, version, link_id,
    ))
    return _no_content(result)


@router.put("/{system_id}/links/{link_id}/rows", dependencies=[Depends(require_designer)])
async def replace_rows(
    system_id: str, link_id: str, request: Request, response: Response,
    body: List[RowRequest] = Body(max_length=MAX_ROWS),
    user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    rows = [row.model_dump() for row in body]
    result = await _run(system_id, lambda: system_service.service.replace_rows(
        _caller(user), system_id, version, link_id, rows,
    ))
    return _respond(result, response)


# ---------------------------------------------------------------------------
# Validation, reviews and rebase


@router.get("/{system_id}/validation")
async def get_validation(system_id: str, response: Response, user: AuthenticatedUser = Depends(require_viewer)):
    result = await _run(system_id, lambda: system_service.service.validation_report(_caller(user), system_id))
    return _respond(result, response)


@router.get("/{system_id}/reviews")
async def list_reviews(
    system_id: str,
    status: Optional[Literal["open", "applied", "kept_pinned", "superseded", "closed"]] = Query(default=None),
    user: AuthenticatedUser = Depends(require_viewer),
):
    return await _run(system_id, lambda: system_service.service.list_reviews(_caller(user), system_id, status))


@router.post(
    "/{system_id}/reviews/{review_id}/items/{item_id}/decision", dependencies=[Depends(require_designer)]
)
async def decide_review_item(
    system_id: str, review_id: str, item_id: str, body: DecisionRequest, request: Request,
    response: Response, user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    result = await _run(system_id, lambda: system_service.service.decide(
        _caller(user), system_id, version, review_id, item_id, body.decision, body.payload,
    ))
    return _respond(result, response)


@router.post("/{system_id}/reviews/{review_id}/keep-pinned", dependencies=[Depends(require_designer)])
async def keep_review_pinned(
    system_id: str, review_id: str, request: Request, response: Response,
    user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    result = await _run(system_id, lambda: system_service.service.keep_pinned(
        _caller(user), system_id, version, review_id,
    ))
    return _respond(result, response)


@router.post("/{system_id}/instances/{instance_id}/rebase", dependencies=[Depends(require_designer)])
async def rebase_instance(
    system_id: str, instance_id: str, body: RebaseRequest, request: Request, response: Response,
    user: AuthenticatedUser = Depends(require_viewer),
):
    version = _expected_version(request, system_id)
    state, outcome = await _run(system_id, lambda: system_service.service.rebase(
        _caller(user), system_id, version, instance_id, body.commit,
    ))
    if state == "queued":
        return JSONResponse(status_code=202, content=outcome)
    return _respond(outcome, response)


# ---------------------------------------------------------------------------
# History and layout


@router.get("/{system_id}/history")
async def get_history(
    system_id: str,
    cursor: Optional[int] = Query(default=None, ge=1),
    limit: int = Query(default=100, ge=1, le=500),
    user: AuthenticatedUser = Depends(require_viewer),
):
    return await _run(system_id, lambda: system_service.service.history(
        _caller(user), system_id, cursor=cursor, limit=limit,
    ))


@router.get("/{system_id}/layout")
async def get_layout(system_id: str, user: AuthenticatedUser = Depends(require_viewer)):
    return await _run(system_id, lambda: system_service.service.get_layout(_caller(user), system_id))


@router.put("/{system_id}/layout", dependencies=[Depends(require_designer)])
async def put_layout(
    system_id: str, body: LayoutRequest, user: AuthenticatedUser = Depends(require_viewer),
):
    positions = {key: value.model_dump() for key, value in body.positions.items()}
    return await _run(system_id, lambda: system_service.service.put_layout(
        _caller(user), system_id, positions,
    ))
