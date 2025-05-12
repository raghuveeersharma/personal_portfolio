import { projects } from "../constants";
import { useState } from "react";

const Projects = () => {
  const [project, setProject] = useState(null);
  const handelOpenProject = (project) => () => {
    setProject(project);
  };
  const handleCloseProject = () => {
    setProject(null);
  };
  // Function to handle opening a project
  return (
    <section
      id="projects"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[14vw] font-sans relative "
    >
      {/* section title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-200">
          PROJECTS
        </h2>
        <hr className="w-48 h-1 text-[#8245ec] mx-auto" />
        <p className="text-gray-400 mt-4 font-semibold">
          Throughout my academic & professional journey, I have worked on
          various projects that demonstrate my expertise in modern technologies.
          My projects primarily utilize the MERN stack (MongoDB, Express.js,
          React.js, Node.js), showcasing my ability to create full-stack
          applications.
        </p>
      </div>
      {/* project grid */}
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={handelOpenProject(project)}
            className="bg-gray-900 backdrop-blur-md rounded-2xl border border-white hover:shadow-purple-500/50 shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
          >
            <div className="p-4">
              <img
                src={project.image}
                alt={project.title}
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
                    className="inline-block bg-gray-800 text-purple-400 text-xs font-semibold mr-2 px-2 py-1 mb-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* modal container */}
      {project && (
        <div className="fixed top-0 inset-0 mx-auto h-screen flex items-center justify-center z-50 bg-black/70">
          <div className="bg-gray-900 lg:w-full w-[90%] max-w-xl backdrop-blur-md rounded-2xl border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] overflow-hidden relative">
            <div className="flex justify-end ">
              <button
                className="text-white text-3xl font-semibold mr-4 hover:text-purple-400 transition duration-300"
                onClick={handleCloseProject}
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full object-cover rounded-2xl"
              />
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-2xl font-semibold mb-2 text-gray-100">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-1 md:mb-4 pt-2 md:pt-5 ">
                {project.description}
              </p>
              <div>
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-800 text-purple-400 text-xs font-semibold mr-2 px-2 py-1 mb-2 rounded-full"
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
                className="hover:bg-[#8245ec] bg-gray-800 transition ease-in-out duration-500 cursor-pointer text-white w-1/2 px-4 py-2 rounded-lg"
              >
                VIEW CODE
              </a>
              <a
                href={project.webapp}
                target="_blank"
                className="hover:bg-[#8245ec] bg-gray-800 transition ease-in-out duration-500 cursor-pointer text-white w-1/2 px-4 py-2 rounded-lg"
              >
                LIVE
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
