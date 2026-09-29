"""ICD rendering and snapshot diffs (``docs/system-builder/CONTRACTS.md`` §9).

Everything here reads a system document (live or frozen) that has already
been redacted for its reader, so a restricted board can never leak through
an export. The renderers are deterministic for a given document and
generation time.
"""

from __future__ import annotations

import csv
import html
import io
from typing import Any, Mapping, Optional

from app.services.systems.drift import pad_sort_key

RENDERER_VERSION = "1"

CSV_COLUMNS = (
    "row_id", "link_id", "link_name", "harness", "signal",
    "a_board", "a_connector", "a_pin", "a_pin_name", "a_net",
    "b_board", "b_connector", "b_pin", "b_pin_name", "b_net",
    "status", "a_commit", "b_commit",
)

_ROW_ERROR_RULES = ("SYS-V01", "SYS-V04")
_END_ERROR_RULES = ("SYS-V03",)


def _join(values: Optional[list]) -> str:
    return "|".join(str(v) for v in values or [])


def _row_status(row: Mapping[str, Any], link: Mapping[str, Any], validation: Mapping[str, Any],
                review_rows: set[str]) -> str:
    """§9.2: ``error`` from error findings, ``review`` from open review items, else ``ok``."""

    for finding in validation.get("findings") or []:
        if finding["severity"] != "error" or finding["linkId"] != link["id"]:
            continue
        if finding["rule"] in _ROW_ERROR_RULES and finding["rowId"] == row["id"]:
            return "error"
        if finding["rule"] in _END_ERROR_RULES:
            return "error"
    return "review" if row["id"] in review_rows else "ok"


def csv_records(document: Mapping[str, Any]) -> list[dict[str, str]]:
    """The §9.2 export rows, in order."""

    instances = {i["id"]: i for i in document["instances"]}
    validation = document.get("validation") or {}
    review_rows = set(document.get("reviewRowIds") or [])
    records = []
    for link in sorted(document["links"], key=lambda l: (l["name"], l["id"])):
        for row in sorted(link["rows"], key=lambda r: (pad_sort_key(r["pinA"] or ""), r["id"])):
            record = {"row_id": row["id"], "link_id": link["id"], "link_name": link["name"],
                      "harness": link["harness"] or "", "signal": row["signal"]}
            for end, column in (("a", "A"), ("b", "B")):
                instance = instances[link[end]["instanceId"]]
                port = link[end]["port"] or {}
                observed = row.get(f"observed{column}") or {}
                nets = observed.get("nets") if observed.get("present") else None
                record.update({
                    f"{end}_board": instance["label"],
                    f"{end}_connector": port.get("reference") or "",
                    f"{end}_pin": row[f"pin{column}"] or "",
                    f"{end}_pin_name": _join(observed.get("pinNames")),
                    f"{end}_net": _join(nets if nets is not None else row[f"net{column}"]),
                    f"{end}_commit": instance["baselineCommit"] or "",
                })
            record["status"] = _row_status(row, link, validation, review_rows)
            records.append(record)
    return records


def render_csv(document: Mapping[str, Any]) -> str:
    buffer = io.StringIO()
    writer = csv.DictWriter(buffer, fieldnames=CSV_COLUMNS, lineterminator="\r\n")
    writer.writeheader()
    writer.writerows(csv_records(document))
    return buffer.getvalue()


# ---------------------------------------------------------------------------
# HTML


def _e(value: Any) -> str:
    return html.escape("" if value is None else str(value), quote=True)


