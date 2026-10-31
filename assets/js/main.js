/**
 * ENJAZ — interface behaviour.
 *
 * Loaded as a deferred module. Everything here is progressive enhancement:
 * the page is complete and readable with scripting disabled. The 3D film is
 * loaded from here, and if it cannot run the page falls back without ever
 * hiding the copy (see src/experience/SPEC.md, section 8).
 */

"use strict";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)");
const MOBILE_NAV = window.matchMedia("(max-width: 56.25rem)");
const ROOT = document.documentElement;

/* --------------------------------------------------------------------------
   Mobile navigation
   -------------------------------------------------------------------------- */

function initNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  if (!toggle || !menu) {
    return;
  }

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("is-nav-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      toggle.getAttribute("aria-expanded") === "true" &&
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setOpen(false);
    }
  });

  /* Leaving the mobile breakpoint must not leave the drawer state behind. */
  MOBILE_NAV.addEventListener("change", (event) => {
    if (!event.matches) {
      setOpen(false);
    }
  });
}

/* --------------------------------------------------------------------------
   Sticky header state
   -------------------------------------------------------------------------- */

function initHeaderScrollState() {
  const nav = document.querySelector("[data-nav]");
  if (!nav) {
    return;
  }

  let queued = false;
  const update = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
    queued = false;
  };

  update();
  window.addEventListener(
    "scroll",
    () => {
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
}

/* --------------------------------------------------------------------------
   Scroll reveal
   -------------------------------------------------------------------------- */

function initReveal() {
  const targets = document.querySelectorAll(".reveal");

  if (!targets.length) {
    return;
  }

  /* The tall layout never hides copy: the film does the arriving. */
  if (
    ROOT.classList.contains("w3d") ||
    REDUCED_MOTION.matches ||
    !("IntersectionObserver" in window)
  ) {
    targets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
  );

  targets.forEach((element) => observer.observe(element));
}

/* --------------------------------------------------------------------------
   Terminal-style typewriter
   -------------------------------------------------------------------------- */

function initTypewriter() {
  const output = document.querySelector("[data-typewriter]");
  if (!output) {
    return;
  }

  let phrases;
  try {
    phrases = JSON.parse(output.getAttribute("data-typewriter") || "[]");
  } catch (error) {
    phrases = [];
  }

  if (!Array.isArray(phrases) || phrases.length === 0) {
    return;
  }

  /* Reduced motion: show the first phrase and stop. */
  if (REDUCED_MOTION.matches) {
    output.textContent = phrases[0];
    return;
  }

  const TICK_MS = 55;
  const HOLD_TICKS = 24;

  let phraseIndex = 0;
  let charCount = 0;
  let deleting = false;
  let hold = 0;
  let timer = 0;

  const tick = () => {
    const phrase = phrases[phraseIndex];

    if (!deleting) {
      charCount += 1;
      if (charCount >= phrase.length) {
        deleting = true;
        hold = HOLD_TICKS;
      }
    } else if (hold > 0) {
      hold -= 1;
    } else {
      charCount -= 1;
      if (charCount <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    output.textContent = phrase.slice(0, charCount);
  };

  /* Only runs while on screen, so the film's frame budget never pays for it. */
  const start = () => {
    if (!timer) {
      timer = window.setInterval(tick, TICK_MS);
    }
  };
  const stop = () => {
    window.clearInterval(timer);
    timer = 0;
  };

  if (!("IntersectionObserver" in window)) {
    start();
    return;
  }

  new IntersectionObserver((entries) => {
    entries.forEach((entry) => (entry.isIntersecting ? start() : stop()));
  }).observe(output.closest(".hero__terminal") || output);
}

/* --------------------------------------------------------------------------
   WhatsApp dock: hidden only while a real WhatsApp button is on screen
   -------------------------------------------------------------------------- */

function initDock() {
  const dock = document.querySelector(".wa-dock");
  if (!dock || !("IntersectionObserver" in window)) {
    return;
  }

  /* Only a button you can actually tap counts: one sliding under the nav does not. */
  const nav = document.querySelector("[data-nav]");
  const navHeight = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;

  const onScreen = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onScreen.add(entry.target);
        } else {
          onScreen.delete(entry.target);
        }
      });
      dock.classList.toggle("is-hidden", onScreen.size > 0);
    },
    { threshold: 0.9, rootMargin: `-${navHeight}px 0px 0px 0px` }
  );

  document
    .querySelectorAll('.hero__actions a[href*="wa.me"], .cta__action')
    .forEach((element) => observer.observe(element));
}

