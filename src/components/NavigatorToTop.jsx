import { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";

const NavigatorToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const hideTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      // Don't show if we are at the very top
      if (window.scrollY < 100) {
        setShowTopBtn(false);
        return;
      }

      // We are scrolling and past the top, show the button
      setShowTopBtn(true);

      // Reset the timer to hide the button after scrolling stops
      clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => {
        setShowTopBtn(false);
      }, 2000); // 2 seconds after scroll stops
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <a
      href="#about"
      aria-label="Scroll to top"
      // Prevent tabbing to it when invisible
      tabIndex={showTopBtn ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 md:bottom-10 md:right-10 items-center justify-center rounded-xl bg-accent/30 text-white shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-accent/50 ${
        showTopBtn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <FaArrowUp className="text-xl" />
    </a>
  );
};

export default NavigatorToTop;
