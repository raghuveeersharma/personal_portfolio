import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const NavigatorToTop = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  let scrollTimeout;

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsScrolling(false);
    } else {
      setIsScrolling(true); // Show while scrolling

      // Hide after scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500); // Adjust delay as needed
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  return (
    <>
      {isScrolling && (
        <a
          href="#about"
          className={`fixed md:bottom-0 bottom-2 right-0 z-50 transform bg-[#8245ec]/30 text-white rounded-xl shadow-md md:w-[3.8%] w-10 h-14 transition-opacity duration-700  ${
            isScrolling ? "opacity-100" : "opacity-0 "
          }`}
        >
          <div className="cursor-pointer hover:text-slate-300 hover:scale-105 duration-100 text-3xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaArrowUp />
          </div>
        </a>
      )}
    </>
  );
};

export default NavigatorToTop;