/* --------------------------------------------------------------------------
   Stills
   -------------------------------------------------------------------------- */

const STILL_ZONES = [
  [".hero", "desk"],
  [".ticker", "desk"],
  ["#services", "archive"],
  ["#process", "shaft"],
  [".fall", "aerial"],
  ["#why", "aerial"],
  [".cta", "dawn"],
  ["footer", "dawn"],
];

/* Tall layout: track which still sits behind the viewport's centre line. */
function initStillZones() {
  if (!ROOT.classList.contains("w3d") || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ROOT.setAttribute("data-still", entry.target.dataset.stillZone);
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );

  STILL_ZONES.forEach(([selector, still]) => {
    const element = document.querySelector(selector);
    if (element) {
      element.dataset.stillZone = still;
      observer.observe(element);
    }
  });
}

/* Compact layout: load each zone's still as it comes near. */
function initStills() {
  const zones = document.querySelectorAll(".hero, #services, #process, #why, .cta");

  if (!("IntersectionObserver" in window)) {
    zones.forEach((zone) => zone.classList.add("still-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("still-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: ROOT.classList.contains("save") ? "0px" : "100% 0px" }
  );

  zones.forEach((zone) => observer.observe(zone));
}

/* --------------------------------------------------------------------------
   The film, and how it steps aside
   -------------------------------------------------------------------------- */

/* Before lamp-on: tall tracks with no film are a slog, so go compact. The
 * visitor stays at the same caption, however far the layout moved under them. */
function collapseToStills() {
  if (!ROOT.classList.contains("w3d")) {
    return;
  }

  const middle = window.innerHeight / 2;
  let nearest = null;
  let nearestDistance = Infinity;

  document.querySelectorAll(".shot").forEach((shot) => {
    const box = shot.getBoundingClientRect();
    const distance = Math.abs((box.top + box.bottom) / 2 - middle);
    if (box.height > 0 && distance < nearestDistance) {
      nearest = shot;
      nearestDistance = distance;
    }
  });

  const before = nearest ? nearest.getBoundingClientRect().top : 0;
  ROOT.classList.remove("w3d", "world-on", "world-off");
  ROOT.removeAttribute("data-still");
  ROOT.classList.add("stills");

  if (nearest && window.scrollY >= 4) {
    window.scrollBy({
      top: nearest.getBoundingClientRect().top - before,
      behavior: "instant",
    });
  }

  initStills();
  initReveal();
}

/* After lamp-on the visitor is mid-read: keep the layout, swap in a still. */
function worldOff() {
  ROOT.classList.add("world-off");
}

function initExperience() {
  if (!ROOT.classList.contains("w3d")) {
    return;
  }

  let world = null;

  const load = async () => {
    try {
      const { boot } = await import("/assets/js/experience/boot.js");
      world = await boot({ onFail: collapseToStills, onOff: worldOff });
    } catch (error) {
      collapseToStills();
    }
  };

  const whenIdle = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(load, { timeout: 1500 });
    } else {
      window.setTimeout(load, 400);
    }
  };

  if (document.readyState === "complete") {
    whenIdle();
  } else {
    window.addEventListener("load", whenIdle, { once: true });
  }

  REDUCED_MOTION.addEventListener("change", (event) => {
    if (event.matches) {
      if (world && world.stop) {
        world.stop();
      }
      worldOff();
    }
  });
}

/* --------------------------------------------------------------------------
   Footer year
   -------------------------------------------------------------------------- */

function initCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear().toLocaleString(
      document.documentElement.lang || "en",
      { useGrouping: false }
    );
  });
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */

initNav();
initHeaderScrollState();
initReveal();
initTypewriter();
initDock();
initStillZones();
if (ROOT.classList.contains("stills")) {
  initStills();
}
initExperience();
initCurrentYear();
