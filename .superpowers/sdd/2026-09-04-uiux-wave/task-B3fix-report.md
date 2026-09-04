# Task B3-fix report

Component: `src/components/FieldToProduct.astro` (rendered only on `/en/leadership/`).
Also touched: `tests/e2e/leadership.spec.ts` (new regression assertion).

## Defect 1 — bottom node clipped (wide variant)

**Before**: `viewBox="0 0 880 260"`. The "Next engagement" rect (`y="222" height="44"`) has its
bottom edge at y=266 — 6px past the viewBox's bottom edge (260), so the clip-path/reveal
animation and the SVG's own bounds cut the label "Prototype in one day" off mid-word.

**After**: `viewBox="0 0 880 280"`, exactly as the task suggested — no node moved. Measured via
a headless Playwright script that reads every `rect`'s `y + height` in the live DOM: the deepest
rect bottom edge is still 266, now with 14px of clear space to the new viewBox bottom (280). The
new `tests/e2e/leadership.spec.ts` test "the wide diagram does not clip its last node (B3)"
encodes this invariant (`viewBox height > max(rect y + height)`).

**Narrow variant**: checked the same way. Its last rect (`y="576" height="44"`) bottoms out at
620, well inside the 700-height viewBox — no change needed, confirmed by measurement and by the
390px screenshots.

## Defect 2 — Platform label overflowing its box (wide variant)

**Before**: `PLATFORM[0] = { x: 180, w: 140, label: 'Reusable process components' }`. Measured
rendered text width (via `getComputedTextLength()` in the real Rubik font, weight 600, 12px):
179.9px against a 140px-wide box — the label overflowed by ~20px on each side, past both
rounded-rect edges.

**After**:
- Label shortened to `'Reusable components'` (rendered width 130.4px), preserving the meaning
  ("reusable" platform capability) without inventing a new claim.
- Box widened and re-centered: `{ x: 165, w: 170, label: 'Reusable components' }` (was
  `x: 180, w: 140`), keeping the same box center (250) so the field→platform connector curves
  still land in the same place.

Padding check (measured `rect` edges vs. text `getBBox()` edges in the live DOM, all three
Platform boxes plus the three Field boxes and the Next box):

| Label | Box range | Text range | Padding L/R |
|---|---|---|---|
| APG assistant | 120–240 | 138.7–221.3 | 18.7 / 18.7 |
| KfW PoC portfolio | 300–420 | 308.8–411.2 | 8.8 / 8.8 |
| Bosch workflows | 480–600 | 490.2–589.8 | 10.2 / 10.2 |
| Reusable components | 165–335 | 184.8–315.2 | 19.8 / 19.8 |
| Testbed (evals) | 380–520 | 406.0–494.0 | 26.0 / 26.0 |
| Prompt Wizard | 580–720 | 607.1–692.9 | 27.1 / 27.1 |
| Prototype in one day | 420–720 | 503.0–637.0 | 83.0 / 83.0 |

Every label now sits inside its box with comfortable positive padding (minimum ~8.8px, most
15–27px). The widened Platform box 1 now right-edges at 335, box 2 starts at 380 (45px clear),
and box 3 still runs 580–720 — unchanged, so its 28px gap to the annotation text starting at
x=748 is untouched. Field labels were already within their 120px boxes (min 8.8px padding) and
needed no change. The narrow/mobile variant's 320px-wide boxes were re-measured with the same
method — every label has 93–118px of padding on each side, no risk of overflow there.

## Verification

- `npm run build` then `npm run preview -- --port 4377 --host 127.0.0.1`.
- Wrote a small Playwright script that opens `/en/leadership/`, reads every `.f2p__node rect` and
  `.f2p__node text` element's real geometry (`getAttribute`, `getComputedTextLength`, `getBBox`)
  directly from the rendered DOM (real Rubik font) to get exact numbers rather than estimating
  metrics — this is what drove the box-width/x decisions above.
- Screenshotted `.f2p` at 1440px and 390px, light and dark, per the required snippet, with
  `page.emulateMedia({ reducedMotion: 'reduce' })` added so the component's own JS (which skips
  the entrance-reveal animation under `prefers-reduced-motion`) lands the diagram in its final,
  settled state instead of racing a 1500ms-delayed clip-path transition. (An early attempt without
  that emulation intermittently caught the "Next engagement" node's reveal animation mid-transition
  — a harmless animation-timing artifact of the existing IntersectionObserver-driven reveal, not a
  geometry bug — which is why the emulation was added for deterministic verification shots.)
- Saved to `.superpowers/sdd/2026-09-04-uiux-wave/shots/`:
  - `b3fix-f2p-1440-light.png` / `b3fix-f2p-1440-dark.png`: full wide diagram, three lanes, three
    connectors each hop. "Prototype in one day" renders in full inside its box, not clipped by the
    SVG edge. "Reusable components" sits centered inside its (now wider) box with visible margin
    on both sides, matching the padding of "Testbed (evals)" and "Prompt Wizard". All connectors
    still terminate cleanly on their target boxes. Dark mode: same layout, all text/strokes have
    sufficient contrast against the dark surface, nothing crosses a box border.
  - `b3fix-f2p-390-light.png` / `b3fix-f2p-390-dark.png`: stacked mobile diagram, all seven labels
    comfortably centered in their 320px-wide boxes, the two vertical connectors land on the boxes
    above/below them, "Prototype in one day" fully visible at the bottom, legible in both themes.
- `npx prettier --write` on both changed files (no-op on the component; reformatted the new test's
  line wrapping).
- `npm run quality` — passes (20 pre-existing warnings in unrelated `tools/*.astro` files, 0
  errors).
- `PW_PORT=4357 npm run test:e2e` — 200 passed, including the new B3 regression test
  ("the wide diagram does not clip its last node (B3)").

## Files changed

- `src/components/FieldToProduct.astro` — 2-line diff: wide viewBox `260` → `280`; Platform box 1
  `x/w` `180/140` → `165/170` and its label `'Reusable process components'` →
  `'Reusable components'`.
- `tests/e2e/leadership.spec.ts` — added one test asserting `.f2p__svg--wide`'s viewBox height
  exceeds the bottom edge of its lowest rect.
