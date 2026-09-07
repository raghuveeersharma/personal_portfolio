import { journeyTools } from "../../constants.js";
import { Stagger } from "../../animation";
import ICONS from "./icons.js";

/**
 * Supporting tools. Lives *outside* the visualiser card, below it, as
 * a deliberately lower-weight element: chips stagger in once on scroll
 * and then sit still.
 */
const ToolsRow = () => (
  <div className="mt-10">
    <p className="mb-3.5 font-sans text-[10px] tracking-[0.12em] text-hero-muted uppercase">
      Tools and ecosystem
    </p>

    <Stagger step={50} delay={200} className="flex flex-wrap gap-2">
      {journeyTools.map((tool) => {
        const Icon = ICONS[tool.icon];

        return (
          <div
            key={tool.label}
            /* Same chip treatment as the hero's stack chips, so the
               same two classes: `brand-hue` resolves the hue for the
               active theme, `tech-chip` paints with the result. */
            className="brand-hue tech-chip flex items-center gap-1.5 rounded-lg border-[0.5px] px-3 py-1.5"
            style={{
              "--brand-color": tool.color,
              "--brand-bg": tool.bg,
              "--brand-border": tool.border,
              "--reveal-distance": "8px",
            }}
          >
            <Icon size={14} color="currentColor" aria-hidden="true" />
            <span className="font-sans text-[11px] font-medium">
              {tool.label}
            </span>
          </div>
        );
      })}
    </Stagger>
  </div>
);

export default ToolsRow;
