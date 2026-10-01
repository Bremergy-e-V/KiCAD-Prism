import assert from "node:assert/strict";
import test from "node:test";

import {
  BARREL_RECORD_STRIDE,
  IDENTITY,
  OCCURRENCE_STRIDE,
  normalMatrix,
  normalizeMatrix,
  occurrenceUnionBounds,
  packBarrels,
  packOccurrences,
  transformBounds,
  transformPoint,
} from "./occurrences.js";

const close = (actual, expected) => actual.forEach((value, index) =>
  assert.ok(Math.abs(value - expected[index]) < 1e-12, `${index}: ${value} ≠ ${expected[index]}`));

// Column-major: a quarter turn about z (x → y), then a translation.
const QUARTER_TURN = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0.1, 0.2, 0.3, 1];

test("the identity occurrence maps to itself exactly", () => {
  assert.deepEqual(normalMatrix([...IDENTITY]), [...IDENTITY]);
  const packed = packOccurrences([[...IDENTITY]]);
  assert.equal(packed.byteLength, OCCURRENCE_STRIDE);
  assert.deepEqual([...packed], [...IDENTITY, ...IDENTITY]);
});

test("a rigid transform's normal matrix is its rotation", () => {
  close(normalMatrix(QUARTER_TURN), [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  close(transformPoint(QUARTER_TURN, [1, 0, 0]), [0.1, 1.2, 0.3]);
});

test("non-uniform scale keeps normals perpendicular to the surface", () => {
  const stretch = [2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  // The plane x = y has normal (1, -1, 0); stretched along x it becomes x = 2y, normal ∝ (1, -2, 0).
  const n = normalMatrix(stretch);
  const mapped = [n[0] * 1 + n[4] * -1, n[1] * 1 + n[5] * -1, 0];
  assert.ok(Math.abs(mapped[0] * 2 + mapped[1] * 1) < 1e-12, "normal ⟂ the stretched tangent (2, 1, 0)");
});

test("a mirror flips the normal matrix's sign back so normals face out", () => {
  const mirror = [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  close(normalMatrix(mirror), mirror);
});

test("matrices are validated", () => {
  assert.throws(() => normalizeMatrix([1, 2, 3]), /16 numbers/);
  assert.throws(() => normalizeMatrix([...IDENTITY.slice(0, 15), 2]), /affine/);
  assert.throws(() => normalizeMatrix([NaN, ...IDENTITY.slice(1)]), /finite/);
  assert.deepEqual(normalizeMatrix({ matrix: new Float32Array(IDENTITY) }), [...IDENTITY]);
  assert.throws(() => normalMatrix([0, 0, 0, 0, ...IDENTITY.slice(4)]), /invertible/);
});

test("bounds follow each occurrence and union across them", () => {
  const board = [0, 0, -0.001, 0.05, 0.04, 0.001];
  close(transformBounds(QUARTER_TURN, board), [0.06, 0.2, 0.299, 0.1, 0.25, 0.301]);
  const shifted = [...IDENTITY.slice(0, 12), 0.07, 0, 0, 1];
  close(occurrenceUnionBounds([[...IDENTITY], shifted], board), [0, 0, -0.001, 0.12, 0.04, 0.001]);
  assert.equal(occurrenceUnionBounds([[...IDENTITY]], board), board);
});

test("barrel records pack into the storage layout (ids at byte 32)", () => {
  const data = packBarrels([{
    centerMm: [10, 20], drillWidthMm: 0.4, drillHeightMm: 0.6, outerWidthMm: 0.8, outerHeightMm: 0.7,
    startZMm: -0.8, endZMm: 0.8, netId: 7, objectFeatureId: 9, startLayerId: 1, endLayerId: 4,
  }]);
  assert.equal(data.byteLength, BARREL_RECORD_STRIDE);
  const f32 = new Float32Array(data);
  const u32 = new Uint32Array(data);
  close([f32[0], f32[1], f32[2], f32[3], f32[4], f32[5]].map((v) => Math.fround(v)),
    [0.01, -0.02, 0.0002, 0.0004, -0.0008, 0.0008].map((v) => Math.fround(v)));
  assert.deepEqual([...u32.slice(8, 12)], [7, 9, 1, 4]);
});

test("instanced shader variants place every path by the occurrence", async () => {
  const { INSTANCED_SHADERS } = await import("./renderer.js");
  for (const [name, code] of Object.entries(INSTANCED_SHADERS)) {
    assert.match(code, /@builtin\(instance_index\) instance: u32/, name);
    assert.match(code, /occurrences\[instance( \/ count)?\]/, name);
    assert.match(code, /\.model \* vec4f\(/, name);
  }
  // Barrels nest: one record per barrel, repeated per occurrence.
  for (const name of ["barrel", "barrelPick"]) {
    assert.match(INSTANCED_SHADERS[name], /barrels\[instance % count\]/);
    assert.doesNotMatch(INSTANCED_SHADERS[name], /@location\(3\) dimensions/);
  }
  assert.match(INSTANCED_SHADERS.main, /occurrence\.normal \* vec4f\(input\.normal, 0\.0\)/);
  assert.match(INSTANCED_SHADERS.barrel, /occurrence\.normal \* vec4f\(input\.normal, 0\.0\)/);
});
