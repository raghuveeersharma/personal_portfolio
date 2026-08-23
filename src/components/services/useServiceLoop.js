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
  // "arriving" is true during the travel phase (packet is in motion),
  // false once it has arrived and is dwelling.
  const [arriving, setArriving] = useState(false);

  // A ref, not state: the timer callbacks below are the only readers, and
  // as state it was read through a stale closure — `goTo` captured
  // `paused` from the render that created it, so a click during a pause
  // saw the wrong value and never resumed.
  const pausedRef = useRef(false);

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

  // Manual navigation — click a node, arrow, or dot. Picking a service by
  // hand always means "carry on from here", so this clears the pause
  // itself rather than leaving the caller to fire a second resume() that
  // would race this function's own travel timer.
  const goTo = useCallback(
    (index) => {
      clearTimer();
      pausedRef.current = false;
      setArriving(true);
      setActiveIndex(index);

      // Let the packet travel, then dwell and resume autoplay.
      timerRef.current = setTimeout(() => {
        setArriving(false);
        if (!pausedRef.current && !reducedMotion.current) {
          scheduleNext(index);
        }
      }, TRAVEL_MS);
    },
    [clearTimer, scheduleNext],
  );

  const next = useCallback(() => {
    goTo((activeIndex + 1) % TOTAL);
  }, [activeIndex, goTo]);

  const prev = useCallback(() => {
    goTo((activeIndex - 1 + TOTAL) % TOTAL);
  }, [activeIndex, goTo]);

  // Pause/resume — expanding a card pauses, collapsing resumes.
  const pause = useCallback(() => {
    pausedRef.current = true;
    clearTimer();
    // Pausing mid-travel cancels the timer that would have cleared this,
    // and the CSS transition finishes on its own regardless — so settle it
    // here rather than leaving it stuck on.
    setArriving(false);
  }, [clearTimer]);

  const resume = useCallback(() => {
    pausedRef.current = false;
    clearTimer();
    if (!reducedMotion.current) {
      scheduleNext(activeIndex);
    }
  }, [activeIndex, clearTimer, scheduleNext]);

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
