import { useCallback, useEffect, useRef, useState } from "react";
import { journeyNodes } from "../../constants.js";

// One chained setTimeout per step rather than an interval: every step
// gets its own precise offset, and a single clearAll() cancels the
// whole run (re-press, or unmount) with no half-finished state.
const STEP_DURATION = 480; // ms per forward hop
const RETURN_DURATION = 380; // ms per hop on the way back
const PAUSE_AT_DB = 600; // extra beat at MongoDB, i.e. the query

const LAST = journeyNodes.length - 1;

/**
 * Drives the request-journey animation.
 *
 * Owns *when* each node is lit and what the log/status read; the
 * geometry (where the packet sits) is derived from activeStep by the
 * visualiser and animated in CSS.
 */
const useJourneyAnimation = () => {
  const [animating, setAnimating] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [direction, setDirection] = useState("fwd");
  const [logText, setLogText] = useState("");
  const [status, setStatus] = useState(null);
  const [packetColor, setPacketColor] = useState("#8B7CF8");
  const [hasRun, setHasRun] = useState(false);

  const timeouts = useRef([]);

  const clearAll = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  // Without this, a run in flight when the visitor navigates away
  // keeps firing setState on an unmounted tree.
  useEffect(() => clearAll, [clearAll]);

  const run = useCallback(() => {
    if (animating) return;

    clearAll();
    setAnimating(true);
    setHasRun(true);
    setDirection("fwd");
    setActiveStep(-1);
    setLogText("");
    setStatus(null);

    let t = 0;
    const schedule = (fn, delay) => {
      timeouts.current.push(setTimeout(fn, delay));
    };

    // ---- Forward pass: Browser → MongoDB -------------------
    journeyNodes.forEach((node, i) => {
      schedule(() => {
        setActiveStep(i);
        setPacketColor(node.packetColor);
        setLogText(node.requestLog);
        setStatus(
          i === 0
            ? { text: "Connecting...", tone: "idle" }
            : i === LAST
              ? { text: "Querying...", tone: "pending" }
              : { text: "200 pending...", tone: "pending" }
        );
      }, t);
      t += i === LAST ? STEP_DURATION + PAUSE_AT_DB : STEP_DURATION;
    });

    // ---- Return pass: MongoDB → Browser --------------------
    schedule(() => setDirection("ret"), t);

    for (let i = LAST; i >= 0; i -= 1) {
      const node = journeyNodes[i];
      schedule(() => {
        setActiveStep(i);
        setPacketColor("#4ADE80");
        setLogText(node.responseLog);
        setStatus({ text: "200 OK", tone: "ok" });
      }, t);
      t += RETURN_DURATION;
    }

    // ---- Settle -------------------------------------------
    schedule(() => {
      setActiveStep(-1);
      setAnimating(false);
      setLogText("");
      setStatus({ text: "200 OK · 42ms", tone: "ok" });
      setPacketColor("#8B7CF8");
      setDirection("fwd");
    }, t);
  }, [animating, clearAll]);

  return {
    run,
    animating,
    hasRun,
    activeStep,
    direction,
    logText,
    packetColor,
    status,
  };
};

export default useJourneyAnimation;