def _diagram(document: Mapping[str, Any]) -> str:
    """§9.5 item 3: instances as boxes on a grid, one line per link."""

    instances = document["instances"]
    if not instances:
        return ""
    width, height, gap_x, gap_y, per_row = 180, 56, 120, 70, 3
    boxes = {}
    for index, instance in enumerate(instances):
        col, row = index % per_row, index // per_row
        boxes[instance["id"]] = (20 + col * (width + gap_x), 20 + row * (height + gap_y))
    rows = (len(instances) + per_row - 1) // per_row
    total_w = 40 + min(len(instances), per_row) * (width + gap_x) - gap_x
    total_h = 40 + rows * (height + gap_y) - gap_y
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_w} {total_h}" '
             f'width="{total_w}" height="{total_h}" role="img" aria-label="Connector diagram">']
    for link in document["links"]:
        (ax, ay), (bx, by) = boxes[link["a"]["instanceId"]], boxes[link["b"]["instanceId"]]
        x1, y1, x2, y2 = ax + width / 2, ay + height / 2, bx + width / 2, by + height / 2
        refs = " ↔ ".join((link[end]["port"] or {}).get("reference") or "restricted" for end in ("a", "b"))
        label = f"{link['name'] or link['id']} ({refs})"
        parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" class="wire"/>')
        parts.append(f'<text x="{(x1 + x2) / 2}" y="{(y1 + y2) / 2 - 4}" class="wire-label">{_e(label)}</text>')
    for instance in instances:
        x, y = boxes[instance["id"]]
        parts.append(f'<rect x="{x}" y="{y}" width="{width}" height="{height}" rx="6" class="board"/>')
        parts.append(f'<text x="{x + width / 2}" y="{y + 24}" class="board-label">{_e(instance["label"])}</text>')
        sub = instance["projectName"] or ("restricted" if instance.get("restricted") else "")
        parts.append(f'<text x="{x + width / 2}" y="{y + 42}" class="board-sub">{_e(sub)}</text>')
    parts.append("</svg>")
    return "".join(parts)


_STYLE = """
body{font:12px/1.4 system-ui,sans-serif;color:#111;margin:24px}
h1{font-size:20px;margin:0 0 4px}h2{font-size:15px;margin:24px 0 8px}h3{font-size:13px;margin:16px 0 6px}
table{border-collapse:collapse;width:100%;margin-bottom:8px}
th,td{border:1px solid #bbb;padding:3px 6px;text-align:left;vertical-align:top}
th{background:#eee}.mono{font-family:ui-monospace,monospace}.meta{color:#555}
.banner{border:2px solid #b45309;background:#fef3c7;padding:6px 10px;margin:8px 0;font-weight:600}
.board{fill:#f5f5f5;stroke:#333}.wire{stroke:#2563eb;stroke-width:1.5}
.board-label{font:600 13px system-ui;text-anchor:middle}.board-sub{font:11px system-ui;text-anchor:middle;fill:#555}
.wire-label{font:10px system-ui;text-anchor:middle;fill:#1e3a8a}
@media print{.banner{position:running(banner)}@page{margin:14mm}thead{display:table-header-group}}
"""


