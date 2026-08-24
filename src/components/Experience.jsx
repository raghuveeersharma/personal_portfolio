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
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Vertical line — fills with the accent colour on scroll.
            -translate-x-1/2 at every width so the rule is centred on the
            same axis as the node circles; `sm:-translate-x-0` used to leave
            it 2px to their right. */}
        <ScrollProgressLine className="absolute left-0 lg:left-1/2 transform -translate-x-1/2 w-1 rounded-full bg-white/15 h-full" />

        {/* Experience Entries */}
        <Stagger step={160} as="div">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              // Per-child data-reveal wins over Stagger's default, so
              // each entry slides in from its own side of the timeline.
              data-reveal={index % 2 === 0 ? "fade-left" : "fade-right"}
              // Below lg this is a single left-aligned column, and the
              // offset that clears the node circle is padding on the row,
              // not a margin on a `w-full` card — that overflowed the track
              // by the width of the margin and only stayed invisible because
              // the section's own padding absorbed it.
              className={`flex flex-col lg:flex-row items-center mb-16 pl-8 lg:pl-0 ${
                index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"
              }`}
            >
              {/* Timeline Circle */}
              <div className="absolute left-0 lg:left-1/2 transform -translate-x-1/2 bg-gray-400 border-4 border-accent w-12 h-12 lg:w-16 lg:h-16 rounded-full flex justify-center items-center z-10">
                <img
                  src={exp.img}
                  alt={exp.company}
                  width={exp.imgW}
                  height={exp.imgH}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Content Section */}
              <div
                // The card owns exactly half the track minus the gutter, so
                // it ends where the spine begins instead of being pushed
                // away from it: `max-w-md` + `mr-44`/`ml-44` left a 214px
                // void at 1440px, because a margin on the far side of a
                // justify-start/end flex item does not move the item at all.
                // Which side it lands on is the row's justify-*, so no
                // margin ternary is needed (or wanted — see git log).
                className="w-full lg:w-[calc(50%-3.5rem)] p-4 sm:p-8 rounded-2xl border border-white bg-gray-900 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] transform transition-transform duration-300 hover:scale-105"
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
                      loading="lazy"
                      decoding="async"
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
