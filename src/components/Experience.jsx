import { experiences } from "../constants";
import { Reveal, ScrollProgressLine, Stagger } from "../animation";

const Experience = () => {
  return (
    <section
      id="experience"
      className="section-wash py-24 pb-24 clip-path-custom-2"
    >
     <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
      {/* Section Title */}
      <Reveal className="text-center mb-16">
        <h2 className="text-4xl font-bold text-content">EXPERIENCE</h2>
        <div className="w-32 h-1 bg-accent mx-auto mt-4"></div>
        <p className="text-content-muted mt-4 text-lg">
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
        <ScrollProgressLine className="absolute left-6 md:left-8 lg:left-1/2 transform -translate-x-1/2 w-1 rounded-full bg-border h-full" />

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
              className={`flex flex-col lg:flex-row items-center mb-16 pl-16 md:pl-20 lg:pl-0 ${
                index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"
              }`}
            >
              {/* Timeline Circle */}
              <div className="absolute left-6 md:left-8 lg:left-1/2 transform -translate-x-1/2 bg-content-muted border-4 border-accent w-12 h-12 lg:w-16 lg:h-16 rounded-full flex justify-center items-center z-10">
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
                className="w-full lg:w-[calc(50%-3.5rem)] p-4 sm:p-8 rounded-2xl border border-border-subtle bg-surface dark:shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] transform transition-transform duration-300 hover:scale-105"
              >
                {/* Flex container for logo and text */}
                <div className="flex items-center space-x-6">
                  {/* Company Logo */}
                  {/* Stays white in both themes: these are company
                      logos drawn as dark artwork for a light plate, so
                      theming the plate would make them unreadable. On
                      light it simply blends into the card. */}
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
                      <h3 className="text-xl sm:text-xl font-semibold text-content">
                        {exp.role}
                      </h3>
                      <h4 className="text-md sm:text-sm text-content-soft">
                        {exp.company}
                      </h4>
                    </div>
                    {/* Date at the bottom */}
                    <p className="text-sm text-content-subtle mt-2 font-sans">
                      {exp.date} &middot; {exp.type}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-content-muted">{exp.desc}</p>

                {/* Tech used */}
                <div className="mt-4">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-surface-raised text-accent-text text-xs font-semibold font-sans mr-2 px-2 py-1 mb-2 rounded-full"
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
     </div>
    </section>
  );
};

export default Experience;
