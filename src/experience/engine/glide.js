/**
 * How the page and the film move when you scroll. The wheel is taken over and eased,
 * so copy and camera move together; touch stays native, and the film glides after it.
 * Distances and speeds are in screens, so a phone and a 4K monitor feel the same.
 *
 * The wheel is paced by what is on screen. Where there is copy to read it moves
 * slowly; across the empty stretches between captions the same wheel travels
 * EMPTY_SPEED times as far, and it brakes into the next caption and stops where that
 * caption is fully shown, so one hard flick can never skip past the copy.
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
export const EMPTY_SPEED = 4; // How much further the wheel goes where no copy is showing.
export const EMPTY_CRUISE = 2.5; // Times PAGE_CRUISE and FILM_CRUISE allowed there, so a transit is still seen.
export const BRAKE = 0.45; // Screens over which the wheel slows into a caption, or speeds up leaving one.
export const DETENT_REST = 0.35; // Seconds a caption always holds the wheel once the page stops on it.
export const DETENT_MAX = 1.2; // Seconds it may hold a push that keeps coming, like a trackpad's coast.
export const DETENT_PAUSE = 0.14; // Seconds without wheel input that end a push.
export const TOUR_SECONDS = 40; // The tour, top to footer, stops included.
export const TOUR_READ = 0.55; // The share of it spent stopped on copy. The rest is scrolling.
export const TOUR_WORDS = 12; // Added to every stop's word count, so a short heading still gets a moment.
export const TOUR_START = 0.6; // Seconds before it moves off copy the visitor is already looking at.
export const TOUR_WAIT = 4; // Seconds it may wait at a stop for the next scene to finish building.

const PACE_SAMPLES = 8192;
const smoothstep = (u) => u * u * (3 - 2 * u);
/* One push of a wheel: off quickly, then a long soft landing. Speed peaks a third of the way. */
const flick = (u) => u * u * (6 - 8 * u + 3 * u * u);

/**
 * The wheel's pacing over the page. zones are [from, to] stretches of scroll where
 * copy is showing; down and up are where the wheel stops, in each direction, so
 * that the caption is fully shown. Without zones it paces nothing: speed 1, no stops.
 */
export function createPacer() {
  let docH = 0;
  let step = 1;
  let effort = null; // Effort to reach each sample: scroll y divided by the speed there.
  let speeds = null;
  let down = [];
  let up = [];

  const sampleAt = (y) => Math.min(PACE_SAMPLES - 1, Math.max(0, y / step));

  return {
    bake({ zones, down: downStops = [], up: upStops = [] }, height, screen) {
      docH = Math.max(1, height);
      step = docH / (PACE_SAMPLES - 1);
      effort = new Float64Array(PACE_SAMPLES);
      speeds = new Float32Array(PACE_SAMPLES);
      const brake = BRAKE * screen;
      for (let i = 0; i < PACE_SAMPLES; i += 1) {
        const y = i * step;
        let distance = Infinity;
        for (const [from, to] of zones) {
          distance = Math.min(distance, y < from ? from - y : y > to ? y - to : 0);
        }
        speeds[i] = 1 + (EMPTY_SPEED - 1) * smoothstep(Math.min(1, distance / brake));
        if (i > 0) {
          effort[i] = effort[i - 1] + (step * 2) / (speeds[i - 1] + speeds[i]);
        }
      }
      /* Whole pixels, because that is where the page comes to rest. */
      down = downStops.map(Math.round).sort((a, b) => a - b);
      up = upStops.map(Math.round).sort((a, b) => b - a);
    },
    /** How fast the wheel moves the page at y, from 1 (copy) to EMPTY_SPEED. */
    speed(y) {
      return speeds ? speeds[Math.round(sampleAt(y))] : 1;
    },
    toEffort(y) {
      if (!effort) {
        return y;
      }
      const f = sampleAt(y);
      const i = Math.min(PACE_SAMPLES - 2, Math.floor(f));
      const beyond = Math.max(0, y - docH) + Math.min(0, y);
      return effort[i] + (effort[i + 1] - effort[i]) * (f - i) + beyond;
    },
    fromEffort(e) {
      if (!effort) {
        return e;
      }
      const last = effort[PACE_SAMPLES - 1];
      if (e <= 0 || e >= last) {
        return e <= 0 ? e : docH + (e - last);
      }
      let low = 0;
      let high = PACE_SAMPLES - 1;
      while (high - low > 1) {
        const mid = (low + high) >> 1;
        if (effort[mid] <= e) {
          low = mid;
        } else {
          high = mid;
        }
      }
      return (low + (e - effort[low]) / (effort[high] - effort[low])) * step;
    },
    /** The first stop strictly past from and not past to, in the direction of travel. */
    stop(from, to) {
      if (to > from) {
        return down.find((y) => y > from + 0.5 && y <= to) ?? null;
      }
      return up.find((y) => y < from - 0.5 && y >= to) ?? null;
    },
  };
}

