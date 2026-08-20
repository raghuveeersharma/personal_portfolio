import PropTypes from "prop-types";
import SERVICE_ICONS from "./serviceIcons.js";

// Neutral resting palette — matches the MERN journey's inactive state.
const RESTING_FILL = "#0a0918";
const RESTING_BORDER = "#4a3f73";

// Mix a service colour at ~12% over the page background (#050414)
// to get a solid opaque dark tint. The spine runs behind the node,
// so the dot MUST be fully opaque to mask it.
const tintedBg = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c, base) => Math.round(base + (c - base) * 0.12);
  return `rgb(${mix(r, 5)}, ${mix(g, 4)}, ${mix(b, 20)})`;
};

/**
 * One node on the circular service track. Purely presentational —
 * the parent decides which state it's in.
 *
 * Shows the service icon in a round container with optional glow.
 */
const ServiceNode = ({ service, isActive, travelMs, onClick }) => {
  const active = isActive;
  const IconComponent = SERVICE_ICONS[service.icon];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${service.title}`}
      aria-pressed={active}
      className="service-node group relative z-[2] flex items-center justify-center cursor-pointer"
      style={{
        "--node-color": service.color,
      }}
    >
      {/* The circular dot */}
      <div
        className="service-node__dot relative flex items-center justify-center rounded-full"
        style={{
          width: "var(--svc-circle-node-size, 42px)",
          height: "var(--svc-circle-node-size, 42px)",
          backgroundColor: active ? tintedBg(service.color) : RESTING_FILL,
          border: `1.5px solid ${active ? service.color : RESTING_BORDER}`,
          boxShadow: active
            ? `0 0 14px ${service.color}55, 0 0 28px ${service.color}22`
            : "none",
          transition: `border-color ${travelMs}ms ease, background-color ${travelMs}ms ease, box-shadow ${travelMs}ms ease`,
        }}
      >
        {/* Icon */}
        {IconComponent && (
          <IconComponent
            size={18}
            style={{
              color: active ? service.color : "#555572",
              transition: `color ${travelMs}ms ease`,
            }}
          />
        )}
      </div>

      {/* Pulse animation — active nodes only */}
      {active && (
        <span
          aria-hidden="true"
          className="service-node__pulse absolute rounded-full pointer-events-none"
          style={{
            width: "var(--svc-circle-node-size, 42px)",
            height: "var(--svc-circle-node-size, 42px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 14px ${service.color}55`,
          }}
        />
      )}
    </button>
  );
};

ServiceNode.propTypes = {
  service: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  travelMs: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ServiceNode;
