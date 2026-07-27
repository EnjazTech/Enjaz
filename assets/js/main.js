/**
 * ENJAZ — interface behaviour.
 *
 * Loaded as a deferred module. Everything here is progressive enhancement:
 * the page is complete and readable with scripting disabled.
 */

"use strict";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)");
const COARSE_POINTER = window.matchMedia("(pointer: coarse), (max-width: 48rem)");
const MOBILE_NAV = window.matchMedia("(max-width: 56.25rem)");

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

  if (REDUCED_MOTION.matches || !("IntersectionObserver" in window)) {
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

  window.setInterval(() => {
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
  }, TICK_MS);
}

/* --------------------------------------------------------------------------
   Pointer glow
   -------------------------------------------------------------------------- */

function initCursorGlow() {
  const glow = document.querySelector("[data-cursor-glow]");

  if (!glow || COARSE_POINTER.matches || REDUCED_MOTION.matches) {
    return;
  }

  let x = 0;
  let y = 0;
  let queued = false;

  const paint = () => {
    glow.style.transform = `translate(${x}px, ${y}px)`;
    glow.style.opacity = "1";
    queued = false;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(paint);
      }
    },
    { passive: true }
  );

  document.addEventListener("pointerleave", () => {
    glow.style.opacity = "0";
  });
}

/* --------------------------------------------------------------------------
   Particle constellation
   -------------------------------------------------------------------------- */

function initParticles() {
  const canvas = document.querySelector("[data-particles]");

  if (!canvas || COARSE_POINTER.matches || REDUCED_MOTION.matches) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const MAX_POINTS = 90;
  const LINK_DISTANCE_SQ = 16000;
  const DENSITY_DIVISOR = 18000;

  let width = 0;
  let height = 0;
  let ratio = 1;
  let points = [];
  let frame = 0;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.min(MAX_POINTS, Math.floor((width * height) / DENSITY_DIVISOR));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(93, 255, 222, 0.5)";

    for (const point of points) {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0 || point.x > width) {
        point.vx *= -1;
      }
      if (point.y < 0 || point.y > height) {
        point.vy *= -1;
      }

      context.beginPath();
      context.arc(point.x, point.y, 1.2, 0, Math.PI * 2);
      context.fill();
    }

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < LINK_DISTANCE_SQ) {
          const alpha = 0.14 * (1 - distanceSq / LINK_DISTANCE_SQ);
          context.strokeStyle = `rgba(164, 139, 255, ${alpha.toFixed(3)})`;
          context.beginPath();
          context.moveTo(points[i].x, points[i].y);
          context.lineTo(points[j].x, points[j].y);
          context.stroke();
        }
      }
    }

    frame = window.requestAnimationFrame(draw);
  };

  const start = () => {
    if (!frame) {
      frame = window.requestAnimationFrame(draw);
    }
  };

  const stop = () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
  };

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 150);
  });

  /* Don't burn cycles on a backgrounded tab. */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  resize();
  start();
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
initCursorGlow();
initParticles();
initCurrentYear();
