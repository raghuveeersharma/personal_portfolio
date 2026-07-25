import PropTypes from "prop-types";
import useScrollProgress from "./useScrollProgress";

/**
 * A rule that fills with the accent colour as the visitor scrolls past
 * it — the vertical spine of the Experience and Education timelines.
 *
 * Pass the track's own positioning/size classes in `className`; that
 * element is both the thing measured and the containing block for the
 * fill, so it has to be positioned (the timelines use `absolute`).
 * The fill itself is styled in animations.css off [data-progress-fill].
 */
const ScrollProgressLine = ({ className = "", anchor, ...rest }) => {
  const ref = useScrollProgress(anchor === undefined ? undefined : { anchor });

  return (
    <div ref={ref} data-progress-track="" className={className} {...rest}>
      <span data-progress-fill="" />
    </div>
  );
};

ScrollProgressLine.propTypes = {
  className: PropTypes.string,
  /** Where in the viewport counts as "read up to here" (0→1). */
  anchor: PropTypes.number,
};

export default ScrollProgressLine;
