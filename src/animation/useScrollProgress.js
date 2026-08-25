import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "./useReducedMotion";

/**
 * Tracks how far the reader has scrolled *through* an element and
 * writes it to a CSS custom property on that element as a 0→1 number.
 *
 * Deliberately does not use state: this updates on every scroll frame,
 * and a `setState` per frame would re-render the whole section. Writing
 * the variable straight to the node keeps the work in CSS, where the
 * consuming rule can turn it into a transform.
 *
 * @param {object} [options]
 * @param {number} [options.anchor=0.55]  where in the viewport counts as
 *                                        "read up to here", as a fraction
 *                                        of viewport height
 * @param {string} [options.property]     custom property to write
 * @returns {React.RefObject} ref to attach to the element being scrolled past
 */
const useScrollProgress = ({
  anchor = 0.55,
  property = "--scroll-progress",
} = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No motion wanted: show the finished state and never listen.
    if (prefersReducedMotion()) {
      node.style.setProperty(property, "1");
      return;
    }

    let frame = null;
    let last = null;

    const measure = () => {
      frame = null;

      const rect = node.getBoundingClientRect();
      if (rect.height === 0) return;

      const line = window.innerHeight * anchor;
      const ratio = (line - rect.top) / rect.height;
      const clamped = Math.min(1, Math.max(0, ratio));
      const value = Math.round(clamped * 1000) / 1000;

      // Skip no-op writes so a scroll past the finished line doesn't
      // keep invalidating style.
      if (value === last) return;
      last = value;
      node.style.setProperty(property, String(value));
    };

    // Coalesce a burst of scroll events into one measurement per frame.
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    // The timelines contain images, so the tracked height changes after
    // load — without this the line would be calibrated to the wrong box.
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(schedule);
    observer?.observe(node);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [anchor, property]);

  return ref;
};

export default useScrollProgress;
