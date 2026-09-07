import { createContext } from "react";

/* The stored preference has three values, not two. `system` is the
   default and means "no opinion" — it deliberately writes no
   `data-theme` attribute, leaving `prefers-color-scheme` in charge.
   A two-position toggle would have to pick a side on the visitor's
   behalf and lose the ability to follow their OS. */
export const THEMES = ["system", "light", "dark"];

export const STORAGE_KEY = "portfolio-theme";

/* Dark is the fallback everywhere: it is what the site is, what the
   no-JS and no-storage paths render, and what `:root` declares. */
export const DEFAULT_THEME = "system";
export const FALLBACK_RESOLVED = "dark";

export const ThemeContext = createContext(null);
