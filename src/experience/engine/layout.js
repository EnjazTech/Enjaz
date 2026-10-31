/**
 * Layout bake: everything the film needs to know about the page, read once at
 * idle and never per frame. Arabic's taller headings, a longer English caption,
 * 200% zoom and an ultrawide monitor all reach the camera through here.
 */

const probe = (unit) => {
  const element = document.createElement("div");
  element.style.position = "fixed";
  element.style.top = "0";
  element.style.width = "0";
  element.style.visibility = "hidden";
  element.style.height = `100${unit}`;
  document.body.appendChild(element);
  const value = element.getBoundingClientRect().height;
  element.remove();
  return value;
};

const px = (value) => parseFloat(value) || 0;

export function bakeLayout() {
  const svh = probe("svh");
  const lvh = probe("lvh");
  const W = document.documentElement.clientWidth;
  const H = lvh;
  const scrollY = window.scrollY;
  const nav = document.querySelector("[data-nav]");
  const navH = nav ? nav.getBoundingClientRect().height : 0;
  const dir = document.documentElement.dir === "rtl" ? -1 : 1;
  const docH = document.documentElement.scrollHeight;
  const shots = {};

  for (const track of document.querySelectorAll("[data-shot]")) {
    const id = track.dataset.shot;
    const box = track.getBoundingClientRect();
    const top = box.top + scrollY;
    const caption = track.querySelector(":scope > .shot");
    const shot = { id, top, height: box.height, caption: null, pinStart: top, pinEnd: top };

    if (caption) {
      const rect = caption.getBoundingClientRect();
      const trackStyle = getComputedStyle(track);
      const style = getComputedStyle(caption);
      const gap = px(trackStyle.paddingBlockEnd);

      if (id === "hero") {
        /* Hero copy pins to the top rather than the bottom. */
        const topInset = px(style.insetBlockStart);
        const marginEnd = px(style.marginBlockEnd);
        const paddingTop = px(trackStyle.paddingBlockStart);
        shot.pinStart = 0;
        shot.pinEnd = Math.max(0, box.height - paddingTop - rect.height - marginEnd);
        shot.caption = { x: rect.left, y: topInset, w: rect.width, h: rect.height };
      } else {
        const pin = px(style.insetBlockEnd);
        shot.pinStart = top + rect.height + pin - svh;
        shot.pinEnd = shot.pinStart + Math.max(0, box.height - gap - rect.height);
        shot.caption = { x: rect.left, y: svh - pin - rect.height, w: rect.width, h: rect.height };
        shot.pin = pin;
        shot.gap = gap;
      }
    }
    shots[id] = shot;
  }

  return { W, H, svh, lvh, navH, docH, dir, portrait: H >= W, shots };
}

/** Sets up rebaking. On touch, height-only changes are the URL bar: ignore them. */
export function watchLayout(onChange) {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  let lastW = document.documentElement.clientWidth;
  let lastH = document.documentElement.scrollHeight;
  let queued = 0;

  const queue = () => {
    window.clearTimeout(queued);
    queued = window.setTimeout(onChange, 160);
  };

  const observer = new ResizeObserver(() => {
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.scrollHeight;
    if (w === lastW && h === lastH) {
      return;
    }
    const heightOnly = w === lastW;
    lastW = w;
    lastH = h;
    if (!(coarse && heightOnly && Math.abs(h - lastH) < 200)) {
      queue();
    }
  });
  observer.observe(document.documentElement);
  document.fonts?.ready.then(queue);
  document.fonts?.addEventListener?.("loadingdone", queue);

  return () => observer.disconnect();
}