def render_html(document: Mapping[str, Any], *, source: str, generated_at: str) -> str:
    """§9.5: the printable ICD. ``source`` is the snapshot name or ``live``."""

    system = document["system"]
    open_reviews = int(document.get("openReviewCount") or 0)
    banner = (f'<div class="banner">This document contains {open_reviews} unreviewed '
              f'change{"s" if open_reviews != 1 else ""}.</div>') if open_reviews else ""
    out = ["<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\">",
           f"<title>ICD — {_e(system['name'])}</title><style>{_STYLE}</style></head><body>", banner,
           f"<h1>Interface control document — {_e(system['name'])}</h1>",
           f'<p class="meta">Source: {_e(source)} · Generated {_e(generated_at)} · '
           f"Renderer {RENDERER_VERSION}</p>"]
    if system.get("description"):
        out.append(f"<p>{_e(system['description'])}</p>")

    out.append("<h2>Boards</h2><table><thead><tr><th>Label</th><th>Project</th><th>Baseline</th>"
               "<th>Tracked branch</th><th>Pinned</th></tr></thead><tbody>")
    for instance in document["instances"]:
        commit = instance["baselineCommit"]
        baseline = (f'<span class="mono">{_e(commit[:12])}</span><br><span class="mono meta">{_e(commit)}</span>'
                    if commit else "restricted")
        out.append(f"<tr><td>{_e(instance['label'])}</td><td>{_e(instance['projectName'] or '')}</td>"
                   f"<td>{baseline}</td><td>{_e(instance['trackedRef'] or '')}</td>"
                   f"<td>{'yes' if instance['pinned'] else 'no'}</td></tr>")
    out.append("</tbody></table>")

    out.append(f"<h2>Diagram</h2>{_diagram(document)}")

    labels = {i["id"]: i["label"] for i in document["instances"]}
    records = csv_records(document)
    out.append("<h2>Connections</h2>")
    for link in sorted(document["links"], key=lambda l: (l["name"], l["id"])):
        ends = " ↔ ".join(f"{labels[link[e]['instanceId']]}/{(link[e]['port'] or {}).get('reference') or 'restricted'}"
                          for e in ("a", "b"))
        harness = f" · harness {_e(link['harness'])}" if link["harness"] else ""
        out.append(f"<h3>{_e(link['name'] or link['id'])} — {_e(ends)}{harness}</h3>")
        out.append("<table><thead><tr><th>Pin A</th><th>Name A</th><th>Net A</th><th>Signal</th>"
                   "<th>Pin B</th><th>Name B</th><th>Net B</th><th>Status</th></tr></thead><tbody>")
        for record in (r for r in records if r["link_id"] == link["id"]):
            out.append("<tr>" + "".join(
                f'<td class="{"mono" if key.endswith(("pin", "net")) else ""}">{_e(record[key])}</td>'
                for key in ("a_pin", "a_pin_name", "a_net", "signal", "b_pin", "b_pin_name", "b_net", "status")
            ) + "</tr>")
        out.append("</tbody></table>")

    validation = document.get("validation") or {}
    out.append("<h2>Findings</h2>")
    findings = validation.get("findings") or []
    if findings:
        out.append("<table><thead><tr><th>Severity</th><th>Rule</th><th>Board</th><th>Link</th>"
                   "<th>Connector</th><th>Pin</th></tr></thead><tbody>")
        for finding in findings:
            out.append(f"<tr><td>{_e(finding['severity'])}</td><td>{_e(finding['rule'])} {_e(finding['name'])}</td>"
                       f"<td>{_e(labels.get(finding['instanceId'], ''))}</td><td>{_e(finding['linkId'] or '')}</td>"
                       f"<td>{_e(finding['reference'] or '')}</td><td>{_e(finding['pin'] or '')}</td></tr>")
        out.append("</tbody></table>")
    else:
        out.append("<p>No findings.</p>")
    for entry in validation.get("notEvaluated") or []:
        out.append(f"<p class=\"meta\">Not evaluated: {_e(entry['rule'])} for "
                   f"{_e(labels.get(entry['instanceId'], ''))} ({_e(entry['reason'])}).</p>")
    out.append(banner + "</body></html>")
    return "".join(out)


# ---------------------------------------------------------------------------
# Diff


_ROW_FIELDS = ("pinA", "pinB", "signal", "netA", "netB")


def diff(before: Mapping[str, Any], after: Mapping[str, Any]) -> dict:
    """Row-level differences grouped by link, plus baseline changes per board."""

    def by_id(items):
        return {item["id"]: item for item in items}

    boards = []
    old_instances, new_instances = by_id(before["instances"]), by_id(after["instances"])
    for iid in sorted(set(old_instances) | set(new_instances)):
        old, new = old_instances.get(iid), new_instances.get(iid)
        if old is None or new is None or old["baselineCommit"] != new["baselineCommit"]:
            boards.append({
                "instanceId": iid, "label": (new or old)["label"],
                "status": "added" if old is None else "removed" if new is None else "rebased",
                "before": old and old["baselineCommit"], "after": new and new["baselineCommit"],
            })

    links = []
    old_links, new_links = by_id(before["links"]), by_id(after["links"])
    for lid in sorted(set(old_links) | set(new_links)):
        old, new = old_links.get(lid), new_links.get(lid)
        old_rows, new_rows = by_id(old["rows"] if old else []), by_id(new["rows"] if new else [])
        added = [new_rows[r] for r in sorted(set(new_rows) - set(old_rows))]
        removed = [old_rows[r] for r in sorted(set(old_rows) - set(new_rows))]
        changed = []
        for rid in sorted(set(old_rows) & set(new_rows)):
            a = {k: old_rows[rid].get(k) for k in _ROW_FIELDS}
            b = {k: new_rows[rid].get(k) for k in _ROW_FIELDS}
            if a != b:
                changed.append({"id": rid, "before": a, "after": b})
        meta_changed = bool(old and new and (old["name"], old["harness"]) != (new["name"], new["harness"]))
        if old is None or new is None or added or removed or changed or meta_changed:
            links.append({
                "linkId": lid, "name": (new or old)["name"],
                "status": "added" if old is None else "removed" if new is None else "changed",
                "rows": {"added": added, "removed": removed, "changed": changed},
            })
    return {"boards": boards, "links": links}
