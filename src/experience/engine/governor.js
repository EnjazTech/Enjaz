/**
 * Runtime frame-time governor. Pure logic, fed rAF deltas, so it unit-tests in
 * Node. Steps down one rung at a time and rarely climbs back, because a visitor
 * notices a stutter far more than a slightly softer image.
 */

export const LADDER = [
  "pixel-85", // Only applied at scroll idle or in the dark: reallocates the buffer.
  "pixel-72",
  "drop-film",
  "instances-70",
  "instances-50",
  "shadow-1",
  "extras-off",
  "cadence-30",
  "stills",
];

const WINDOW = 90;
const SETTLE_MS = 1000;
const IGNORE_OVER_MS = 250;
const DOWN_FRAMES = 45;
const UP_FRAMES = 240;
const COOLDOWN_MS = 1500;
const BAIL_MS = 4000;

function percentile(sorted, fraction) {
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))];
}

export class Governor {
  constructor({ onChange = () => {} } = {}) {
    this.onChange = onChange;
    this.buffer = new Float32Array(WINDOW);
    this.sorted = new Float32Array(WINDOW);
    this.count = 0;
    this.head = 0;
    this.rung = -1;
    this.elapsed = 0;
    this.overBudget = 0;
    this.underBudget = 0;
    this.cooldown = 0;
    this.climbs = 0;
    this.upWait = UP_FRAMES;
    this.locked = false;
    this.refreshCap = false;
    this.seen = 0;
    this.belowBail = 0;
    this.p50 = 0;
    this.p90 = 0;
    this.vsync = 16.6;
  }

  /** Target frame time: vsync, but never chase more than 60 Hz. */
  target() {
    return this.refreshCap ? 33.3 : Math.max(this.vsync, 16.6);
  }

  /** @param {number} dt milliseconds since the previous rAF. */
  push(dt) {
    this.elapsed += dt;
    if (this.elapsed < SETTLE_MS || dt > IGNORE_OVER_MS) {
      return;
    }

    this.buffer[this.head] = dt;
    this.head = (this.head + 1) % WINDOW;
    this.count = Math.min(WINDOW, this.count + 1);
    this.seen += 1;
    this.cooldown = Math.max(0, this.cooldown - dt);

    if (this.count < WINDOW / 2) {
      return;
    }

    this.sorted.set(this.buffer);
    const view = this.sorted.subarray(0, this.count).sort();
    this.p50 = percentile(view, 0.5);
    this.p90 = percentile(view, 0.9);
    this.vsync = percentile(view.subarray(0, Math.max(1, Math.floor(this.count * 0.2))), 0.5);

    /* A steady 30 in the first second or so is Low Power Mode, not a slow GPU. */
    if (
      this.seen <= 60 &&
      Math.abs(this.p50 - 33.3) / 33.3 < 0.04 &&
      this.p90 / this.p50 < 1.08
    ) {
      this.refreshCap = true;
    }

    const target = this.target();

    if (this.p90 > target * 1.25) {
      this.overBudget += 1;
      this.underBudget = 0;
    } else if (this.p90 < target * 0.75) {
      this.underBudget += 1;
      this.overBudget = 0;
    } else {
      this.overBudget = 0;
      this.underBudget = 0;
    }

    /* Bail only from the bottom of the ladder, after 4 s under 20 fps. */
    if (this.rung === LADDER.length - 2 && this.p50 > 50) {
      this.belowBail += dt;
      if (this.belowBail > BAIL_MS) {
        this.step(1);
        return;
      }
    } else {
      this.belowBail = 0;
    }

    if (this.cooldown > 0) {
      return;
    }

    if (this.overBudget >= DOWN_FRAMES && this.rung < LADDER.length - 2) {
      if (this.underBudgetClimbed) {
        this.upWait *= 2;
        this.underBudgetClimbed = false;
      }
      this.step(1);
    } else if (this.underBudget >= this.upWait && this.rung >= 0 && !this.locked) {
      this.climbs += 1;
      this.underBudgetClimbed = true;
      if (this.climbs >= 2) {
        this.locked = true;
      }
      this.step(-1);
    }
  }

  step(by) {
    this.rung += by;
    this.overBudget = 0;
    this.underBudget = 0;
    this.cooldown = COOLDOWN_MS;
    this.count = 0;
    this.onChange(this.rung, LADDER[this.rung] ?? "full");
  }
}
