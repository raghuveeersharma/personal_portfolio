import PropTypes from "prop-types";
import SERVICE_ICONS from "./serviceIcons.js";

/* Neutral resting palette — matches the MERN journey's inactive state.

   `tintedBg()` used to live here: it mixed the service colour at 12%
   over the page background in JS, which meant hardcoding #050414 as
   the base. `--brand-surface` does the same mix in CSS against
   `--bg-base`, so it follows the theme and the helper is gone. The
   dark result is identical. The dot still has to be fully opaque —
   the spine runs behind it and the node is what masks it. */
const RESTING_FILL = "var(--bg-subtle)";
const RESTING_BORDER = "var(--border-accent)";

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
      className="brand-hue service-node group relative z-[2] flex items-center justify-center cursor-pointer"
      style={{
        /* Hue only: the services carry no dark bg/border literals, so
           `--brand-surface` is derived in both themes.

           This replaced `--node-color`, which nothing read: the CSS
           that once consumed it is gone, so it was only being set. */
        "--brand-color": service.color,
      }}
    >
      {/* The circular dot */}
      <div
        className="service-node__dot relative flex items-center justify-center rounded-full"
        style={{
          width: "var(--svc-circle-node-size, 42px)",
          height: "var(--svc-circle-node-size, 42px)",
          backgroundColor: active ? "var(--brand-surface)" : RESTING_FILL,
          border: `1.5px solid ${active ? "var(--brand-edge)" : RESTING_BORDER}`,
          boxShadow: active
            ? `0 0 14px color-mix(in srgb, var(--brand-edge) 33%, transparent), 0 0 28px color-mix(in srgb, var(--brand-edge) 13%, transparent)`
            : "none",
          transition: `border-color ${travelMs}ms ease, background-color ${travelMs}ms ease, box-shadow ${travelMs}ms ease`,
        }}
      >
        {/* Icon */}
        {IconComponent && (
          <IconComponent
            size={18}
            style={{
              color: active ? "var(--brand-ink)" : "var(--hero-muted)",
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
            boxShadow:
              "0 0 14px color-mix(in srgb, var(--brand-edge) 33%, transparent)",
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
