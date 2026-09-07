import PropTypes from "prop-types";
import { TbX } from "react-icons/tb";
import ICONS from "./icons.js";

/**
 * The panel under the visualiser: what this technology actually means
 * in terms of work done. Opens for exactly one node at a time — the
 * parent keys this component on the node, so switching nodes remounts
 * it and the entrance replays as a cross-fade.
 */
const SkillDetailPanel = ({ node, onClose }) => {
  const Icon = ICONS[node.icon];

  return (
    /* One brand-hue scope for the whole panel — see the contract in
       styles/theme.css. */
    <div
      className="brand-hue journey-log-line mt-4 rounded-xl px-5 py-5 sm:px-6"
      style={{
        "--brand-color": node.color,
        "--brand-bg": node.bg,
        "--brand-border": node.border,
        background: "var(--brand-surface)",
        border: "0.5px solid var(--brand-line)",
      }}
    >
      {/* Header */}
      <div className="mb-3.5 flex items-center gap-2.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{
            background: "var(--surface)",
            border: "0.5px solid var(--brand-line)",
          }}
        >
          <Icon size={18} color="var(--brand-ink)" aria-hidden="true" />
        </div>

        <div>
          <div className="text-sm font-medium text-hero-text">{node.label}</div>
          <div
            className="font-sans text-[10px]"
            style={{ color: "var(--brand-ink)" }}
          >
            {node.layer}
          </div>
        </div>

        <span
          className="ml-auto rounded-full px-2.5 py-[3px] font-sans text-[10px]"
          style={{
            background: "var(--surface)",
            color: "var(--brand-ink)",
            border: "0.5px solid var(--brand-line)",
          }}
        >
          {node.detail.years}
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${node.label} details`}
          className="cursor-pointer p-1 text-hero-muted transition-colors duration-200 hover:text-hero-dim"
        >
          <TbX size={16} aria-hidden="true" />
        </button>
      </div>

      <div
        className="mb-3.5 h-[0.5px]"
        style={{
          background: "color-mix(in srgb, var(--brand-line) 40%, transparent)",
        }}
      />

      <p className="mb-3 text-[13px] leading-relaxed text-hero-text">
        {node.detail.headline}
      </p>

      <ul className="mb-4 flex list-none flex-col gap-[7px]">
        {node.detail.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className="mt-px text-xs"
              style={{ color: "var(--brand-ink)" }}
            >
              ▸
            </span>
            <span className="text-xs leading-relaxed text-hero-dim">
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2">
        <span className="font-sans text-[10px] text-hero-muted">Used in:</span>
        {node.detail.projects.map((project) => (
          <span
            key={project}
            className="rounded-full border-[0.5px] border-border bg-surface px-2.5 py-[2px] font-sans text-[10px] text-hero-dim"
          >
            {project}
          </span>
        ))}
      </div>
    </div>
  );
};

SkillDetailPanel.propTypes = {
  node: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SkillDetailPanel;
