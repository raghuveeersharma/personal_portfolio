import { useState } from "react";
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
  const { activeIndex, goTo, pause, resume, TRAVEL_MS } = useServiceLoop();

  const [expanded, setExpanded] = useState(false);

  // Collapse whatever was open and hand over to goTo, which clears the
  // pause itself. The old version deferred a resume() with
  // setTimeout(…, 0), which then ran *after* goTo and cancelled goTo's
  // own travel timer — leaving `arriving` stuck true and autoplay
  // scheduled from the previous index.
  const handleGoTo = (i) => {
    setExpanded(false);
    goTo(i);
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
      className="py-24"
    >
     <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
      {/* Header — matches the section title block idiom */}
      <Reveal className="text-center mb-10">
        <p className="font-sans text-[10px] tracking-[0.14em] text-hero-muted uppercase">
          What I offer
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-100">
          SERVICES
        </h2>
        <div className="w-32 h-1 bg-accent mx-auto mt-4"></div>
        <p className="text-gray-400 mt-5 text-lg max-w-[560px] mx-auto">
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
            <span className="text-[#796faa]"> / </span>
            <span className="text-[#796faa]">
              {String(services.length).padStart(2, "0")}
            </span>
          </div>

          {/* Left: Circle track */}
          <div className="service-layout__circle">
            <ServiceTrack
              activeIndex={activeIndex}
              travelMs={TRAVEL_MS}
              onNodeClick={handleGoTo}
            />
          </div>

          {/* Right: Stacked cards */}
          <div className="service-layout__cards">
            <ServiceCarousel
              activeIndex={activeIndex}
              expanded={expanded}
              onDotClick={handleGoTo}
              onCardClick={handleCardClick}
              travelMs={TRAVEL_MS}
            />
          </div>
        </div>
      </Reveal>
     </div>
    </section>
  );
};



export default Services;
