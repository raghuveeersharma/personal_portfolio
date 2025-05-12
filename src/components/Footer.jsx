import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { TbBrandLeetcode } from "react-icons/tb";

const Footer = () => {
  // Smooth scroll function
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="text-white pt-4 md:pt-8 py-8 px-[12vw] md:px-[7vw] lg:px-[20vw]">
      <div className="container mx-auto text-center">
        {/* Name / Logo */}
        <h2 className="text-xl font-semibold text-purple-500">
          Raghuveer Sharma
        </h2>

        {/* Navigation Links - Responsive */}
        <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4">
          {[
            { name: "About", id: "about" },
            { name: "Skills", id: "skills" },
            { name: "Projects", id: "projects" },
            { name: "Education", id: "education" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => handleScroll(item.id)}
              className="hover:text-purple-500 text-sm sm:text-base my-1"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Social Media Icons - Responsive */}
        <div className="flex flex-wrap justify-center space-x-4 mt-6">
          {[
            {
              icon: <FaLinkedin />,
              link: "https://www.linkedin.com/in/raghuveer-sharma-810124252/",
            },
            {
              icon: <FaInstagram />,
              link: "https://www.instagram.com/__raghusharma__?igsh=MjkwYTRxb3ljaXBx",
            },
            {
              icon: <FaGithub />,
              link: "https://github.com/raghuveeersharma",
            },
            {
              icon: <TbBrandLeetcode />,
              link: "https://leetcode.com/u/RaghuSharma48/",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-purple-500 transition-transform transform hover:scale-110"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Copyright Text */}
        <p className="text-sm text-gray-400 mt-6">
          © 2025 Raghuveer Sharma. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
