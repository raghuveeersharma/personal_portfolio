import { useCallback, useEffect, useRef, useState } from "react";
import { services } from "../../constants.js";

const TOTAL = services.length;
const TRAVEL_MS = 600;  // packet travel between adjacent nodes
const DWELL_MS = 2200;  // hold at each node before advancing

/**
 * Drives the service-track autoplay loop.
 *
 * Owns *when* the active index changes and nothing else — the
 * geometry (where the packet sits) is derived from `activeIndex`
 * by ServiceTrack and animated in CSS.
 *
 * The loop runs forward only (0 → 1 → 2 → 3 → 0 → …) and never
 * auto-plays under `prefers-reduced-motion: reduce`.
 */
const useServiceLoop = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // "arriving" is true during the travel phase (packet is in motion),
  // false once it has arrived and is dwelling.
  const [arriving, setArriving] = useState(false);

  const timerRef = useRef(null);
  const reducedMotion = useRef(false);

  // Detect reduced motion once, on mount.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const onChange = (e) => { reducedMotion.current = e.matches; };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Schedule the next advance from whatever the current index is.
  const scheduleNext = useCallback(
    (fromIndex) => {
      if (reducedMotion.current) return;
      clearTimer();

      timerRef.current = setTimeout(() => {
        const next = (fromIndex + 1) % TOTAL;
        setArriving(true);
        setActiveIndex(next);

        // After the packet has travelled, mark arrival complete and
        // schedule the next dwell.
        timerRef.current = setTimeout(() => {
          setArriving(false);
          scheduleNext(next);
        }, TRAVEL_MS);
      }, DWELL_MS);
    },
    [clearTimer],
  );

  // Manual navigation — click a node, arrow, or dot.
  const goTo = useCallback(
    (index) => {
      clearTimer();
      setArriving(true);
      setActiveIndex(index);

      // Let the packet travel, then dwell and resume autoplay.
      timerRef.current = setTimeout(() => {
        setArriving(false);
        if (!paused && !reducedMotion.current) {
          scheduleNext(index);
        }
      }, TRAVEL_MS);
    },
    [clearTimer, paused, scheduleNext],
  );

  const next = useCallback(() => {
    goTo((activeIndex + 1) % TOTAL);
  }, [activeIndex, goTo]);

  const prev = useCallback(() => {
    goTo((activeIndex - 1 + TOTAL) % TOTAL);
  }, [activeIndex, goTo]);

  // Pause/resume — expanding a card pauses, collapsing resumes.
  const pause = useCallback(() => {
    setPaused(true);
    clearTimer();
  }, [clearTimer]);

  const resume = useCallback(() => {
    setPaused(false);
    if (!reducedMotion.current) {
      scheduleNext(activeIndex);
    }
  }, [activeIndex, scheduleNext]);

  // Start the loop on mount (unless reduced motion).
  useEffect(() => {
    if (!reducedMotion.current) {
      scheduleNext(0);
    }
    return clearTimer;
  }, [scheduleNext, clearTimer]);

  return {
    activeIndex,
    arriving,
    paused,
    goTo,
    next,
    prev,
    pause,
    resume,
    TRAVEL_MS,
    DWELL_MS,
  };
};

export default useServiceLoop;
