import { education } from "../constants"; // Import the education data
import { Reveal, ScrollProgressLine, Stagger } from "../animation";

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 pb-24 clip-path-custom-3"
      style={{
        backgroundImage:
          "linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%)",
        backgroundBlendMode: "overlay", // optional: helps blend if you want
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
     <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
      {/* Section Title */}
      <Reveal className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EDUCATION</h2>
        <div className="w-32 h-1 bg-accent mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          My education has been a journey of learning and development. Here are
          the details of my academic background
        </p>
      </Reveal>

      {/* Education Timeline */}
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Vertical line — fills with the accent colour on scroll.
            -translate-x-1/2 at every width so the rule is centred on the
            same axis as the node circles; `sm:-translate-x-0` used to leave
            it 2px to their right. */}
        <ScrollProgressLine className="absolute left-6 md:left-8 lg:left-1/2 transform -translate-x-1/2 w-1 rounded-full bg-white/15 h-full" />

        {/* Education Entries */}
        <Stagger step={160} as="div">
          {education.map((edu, index) => (
            <div
              key={edu.id}
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
              <div className="absolute left-6 md:left-8 lg:left-1/2 transform -translate-x-1/2 bg-gray-400 border-4 border-accent w-12 h-12 lg:w-16 lg:h-16 rounded-full flex justify-center items-center z-10">
                <img
                  src={edu.img}
                  alt={edu.school}
                  width={edu.imgW}
                  height={edu.imgH}
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
                className="w-full lg:w-[calc(50%-3.5rem)] p-4 sm:p-8 rounded-2xl border border-white bg-gray-900 shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] transform transition-transform duration-300 hover:scale-105"
              >
                {/* Flex container for image and text */}
                <div className="flex items-center space-x-6">
                  {/* School Logo/Image */}
                  <div className="w-24 h-16 bg-white rounded-md overflow-hidden">
                    <img
                      src={edu.img}
                      alt={edu.school}
                      width={edu.imgW}
                      height={edu.imgH}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Degree, School Name, and Date */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-xl font-semibold text-white">
                        {edu.degree}
                      </h3>
                      <h4 className="text-md sm:text-sm text-gray-300">
                        {edu.school}
                      </h4>
                    </div>
                    {/* Date at the bottom */}
                    <p className="text-sm text-gray-500 mt-2 font-sans">
                      {edu.date}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-400">{edu.desc}</p>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
     </div>
    </section>
  );
};

export default Education;
