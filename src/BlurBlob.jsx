import React from "react";
import PropTypes from "prop-types";

const BlurBlob = ({ position, size }) => {
  const { top, left } = position;
  const { width, height } = size;
  return (
    <div
      className="absolute"
      style={{
        top: top,
        left: left,
        width: width,
        height: height,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* One of the few genuine `dark:` cases: the difference is
          structural, not a colour swap. On dark the blob is additive
          light bleeding through the page and wants to be seen; on
          light the same shape at the same opacity is a grey-lavender
          smudge, so it drops to a faint tint. The colour itself is a
          token (`--glow`), which is why only the opacity is gated. */}
      <div className="w-full h-full bg-glow rounded-full opacity-[0.14] blur-3xl animate-blob dark:opacity-30"></div>
    </div>
  );
};

// Define the prop types for the component
BlurBlob.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }).isRequired,
  size: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }).isRequired,
};

export default BlurBlob;
