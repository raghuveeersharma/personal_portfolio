import PropTypes from "prop-types";
import ICONS from "./icons.js";

// Semi-transparent variants of the node's own colour, used for the
// "already visited" state so a hop that has been passed reads as warm
// but no longer current.
const DIM = "99"; // ~60% alpha
const FAINT = "66"; // ~40% alpha
const RESTING = "#2A2A3F";

/**
 * One hop in the request journey. Purely presentational — which of
 * the four states it is in is decided by JourneyVisualizer.
 */
const JourneyNode = ({ node, isActive, isVisited, isSelected, onClick }) => {
  const Icon = ICONS[node.icon];
  const lit = isActive || isSelected;

  const iconColor = lit
    ? node.color
    : isVisited
      ? node.color + DIM
      : RESTING;

  return (
    <div className="relative z-[2] flex items-center gap-3 sm:flex-col sm:gap-0">
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
            style={{ border: `1.5px solid ${node.color}` }}
          />
        )}

        <button
          type="button"
          onClick={onClick}
          aria-pressed={isSelected}
          aria-label={`${node.label} — ${node.layer}`}
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl transition-[background-color,border-color,transform,box-shadow] duration-300 hover:scale-105"
          style={{
            background: lit || isVisited ? node.bg : "#111118",
            border: `${isSelected ? 1.5 : 0.5}px solid ${
              lit ? node.border : isVisited ? node.border + FAINT : "#1E1E2E"
            }`,
            boxShadow: isSelected ? `0 0 0 3px ${node.color}33` : "none",
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
            style={{ color: lit ? node.color + DIM : RESTING }}
          >
            {node.layer}
          </span>
        </button>
      </div>

      <span
        className="font-sans text-[10px] transition-colors duration-300 sm:mt-2 sm:block"
        style={{
          color: lit ? node.color : isVisited ? node.color + DIM : "#7a7a9c",
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
