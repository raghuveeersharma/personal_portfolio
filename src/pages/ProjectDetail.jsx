import { useParams, Link } from "react-router-dom";
import { projects } from "../constants";
import { Reveal, Stagger } from "../animation";
import BlurBlob from "../BlurBlob";
import Footer from "../components/Footer";
import { useEffect } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => String(p.id) === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="bg-[#050414] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold transition-all duration-300 hover:bg-accent-deep hover:shadow-[0_0_20px_1px_rgba(130,69,236,0.4)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Find adjacent projects for navigation
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="bg-[#050414] min-h-screen relative">
      <BlurBlob
        position={{ top: "20%", left: "15%" }}
        size={{ width: "25%", height: "35%" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-50 bg-[#050414]/80 backdrop-blur-xl border-b border-white/5">
          <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
            <div className="flex items-center justify-between py-4">
              <Link
                to="/#projects"
                className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 font-sans text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                All Projects
              </Link>

              <span className="text-gray-500 font-sans text-xs tracking-wider uppercase">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Hero image section */}
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10 pt-8 md:pt-12">
          <Reveal variant="fade-up">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_1px_rgba(130,69,236,0.2)] group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050414] via-transparent to-transparent z-10 pointer-events-none" />
              {typeof project.image === "string" &&
              !project.image.startsWith("/") &&
              !project.image.startsWith("http") &&
              !project.image.startsWith("data:") ? (
                <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-6xl font-bold text-gray-600 font-sans">
                    {project.title}
                  </span>
                </div>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  width={project.imgW}
                  height={project.imgH}
                  className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
              )}
            </div>
          </Reveal>
        </div>

        {/* Project content */}
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10 pt-10 md:pt-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Left column: Title, description */}
            <div className="lg:col-span-2">
              <Reveal variant="fade-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-6 leading-tight">
                  {project.title}
                </h1>
              </Reveal>

              <Reveal variant="fade-up" delay={100}>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10">
                  {project.description}
                </p>
              </Reveal>

              {/* Tech stack grid */}
              <Reveal variant="fade-up" delay={200}>
                <div className="mb-10">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider font-sans mb-5 flex items-center gap-2">
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
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    Tech Stack
                  </h2>
                  <Stagger variant="scale-in" step={40}>
                    <div className="flex flex-wrap gap-2.5">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-sans font-medium bg-gray-800/80 text-purple-300 border border-purple-500/15 transition-all duration-300 hover:border-purple-500/40 hover:bg-gray-800 hover:shadow-[0_0_12px_1px_rgba(130,69,236,0.15)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Stagger>
                </div>
              </Reveal>

              {/* Action buttons - mobile */}
              <Reveal variant="fade-up" delay={300}>
                <div className="flex flex-wrap gap-4 lg:hidden">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 bg-gray-900 text-gray-300 font-sans text-sm font-medium transition-all duration-300 hover:border-purple-500/40 hover:text-white hover:shadow-[0_0_20px_1px_rgba(130,69,236,0.2)]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      View Source
                    </a>
                  )}
                  {project.webapp && (
                    <a
                      href={project.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent text-white font-sans text-sm font-medium transition-all duration-300 hover:bg-accent-deep hover:shadow-[0_0_20px_1px_rgba(130,69,236,0.4)]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
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
                      Live Demo
                    </a>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Right column: Sidebar */}
            <div className="lg:col-span-1">
              <Reveal variant="fade-left" delay={200}>
                <div className="sticky top-24 space-y-6">
                  {/* Links card */}
                  <div className="rounded-2xl border border-white/10 bg-gray-900/60 backdrop-blur-sm p-6 shadow-[0_0_20px_1px_rgba(130,69,236,0.1)]">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider font-sans mb-5">
                      Project Links
                    </h3>
                    <div className="space-y-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-gray-800/40 text-gray-300 font-sans text-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-gray-800/80 hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0 text-gray-500 group-hover:text-purple-400 transition-colors"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                          <div className="min-w-0">
                            <div className="font-medium">Source Code</div>
                            <div className="text-xs text-gray-500 truncate">
                              github.com
                            </div>
                          </div>
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
                            className="ml-auto shrink-0 text-gray-600 group-hover:text-purple-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </a>
                      )}
                      {project.webapp && (
                        <a
                          href={project.webapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-purple-500/20 bg-accent/10 text-white font-sans text-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-accent/20"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0 text-purple-400"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                          <div className="min-w-0">
                            <div className="font-medium">Live Demo</div>
                            <div className="text-xs text-gray-400 truncate">
                              View deployed project
                            </div>
                          </div>
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
                            className="ml-auto shrink-0 text-purple-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Quick info card */}
                  <div className="rounded-2xl border border-white/10 bg-gray-900/60 backdrop-blur-sm p-6 shadow-[0_0_20px_1px_rgba(130,69,236,0.1)]">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider font-sans mb-5">
                      Quick Info
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 border border-white/5 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-purple-400"
                          >
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-sans">
                            Technologies
                          </div>
                          <div className="text-sm text-gray-300 font-sans font-medium">
                            {project.tags.length} tools used
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 border border-white/5 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-purple-400"
                          >
                            <rect
                              x="2"
                              y="3"
                              width="20"
                              height="14"
                              rx="2"
                              ry="2"
                            />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-sans">
                            Category
                          </div>
                          <div className="text-sm text-gray-300 font-sans font-medium">
                            {project.tags.some(
                              (t) =>
                                t.toLowerCase().includes("node") ||
                                t.toLowerCase().includes("express") ||
                                t.toLowerCase().includes("mongo") ||
                                t.toLowerCase().includes("postgres")
                            )
                              ? "Full Stack"
                              : "Frontend"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Project navigation */}
          <Reveal variant="fade-up" delay={400}>
            <div className="mt-20 pt-10 border-t border-white/5">
              <div className="flex items-center justify-between">
                {prevProject ? (
                  <Link
                    to={`/project/${prevProject.id}`}
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 max-w-[45%]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
                    >
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500 font-sans uppercase tracking-wider mb-1">
                        Previous
                      </div>
                      <div className="text-sm sm:text-base font-medium truncate">
                        {prevProject.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextProject ? (
                  <Link
                    to={`/project/${nextProject.id}`}
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 text-right max-w-[45%]"
                  >
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500 font-sans uppercase tracking-wider mb-1">
                        Next
                      </div>
                      <div className="text-sm sm:text-base font-medium truncate">
                        {nextProject.title}
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetail;
