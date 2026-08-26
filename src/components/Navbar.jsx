import { useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { navLinks } from "../constants";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState("");
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
      } fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
      <div className="text-white py-3.5 sm:py-4 lg:py-5 flex items-center justify-between gap-3">
        <a
          href="#about"
          onClick={() => handelactive("about")}
          className="min-w-0 shrink font-semibold cursor-pointer whitespace-nowrap text-sm leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text sm:text-lg"
        >
          <span className="text-accent-text">&lt;</span>
          <span className="text-white">Raghuveer</span>
          <span className="text-accent-text">/</span>
          <span className="text-white">Sharma</span>
          <span className="text-accent-text">&gt;</span>
        </a>

        {/* lg, not md: six items no longer clear the wordmark at ~800px,
            so the tablet range keeps the hamburger. */}
        <ul className="text-gray-300 hidden lg:flex items-center justify-center gap-5 text-center text-sm xl:gap-8 xl:text-base">
          {navLinks.map((items) => (
            <li key={items.id}>
              {/* One interactive element, not an <a> wrapping a <button>:
                  interactive-inside-interactive is invalid HTML and screen
                  readers disagree about what to announce. The anchor is the
                  one that keeps the href, so the button went. */}
              <a
                href={`#${items.id}`}
                aria-current={active === items.id ? "true" : undefined}
                onClick={() => handelactive(items.id)}
                className={`rounded-sm hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text ${
                  active === items.id ? "text-accent-text" : ""
                }`}
              >
                {items.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href="https://github.com/raghuveeersharma"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-sm text-white transition-colors hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text sm:h-10 sm:w-10"
              aria-label="GitHub profile"
            >
              <IoLogoGithub className="text-xl sm:text-2xl" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/raghuveer-sharma-810124252/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-sm text-white transition-colors hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text sm:h-10 sm:w-10"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin className="text-xl sm:text-2xl" aria-hidden="true" />
            </a>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-sm text-white transition-colors hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text sm:h-10 sm:w-10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <RxCross1 className="text-white text-2xl" />
            ) : (
              <RxHamburgerMenu className="text-white text-2xl" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-md border border-white/10 bg-[#050414]/95 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col py-2 text-gray-200">
            {navLinks.map((items) => (
              <li key={items.id}>
                <a
                  href={`#${items.id}`}
                  aria-current={active === items.id ? "true" : undefined}
                  onClick={() => handleMobileNav(items.id)}
                  className={`block px-4 py-3 text-center text-sm font-medium transition-colors hover:bg-white/5 hover:text-accent-text focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent-text ${
                    active === items.id
                      ? "bg-white/[0.03] text-accent-text"
                      : ""
                  }`}
                >
                  {items.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
