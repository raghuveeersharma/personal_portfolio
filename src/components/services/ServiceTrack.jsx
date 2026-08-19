import PropTypes from "prop-types";
import { services } from "../../constants.js";
import ServiceNode from "./ServiceNode.jsx";

const LAST = services.length - 1;

/**
 * The horizontal (or vertical on mobile) track: a static spine, a
 * color-interpolating packet, and one node per service.
 *
 * Geometry is one CSS custom property (`--svc-pos`, 0→1) written
 * onto `.service-track`. The spine fill and the packet are both
 * `calc()` functions of it, and the mobile/desktop axis swap is a
 * media query — same technique as the MERN journey track.
 */
const ServiceTrack = ({ activeIndex, prevIndex, travelMs, onNodeClick }) => {
  const pos = activeIndex / LAST;

  // Interpolate packet color from prevIndex's color to activeIndex's color.
  // The CSS transition handles the smooth blend — we just set the target.
  const fromColor = services[prevIndex ?? activeIndex]?.color ?? services[0].color;
  const toColor = services[activeIndex].color;

  return (
    <div
      className="service-track"
      style={{
        "--svc-pos": pos,
        "--svc-from-color": fromColor,
        "--svc-to-color": toColor,
      }}
      aria-label="Service navigation track"
    >
      {/* Static spine — always visible */}
      <div className="service-spine" aria-hidden="true" />

      {/* Animated packet — the moving dot */}
      <div
        className="service-packet"
        aria-hidden="true"
        style={{
          backgroundColor: toColor,
          transition: `left ${travelMs}ms ease-in-out, top ${travelMs}ms ease-in-out, background-color ${travelMs}ms linear`,
        }}
      />

      {/* Nodes */}
      {services.map((svc, i) => (
        <ServiceNode
          key={svc.id}
          service={svc}
          isActive={activeIndex === i}
          travelMs={travelMs}
          onClick={() => onNodeClick(i)}
        />
      ))}
    </div>
  );
};

ServiceTrack.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  prevIndex: PropTypes.number,
  travelMs: PropTypes.number.isRequired,
  onNodeClick: PropTypes.func.isRequired,
};

export default ServiceTrack;
