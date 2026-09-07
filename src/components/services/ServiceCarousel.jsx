import PropTypes from "prop-types";
import { services } from "../../constants.js";
import SERVICE_ICONS from "./serviceIcons.js";

/**
 * Stacked card list to the right of the circle track. All four
 * services are always visible — the active one is expanded to
 * show its description, matching the Popmenu-style reference.
 *
 * Clicking a card activates that service (and pauses autoplay
 * if it was the already-active card being expanded). Dots and
 * a Pause button sit below the stack.
 */
const ServiceCarousel = ({
  activeIndex,
  expanded,
  onDotClick,
  onCardClick,
  travelMs,
}) => {
  return (
    <div className="service-cards-stack">
      {/* All service cards */}
      {services.map((svc, i) => {
        const isActive = activeIndex === i;
        const IconComponent = SERVICE_ICONS[svc.icon];

        return (
          <button
            key={svc.id}
            type="button"
            onClick={() => {
              if (isActive) {
                onCardClick();
              } else {
                onDotClick(i);
              }
            }}
            className={`brand-hue service-stack-card ${
              isActive ? "service-stack-card--active" : ""
            }`}
            style={{
              "--card-color": svc.color,
              "--brand-color": svc.color,
              borderColor: isActive
                ? "color-mix(in srgb, var(--brand-edge) 27%, transparent)"
                : "var(--border-subtle)",
              background: isActive
                ? "linear-gradient(135deg, color-mix(in srgb, var(--brand-edge) 4%, transparent) 0%, var(--surface) 100%)"
                : "var(--surface-sunken)",
            }}
            aria-expanded={isActive && expanded}
          >
            {/* Card header */}
            <div className="service-stack-card__header">
              <div className="service-stack-card__icon-wrap">
                {IconComponent && (
                  <IconComponent
                    size={18}
                    style={{
                      color: isActive ? "var(--brand-ink)" : "var(--hero-muted)",
                      transition: `color ${travelMs}ms ease`,
                    }}
                  />
                )}
              </div>
              <h3
                className="service-stack-card__title font-semibold text-sm sm:text-base"
                style={{
                  color: isActive ? "var(--hero-text)" : "var(--hero-dim)",
                  transition: `color ${travelMs}ms ease`,
                }}
              >
                {svc.title}
              </h3>
              <span
                className="service-stack-card__index font-sans text-xs font-bold ml-auto"
                style={{
                  color: isActive ? "var(--brand-ink)" : "var(--content-accent)",
                  transition: `color ${travelMs}ms ease`,
                }}
              >
                {svc.index}
              </span>
            </div>

            {/* Description — only shown for active card */}
            {isActive && (
              <div className="service-stack-card__body">
                <p className="text-[12px] sm:text-[13px] leading-relaxed text-hero-dim mt-2">
                  {expanded ? svc.full : svc.short}
                </p>
              </div>
            )}
          </button>
        );
      })}

      {/* Dots + Pause */}
      <div className="service-stack-footer">
        <div
          className="flex items-center gap-2"
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
              className="brand-hue w-2 h-2 rounded-full cursor-pointer transition-[background-color,transform,box-shadow] duration-300"
              style={{
                "--brand-color": s.color,
                backgroundColor:
                  activeIndex === i ? "var(--brand-edge)" : "var(--border)",
                transform: activeIndex === i ? "scale(1.35)" : "scale(1)",
                boxShadow:
                  activeIndex === i
                    ? "0 0 8px color-mix(in srgb, var(--brand-edge) 33%, transparent)"
                    : "none",
              }}
            />
          ))}
        </div>

        {/* Pause/resume — the same toggle the active card performs, so the
            glyph has to follow `expanded` too or it contradicts its label. */}
        <button
          type="button"
          onClick={onCardClick}
          className="service-pause-btn font-sans text-[10px] tracking-wide uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-hero-muted bg-bg-subtle cursor-pointer transition-[border-color,color] duration-200 hover:border-border-accent hover:text-hero-dim"
        >
          <span className="text-[10px]" aria-hidden="true">
            {expanded ? "▶" : "⏸"}
          </span>
          {expanded ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
};

ServiceCarousel.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  onDotClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  travelMs: PropTypes.number.isRequired,
};

export default ServiceCarousel;
