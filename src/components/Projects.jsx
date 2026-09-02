import { projects } from "../constants";
import { useEffect, useRef, useState } from "react";
import { Reveal, Stagger } from "../animation";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const FEATURED_COUNT = 6;
const CARD_TAG_CAP = 4;
const MODAL_TAG_CAP = 5;

/** Render a capped list of tag pills with a "+N" overflow indicator. */
const TagList = ({ tags, cap }) => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? tags : tags.slice(0, cap);
  const overflow = expanded ? 0 : tags.length - cap;
  return (
    <>
      {visible.map((tag, index) => (
        <span
          key={index}
          className="inline-block bg-gray-800 text-purple-400 text-xs font-semibold font-sans mr-2 px-2 py-1 mb-2 rounded-full"
        >
          {tag}
        </span>
      ))}
      {overflow > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(true);
          }}
          className="inline-block bg-gray-800/60 hover:bg-gray-700 text-gray-400 hover:text-white text-xs font-semibold font-sans mr-2 px-2 py-1 mb-2 rounded-full cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d6ef5]"
        >
          +{overflow} more
        </button>
      )}
    </>
  );
};

const Projects = () => {
  const [project, setProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const modalRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const visibleProjects = showAll ? projects : projects.slice(0, FEATURED_COUNT);
  const handelOpenProject = (project) => (event) => {
    lastFocusedRef.current = event.currentTarget;
    setProject(project);
  };
  const handleCloseProject = () => {
    setProject(null);
  };
  // Cards are divs (a real <button> may not contain the <h3>), so Enter/Space
  // have to be wired up by hand to match native button activation.
  const handleProjectKeyDown = (project) => (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      lastFocusedRef.current = event.currentTarget;
      setProject(project);
    }
  };
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseProject();
    }
  };

  // Dialog behaviour: lock body scroll, trap focus inside the panel, close on
  // Escape, and return focus to the card that opened it.
  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const node = modalRef.current;
    const focusables = node
      ? Array.from(node.querySelectorAll(FOCUSABLE_SELECTOR))
      : [];
    (focusables[0] || node)?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseProject();
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedRef.current?.focus();
    };
  }, [project]);
  // Function to handle opening a project
  return (
    <section
      id="projects"
      className="py-24 pb-24 relative"
    >
     <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
      {/* section title */}
      <Reveal className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-200">
          PROJECTS
        </h2>
        <div className="w-32 h-1 bg-accent mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4">
          Throughout my academic & professional journey, I have worked on
          various projects that demonstrate my expertise in modern technologies.
          My projects primarily utilize the MERN stack (MongoDB, Express.js,
          React.js, Node.js), showcasing my ability to create full-stack
          applications.
        </p>
      </Reveal>
      {/* project grid */}
      <Stagger
        variant="rise"
        step={80}
        className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {visibleProjects.map((project) => (
          // Wrapper carries the reveal so the card keeps its own
          // transition-transform duration-300 for the hover lift.
          <div key={project.id}>
            <div
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
              onClick={handelOpenProject(project)}
              onKeyDown={handleProjectKeyDown(project)}
              // bg-gray-900 is opaque — a backdrop-filter here only cost
              // a compositor layer for a blur nothing could ever show.
              className="group h-full bg-gray-900 rounded-2xl border border-white/10 hover:shadow-purple-500/50 shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d6ef5]"
            >
              <div className="relative p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  width={project.imgW}
                  height={project.imgH}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover rounded-2xl mb-2 p-2"
                />
                {/* Hover overlay with Live button */}
                <div className="absolute inset-0 m-4 rounded-2xl bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <a
                    href={project.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-white text-sm font-semibold tracking-wide shadow-lg hover:bg-accent-deep transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d6ef5]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-100">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 pt-5 line-clamp-3">
                  {project.description}
                </p>
                <div>
                  <TagList tags={project.tags} cap={CARD_TAG_CAP} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Stagger>
      {/* show more / show less toggle */}
      {projects.length > FEATURED_COUNT && (
        <Reveal className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 bg-gray-900 text-gray-300 text-sm font-medium tracking-wide transition-all duration-300 hover:border-purple-500/40 hover:text-white hover:shadow-[0_0_20px_1px_rgba(130,69,236,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d6ef5]"
          >
            {showAll ? (
              <>
                Show Less
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </>
            ) : (
              <>
                Show All Projects
                <span className="text-purple-400 text-xs font-semibold">
                  +{projects.length - FEATURED_COUNT}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </>
            )}
          </button>
        </Reveal>
      )}
     </div>
      {/* modal container */}
      {project && (
        <div
          className="fixed top-0 inset-0 mx-auto h-screen flex items-center justify-center z-50 bg-black/70"
          onClick={handleBackdropClick}
        >
          <Reveal
            variant="zoom-in"
            duration={300}
            // Opaque panel; the dimming behind it is the overlay's
            // bg-black/70, not a blur of the page.
            className="bg-gray-900 lg:w-full w-[90%] max-w-xl rounded-2xl border border-white/10 shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] overflow-hidden relative"
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              tabIndex={-1}
            >
            <div className="flex justify-end ">
              <button
                className="text-white text-3xl font-semibold mr-4 hover:text-purple-400 transition duration-300"
                onClick={handleCloseProject}
                aria-label="Close project details"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <img
                src={project.image}
                alt={project.title}
                width={project.imgW}
                height={project.imgH}
                className="w-full h-56 object-cover rounded-2xl"
              />
            </div>
            <div className="p-4 md:p-6">
              <h3
                id="project-modal-title"
                className="text-2xl font-semibold mb-2 text-gray-100"
              >
                {project.title}
              </h3>
              <p className="text-gray-400 mb-1 md:mb-4 pt-2 md:pt-5 ">
                {project.description}
              </p>
              <div>
                <TagList tags={project.tags} cap={MODAL_TAG_CAP} />
              </div>
            </div>
            <div className="flex justify-center text-sm md:text-lg items-center text-center gap-4 mb-4 md:mb-6 px-10">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-accent bg-gray-800 transition ease-in-out duration-500 cursor-pointer text-white w-1/2 px-4 py-2 rounded-lg font-sans text-sm"
              >
                VIEW CODE
              </a>
              <a
                href={project.webapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-accent bg-gray-800 transition ease-in-out duration-500 cursor-pointer text-white w-1/2 px-4 py-2 rounded-lg font-sans text-sm"
              >
                LIVE
              </a>
            </div>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
};

export default Projects;