/**
 * The tour: the page scrolls itself the way a person would, from one piece of copy to
 * the next, stopping on each for as long as its words take to read. Moves are timed in
 * the pacer's effort, so like the wheel it goes slowly over copy and quickly across
 * the empty stretches. From the top to the last stop it takes `seconds`.
 */
export function createTour(pacer = createPacer()) {
  let stops = []; // { y, read }: page order. The last is where it ends.
  let perEffort = 0; // Seconds of scrolling per pixel of effort.
  let next = 0; // The stop it is heading for.
  let phase = "hold";
  let clock = 0;
  let length = 0;
  let from = 0;
  let to = 0;
  let at = 0;

  return {
    playing: false,
    get stops() {
      return stops;
    },
    /** list is { y, words } per stop, in any order. */
    plan(list, seconds = TOUR_SECONDS) {
      stops = [];
      for (const stop of [...list].sort((a, b) => a.y - b.y)) {
        const y = Math.max(0, Math.round(stop.y));
        const last = stops.at(-1);
        if (last && y - last.y < 3) {
          last.words = Math.max(last.words, stop.words);
        } else {
          stops.push({ y, words: stop.words, read: 0 });
        }
      }
      if (stops.length < 2) {
        perEffort = 0;
        return;
      }
      const read = seconds * TOUR_READ;
      const weight = stops.slice(0, -1).reduce((sum, stop) => sum + stop.words + TOUR_WORDS, 0);
      stops.forEach((stop, index) => {
        stop.read = index < stops.length - 1 ? (read * (stop.words + TOUR_WORDS)) / weight : 0;
      });
      const effort = pacer.toEffort(stops.at(-1).y) - pacer.toEffort(stops[0].y);
      perEffort = effort > 0 ? (seconds - read) / effort : 0;
    },
    /** Starts from y. fresh: nobody has had time to read the copy there yet. At the end it starts again from the top. */
    start(y, fresh = false) {
      if (stops.length < 2) {
        return;
      }
      this.playing = true;
      phase = "hold";
      clock = 0;
      next = stops.findIndex((stop) => stop.y > y + 2);
      if (next === -1) {
        next = 1;
        y = stops[0].y;
        fresh = true;
      }
      const here = next > 0 && y - stops[next - 1].y <= 2 ? stops[next - 1] : null;
      if (here) {
        at = here.y;
        length = fresh ? here.read + TOUR_START : Math.min(TOUR_START, here.read);
      } else {
        at = y;
        length = TOUR_START;
      }
    },
    stop() {
      this.playing = false;
    },
    /** Returns where the page should be. ready(from, to) says whether that stretch is built. */
    step(dt, ready = () => true) {
      if (!this.playing) {
        return at;
      }
      clock += dt;
      if (phase === "hold") {
        if (clock < length || (clock < length + TOUR_WAIT && !ready(at, stops[next].y))) {
          return at;
        }
        from = pacer.toEffort(at);
        to = pacer.toEffort(stops[next].y);
        phase = "move";
        clock = 0;
        length = Math.max(0.3, (to - from) * perEffort);
      }
      const u = Math.min(1, clock / length);
      at = pacer.fromEffort(from + (to - from) * flick(u));
      if (u >= 1) {
        at = stops[next].y;
        if (next === stops.length - 1) {
          this.playing = false;
        } else {
          phase = "hold";
          clock = 0;
          length = stops[next].read;
          next += 1;
        }
      }
      return at;
    },
  };
}

