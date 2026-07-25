import PropTypes from "prop-types";
import useInView from "./useInView";

/**
 * Reveals a single element when it scrolls into view.
 *
 *   <Reveal variant="fade-up" delay={120}>...</Reveal>
 *   <Reveal as="h2" variant="fade-right" className="text-4xl">...</Reveal>
 *
 * For a list, use <Stagger> instead of mapping Reveals — one
 * observer beats N.
 *
 * Variants are defined in src/styles/animations.css; this
 * component never hardcodes distances or easings.
 */
const Reveal = ({
  as = "div",
  variant = "fade-up",
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

  // Aliased in the body rather than destructured as `as: Tag`, because
  // this project has no eslint-plugin-react and no-unused-vars can't see
  // JSX-only usage of a parameter (it can for capitalised locals).
  const Tag = as;

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-revealed={inView ? "true" : "false"}
      className={className}
      style={{
        "--reveal-delay": `${delay}ms`,
        ...(duration === undefined
          ? null
          : { "--reveal-duration": `${duration}ms` }),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Reveal.propTypes = {
  /** Element or component to render. Must forward ref + style. */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  /** Any variant defined in animations.css. */
  variant: PropTypes.string,
  /** Delay before the reveal starts, in ms. */
  delay: PropTypes.number,
  /** Override the 700ms default, in ms. */
  duration: PropTypes.number,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  /** false = re-animate every time it leaves and re-enters. */
  once: PropTypes.bool,
  /** Animate on mount rather than on scroll (above-the-fold entrances). */
  immediate: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Reveal;
