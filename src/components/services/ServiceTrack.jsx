import PropTypes from "prop-types";
import { services } from "../../constants.js";
import ServiceNode from "./ServiceNode.jsx";

const TOTAL = services.length;

/**
 * The circular service track: an SVG circle with nodes at
 * cardinal points. The spine is drawn as individual arc
 * segments between each pair of adjacent nodes.
 *
 * Only the segment leading INTO the active node is coloured
 * (previous node → active node). The colour change is instant
 * — no sweeping arc, no bending path animation. Each segment
 * simply snaps to "lit" or "unlit" when the active index
 * changes.
 */
const ServiceTrack = ({ activeIndex, prevIndex, travelMs, onNodeClick }) => {
  // Circle geometry — all values are relative to a 300×300 viewBox.
  const CX = 150;
  const CY = 150;
  const R = 120; // radius for positioning nodes
  const CIRCLE_R = 120; // radius of the visible SVG circle

  // Each node sits at a fixed angle, starting from top (−90°).
  // Clockwise: top → right → bottom → left for 4 items.
  const getAngle = (index) => -90 + (360 / TOTAL) * index;

  const getPosition = (index) => {
    const angleRad = (getAngle(index) * Math.PI) / 180;
    return {
      x: CX + R * Math.cos(angleRad),
      y: CY + R * Math.sin(angleRad),
    };
  };

  // Build an arc path for the segment from node `from` to node `to`.
  const buildSegmentPath = (from, to) => {
    const startAngle = getAngle(from);
    const endAngle = getAngle(to);
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Each segment is exactly 360/TOTAL degrees — always < 180,
    // so largeArc is always 0.
    const sx = CX + CIRCLE_R * Math.cos(startRad);
    const sy = CY + CIRCLE_R * Math.sin(startRad);
    const ex = CX + CIRCLE_R * Math.cos(endRad);
    const ey = CY + CIRCLE_R * Math.sin(endRad);

    return `M ${sx} ${sy} A ${CIRCLE_R} ${CIRCLE_R} 0 0 1 ${ex} ${ey}`;
  };

  // Arrow positions — one at the midpoint of each segment.
  const getArrowPositions = () => {
    const arrows = [];
    for (let i = 0; i < TOTAL; i++) {
      const midAngle = getAngle(i) + 360 / TOTAL / 2;
      const midRad = (midAngle * Math.PI) / 180;
      arrows.push({
        x: CX + CIRCLE_R * Math.cos(midRad),
        y: CY + CIRCLE_R * Math.sin(midRad),
        angle: midAngle + 90,
      });
    }
    return arrows;
  };

  // Build all TOTAL segments. Each segment goes from node i → node (i+1) % TOTAL.
  // A segment is "active" if the active node is at its END.
  // i.e. segment i (from node i → node i+1) is active when activeIndex === (i+1) % TOTAL.
  const segments = [];
  for (let i = 0; i < TOTAL; i++) {
    const nextIdx = (i + 1) % TOTAL;
    const isActive = activeIndex === nextIdx;
    segments.push({
      from: i,
      to: nextIdx,
      path: buildSegmentPath(i, nextIdx),
      isActive,
      color: services[nextIdx].color, // colour of the node it leads into
    });
  }

  const arrows = getArrowPositions();
  const activeColor = services[activeIndex].color;

  return (
    <div
      className="service-circle-track"
      aria-label="Service navigation track"
    >
      {/* SVG circle spine drawn as individual segments */}
      <svg
        viewBox="0 0 300 300"
        className="service-circle-svg"
        aria-hidden="true"
      >
        {/* Each segment — inactive ones are the muted spine colour,
            the active one (leading to the current node) is coloured. */}
        {segments.map((seg, i) => (
          <path
            key={i}
            d={seg.path}
            fill="none"
            stroke={seg.isActive ? seg.color : "#241d3d"}
            strokeWidth={seg.isActive ? 2.5 : 1.5}
            strokeLinecap="round"
            style={{
              filter: seg.isActive
                ? `drop-shadow(0 0 6px ${seg.color}66)`
                : "none",
              transition: `stroke ${travelMs}ms ease, stroke-width ${travelMs}ms ease, filter ${travelMs}ms ease`,
            }}
          />
        ))}

        {/* Direction arrows on the spine between nodes */}
        {arrows.map((arrow, i) => {
          // The arrow sits on segment i (from node i → node i+1).
          // Colour the arrow if its segment is active.
          const seg = segments[i];
          return (
            <g
              key={i}
              transform={`translate(${arrow.x}, ${arrow.y}) rotate(${arrow.angle})`}
            >
              <polyline
                points="-3.5,-3.5 0,0 -3.5,3.5"
                fill="none"
                stroke={seg.isActive ? seg.color : "#3a3458"}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transition: `stroke ${travelMs}ms ease`,
                }}
              />
            </g>
          );
        })}
      </svg>

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
            transition: `color ${travelMs}ms ease`
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