/** The film's y. A second-order smooth damp with a speed limit. Allocation-free. */
export function createFollower(start = 0) {
  return {
    y: start,
    v: 0,
    /** boost lets the film keep up where the wheel is running fast. */
    step(target, dt, screen, boost = 1) {
      const omega = 2 / SMOOTH_TIME;
      const x = omega * dt;
      const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
      const reach = FILM_CRUISE * Math.min(boost, EMPTY_CRUISE) * screen * SMOOTH_TIME;
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

/**
 * The page's position while the wheel is driving it. The wheel's input queues up in
 * effort, which the pacer turns into scroll: the same notch goes further across an
 * empty stretch than through copy.
 */
export function createWheelPage(pacer = createPacer()) {
  return {
    on: false,
    at: 0, // Scroll y.
    aim: 0, // Scroll y the wheel has asked for.
    written: 0,
    rest: null, // { y, dir, since, last }: the caption the page has just stopped on.
    input(deltaY, deltaMode, from, screen, max, now = 0) {
      if (!this.on) {
        this.on = true;
        this.at = from;
        this.aim = from;
        this.written = from;
      }
      /* Some browsers report lines or pages rather than pixels. */
      const unit = deltaMode === 1 ? 40 : deltaMode === 2 ? screen : 1;
      const delta = clamp(deltaY * unit, -WHEEL_EVENT, WHEEL_EVENT);
      /* Just stopped on a caption: the rest of the same push is spent there. A new
         push, after a pause, carries on. */
      const rest = this.rest;
      if (rest && Math.sign(delta) === rest.dir && Math.abs(this.at - rest.y) < 2) {
        const held = now - rest.since;
        if (held < DETENT_REST * 1000 || (held < DETENT_MAX * 1000 && now - rest.last < DETENT_PAUSE * 1000)) {
          rest.last = now;
          this.aim = this.at;
          return;
        }
      }
      this.rest = null;
      /* Changing direction cancels whatever was still queued the other way. */
      const base =
        Math.sign(delta) === -Math.sign(this.aim - this.at)
          ? this.at
          : this.aim;
      const queue = WHEEL_QUEUE * screen;
      const at = pacer.toEffort(this.at);
      const aim = clamp(pacer.toEffort(base) + delta, at - queue, at + queue);
      let next = clamp(pacer.fromEffort(aim), 0, max);
      /* Never past a caption the page has not yet stopped on. */
      const stop = pacer.stop(this.at, next);
      if (stop !== null) {
        next = stop;
      }
      this.aim = next;
    },
    /** Returns where the page should be now. native is where the browser says it is. */
    step(native, dt, screen, now = 0) {
      if (!this.on) {
        return native;
      }
      /* The scrollbar, the keyboard, an anchor or find-in-page moved it: hand it back. */
      if (Math.abs(native - this.written) > 2) {
        this.on = false;
        this.rest = null;
        return native;
      }
      const at = pacer.toEffort(this.at);
      const eased = pacer.fromEffort(at + (pacer.toEffort(this.aim) - at) * (1 - Math.exp(-WHEEL_EASE * dt)));
      const limit = PAGE_CRUISE * Math.min(pacer.speed(this.at), EMPTY_CRUISE) * screen * dt;
      this.at += clamp(eased - this.at, -limit, limit);
      if (Math.abs(this.aim - this.at) < 0.5) {
        const dir = Math.sign(this.aim - this.written);
        this.at = this.aim;
        this.on = false;
        if (pacer.stop(this.aim - dir * 3, this.aim) === this.aim) {
          this.rest = { y: this.aim, dir, since: now, last: now };
        }
      }
      this.written = Math.round(this.at);
      return this.written;
    },
  };
}
