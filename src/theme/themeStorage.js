import { FALLBACK_RESOLVED, STORAGE_KEY, THEMES } from "./themeContext";

const LIGHT_QUERY = "(prefers-color-scheme: light)";

/* Every `localStorage` access in this module is wrapped: it throws
   outright in Safari's private mode and in any browser configured to
   block site data. A visitor who cannot persist a choice should still
   get a working toggle for the session, not a blank page. */

export const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(stored) ? stored : null;
  } catch {
    return null;
  }
};

export const writeStoredTheme = (theme) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Session-only preference. Nothing to recover. */
  }
};

/* The one place that reads the colour-scheme media query, mirroring
   the single-reader rule `useReducedMotion` follows for
   `prefers-reduced-motion`. */
const lightMediaQuery = () =>
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia(LIGHT_QUERY)
    : null;

export const prefersLight = () => lightMediaQuery()?.matches ?? false;

export const systemTheme = () => (prefersLight() ? "light" : FALLBACK_RESOLVED);

/**
 * Subscribe to OS-level colour-scheme changes.
 *
 * @param {(theme: "light" | "dark") => void} onChange
 * @returns {() => void} unsubscribe
 */
export const subscribeSystemTheme = (onChange) => {
  const mq = lightMediaQuery();
  if (!mq) return () => {};

  const handler = (event) => onChange(event.matches ? "light" : "dark");
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
};

const TRANSITION_CLASS = "theme-switching";
/* Must outlast the 220ms transition in theme.css part 6; a little
   slack so the class is never pulled mid-fade. */
const TRANSITION_MS = 300;

let transitionTimer = null;

/**
 * Arm the colour cross-fade for one swap, then disarm it.
 *
 * The class is deliberately transient. Leaving it on would put a
 * zero-specificity `transition-property` on almost every element for
 * the life of the page, which is the sort of thing that turns up
 * later as "why does this one hover feel wrong".
 *
 * Re-entrant on purpose: cycling the toggle quickly just extends the
 * window rather than stacking timers.
 */
export const beginThemeTransition = () => {
  const root = document.documentElement;
  root.classList.add(TRANSITION_CLASS);

  window.clearTimeout(transitionTimer);
  transitionTimer = window.setTimeout(() => {
    root.classList.remove(TRANSITION_CLASS);
  }, TRANSITION_MS);
};

/**
 * Push the resolved theme at the document.
 *
 * `system` removes the attribute rather than writing the resolved
 * value, so the CSS `prefers-color-scheme` block stays in control and
 * the page keeps following the OS without JS having to re-run.
 *
 * `theme-color` is read back out of the cascade instead of being
 * duplicated here, so `theme.css` remains the only place a ground
 * colour is written down.
 */
export const applyTheme = (theme) => {
  const root = document.documentElement;

  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }

  const ground = getComputedStyle(root).getPropertyValue("--bg-base").trim();
  if (ground) {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", ground);
  }
};
