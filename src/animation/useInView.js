import { useEffect, useRef, useState } from "react";

/**
 * The single piece of scroll-observation logic in the app. Every
 * reveal goes through here, so tuning thresholds is a one-file job.
 *
 * @param {object}  [options]
 * @param {number}  [options.threshold=0.15]  fraction visible before firing
 * @param {string}  [options.rootMargin]      shrink the viewport so elements
 *                                            fire slightly *after* entering
 * @param {boolean} [options.once=true]       stop observing after the first
 *                                            reveal; set false to re-animate
 * @param {boolean} [options.immediate=false] animate on mount instead of on
 *                                            scroll — for above-the-fold
 *                                            entrances, which must not depend
 *                                            on where the fold happens to be
 * @returns {[React.RefObject, boolean]} ref to attach, and visibility
 */
const useInView = ({
  threshold = 0.15,
  rootMargin = "0px 0px -12% 0px",
  once = true,
  immediate = false,
} = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No motion wanted, or no observer available: show it and stop.
    // Without this branch a reduced-motion visitor would still pay
    // for observers that can never change anything visually.
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    // Entrance animation: no observer, just flip after the browser has
    // painted the from-state once. Two frames, because a single one can
    // still be batched into the initial paint — and then there is no
    // change to transition from and the element simply appears.
    if (immediate) {
      let inner;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setInView(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }

    // `threshold` is a fraction of the *element*, which is a trap for the
    // Stagger containers: a grid that is 3 columns on desktop collapses to
    // one on a phone, and a container several viewports tall can never
    // expose 15% of itself at once. The reveal would then stay pinned at
    // opacity 0 — laid out and tappable, but invisible. So when the node is
    // taller than the viewport, ask for `threshold` of the *viewport*
    // instead, which is what the number was always meant to express.
    const viewportHeight = window.innerHeight || 0;
    const nodeHeight = node.offsetHeight || 0;
    const effectiveThreshold =
      nodeHeight > viewportHeight && nodeHeight > 0 && viewportHeight > 0
        ? (viewportHeight * threshold) / nodeHeight
        : threshold;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: effectiveThreshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, immediate]);

  return [ref, inView];
};

export default useInView;
