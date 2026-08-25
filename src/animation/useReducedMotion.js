import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const mediaQuery = () =>
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia(QUERY)
    : null;

/**
 * One-shot read, for effects that only need to know the preference at
 * the moment they set themselves up — `useInView` and
 * `useScrollProgress` both bail out entirely when motion is unwanted,
 * so there is nothing for a later change to update.
 *
 * @returns {boolean}
 */
export const prefersReducedMotion = () => mediaQuery()?.matches ?? false;

/**
 * Subscribe without re-rendering. For consumers that keep the answer in
 * a ref because their readers are timer callbacks, not the render pass
 * (`useServiceLoop`).
 *
 * @param {(reduced: boolean) => void} onChange
 * @returns {() => void} unsubscribe
 */
export const subscribeReducedMotion = (onChange) => {
  const mq = mediaQuery();
  if (!mq) return () => {};

  const handler = (event) => onChange(event.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
};

/**
 * The reactive form: re-renders when the visitor flips the setting.
 * Use this when the preference decides what gets *rendered* rather than
 * whether a listener gets attached (`About`'s magnetic CTA).
 *
 * The initial value is read in an effect rather than in `useState`, so
 * the first client render matches what a server/prerender would emit.
 *
 * @returns {boolean}
 */
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    return subscribeReducedMotion(setReduced);
  }, []);

  return reduced;
};

export default useReducedMotion;
