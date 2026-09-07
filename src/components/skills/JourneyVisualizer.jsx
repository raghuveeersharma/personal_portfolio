import { useState } from "react";
import { TbLoader2, TbPlayerPlay } from "react-icons/tb";
import { journeyNodes } from "../../constants.js";
import { Reveal } from "../../animation";
import JourneyNode from "./JourneyNode.jsx";
import SkillDetailPanel from "./SkillDetailPanel.jsx";
import useJourneyAnimation from "./useJourneyAnimation.js";

const LAST = journeyNodes.length - 1;

/* Status badge palette, keyed by the tone the hook reports. The
   literals these replaced were exactly the status tokens, so this is
   a rename rather than a re-colour. */
const STATUS_TONES = {
  idle: {
    bg: "var(--surface)",
    color: "var(--hero-dim)",
    border: "var(--border)",
  },
  pending: {
    bg: "var(--warning-wash)",
    color: "var(--warning)",
    border: "var(--warning-line)",
  },
  ok: {
    bg: "var(--success-wash)",
    color: "var(--success)",
    border: "var(--success-line)",
  },
};

/**
 * The card: node track, log bar, controls, and the one open detail
 * panel. All timing lives in useJourneyAnimation; all geometry is a
 * function of the `--pos` variable set on the track (see the
 * "MERN request journey" block in styles/animations.css).
 */
const JourneyVisualizer = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const {
    run,
    animating,
    hasRun,
    activeStep,
    direction,
    logText,
    packetColor,
    status,
  } = useJourneyAnimation();

  const forward = direction === "fwd";
  const packetVisible = animating || hasRun;
  const pos = activeStep >= 0 ? activeStep / LAST : 0;
  const tone = status ? STATUS_TONES[status.tone] : null;

  return (
    <Reveal
      variant="fade-up"
      delay={150}
      duration={550}
      className="rounded-2xl border-[0.5px] border-border-subtle bg-surface p-6 sm:p-8"
    >
      {/* ---- Node track ------------------------------------- */}
      <div
        className="journey-track mb-5"
        style={{ "--pos": pos }}
        aria-hidden={false}
      >
        <div className="journey-spine" aria-hidden="true" />
        <div className="journey-fill" aria-hidden="true" />
        {/* The packet colour arrives as a raw brand hue from
            constants.js (or a token, on the idle and return passes),
            so it goes through the brand-hue scope like everything
            else — otherwise it stays a pale mid-tone dot on a light
            track. `--brand-edge` is the border/dot strength, which
            holds 3:1 for every hue. */}
        <div
          className="brand-hue journey-packet"
          aria-hidden="true"
          style={{
            "--brand-color": packetColor,
            backgroundColor: "var(--brand-edge)",
            opacity: packetVisible ? 1 : 0,
            transform: packetVisible ? "scale(1)" : "scale(0)",
          }}
        />

        {journeyNodes.map((node, i) => (
          <JourneyNode
            key={node.id}
            node={node}
            isActive={activeStep === i}
            isVisited={
              animating && activeStep >= 0 && (forward ? activeStep > i : activeStep < i)
            }
            isSelected={selectedNode === i}
            onClick={() => setSelectedNode(selectedNode === i ? null : i)}
          />
        ))}
      </div>

      {/* ---- Log bar ---------------------------------------- */}
      <div
        className="mb-5 flex min-h-9 items-center gap-2.5 rounded-lg border-[0.5px] border-border-subtle bg-surface-sunken px-4 py-2"
        role="status"
        aria-live="polite"
      >
        <span
          className="shrink-0 rounded-full px-[7px] py-[2px] font-sans text-[9px] font-medium"
          style={{
            background: forward ? "var(--info-wash)" : "var(--success-wash)",
            color: forward ? "var(--info)" : "var(--success)",
            border: `0.5px solid ${
              forward ? "var(--info-line)" : "var(--success-line)"
            }`,
          }}
        >
          {forward ? "→ REQ" : "← RES"}
        </span>

        {/* Keyed on the text so each new line remounts and replays
            its own entrance — the no-dependency stand-in for an
            AnimatePresence cross-fade. */}
        <span
          key={logText || "idle"}
          className="journey-log-line font-mono text-[11px] text-hero-dim"
        >
          {logText || 'Press "Send request" to begin'}
        </span>

        {animating && (
          <span
            aria-hidden="true"
            className="journey-cursor font-mono text-[11px] text-hero-accent"
          >
            |
          </span>
        )}
      </div>

      {/* ---- Controls --------------------------------------- */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={run}
          disabled={animating}
          className="flex items-center gap-1.5 rounded-lg px-5 py-2.5 font-sans text-[13px] font-semibold text-accent-contrast transition-[background-color,transform] duration-200 enabled:hover:scale-[1.02] enabled:active:scale-[0.98] disabled:cursor-not-allowed"
          style={{
            background: animating
              ? "var(--hero-accent-dim)"
              : "var(--hero-accent)",
          }}
        >
          {animating ? (
            <TbLoader2 size={13} className="journey-spin" aria-hidden="true" />
          ) : (
            <TbPlayerPlay size={13} aria-hidden="true" />
          )}
          {animating ? "Running..." : hasRun ? "Run again" : "Send request"}
        </button>

        {status && (
          <span
            className="journey-log-line rounded-full px-2.5 py-1 font-mono text-[11px] font-medium"
            style={{
              background: tone.bg,
              color: tone.color,
              border: `0.5px solid ${tone.border}`,
            }}
          >
            {status.text}
          </span>
        )}

        {!hasRun && !animating && (
          <span className="font-sans text-[11px] text-hero-muted">
            Click any node to explore that skill
          </span>
        )}
      </div>

      {/* ---- Detail panel ---------------------------------- */}
      {selectedNode !== null && (
        <SkillDetailPanel
          key={journeyNodes[selectedNode].id}
          node={journeyNodes[selectedNode]}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </Reveal>
  );
};

export default JourneyVisualizer;
