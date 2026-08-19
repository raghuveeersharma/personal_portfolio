import PropTypes from "prop-types";

// Neutral resting palette — matches the MERN journey's inactive state.
const RESTING_FILL = "#0a0918";
const RESTING_BORDER = "#4a3f73";

/**
 * One node on the service track. Purely presentational — the parent
 * decides which state it's in.
 *
 * States:
 *   - resting:  neutral dark fill, muted border, no color
 *   - active:   colored border + glow pulse in the service's hue
 *   - arriving: same as active but the glow is fading in
 */
const ServiceNode = ({ service, isActive, travelMs, onClick }) => {
  const active = isActive;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${service.title}`}
      aria-pressed={active}
      className="service-node group relative z-[2] flex flex-col items-center gap-2 cursor-pointer"
      style={{
        "--node-color": service.color,
      }}
    >
      {/* The dot */}
      <div
        className="service-node__dot relative flex items-center justify-center"
        style={{
          width: "var(--svc-node-size)",
          height: "var(--svc-node-size)",
          borderRadius: "14px",
          background: active ? `${service.color}18` : RESTING_FILL,
          border: `1.5px solid ${active ? service.color : RESTING_BORDER}`,
          boxShadow: active
            ? `0 0 14px ${service.color}55, 0 0 28px ${service.color}22`
            : "none",
          transform: active ? "scale(1.15)" : "scale(1)",
          transition: `border-color ${travelMs}ms ease, background-color ${travelMs}ms ease, box-shadow ${travelMs}ms ease, transform ${travelMs}ms ease`,
        }}
      >
        {/* Index number */}
        <span
          className="font-sans text-xs font-bold select-none"
          style={{
            color: active ? service.color : "#555572",
            transition: `color ${travelMs}ms ease`,
          }}
        >
          {service.index}
        </span>
      </div>

      {/* Label */}
      <span
        className="font-sans text-[10px] sm:text-[11px] text-center leading-tight max-w-[80px] sm:max-w-[100px] select-none"
        style={{
          color: active ? service.color : "#555572",
          fontWeight: active ? 600 : 400,
          transition: `color ${travelMs}ms ease`,
        }}
      >
        {service.title}
      </span>

      {/* Pulse animation — active nodes only */}
      {active && (
        <span
          aria-hidden="true"
          className="service-node__pulse absolute rounded-[14px] pointer-events-none"
          style={{
            width: "var(--svc-node-size)",
            height: "var(--svc-node-size)",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
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
