import { SkillsInfo } from "../constants.js";
import Tilt from "react-parallax-tilt";
import { Reveal, Stagger } from "../animation";
import MernJourney from "./skills/MernJourney.jsx";

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 pb-24 clip-path-custom"
      style={{
        backgroundImage:
          "linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%)",
        backgroundBlendMode: "overlay", // optional: helps blend if you want
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
     <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
      {/* section title */}
      <Reveal className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-100">SKILLS</h2>
        <div className="w-32 h-1 bg-accent mx-auto mt-4"></div>
        <p className="text-gray-400 font-semibold mt-5 text-lg">
          Full Stack Developer skilled in MERN stack with expertise in React.js,
          Next.js, Tailwind CSS, Node.js, Express.js and MongoDB. Proficient in
          building responsive, scalable web applications with a focus on
          performance and design.
        </p>
      </Reveal>
      {/* Interactive half of the section — the grid says *what*, this
          says *how the pieces talk to each other*. */}
      <MernJourney />
      {/* Skill Categories */}
      <Stagger
        step={140}
        delay={100}
        className="flex flex-wrap gap-1 lg:gap-5 py-10 justify-between"
      >
        {SkillsInfo.map((category) => (
          // The reveal lives on this wrapper, not on the card itself: the
          // reveal's transition-property/duration would otherwise replace
          // the card's own transition-all duration-500 and make its hover
          // lift snap instantly.
          <div key={category.title} className="w-full sm:w-[48%] mb-10">
            <div
              // No backdrop-blur: `bg-gray-900` is opaque, so there is
              // nothing behind the card to blur. It used to become visible
              // on hover only because `hover:bg-black/5` *replaced* the
              // opaque background rather than layering over it — which
              // dropped the card's surface to the page colour and made the
              // hovered card recede. The lift is the whole affordance.
              className="h-full bg-gray-900 px-6 sm:px-8 py-8 sm:py-4 rounded-2xl border border-white
          shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] transition-all duration-500 ease-in-out transform hover:-translate-y-2"
            >
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
                {category.title}
              </h3>

              {/* Skill Items - 3 per row on larger screens */}
              <Tilt
                tiltMaxAngleX={20}
                tiltMaxAngleY={20}
                perspective={1000}
                scale={1.05}
                transitionSpeed={1000}
                gyroscope={true}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      // Fluid width, not a fixed w-28: 112px per pill is
                      // wider than a grid column on a small phone (12vw
                      // section padding + the card's px-6), so the pills
                      // used to spill over the card's own border.
                      className="flex min-w-0 h-12 w-full items-center justify-center gap-x-1.5 rounded-3xl border-2 border-gray-700 bg-transparent px-2 py-2 text-center"
                    >
                      <img
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        width={skill.logoW}
                        height={skill.logoH}
                        loading="lazy"
                        decoding="async"
                        className="w-4 h-4 sm:w-6 sm:h-6 shrink-0 rounded"
                      />
                      <span className="min-w-0 font-sans text-[11px] leading-tight text-gray-300 sm:text-xs">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Tilt>
            </div>
          </div>
        ))}
      </Stagger>
     </div>
    </section>
  );
};

export default Skills;
