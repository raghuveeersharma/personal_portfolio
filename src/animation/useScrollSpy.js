import { useEffect, useState } from "react";

/**
 * Observes a list of page sections and returns the `id` of the one
 * currently occupying the most prominent position in the viewport.
 *
 * Uses a single `IntersectionObserver` with multiple thresholds so
 * that fast scrolling past short sections still registers a change.
 * The topmost intersecting section wins, matching the convention
 * that a user "is in" the section whose heading is closest to the
 * top of the screen.
 *
 * @param {string[]} sectionIds  array of element IDs to observe
 * @returns {string}             the id of the currently active section
 */
const useScrollSpy = (sectionIds) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    // Track which sections are currently intersecting and their
    // intersection ratios.  On every callback we pick the one whose
    // top edge is closest to (but below) the navbar — i.e. the
    // topmost visible section.
    const visibleMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleMap.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleMap.delete(entry.target.id);
          }
        }

        // Pick the section closest to (but ideally just below) the
        // top of the viewport.  `boundingClientRect.top` is small
        // positive for a section whose heading just scrolled under
        // the navbar, and large positive for sections far below.
        // Negative means the section has scrolled past the top.
        // We want the one with the *smallest absolute* top, i.e. the
        // one most centred on the viewport edge — but if the very
        // bottom of the page is reached, the last section may never
        // fully intersect, so fall back to the bottommost one.
        if (visibleMap.size === 0) return;

        let bestId = "";
        let bestTop = Infinity;

        for (const [id, top] of visibleMap) {
          // Prefer sections whose top is closest to the viewport top
          // (absolute value).  This correctly promotes a section
          // whether it's just entering (positive top) or has scrolled
          // a little past (negative top).
          const absTop = Math.abs(top);
          if (absTop < bestTop) {
            bestTop = absTop;
            bestId = id;
          }
        }

        if (bestId) setActiveId(bestId);
      },
      {
        // Negative top margin = ignore the navbar height.
        // A generous bottom margin lets short sections (e.g. Contact)
        // trigger even when the user has scrolled to the very bottom
        // and the section is only partially visible.
        rootMargin: "-80px 0px -35% 0px",
        // Multiple thresholds catch fast scrolling past short sections.
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
};

export default useScrollSpy;
