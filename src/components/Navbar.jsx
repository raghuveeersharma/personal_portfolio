import { useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState("");
  const menuitems = [
    {
      id: "about",
      label: "About",
    },
    {
      id: "skills",
      label: "Skills",
    },
    {
      id: "services",
      label: "Services",
    },
    {
      id: "experience",
      label: "Experience",
    },
    {
      id: "projects",
      label: "Projects",
    },
    {
      id: "education",
      label: "Education",
    },
    {
      id: "contact",
      label: "Contact",
    },
  ];
  useEffect(() => {
    // Named handler: the previous version removed a brand-new arrow
    // function on cleanup, so the listener was never actually detached.
    const onScroll = () => setScroll(window.scrollY > 0);

    onScroll(); // catch a restored scroll position on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handelactive = (id) => {
    setActive(id);
  };

  // The mobile sheet has to close itself: without this it stayed open on
  // top of the section the visitor had just jumped to.
  const handleMobileNav = (id) => {
    setActive(id);
    setOpen(false);
  };
  return (
    <nav
      className={`${
        scroll
          ? "bg-[#050414]/70 backdrop-blur-md shadow-md"
          : "bg-transparent"
      } fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-[7vw] lg:px-[14vw]`}
    >
      <div className="text-white py-5 flex items-center justify-between">
        <div className="font-semibold cursor-pointer text-lg">
          {" "}
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-white">Raghuveer</span>
          <span className="text-[#8245ec]">/</span>
          <span className="text-white">Sharma</span>
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* lg, not md: six items no longer clear the wordmark at ~800px,
            so the tablet range keeps the hamburger. */}
        <ul className="text-gray-300 hidden lg:flex space-x-6 xl:space-x-9 items-center justify-center text-center">
          {menuitems.map((items) => (
            <li
              key={items.id}
              className={`hover:text-[#8245ec] ${
                active === items.id ? "text-[#8245ec]" : ""
              }`}
            >
              <a href={`#${items.id}`}>
                <button onClick={() => handelactive(items.id)}>
                  {items.label}
                </button>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex md:space-x-4 space-x-2 ">
          <a
            href="https://github.com/raghuveeersharma"
            target="_blank"
            rel=" noopener noreferrer"
            className="text-gray-300 "
          >
            <IoLogoGithub className="text-white text-2xl mx-2 hover:text-[#8245ec]" />
          </a>
          <a
            href="https://www.linkedin.com/in/raghuveer-sharma-810124252/"
            target="_blank"
            rel=" noopener noreferrer"
            className="text-gray-300 "
          >
            <FaLinkedin className="text-white text-2xl mx-2 hover:text-[#8245ec]" />
          </a>
        </div>
        <div>
          {open ? (
            <RxCross1
              className="text-white text-2xl lg:hidden"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <RxHamburgerMenu
              className="text-white text-2xl lg:hidden"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
      </div>
      <div>
        {open && (
          <div className="lg:hidden absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5  backdrop-blur-lg bg-black/60  shadow-lg rounded-lg px-4 py-3">
            <ul className="text-gray-300 flex flex-col items-center space-y-4">
              {menuitems.map((items) => (
                <a
                  href={`#${items.id}`}
                  key={items.id}
                  className={`hover:text-[#8245ec] ${
                    active === items.id ? "text-[#8245ec]" : ""
                  }`}
                >
                  <button onClick={() => handleMobileNav(items.id)}>
                    {items.label}
                  </button>
                </a>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
