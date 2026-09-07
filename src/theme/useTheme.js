import { useContext } from "react";
import { ThemeContext } from "./themeContext";

/**
 * @returns {{
 *   theme: "system" | "light" | "dark",   // the stored preference
 *   resolvedTheme: "light" | "dark",      // what is actually rendering
 *   setTheme: (theme: string) => void,
 *   cycleTheme: () => void,
 * }}
 *
 * Read `theme` to render the control (it has to show `system` as a
 * distinct state); read `resolvedTheme` when the answer decides what
 * gets drawn — picking a light or dark image, say. Colour should be
 * coming from tokens, so needing `resolvedTheme` for a colour is a
 * sign a token is missing.
 */
const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }

  return context;
};

export default useTheme;
