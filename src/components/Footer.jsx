import { useLocation, useNavigate } from "react-router-dom";
import { Reveal } from "../animation";
import { navLinks, socialLinks } from "../constants";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Smooth scroll on home page; navigate to /#section from other pages
  const handleScroll = (sectionId) => {
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="text-white pt-4 md:pt-8 py-8">
     <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
      <Reveal className="container mx-auto text-center">
        {/* Name / Logo */}
        <h2 className="text-xl font-semibold text-purple-500">
          Raghuveer Sharma
        </h2>

        {/* Navigation Links - Responsive */}
        <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="hover:text-purple-500 text-sm sm:text-base my-1"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Social Media Icons - Responsive */}
        <div className="flex flex-wrap justify-center space-x-4 mt-6">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-xl hover:text-purple-500 transition-transform transform hover:scale-110"
              >
                <Icon />
              </a>
            );
          })}
        </div>

        {/* Copyright Text */}
        <p className="text-sm text-gray-400 mt-6 font-sans">
          © {new Date().getFullYear()} Raghuveer Sharma. All rights reserved.
        </p>
      </Reveal>
     </div>
    </footer>
  );
};

export default Footer;
