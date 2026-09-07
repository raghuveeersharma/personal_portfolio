import PropTypes from "prop-types";
import { TbDeviceDesktop, TbMoon, TbSun } from "react-icons/tb";
import { useTheme } from "../theme";

/* Order matches the cycle in ThemeProvider, so the segmented
   variant and the icon variant present the same sequence. */
const OPTIONS = [
  { value: "system", label: "System", Icon: TbDeviceDesktop },
  { value: "light", label: "Light", Icon: TbSun },
  { value: "dark", label: "Dark", Icon: TbMoon },
];

const nextIn = (theme) =>
  OPTIONS[(OPTIONS.findIndex((o) => o.value === theme) + 1) % OPTIONS.length];

/**
 * Two presentations of one control.
 *
 * `icon` — a single button that cycles. Compact enough for the
 * navbar's icon row, but a bare icon cannot say what it will do, so
 * the accessible name spells out both the current state and the next
 * one.
 *
 * `segmented` — all three states visible at once. Used in the mobile
 * sheet, where there is room and where a cycling icon is genuinely
 * ambiguous: a visitor cannot tell `system` resolving to dark apart
 * from an explicit dark choice.
 */
const ThemeToggle = ({ variant = "icon", className = "" }) => {
  const { theme, resolvedTheme, setTheme, cycleTheme } = useTheme();

  /* Announced rather than shown. `theme` and `resolvedTheme` differ
     only while following the OS, and that difference is exactly what
     a sighted user reads off the icon. */
  const announcement =
    theme === "system"
      ? `Theme: system, currently ${resolvedTheme}`
      : `Theme: ${theme}`;

  if (variant === "segmented") {
    return (
      <div
        role="group"
        aria-label="Theme"
        className={`flex items-center gap-1 rounded-lg border border-border-subtle bg-surface-hover p-1 ${className}`}
      >
        {OPTIONS.map((option) => {
          const Icon = option.Icon;
          const { value, label } = option;
          const selected = theme === value;
          return (
            <button
              key={value}
              type="button"
              /* aria-pressed, not role="radio": a real radiogroup
                 owes the visitor arrow-key navigation, and three
                 toggle buttons carry the same meaning with the
                 keyboard behaviour browsers already give us. */
              aria-pressed={selected}
              onClick={() => setTheme(value)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 font-sans text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text ${
                selected
                  ? "bg-accent text-accent-contrast"
                  : "text-content-muted hover:text-content"
              }`}
            >
              <Icon aria-hidden="true" className="text-base" />
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  const next = nextIn(theme);

  return (
    <>
      <button
        type="button"
        onClick={cycleTheme}
        /* The label describes the *action*, which is what a button's
           name is for; the current state rides along so the control
           is self-describing without the icon. */
        aria-label={`${announcement}. Switch to ${next.label.toLowerCase()}.`}
        title={`${announcement} — switch to ${next.label.toLowerCase()}`}
        className={`grid h-9 w-9 place-items-center rounded-sm text-content transition-colors hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text sm:h-10 sm:w-10 ${className}`}
      >
        {/* One grid cell, three children: they stack without
            absolute positioning, so the button keeps its intrinsic
            size and nothing shifts mid-fade. */}
        <span className="grid">
          {OPTIONS.map((option) => {
            const Icon = option.Icon;
            return (
              <Icon
                key={option.value}
                aria-hidden="true"
                className="theme-toggle__icon text-xl sm:text-2xl"
                data-active={theme === option.value}
              />
            );
          })}
        </span>
      </button>

      {/* Live region outside the button: announcing from inside it
          would re-announce the name on every focus. */}
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </>
  );
};

ThemeToggle.propTypes = {
  variant: PropTypes.oneOf(["icon", "segmented"]),
  className: PropTypes.string,
};

export default ThemeToggle;
