/**
 * Locale routing for ENJAZ.
 *
 * Loaded synchronously in <head> so a redirect happens before first paint.
 * Content itself is not translated at runtime — each language is a real,
 * crawlable document (`/` for Arabic, the default; `/en/` for English). This
 * script only decides which of those the visitor should be looking at:
 *
 *   1. `?lang=xx` in the URL wins and is remembered.
 *   2. Otherwise a previously remembered choice wins (localStorage, then a
 *      same-value cookie the edge redirect in vercel.json also reads).
 *   3. Otherwise the device language (navigator.languages) decides, once.
 *
 * Search engines are told about both documents via hreflang, so the redirect
 * never hides content from a crawler.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "enjaz:lang";
  var COOKIE_KEY = "enjaz_lang";
  var COOKIE_MAX_AGE = 60 * 60 * 24 * 365; /* one year, in seconds */
  var DEFAULT_LANG = "ar";
  var SUPPORTED = ["ar", "en"];

  /* Path prefix for each non-default language. The default language (ar)
   * lives at the bare root and has no prefix of its own. */
  var PREFIXES = { en: "/en" };

  var root = document.documentElement;

  /*
   * Mark scripting as available. Runs in <head> before first paint, so
   * scroll-reveal can hide content with no flash — and if this file never
   * executes, the class is absent and everything stays visible.
   */
  root.classList.add("js");

  /** @returns {string} the language this document is authored in. */
  function currentLang() {
    return (root.getAttribute("lang") || DEFAULT_LANG).slice(0, 2).toLowerCase();
  }

  function isSupported(lang) {
    return SUPPORTED.indexOf(lang) !== -1;
  }

  function readStored() {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      return isSupported(value) ? value : null;
    } catch (error) {
      return null; /* Private mode / storage disabled. */
    }
  }

  /*
   * Persist to localStorage *and* a cookie. The cookie is what lets an
   * edge/CDN redirect (see vercel.json) know about an explicit choice: without
   * it, Accept-Language alone would bounce a non-Arabic-locale device back to
   * / on every visit even after the visitor picked English, costing a visible
   * double redirect. Read by the edge, written only here.
   */
  function writeStored(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* Non-fatal: the visitor simply gets detection again next time. */
    }

    try {
      document.cookie =
        COOKIE_KEY +
        "=" +
        lang +
        ";path=/;max-age=" +
        COOKIE_MAX_AGE +
        ";samesite=lax";
    } catch (error) {
      /* Non-fatal. */
    }
  }

  /** Cookie value wins over localStorage only when storage is unavailable. */
  function readCookie() {
    var match = new RegExp("(?:^|; )" + COOKIE_KEY + "=([a-z]{2})").exec(
      document.cookie || ""
    );
    return match && isSupported(match[1]) ? match[1] : null;
  }

  /** First supported language in the device's ordered preference list. */
  function detectLang() {
    var tags = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];

    for (var i = 0; i < tags.length; i += 1) {
      var base = String(tags[i]).toLowerCase().split("-")[0];
      if (isSupported(base)) {
        return base;
      }
    }
    return null;
  }

  /** Strips any known locale prefix, returning the bare, locale-less path. */
  function bareePath() {
    var path = window.location.pathname;
    for (var lang in PREFIXES) {
      if (Object.prototype.hasOwnProperty.call(PREFIXES, lang)) {
        var prefix = PREFIXES[lang];
        if (path === prefix || path.indexOf(prefix + "/") === 0) {
          var rest = path.slice(prefix.length);
          return rest === "" ? "/" : rest;
        }
      }
    }
    return path || "/";
  }

  /** Maps the current path onto its equivalent in `lang`. */
  function pathFor(lang) {
    var bare = bareePath();
    var prefix = PREFIXES[lang];
    if (!prefix) {
      return bare; /* default language: no prefix */
    }
    return prefix + (bare === "/" ? "/" : bare);
  }

  function requestedLang() {
    var match = /[?&]lang=([a-z-]{2,5})/i.exec(window.location.search);
    if (!match) {
      return null;
    }
    var lang = match[1].toLowerCase().split("-")[0];
    return isSupported(lang) ? lang : null;
  }

  var current = currentLang();
  var explicit = requestedLang();
  var stored = readStored() || readCookie();

  /*
   * Device detection only ever applies to the default-language document
   * (the x-default URL, "/"). Someone who landed on /en/ — from search, a
   * shared link, or the toggle — asked for English, and must not be bounced
   * out of it.
   */
  var detected = current === DEFAULT_LANG ? detectLang() : null;
  var target = explicit || stored || detected;

  if (explicit) {
    writeStored(explicit);
  }

  if (target && target !== current) {
    window.location.replace(pathFor(target) + window.location.hash);
    return;
  }

  /* Same document, but strip the now-redundant query string. */
  if (explicit && window.history.replaceState) {
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.hash
    );
  }

  /* Remember an explicit switch made from the language toggle. */
  document.addEventListener(
    "click",
    function (event) {
      var link = event.target.closest && event.target.closest("[data-lang-switch]");
      if (!link) {
        return;
      }
      var lang = link.getAttribute("data-lang-switch");
      if (isSupported(lang)) {
        writeStored(lang);
      }
    },
    true
  );
})();
