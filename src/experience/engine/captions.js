/**
 * Copy stays where it pins and swaps in place, the way titles do in a film, so the
 * site never reads as a page going past. Each caption fades, unblurs and slides in
 * over a short stretch of scroll, in reading order, and reverses out.
 *
 * It follows the page rather than the film, because the page is what you are reading.
 * If you stop part way through a swap the caption finishes appearing, so nothing is
 * ever left half-faded: find-in-page and PageDown both land in these stretches.
 *
 * Two captions in a row share the stretch between them, so the film never shows a
 * screen with no copy on it. Swapping in place, the first leaves over its first half
 * and the next arrives over the second, so they are never on top of each other. On
 * touch they scroll, so the first stays until the next has scrolled fully into view.
 */

export const ZONE = 0.35; // Screens of scroll each swap takes.
const ZONE_MAX = 0.5; // The most a swap stretches to, to meet the caption next to it.
const IN_PLACE = 0.85; // How much of its travel through a swap a caption cancels.
const SLIDE = 1.1; // em.
const BLUR = 0.28; // em.
const STAGGER = 0.14;
const SCRIM_FIRST = 0.55; // The scrim is there before the words are.
const REST_AFTER = 0.25; // Seconds of stillness before a stopped caption finishes appearing.
/* The hero hands over to the paper strip, which has words of its own, so it must be
   gone by the time the strip fills the frame: the drop's first knot (shots/metas.js). */
const HERO_OUT = 0.18;
const HERO_MIN = 0.6; // Of a ZONE: the shortest the hero takes to leave.
const HERO_BACK = 0.3; // Stopped this little way into leaving, the hero comes back; past it, it goes.
/* Where the strip fills the frame with words of its own: the drop's knots at 0.18 and
   0.48 (shots/metas.js), kept clear of the camera's ease either side. */
const STRIP = [0.24, 0.45];

const clamp01 = (value) => Math.min(1, Math.max(0, value));

