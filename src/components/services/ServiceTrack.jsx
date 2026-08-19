import PropTypes from "prop-types";
import { services } from "../../constants.js";
import ServiceNode from "./ServiceNode.jsx";

const TOTAL = services.length;

/**
 * The circular service track: an SVG circle spine with nodes
 * positioned at cardinal points around it, and an animated
 * arc that fills between nodes as the active index changes.
 *
 * Geometry is driven by the activeIndex — each node sits at a
 * fixed angle around the circle (evenly distributed, starting
 * from top / 12-o'clock). The arc fill and the animated
 * packet are both derived from activeIndex.
 *
 * The center shows a brand label, matching the Popmenu
 * reference design.
 */
const ServiceTrack = ({ activeIndex, prevIndex, travelMs, onNodeClick }) => {
  // Circle geometry — all values are relative to a 300×300 viewBox.
  const CX = 150;
  const CY = 150;
  const R = 120; // radius of the node circle
  const CIRCLE_R = 110; // radius of the visible SVG circle

  // Each node is positioned at a fixed angle, starting from top (−90°).
  // We go clockwise: top → right → bottom → left for 4 items.
  const getAngle = (index) => {
    return -90 + (360 / TOTAL) * index;
  };

  const getPosition = (index) => {
    const angleDeg = getAngle(index);
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: CX + R * Math.cos(angleRad),
      y: CY + R * Math.sin(angleRad),
    };
  };

  // Build the active arc path (from the first node to the active node, clockwise).
  // We fill from node 0 to activeIndex, sweeping through intermediate nodes.
  const buildArcPath = () => {
    if (activeIndex === 0) return "";

    const startAngle = getAngle(0);
    const endAngle = getAngle(activeIndex);

    // Convert to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate actual sweep — we always go clockwise
    let sweep = endAngle - startAngle;
    if (sweep < 0) sweep += 360;
    const largeArc = sweep > 180 ? 1 : 0;

    const sx = CX + CIRCLE_R * Math.cos(startRad);
    const sy = CY + CIRCLE_R * Math.sin(startRad);
    const ex = CX + CIRCLE_R * Math.cos(endRad);
    const ey = CY + CIRCLE_R * Math.sin(endRad);

    return `M ${sx} ${sy} A ${CIRCLE_R} ${CIRCLE_R} 0 ${largeArc} 1 ${ex} ${ey}`;
  };

  // Arrow positions along the spine between nodes
  const getArrowPositions = () => {
    const arrows = [];
    for (let i = 0; i < TOTAL; i++) {
      // Place arrow at the midpoint between node i and node (i+1)
      const midAngle = getAngle(i) + 360 / TOTAL / 2;
      const midRad = (midAngle * Math.PI) / 180;
      arrows.push({
        x: CX + CIRCLE_R * Math.cos(midRad),
        y: CY + CIRCLE_R * Math.sin(midRad),
        angle: midAngle + 90, // tangent direction (perpendicular to radius)
      });
    }
    return arrows;
  };

  const arrows = getArrowPositions();
  const arcPath = buildArcPath();
  const activeColor = services[activeIndex].color;

  // Packet position — sits on the circle at the active node's angle
  const packetPos = getPosition(activeIndex);

  return (
    <div
      className="service-circle-track"
      style={{
        "--svc-travel-ms": `${travelMs}ms`,
      }}
      aria-label="Service navigation track"
    >
      {/* SVG circle spine + arc fill + arrows */}
      <svg
        viewBox="0 0 300 300"
        className="service-circle-svg"
        aria-hidden="true"
      >
        {/* Static spine circle */}
        <circle
          cx={CX}
          cy={CY}
          r={CIRCLE_R}
          fill="none"
          stroke="#241d3d"
          strokeWidth="1.5"
        />

        {/* Active arc fill — sweeps from node 0 to active node */}
        {arcPath && (
          <path
            d={arcPath}
            fill="none"
            stroke={activeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              transition: `d ${travelMs}ms ease-in-out, stroke ${travelMs}ms ease`,
              filter: `drop-shadow(0 0 6px ${activeColor}66)`,
            }}
          />
        )}

        {/* Direction arrows on the spine */}
        {arrows.map((arrow, i) => (
          <g
            key={i}
            transform={`translate(${arrow.x}, ${arrow.y}) rotate(${arrow.angle})`}
          >
            <polyline
              points="-3.5,-3.5 0,0 -3.5,3.5"
              fill="none"
              stroke="#3a3458"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </svg>

      {/* Animated packet — the glowing dot on the circle */}
      <div
        className="service-circle-packet"
        aria-hidden="true"
        style={{
          left: `${(packetPos.x / 300) * 100}%`,
          top: `${(packetPos.y / 300) * 100}%`,
          backgroundColor: activeColor,
          boxShadow: `0 0 14px ${activeColor}88, 0 0 28px ${activeColor}44`,
          transition: `left ${travelMs}ms ease-in-out, top ${travelMs}ms ease-in-out, background-color ${travelMs}ms linear, box-shadow ${travelMs}ms linear`,
        }}
      />

      {/* Nodes positioned around the circle */}
      {services.map((svc, i) => {
        const pos = getPosition(i);
        return (
          <div
            key={svc.id}
            className="service-circle-node-wrapper"
            style={{
              left: `${(pos.x / 300) * 100}%`,
              top: `${(pos.y / 300) * 100}%`,
            }}
          >
            <ServiceNode
              service={svc}
              isActive={activeIndex === i}
              travelMs={travelMs}
              onClick={() => onNodeClick(i)}
            />
          </div>
        );
      })}

      {/* Center label */}
      <div className="service-circle-center" aria-hidden="true">
        <span
          className="service-circle-center-label font-sans text-[10px] sm:text-xs tracking-[0.14em] uppercase"
          style={{
            color: activeColor,
            transition: `color ${travelMs}ms ease`,
          }}
        >
          Services
        </span>
        <span className="service-circle-center-sub font-sans text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#555572]">
          cycle
        </span>
      </div>
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
