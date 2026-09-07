import PropTypes from "prop-types";
import ICONS from "./icons.js";

/* Semi-transparent variants of the node's own colour, used for the
   "already visited" state so a hop that has been passed reads as warm
   but no longer current.

   These were `node.color + "99"` — string-concatenated hex alpha,
   which only works on a literal. The colour is now `--brand-ink`, a
   variable that differs per theme, so the alpha has to be applied by
   the engine instead. Same resulting values in dark: "99" is 60%,
   "66" is 40%, "33" is 20%. */
const DIM = (c) => `color-mix(in srgb, ${c} 60%, transparent)`;
const FAINT = (c) => `color-mix(in srgb, ${c} 40%, transparent)`;
const RING = (c) => `color-mix(in srgb, ${c} 20%, transparent)`;

const INK = "var(--brand-ink)";
const EDGE = "var(--brand-edge)";

/**
 * One hop in the request journey. Purely presentational — which of
 * the four states it is in is decided by JourneyVisualizer.
 */
const JourneyNode = ({ node, isActive, isVisited, isSelected, onClick }) => {
  const Icon = ICONS[node.icon];
  const lit = isActive || isSelected;

  const iconColor = lit
    ? INK
    : isVisited
      ? DIM(INK)
      : "var(--border)";

  return (
    /* The whole node is one brand-hue scope: the inputs are declared
       here as custom properties and every colour below reads the
       resolved --brand-* values, so nothing needs to know which theme
       is active. See the .brand-hue contract in styles/theme.css. */
    <div
      className="brand-hue relative z-[2] flex items-center gap-3 sm:flex-col sm:gap-0"
      style={{
        "--brand-color": node.color,
        "--brand-bg": node.bg,
        "--brand-border": node.border,
      }}
    >
      <div
        className="relative shrink-0"
        style={{ width: "var(--node-size)", height: "var(--node-size)" }}
      >
        {/* Keyed on the node id so re-selecting a different node
            remounts the ring and the one-shot animation replays. */}
        {isSelected && (
          <span
            key={`ring-${node.id}`}
            aria-hidden="true"
            className="journey-ripple pointer-events-none absolute -inset-1 rounded-2xl"
            style={{ border: `1.5px solid ${EDGE}` }}
          />
        )}

        <button
          type="button"
          onClick={onClick}
          aria-pressed={isSelected}
          aria-label={`${node.label} — ${node.layer}`}
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl transition-[background-color,border-color,transform,box-shadow] duration-300 hover:scale-105"
          style={{
            background:
              lit || isVisited ? "var(--brand-surface)" : "var(--surface)",
            border: `${isSelected ? 1.5 : 0.5}px solid ${
              lit
                ? "var(--brand-line)"
                : isVisited
                  ? FAINT("var(--brand-line)")
                  : "var(--border-subtle)"
            }`,
            boxShadow: isSelected ? `0 0 0 3px ${RING(EDGE)}` : "none",
          }}
        >
          <Icon
            size={20}
            color={iconColor}
            style={{ transition: "color 300ms ease" }}
            aria-hidden="true"
          />
          <span
            className="font-sans text-[9px] tracking-[0.04em] transition-colors duration-300"
            style={{ color: lit ? DIM(INK) : "var(--border)" }}
          >
            {node.layer}
          </span>
        </button>
      </div>

      <span
        className="font-sans text-[10px] transition-colors duration-300 sm:mt-2 sm:block"
        style={{
          color: lit ? INK : isVisited ? DIM(INK) : "var(--hero-muted)",
          fontWeight: lit ? 500 : 400,
        }}
      >
        {node.label}
      </span>
    </div>
  );
};

JourneyNode.propTypes = {
  node: PropTypes.object.isRequired,
  /** The packet is at this node right now. */
  isActive: PropTypes.bool,
  /** The packet has already been through this node on this pass. */
  isVisited: PropTypes.bool,
  /** Its detail panel is open. */
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default JourneyNode;
