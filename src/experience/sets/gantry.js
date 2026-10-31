/** The steel gantry each machine stands on, spanning the atrium. */

import { box } from "../engine/geo.js";

const STEEL = [0.34, 0.35, 0.38];

export function gantryParts(y = -1.25, span = 23.2) {
  return [
    box(span, 0.2, 0.18, { at: [0, y, 1.05], color: STEEL }),
    box(span, 0.2, 0.18, { at: [0, y, -1.05], color: STEEL }),
    box(span, 0.05, 0.28, { at: [0, y + 0.12, 1.05], color: STEEL }),
    box(span, 0.05, 0.28, { at: [0, y + 0.12, -1.05], color: STEEL }),
    box(0.16, 0.14, 2.1, { at: [-2.2, y, 0], color: STEEL }),
    box(0.16, 0.14, 2.1, { at: [2.2, y, 0], color: STEEL }),
    box(0.16, 0.14, 2.1, { at: [-5.6, y, 0], color: STEEL }),
    box(0.16, 0.14, 2.1, { at: [5.6, y, 0], color: STEEL }),
  ];
}
