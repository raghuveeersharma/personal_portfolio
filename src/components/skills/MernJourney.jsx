import { Reveal } from "../../animation";
import JourneyVisualizer from "./JourneyVisualizer.jsx";
import ToolsRow from "./ToolsRow.jsx";

/**
 * "The MERN stack in action" — the interactive half of the Skills
 * section, rendered below the skill grid inside the same #skills
 * section (navigation is anchor-based, so the id stays singular).
 *
 * Nothing here auto-plays: the visitor presses the button. An
 * animation that starts itself on scroll reads as intrusive, and the
 * point of the interaction is that they chose to trigger the request.
 */
const MernJourney = () => (
  <div className="pt-16">
    <Reveal className="mb-10" duration={400}>
      <p className="font-sans text-[10px] tracking-[0.14em] text-hero-muted uppercase">
        Technical skills
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold text-[#E8E8F4] sm:text-[28px]">
        The MERN stack in action
      </h3>
      <p className="mt-1.5 max-w-[480px] text-[13px] text-hero-dim">
        Press &ldquo;Send request&rdquo; to watch a real API call travel
        through every layer of the stack — click any node to explore that
        technology in depth.
      </p>
    </Reveal>

    <JourneyVisualizer />
    <ToolsRow />
  </div>
);

export default MernJourney;
