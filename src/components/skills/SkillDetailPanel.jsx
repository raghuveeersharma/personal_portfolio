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
    <div
      className="journey-log-line mt-4 rounded-xl px-5 py-5 sm:px-6"
      style={{
        background: node.bg,
        border: `0.5px solid ${node.border}`,
      }}
    >
      {/* Header */}
      <div className="mb-3.5 flex items-center gap-2.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ background: "#111118", border: `0.5px solid ${node.border}` }}
        >
          <Icon size={18} color={node.color} aria-hidden="true" />
        </div>

        <div>
          <div className="text-sm font-medium text-[#E8E8F4]">{node.label}</div>
          <div className="font-sans text-[10px]" style={{ color: node.color }}>
            {node.layer}
          </div>
        </div>

        <span
          className="ml-auto rounded-full px-2.5 py-[3px] font-sans text-[10px]"
          style={{
            background: "#111118",
            color: node.color,
            border: `0.5px solid ${node.border}`,
          }}
        >
          {node.detail.years}
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${node.label} details`}
          className="cursor-pointer p-1 text-hero-muted transition-colors duration-200 hover:text-[#8C8CAA]"
        >
          <TbX size={16} aria-hidden="true" />
        </button>
      </div>

      <div
        className="mb-3.5 h-[0.5px]"
        style={{ background: node.border + "66" }}
      />

      <p className="mb-3 text-[13px] leading-relaxed text-[#E8E8F4]">
        {node.detail.headline}
      </p>

      <ul className="mb-4 flex list-none flex-col gap-[7px]">
        {node.detail.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className="mt-px text-xs"
              style={{ color: node.color }}
            >
              ▸
            </span>
            <span className="text-xs leading-relaxed text-[#8C8CAA]">
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
            className="rounded-full border-[0.5px] border-[#2A2A3F] bg-[#111118] px-2.5 py-[2px] font-sans text-[10px] text-[#8C8CAA]"
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
