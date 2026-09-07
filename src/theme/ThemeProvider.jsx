import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  DEFAULT_THEME,
  THEMES,
  ThemeContext,
  FALLBACK_RESOLVED,
} from "./themeContext";
import {
  applyTheme,
  readStoredTheme,
  subscribeSystemTheme,
  systemTheme,
  writeStoredTheme,
} from "./themeStorage";

/**
 * Owns the theme preference and nothing else — no colour values live
 * here, only which of the three states is active. The values are all
 * in `src/styles/theme.css`.
 *
 * Both pieces of state are read synchronously in the `useState`
 * initialiser rather than in an effect. That is the opposite of
 * `useReducedMotion`, on purpose: the blocking script in `index.html`
 * has already stamped `data-theme` before this component mounts, so
 * the DOM is authoritative and deferring the read to an effect would
 * make React's first render disagree with what the visitor is already
 * looking at. There is no server render to match.
 */
const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(
    () => readStoredTheme() ?? DEFAULT_THEME,
  );
  const [resolvedSystem, setResolvedSystem] = useState(() =>
    typeof window === "undefined" ? FALLBACK_RESOLVED : systemTheme(),
  );

  const resolvedTheme = theme === "system" ? resolvedSystem : theme;

  /* Only meaningful while the preference is `system`, but the
     subscription is unconditional: the OS can change underneath an
     explicit choice, and we want `resolvedSystem` already correct if
     the visitor switches back to `system` afterwards. */
  useEffect(() => subscribeSystemTheme(setResolvedSystem), []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (!THEMES.includes(next)) return;
    setThemeState(next);
    writeStoredTheme(next);
  }, []);

  /* system -> light -> dark -> system. The cycle keeps `system`
     reachable, which a binary switch cannot do. */
  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
      writeStoredTheme(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, cycleTheme }),
    [theme, resolvedTheme, setTheme, cycleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeProvider;
