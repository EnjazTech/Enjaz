/**
 * How the page and the film move when you scroll: slowly, however hard you scroll.
 * The wheel is taken over and eased, so copy and camera move together; touch stays
 * native, and the film glides after it. Distances and speeds are in screens, so a
 * phone and a 4K monitor feel the same.
 *
 * No DOM here, so it runs under plain Node for tests.
 */

const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

export const WHEEL_EVENT = 200; // Pixels: the most one wheel event can ask for.
export const WHEEL_EASE = 12; // Per second: how quickly the page closes on where the wheel sent it.
export const WHEEL_QUEUE = 1.6; // Screens of input that may wait ahead of the page, so it stops soon after you do.
export const PAGE_CRUISE = 3.5; // Screens a second: the fastest the wheel moves the page.
export const FILM_CRUISE = 4.2; // Screens a second: a little faster, so the film can always catch the page.
export const SMOOTH_TIME = 0.2; // Seconds: how far the film's ease reaches.
export const DIP_LAG = 6; // Screens the film may fall behind before it dips through the dark instead.
export const DIP_LEAD = 0.8; // Screens short of the page a dip lands, to glide the last stretch.

/** The film's y. A second-order smooth damp with a speed limit. Allocation-free. */
export function createFollower(start = 0) {
  return {
    y: start,
    v: 0,
    step(target, dt, screen) {
      const omega = 2 / SMOOTH_TIME;
      const x = omega * dt;
      const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
      const reach = FILM_CRUISE * screen * SMOOTH_TIME;
      const change = clamp(this.y - target, -reach, reach);
      const temp = (this.v + omega * change) * dt;
      this.v = (this.v - omega * temp) * decay;
      this.y = this.y - change + (change + temp) * decay;
      if (Math.abs(this.y - target) < 0.25 && Math.abs(this.v) < 2) {
        this.y = target;
        this.v = 0;
      }
      return this.y;
    },
    reset(y) {
      this.y = y;
      this.v = 0;
    },
    /** Lands short of the page, already moving, while the screen is dark. */
    land(target, screen) {
      const dir = Math.sign(target - this.y);
      this.y = target - dir * DIP_LEAD * screen;
      this.v = dir * FILM_CRUISE * screen * 0.5;
    },
  };
}

/** The page's position while the wheel is driving it. */
export function createWheelPage() {
  return {
    on: false,
    at: 0,
    aim: 0,
    written: 0,
    input(deltaY, deltaMode, from, screen, max) {
      if (!this.on) {
        this.on = true;
        this.at = from;
        this.aim = from;
        this.written = from;
      }
      /* Some browsers report lines or pages rather than pixels. */
      const unit = deltaMode === 1 ? 40 : deltaMode === 2 ? screen : 1;
      const delta = clamp(deltaY * unit, -WHEEL_EVENT, WHEEL_EVENT);
      /* Changing direction cancels whatever was still queued the other way. */
      const base =
        Math.sign(delta) === -Math.sign(this.aim - this.at)
          ? this.at
          : this.aim;
      const queue = WHEEL_QUEUE * screen;
      this.aim = clamp(
        base + delta,
        Math.max(0, this.at - queue),
        Math.min(max, this.at + queue),
      );
    },
    /** Returns where the page should be now. native is where the browser says it is. */
    step(native, dt, screen) {
      if (!this.on) {
        return native;
      }
      /* The scrollbar, the keyboard, an anchor or find-in-page moved it: hand it back. */
      if (Math.abs(native - this.written) > 2) {
        this.on = false;
        return native;
      }
      const limit = PAGE_CRUISE * screen * dt;
      this.at += clamp(
        (this.aim - this.at) * (1 - Math.exp(-WHEEL_EASE * dt)),
        -limit,
        limit,
      );
      if (Math.abs(this.aim - this.at) < 0.5) {
        this.at = this.aim;
        this.on = false;
      }
      this.written = Math.round(this.at);
      return this.written;
    },
  };
}
