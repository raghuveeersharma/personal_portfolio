import PropTypes from "prop-types";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { services } from "../../constants.js";

/**
 * Carousel below the track: one visible card at a time, prev/next
 * arrows, a dots row that mirrors the active index.
 *
 * Clicking the card body toggles an expanded state showing the `full`
 * description. Expanding pauses autoplay; collapsing resumes it.
 */
const ServiceCarousel = ({
  activeIndex,
  expanded,
  onPrev,
  onNext,
  onDotClick,
  onCardClick,
  travelMs,
}) => {
  const svc = services[activeIndex];

  return (
    <div className="mt-8 sm:mt-10">
      {/* Card + arrows */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Prev */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous service"
          className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#2A2A3F] bg-[#0a0918] text-[#555572] cursor-pointer transition-[border-color,color,background-color] duration-200 hover:border-[#8245ec] hover:text-[#E8E8F4] hover:bg-[#111118]"
        >
          <TbChevronLeft size={18} />
        </button>

        {/* Card — keyed on the service id so React remounts and the
            entrance animation replays (same cross-fade trick as the
            MERN journey log line). */}
        <div
          key={svc.id}
          role="button"
          tabIndex={0}
          onClick={onCardClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onCardClick();
            }
          }}
          className="service-card flex-1 min-w-0 rounded-xl px-5 py-5 sm:px-7 sm:py-6 cursor-pointer transition-[border-color,box-shadow] duration-300"
          style={{
            background: "#111118",
            border: `1px solid ${expanded ? svc.color + "55" : "#1E1E2E"}`,
            boxShadow: expanded
              ? `0 0 20px ${svc.color}18, inset 0 1px 0 ${svc.color}12`
              : "none",
          }}
          aria-expanded={expanded}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg font-sans text-xs font-bold"
              style={{
                background: `${svc.color}15`,
                color: svc.color,
                border: `1px solid ${svc.color}33`,
              }}
            >
              {svc.index}
            </span>
            <h3
              className="font-display text-lg sm:text-xl font-semibold text-[#E8E8F4]"
              style={{
                transition: `color ${travelMs}ms ease`,
              }}
            >
              {svc.title}
            </h3>
          </div>

          {/* Divider */}
          <div
            className="h-[0.5px] mb-3"
            style={{ background: expanded ? `${svc.color}33` : "#1E1E2E" }}
          />

          {/* Description */}
          <p className="text-[13px] sm:text-sm leading-relaxed text-[#8C8CAA]">
            {expanded ? svc.full : svc.short}
          </p>

          {/* Expand hint */}
          <span
            className="inline-block mt-3 font-sans text-[10px] tracking-wide uppercase"
            style={{ color: svc.color + "99" }}
          >
            {expanded ? "Click to collapse" : "Click to read more"}
          </span>
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next service"
          className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#2A2A3F] bg-[#0a0918] text-[#555572] cursor-pointer transition-[border-color,color,background-color] duration-200 hover:border-[#8245ec] hover:text-[#E8E8F4] hover:bg-[#111118]"
        >
          <TbChevronRight size={18} />
        </button>
      </div>

      {/* Dots */}
      <div
        className="flex items-center justify-center gap-2.5 mt-5"
        role="tablist"
        aria-label="Service navigation"
      >
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={s.title}
            onClick={() => onDotClick(i)}
            className="w-2 h-2 rounded-full cursor-pointer transition-[background-color,transform,box-shadow] duration-300"
            style={{
              backgroundColor:
                activeIndex === i ? s.color : "#2A2A3F",
              transform: activeIndex === i ? "scale(1.35)" : "scale(1)",
              boxShadow:
                activeIndex === i
                  ? `0 0 8px ${s.color}55`
                  : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

ServiceCarousel.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onDotClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  travelMs: PropTypes.number.isRequired,
};

export default ServiceCarousel;
