import { projects } from "../constants";
import { useEffect, useRef, useState } from "react";
import { Reveal, Stagger } from "../animation";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const Projects = () => {
  const [project, setProject] = useState(null);
  const modalRef = useRef(null);
  const lastFocusedRef = useRef(null);
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
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[14vw] relative "
    >
      {/* section title */}
      <Reveal className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-200">
          PROJECTS
        </h2>
        <hr className="w-48 h-1 text-accent mx-auto" />
        <p className="text-gray-400 mt-4 font-semibold">
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
        {projects.map((project) => (
          // Wrapper carries the reveal so the card keeps its own
          // transition-transform duration-300 for the hover lift.
          <div key={project.id}>
            <div
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
              onClick={handelOpenProject(project)}
              onKeyDown={handleProjectKeyDown(project)}
              className="h-full bg-gray-900 backdrop-blur-md rounded-2xl border border-white hover:shadow-purple-500/50 shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d6ef5]"
            >
              <div className="p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  width={project.imgW}
                  height={project.imgH}
                  className="w-full h-48 object-cover rounded-2xl mb-2 p-2"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-100">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 pt-5 line-clamp-3">
                  {project.description}
                </p>
                <div>
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-800 text-purple-400 text-xs font-semibold font-sans mr-2 px-2 py-1 mb-2 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Stagger>
      {/* modal container */}
      {project && (
        <div
          className="fixed top-0 inset-0 mx-auto h-screen flex items-center justify-center z-50 bg-black/70"
          onClick={handleBackdropClick}
        >
          <Reveal
            variant="zoom-in"
            duration={300}
            className="bg-gray-900 lg:w-full w-[90%] max-w-xl backdrop-blur-md rounded-2xl border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] overflow-hidden relative"
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
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-800 text-purple-400 text-xs font-semibold font-sans mr-2 px-2 py-1 mb-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center text-sm md:text-lg items-center text-center gap-4 mb-4 md:mb-6 px-10">
              <a
                href={project.github}
                target="_blank"
                className="hover:bg-accent bg-gray-800 transition ease-in-out duration-500 cursor-pointer text-white w-1/2 px-4 py-2 rounded-lg font-sans text-sm"
              >
                VIEW CODE
              </a>
              <a
                href={project.webapp}
                target="_blank"
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
