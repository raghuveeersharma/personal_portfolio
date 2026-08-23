import { experiences } from "../constants";
import { Reveal, ScrollProgressLine, Stagger } from "../animation";

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[4vw] clip-path-custom-2"
      style={{
        backgroundImage:
          "linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%)",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Section Title */}
      <Reveal className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EXPERIENCE</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A short timeline of the teams I have built with — from my first
          frontend internship to full-time full-stack work
        </p>
      </Reveal>

      {/* Experience Timeline */}
      <div className="relative">
        {/* Vertical line — fills with the accent colour on scroll */}
        <ScrollProgressLine className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 sm:-translate-x-0 w-1 rounded-full bg-white/15 h-full" />

        {/* Experience Entries */}
        <Stagger step={160} as="div">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              // Per-child data-reveal wins over Stagger's default, so
              // each entry slides in from its own side of the timeline.
              data-reveal={index % 2 === 0 ? "fade-left" : "fade-right"}
              className={`flex flex-col sm:flex-row items-center mb-16 ${
                index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
              }`}
            >
              {/* Timeline Circle */}
              <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 bg-gray-400 border-4 border-accent w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center z-10">
                <img
                  src={exp.img}
                  alt={exp.company}
                  width={exp.imgW}
                  height={exp.imgH}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Content Section */}
              <div
                // One margin class per side, chosen by the ternary. Emitting
                // `sm:ml-0` *and* `sm:ml-44` did nothing: class order in this
                // string is not precedence — CSS source order is, and
                // Tailwind emits ml-44 after ml-0, so the entry always got
                // both 44s and squeezed to ~198px in the 640-768px range.
                className={`w-full sm:max-w-md p-4 sm:p-8 rounded-2xl border border-white bg-gray-900 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] ${
                  index % 2 === 0 ? "sm:ml-0 sm:mr-44" : "sm:ml-44 sm:mr-0"
                } ml-8 transform transition-transform duration-300 hover:scale-105`}
              >
                {/* Flex container for logo and text */}
                <div className="flex items-center space-x-6">
                  {/* Company Logo */}
                  <div className="w-24 h-16 bg-white rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      src={exp.img}
                      alt={exp.company}
                      width={exp.imgW}
                      height={exp.imgH}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Role, Company and Date */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-xl font-semibold text-white">
                        {exp.role}
                      </h3>
                      <h4 className="text-md sm:text-sm text-gray-300">
                        {exp.company}
                      </h4>
                    </div>
                    {/* Date at the bottom */}
                    <p className="text-sm text-gray-500 mt-2 font-sans">
                      {exp.date} &middot; {exp.type}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-400">{exp.desc}</p>

                {/* Tech used */}
                <div className="mt-4">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-gray-800 text-purple-400 text-xs font-semibold font-sans mr-2 px-2 py-1 mb-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Experience;
