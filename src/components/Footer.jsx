import { Reveal } from "../animation";
import { navLinks, socialLinks } from "../constants";

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
    </footer>
  );
};

export default Footer;
