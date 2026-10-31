/**
 * Copy stays where it pins and swaps in place, the way titles do in a film, so the
 * site never reads as a page going past. Each caption fades, unblurs and slides in
 * over a short stretch of scroll, in reading order, and reverses out.
 *
 * It follows the page rather than the film, because the page is what you are reading.
 * If you stop part way through a swap the caption finishes appearing, so nothing is
 * ever left half-faded: find-in-page and PageDown both land in these stretches.
 */

const ZONE = 0.35; // Screens of scroll each swap takes.
const IN_PLACE = 0.85; // How much of its travel through a swap a caption cancels.
const SLIDE = 1.1; // em.
const BLUR = 0.28; // em.
const STAGGER = 0.14;
const SCRIM_FIRST = 0.55; // The scrim is there before the words are.
const REST_AFTER = 0.25; // Seconds of stillness before a stopped caption finishes appearing.

const clamp01 = (value) => Math.min(1, Math.max(0, value));

export function createCaptions({ inPlace, blur }) {
  let items = [];
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
            shown: -1,
            shift: 0,
            gone: false,
          });
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
        const shown = near ? Math.max(Math.min(arriving, 1 - leaving), rest) : 0;

        let shift = 0;
        if (inPlace && near) {
          shift = arriving < 1 ? (pos - item.s) * IN_PLACE : leaving > 0 ? (pos - item.e) * IN_PLACE : 0;
        }
        if (shown !== item.shown || shift !== item.shift) {
          item.shown = shown;
          item.shift = shift;
          write(item, shown, shift, leaving > 0);
        }
      }
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
