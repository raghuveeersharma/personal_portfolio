import { SkillsInfo } from "../constants.js";
import Tilt from "react-parallax-tilt";

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient clip-path-custom"
      style={{
        backgroundImage:
          "linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%)",
        backgroundBlendMode: "overlay", // optional: helps blend if you want
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* section title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">SKILLS</h1>
        <hr className="w-32 h-1 text-[#8245ec] mx-auto" />
        <p className="text-gray-400 font-semibold mt-5 text-lg">
          Full Stack Developer skilled in MERN stack with expertise in React.js,
          Next.js, Tailwind CSS, Node.js, Express.js and MongoDB. Proficient in
          building responsive, scalable web applications with a focus on
          performance and design.
        </p>
      </div>
      {/* Skill Categories */}
      <div className="flex flex-wrap gap-1 lg:gap-5 py-10 justify-between">
        {SkillsInfo.map((category) => (
          <div
            key={category.title}
            className="bg-gray-900 backdrop-blur-md px-6 sm:px-8 py-8 sm:py-4 mb-10 w-full sm:w-[48%] rounded-2xl border border-white 
          shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] hover:bg-black/5 transition-all duration-500 ease-in-out transform hover:-translate-y-2"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
              {category.title}
            </h3>

            {/* Skill Items - 3 per row on larger screens */}
            <Tilt
              key={category.title}
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
                    className="flex items-center justify-center space-x-2 bg-transparent border-2 border-gray-700 rounded-3xl py-2 px-2 sm:py-2 sm:px-2 text-center w-28 h-12"
                  >
                    <img
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      className="w-4 h-4 sm:w-6 sm:h-6 rounded"
                    />
                    <span className="text-xs text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
