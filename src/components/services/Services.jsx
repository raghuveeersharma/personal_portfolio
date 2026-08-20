import { useRef, useState } from "react";
import { Reveal } from "../../animation";
import { services } from "../../constants.js";
import ServiceTrack from "./ServiceTrack.jsx";
import ServiceCarousel from "./ServiceCarousel.jsx";
import useServiceLoop from "./useServiceLoop.js";

/**
 * Services section — the second piece of the portfolio that
 * intentionally breaks from the single-accent rule, giving each
 * service its own colour (defined inline in constants.js).
 *
 * Layout: a circular node track on the left, stacked
 * description cards on the right, placed side by side on
 * desktop and stacked on mobile.
 *
 * The track auto-plays on a timer, looping forward-only from the
 * first node to the last and back to the first. This is the one
 * section in the app that auto-plays; it stops entirely under
 * prefers-reduced-motion: reduce.
 */
const Services = () => {
  const {
    activeIndex,
    goTo,
    next,
    prev,
    pause,
    resume,
    TRAVEL_MS,
  } = useServiceLoop();

  const [expanded, setExpanded] = useState(false);
  const prevIndexRef = useRef(0);

  // Keep track of the previous index for colour interpolation.
  const handleGoTo = (i) => {
    prevIndexRef.current = activeIndex;
    if (expanded) {
      setExpanded(false);
      // small delay so resume triggers after state settles
      setTimeout(() => resume(), 0);
    }
    goTo(i);
  };

  const handlePrev = () => {
    prevIndexRef.current = activeIndex;
    if (expanded) {
      setExpanded(false);
      setTimeout(() => resume(), 0);
    }
    prev();
  };

  const handleNext = () => {
    prevIndexRef.current = activeIndex;
    if (expanded) {
      setExpanded(false);
      setTimeout(() => resume(), 0);
    }
    next();
  };

  const handleCardClick = () => {
    if (expanded) {
      setExpanded(false);
      resume();
    } else {
      setExpanded(true);
      pause();
    }
  };

  return (
    <section
      id="services"
      className="py-24 px-[12vw] md:px-[7vw] lg:px-[14vw]"
    >
      {/* Header — matches the section title block idiom */}
      <Reveal className="text-center mb-10">
        <p className="font-sans text-[10px] tracking-[0.14em] text-[#555572] uppercase">
          What I offer
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-100">
          SERVICES
        </h2>
        <hr className="w-32 h-1 text-accent mx-auto" />
        <p className="text-gray-400 font-semibold mt-5 text-lg max-w-[560px] mx-auto">
          End-to-end product development — from UI design and responsive
          frontends to robust APIs, databases, and cloud deployment.
        </p>
      </Reveal>

      {/* Side-by-side layout: Circle + Cards */}
      <Reveal variant="fade-up" delay={100} duration={500}>
        <div className="service-layout">
          {/* Counter */}
          <div className="service-layout__counter font-sans text-xs font-bold" aria-hidden="true">
            <span style={{ color: services?.[activeIndex]?.color ?? "#8245ec" }}>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-[#3a3458]"> / </span>
            <span className="text-[#3a3458]">
              {String(4).padStart(2, "0")}
            </span>
          </div>

          {/* Left: Circle track */}
          <div className="service-layout__circle">
            <ServiceTrack
              activeIndex={activeIndex}
              prevIndex={prevIndexRef.current}
              travelMs={TRAVEL_MS}
              onNodeClick={handleGoTo}
            />
          </div>

          {/* Right: Stacked cards */}
          <div className="service-layout__cards">
            <ServiceCarousel
              activeIndex={activeIndex}
              expanded={expanded}
              onPrev={handlePrev}
              onNext={handleNext}
              onDotClick={handleGoTo}
              onCardClick={handleCardClick}
              travelMs={TRAVEL_MS}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
};



export default Services;
