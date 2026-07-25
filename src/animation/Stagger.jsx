import { Children, cloneElement, isValidElement } from "react";
import PropTypes from "prop-types";
import useInView from "./useInView";

/**
 * Reveals a list of children in sequence. Wrap the *container*
 * (the grid / flex row) — its own classes are preserved, so this
 * is a drop-in replacement for the div you already had:
 *
 *   <Stagger className="grid grid-cols-3 gap-10" step={80}>
 *     {projects.map((p) => <Card key={p.id} ... />)}
 *   </Stagger>
 *
 * Only one IntersectionObserver is created no matter how many
 * children there are; the cascade comes from each child's
 * --reveal-index. A child that sets its own `data-reveal` keeps
 * it, which is how alternating timelines get per-item directions.
 *
 * Children must accept `style` and `data-*` (plain DOM elements do).
 */
const Stagger = ({
  as = "div",
  variant = "fade-up",
  step = 90,
  delay = 0,
  duration,
  threshold,
  rootMargin,
  once = true,
  immediate = false,
  className = "",
  style,
  children,
  ...rest
}) => {
  const [ref, inView] = useInView({ threshold, rootMargin, once, immediate });

  // See the note in Reveal.jsx for why this isn't `as: Tag` in the params.
  const Tag = as;

  return (
    <Tag
      ref={ref}
      data-stagger=""
      data-revealed={inView ? "true" : "false"}
      className={className}
      style={{
        "--reveal-step": `${step}ms`,
        "--reveal-delay": `${delay}ms`,
        ...(duration === undefined
          ? null
          : { "--reveal-duration": `${duration}ms` }),
        ...style,
      }}
      {...rest}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return cloneElement(child, {
          "data-reveal": child.props["data-reveal"] ?? variant,
          style: {
            "--reveal-index": String(index),
            ...child.props.style,
          },
        });
      })}
    </Tag>
  );
};

Stagger.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  /** Default variant for children that don't set their own. */
  variant: PropTypes.string,
  /** Gap between consecutive children, in ms. */
  step: PropTypes.number,
  /** Delay before the first child, in ms. */
  delay: PropTypes.number,
  duration: PropTypes.number,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  once: PropTypes.bool,
  /** Animate on mount rather than on scroll (above-the-fold entrances). */
  immediate: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Stagger;
