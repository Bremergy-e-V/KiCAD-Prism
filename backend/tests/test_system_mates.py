"""SB2-16: mates-with in systems (CONTRACTS_P2 §18): SYS-V18 and harness-end suggestions.

The catalog is a separate service; a fake stands in, and the fixture board
interfaces get MPNs on OBC-A J7 and PAY J4 (the P1 fixtures carry none).
"""

from __future__ import annotations

from system_builder_db import FixtureSystemCase

from app.services.systems.interface_extractor import _mpn
from app.services.systems.jobs import extract_and_store
from app.services.systems.service import Caller, SystemService

DESIGNER = Caller(role="designer", email="designer@example.com")
PLUG = {"componentId": "cmp_plug", "name": "Plug", "mpn": "SAMTEC-PLUG", "manufacturer": "Samtec"}
SOCKET = {"componentId": "cmp_socket", "name": "Socket", "mpn": "SAMTEC-SOCKET", "manufacturer": "Samtec"}
HOUSING = {"componentId": "cmp_housing", "name": "Housing", "mpn": "JST-H", "manufacturer": "JST"}


class FakeCatalog:
    def __init__(self) -> None:
        self.pairs: set[tuple[str, str]] = set()
        self.parts = {p["mpn"].lower(): p for p in (PLUG, SOCKET, HOUSING)}

    def parts_by_mpn(self, mpns):
        return {m.strip().lower(): self.parts[m.strip().lower()] for m in mpns if m.strip().lower() in self.parts}

    def mate_pairs(self, ids):
        return {pair for pair in self.pairs if set(pair) & set(ids)}

    def list_mates_with(self, component_id):
        partners = [b if a == component_id else a for a, b in self.pairs if component_id in (a, b)]
        return [p for p in self.parts.values() if p["componentId"] in partners]


class MatesTest(FixtureSystemCase):
    def setUp(self) -> None:
        super().setUp()
        self.catalog = FakeCatalog()
        self.service = SystemService(connect=self.connect, project_loader=self.projects.get,
                                     enqueue=lambda *a, **k: {"job_id": "j", "status": "queued"},
                                     catalog=lambda: self.catalog)
        for board, project_id in (("mini_obc", "prj_obc"), ("mini_payload", "prj_pay"), ("mini_power", "prj_pwr")):
            extract_and_store(self.projects[project_id], self.commits[board]["F0"], self.connect)
        for project, reference, mpn in (("prj_obc", "J7", PLUG["mpn"]), ("prj_pay", "J4", SOCKET["mpn"])):
            self.conn.execute(
                """UPDATE system_interface_artifacts SET payload = jsonb_set(payload, '{components}',
                     (SELECT jsonb_agg(CASE WHEN c->>'reference' = %s THEN jsonb_set(c, '{mpn}', to_jsonb(%s::text)) ELSE c END)
                      FROM jsonb_array_elements(payload->'components') c))
                   WHERE project_id = %s""", (reference, mpn, project))
        self.conn.commit()
        self.link = self.links["L-J7J4"]

    def v18(self) -> list[dict]:
        return [f for f in self.service.validation_report(DESIGNER, self.sid).body["findings"] if f["rule"] == "SYS-V18"]

    def test_mpn_fields_are_read_case_insensitively(self) -> None:
        self.assertEqual(_mpn({"Manufacturer_Part_Number": " FTSH-110 "}), "FTSH-110")
        self.assertEqual(_mpn({"MPN": "", "Mfr. No.": "ADM6-30"}), "ADM6-30")
        self.assertIsNone(_mpn({"Value": "Conn_01x04"}))

    def test_an_unknown_b2b_pair_warns_until_the_catalog_relates_it(self) -> None:
        self.assertEqual(self.v18(), [], "unspecified links are not mates")
        self.service.update_link(DESIGNER, self.sid, self.version(), self.link, {"type": "b2b"})
        [finding] = self.v18()
        self.assertEqual((finding["severity"], finding["linkId"], finding["detail"]),
                         ("warning", self.link, {"partA": PLUG["componentId"], "partB": SOCKET["componentId"]}))
        self.catalog.pairs.add(("cmp_plug", "cmp_socket"))
        self.assertEqual(self.v18(), [])

    def test_a_part_on_a_harness_end_is_checked_and_suggestions_never_assign(self) -> None:
        harness = self.service.link_to_harness(DESIGNER, self.sid, self.version(), self.link).body
        obc_end = harness["ends"][0]
        self.catalog.pairs.add(("cmp_housing", "cmp_plug"))
        body = self.service.end_suggestions(DESIGNER, self.sid, harness["id"], obc_end["id"])
        self.assertEqual((body["connectorMpn"], body["connectorPart"]["componentId"],
                          [s["componentId"] for s in body["suggestions"]]),
                         (PLUG["mpn"], "cmp_plug", ["cmp_housing"]))
        self.assertIsNone(self.store.get_harness(self.sid, harness["id"])["ends"][0]["catalog_component_id"])
        # An assigned part that is not a known partner of the board connector warns.
        self.conn.execute("UPDATE system_harness_ends SET catalog_component_id = 'cmp_socket' WHERE id = %s",
                          (obc_end["id"],))
        self.conn.commit()
        [finding] = self.v18()
        self.assertEqual((finding["detail"]["endId"], finding["detail"]["part"], finding["detail"]["connectorPart"]),
                         (obc_end["id"], "cmp_socket", "cmp_plug"))
        self.conn.execute("UPDATE system_harness_ends SET catalog_component_id = 'cmp_housing' WHERE id = %s",
                          (obc_end["id"],))
        self.conn.commit()
        self.assertEqual(self.v18(), [])

    def test_no_mpn_means_not_evaluated(self) -> None:
        self.conn.execute("UPDATE system_interface_artifacts SET payload = jsonb_set(payload, '{components}',"
                          " (SELECT jsonb_agg(c - 'mpn') FROM jsonb_array_elements(payload->'components') c))")
        self.conn.commit()
        self.service.update_link(DESIGNER, self.sid, self.version(), self.link, {"type": "b2b"})
        self.assertEqual(self.v18(), [])
