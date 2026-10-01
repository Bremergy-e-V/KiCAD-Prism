// Browser check for SB2-24: picks on repeated boards resolve to the right
// occurrence, through the <prism-semantic-viewer> element API only.
//
// Run in a page with a loaded viewer (a board's 3D tab), by pasting this file
// into the console or a page-script runner, then:
//   await runOccurrencePickCheck(document.querySelector("prism-semantic-viewer"), {
//     references: ["U1", ...], outlineMm: [minX, minY, maxX, maxY], topZMm: 1.82 });
//
// 1. Calibrate on the one-board view from the top (the `z` view): keep the
//    parts whose own centre picks them, i.e. parts no taller neighbour hides.
// 2. Place three copies in a row, the third turned 180° about z, and view
//    from the top again.
// 3. Overview: aim at every calibrated part on every copy and at a grid of
//    points on each copy's top face. Every hit must name the copy aimed at.
//    (Whether a part resolves to itself is reported, not required: at overview
//    zoom a 0402's centre is about a pixel.)
// 4. Framed: select a sample of parts per copy with setSelection({ reference,
//    occurrence }); the camera frames that part on that copy, and a pick at
//    its centre must resolve to the part on that copy.
window.runOccurrencePickCheck = async function runOccurrencePickCheck(element, options) {
  const { references, outlineMm, topZMm, gapMm = 20, settleMs = 3500, framedPerCopy = 8 } = options;
  const settle = () => new Promise((resolve) => setTimeout(resolve, settleMs));
  const topView = () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "z" }));
  const [minX, minY, maxX, maxY] = outlineMm.map((value) => value / 1000);
  const width = maxX - minX;
  const pitch = width + gapMm / 1000;
  // The camera eases toward a framed part; projecting during the move and
  // picking a frame later would aim beside it. Wait until the part stops moving
  // on screen (under 0.25 px across 250 ms), at most 6 s.
  const settledOn = async (reference, key) => {
    let last = null;
    for (let waited = 0; waited < 6000; waited += 250) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      const point = element.projectComponent(reference, key);
      if (point && last && Math.hypot(point.x - last.x, point.y - last.y) < 0.25) return;
      last = point;
    }
  };
  const aim = async (reference, key) => {
    const point = element.projectComponent(reference, key);
    if (!point) return null;
    return element.pickAt(point.x, point.y);
  };

  element.setOccurrences(null);
  topView();
  await settle();
  const visible = [];
  for (const reference of references) {
    const hit = await aim(reference);
    if (hit?.selection?.reference === reference) visible.push(reference);
  }

  const occurrences = [
    { key: "A", matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
    { key: "B", matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, pitch, 0, 0, 1] },
    { key: "C", matrix: [-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 2 * pitch + minX + maxX, minY + maxY, 0, 1] },
  ];
  element.setOccurrences(occurrences);
  topView();
  await settle();

  const parts = [];
  for (const { key } of occurrences) {
    for (const reference of visible) {
      const hit = await aim(reference, key);
      parts.push({ key, reference, gotKey: hit?.occurrenceKey ?? null, gotReference: hit?.selection?.reference ?? null });
    }
  }

  const grid = [];
  const inset = 0.002;
  const steps = 8;
  for (const { key } of occurrences) {
    for (let i = 0; i <= steps; i += 1) {
      for (let j = 0; j <= steps; j += 1) {
        const local = [
          minX + inset + (width - 2 * inset) * i / steps,
          minY + inset + (maxY - minY - 2 * inset) * j / steps,
          topZMm / 1000,
        ];
        const point = element.projectPoint(local, key);
        if (!point) continue;
        const hit = await element.pickAt(point.x, point.y);
        grid.push({ key, gotKey: hit?.occurrenceKey ?? null, kind: hit?.kind });
      }
    }
  }

  // Empty space, one board width left of the first copy.
  const outside = element.projectPoint([minX - width, (minY + maxY) / 2, 0], "A");
  const empty = outside ? await element.pickAt(outside.x, outside.y) : null;

  const framed = [];
  const stride = Math.max(1, Math.floor(visible.length / framedPerCopy));
  for (const { key } of occurrences) {
    for (let index = 0; index < visible.length && framed.filter((row) => row.key === key).length < framedPerCopy; index += stride) {
      const reference = visible[index];
      element.setSelection({ reference, occurrence: key });
      await settledOn(reference, key);
      const hit = await aim(reference, key);
      framed.push({ key, reference, gotKey: hit?.occurrenceKey ?? null, gotReference: hit?.selection?.reference ?? null });
    }
  }
  element.setSelection(null);

  const tally = (rows, test) => rows.filter(test).length;
  const wrongCopy = parts.filter((row) => row.gotKey !== row.key);
  const gridFailures = grid.filter((row) => row.gotKey !== row.key);
  const framedFailures = framed.filter((row) => row.gotKey !== row.key || row.gotReference !== row.reference);
  return {
    pass: parts.length > 0 && !wrongCopy.length && !gridFailures.length && empty?.kind === "none"
      && framed.length > 0 && !framedFailures.length,
    calibrated: { aimed: references.length, visible: visible.length },
    overview: {
      total: parts.length,
      rightOccurrence: parts.length - wrongCopy.length,
      rightPart: tally(parts, (row) => row.gotKey === row.key && row.gotReference === row.reference),
      wrongOccurrence: wrongCopy,
    },
    framed: { total: framed.length, right: framed.length - framedFailures.length, failures: framedFailures },
    grid: {
      total: grid.length,
      rightOccurrence: grid.length - gridFailures.length,
      board: tally(grid, (row) => row.kind === "board"),
      feature: tally(grid, (row) => row.kind === "feature"),
      failures: gridFailures,
    },
    empty: empty?.kind ?? null,
  };
};