export function createCaptions({ inPlace, blur }) {
  let items = [];
  let strip = null;
  let bottom = Infinity;
  let lastPos = NaN;
  let still = 0;
  let rest = 0;

  function clear(item) {
    item.el.style.opacity = "";
    item.el.style.transform = "";
    item.el.classList.remove("is-gone");
    for (const kid of item.kids) {
      kid.style.opacity = "";
      kid.style.transform = "";
      kid.style.filter = "";
    }
  }

  function write(item, shown, shift, leaving) {
    const gone = shown < 0.5;
    if (gone !== item.gone) {
      item.gone = gone;
      item.el.classList.toggle("is-gone", gone);
      /* main.js: a button nobody can see must not hide the WhatsApp dock. */
      document.dispatchEvent(new CustomEvent("enjaz:captions"));
    }
    if (shown === 1 && shift === 0) {
      clear(item);
      return;
    }
    item.el.style.opacity = clamp01(shown / SCRIM_FIRST).toFixed(3);
    item.el.style.transform = shift ? `translate3d(0, ${shift.toFixed(1)}px, 0)` : "";
    const count = item.kids.length;
    const stagger = count > 1 ? Math.min(STAGGER, 0.5 / (count - 1)) : 0;
    const span = 1 - (count - 1) * stagger;
    item.kids.forEach((kid, index) => {
      const t = clamp01((shown - index * stagger) / span);
      if (t === 1) {
        kid.style.opacity = "";
        kid.style.transform = "";
        kid.style.filter = "";
        return;
      }
      const left = 1 - t;
      kid.style.opacity = t.toFixed(3);
      kid.style.transform = `translate3d(0, ${(left * left * left * SLIDE * (leaving ? -1 : 1)).toFixed(3)}em, 0)`;
      if (blur) {
        kid.style.filter = `blur(${(left * BLUR).toFixed(3)}em)`;
      }
    });
  }

  return {
    bake(layout) {
      const zone = ZONE * layout.svh;
      items = [];
      for (const [id, shot] of Object.entries(layout.shots)) {
        /* Too tall to swap in place, as at 200% text: it stays plain scrolling copy. */
        if (!shot.caption || shot.caption.h > layout.svh * 0.7) {
          continue;
        }
        const el = document.querySelector(`[data-shot="${id}"] > .shot`);
        if (el) {
          items.push({
            el,
            kids: [...el.children],
            /* The hero is already there when the page opens, so it only ever leaves. */
            a: id === "hero" ? -1 : shot.pinStart - zone,
            s: id === "hero" ? -1 : shot.pinStart,
            e: shot.pinEnd,
            b: shot.pinEnd + zone,
            unpin: shot.pinEnd,
            hero: id === "hero",
            pin: shot.pin ?? 0,
            h: shot.caption.h,
            shown: -1,
            shift: 0,
            gone: false,
          });
        }
      }
      /* Neighbours share the stretch between them. In place they meet in the middle.
         Scrolling, the next one is fully in view its pin short of where it stops. */
      const most = ZONE_MAX * layout.svh;
      strip = null;
      bottom = layout.docH - layout.svh;
      for (let i = 1; i < items.length; i += 1) {
        const before = items[i - 1];
        const after = items[i];
        const stretch = after.s - before.e;
        if (stretch <= 0) {
          continue;
        }
        if (inPlace) {
          const half = Math.min(most, stretch / 2);
          before.b = before.e + half;
          after.a = after.s - half;
        } else {
          before.b = before.e + Math.min(most, Math.max(zone, stretch - after.pin));
        }
        /* The hero leaves before the strip arrives, starting while still pinned if it must. */
        if (before.hero) {
          before.b = before.unpin + stretch * HERO_OUT;
          before.e = Math.min(before.unpin, before.b - zone * HERO_MIN);
          strip = STRIP.map((t) => before.unpin + stretch * t);
        }
      }
      lastPos = NaN;
    },

    update(pos, dt) {
      still = pos === lastPos ? still + dt : 0;
      lastPos = pos;
      rest = still > REST_AFTER ? Math.min(1, rest + dt / 0.4) : Math.max(0, rest - dt / 0.12);

      for (const item of items) {
        const arriving = item.s > item.a ? clamp01((pos - item.a) / (item.s - item.a)) : 1;
        const leaving = clamp01((pos - item.e) / (item.b - item.e));
        const near = pos > item.a && pos < item.b;
        let shown = near ? Math.max(Math.min(arriving, 1 - leaving), rest) : 0;
        /* A stop part way out of the hero finishes whichever way it is nearer, so it is
           never brought back over the strip's own words. */
        if (item.hero && near && leaving > HERO_BACK) {
          shown = Math.min(1 - leaving, 1 - rest);
        }

        let shift = 0;
        if (inPlace && near) {
          /* Only cancels real travel: a caption still pinned is not moving. */
          shift = arriving < 1 ? (pos - item.s) * IN_PLACE : leaving > 0 ? Math.max(0, pos - item.unpin) * IN_PLACE : 0;
        }
        if (shown !== item.shown || shift !== item.shift) {
          item.shown = shown;
          item.shift = shift;
          write(item, shown, shift, leaving > 0);
        }
      }
    },

    /**
     * Where to go when the page has stopped at pos with nothing to read: the nearest
     * place a caption is fully shown, or the strip's own words. null when there is copy.
     */
    settle(pos) {
      if (!items.length || pos >= bottom - 2) {
        return null; // The footer is copy too.
      }
      if (strip && pos >= strip[0] && pos <= strip[1]) {
        return null;
      }
      let best = null;
      let distance = Infinity;
      const consider = (from, to) => {
        const at = Math.min(to, Math.max(from, pos));
        if (Math.abs(at - pos) < distance) {
          distance = Math.abs(at - pos);
          best = at;
        }
      };
      for (const item of items) {
        if (item.hero) {
          const out = item.e + (item.b - item.e) * HERO_BACK;
          if (pos < out) {
            return null;
          }
          consider(0, item.e);
          continue;
        }
        /* A stopped caption finishes appearing in place; one that scrolls must also be
           mostly on screen. */
        const shownFrom = inPlace ? item.a : item.s - item.h * 0.5;
        if (pos > shownFrom && pos < item.b) {
          return null;
        }
        consider(item.s, item.e);
      }
      if (strip) {
        consider(strip[0], strip[1]);
      }
      return best === null ? null : Math.round(best);
    },

    /** Gives every caption back as written. */
    release() {
      for (const item of items) {
        clear(item);
        item.shown = -1;
        item.gone = false;
      }
    },
  };
}
