import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import { Reveal, Stagger } from "../animation";
import {
  heroResume,
  heroRoles,
  heroSocials,
  heroStack,
  heroStats,
} from "../constants";

/* Hand-coloured token palette for the editor panel. A syntax
   highlighter would be a dependency and a runtime pass over a
   snippet that never changes — nine lines of spans is cheaper and
   gives exact control over which identifiers read as "live". */
const CODE = {
  kw: "#C792EA", // const, require
  str: "#C3E88D", // 'express'
  fn: "#82AAFF", // express(), app.use()
  num: "#F78C6C", // 5000
  txt: "#E8E8F4", // everything else
};

/* The snippet, as [token, text] pairs. Kept here rather than in
   constants.js because it is an illustration of the stack, not
   portfolio content — it is read, never edited alongside projects. */
const IMPORTS = [
  [
    ["kw", "const"],
    ["txt", " express  = "],
    ["kw", "require"],
    ["txt", "("],
    ["str", "'express'"],
    ["txt", ");"],
  ],
  [
    ["kw", "const"],
    ["txt", " mongoose = "],
    ["kw", "require"],
    ["txt", "("],
    ["str", "'mongoose'"],
    ["txt", ");"],
  ],
];

const SERVER = [
  [
    ["kw", "const"],
    ["txt", " app = "],
    ["fn", "express"],
    ["txt", "();"],
  ],
  [
    ["txt", "app."],
    ["fn", "use"],
    ["txt", "(express."],
    ["fn", "json"],
    ["txt", "());"],
  ],
  [
    ["txt", "app."],
    ["fn", "use"],
    ["txt", "("],
    ["str", "'/api/users'"],
    ["txt", ", userRoutes);"],
  ],
  [],
  [
    ["txt", "app."],
    ["fn", "listen"],
    ["txt", "("],
    ["num", "5000"],
    ["txt", ", () => {"],
  ],
  [
    ["txt", "  console."],
    ["fn", "log"],
    ["txt", "("],
    ["str", "'Server live on :5000'"],
    ["txt", ");"],
  ],
  [["txt", "});"]],
];

const CodeLines = ({ lines }) =>
  lines.map((line, index) => (
    <div key={index} className="whitespace-pre">
      {line.length === 0
        ? " "
        : line.map(([token, text], part) => (
            <span key={part} style={{ color: CODE[token] }}>
              {text}
            </span>
          ))}
    </div>
  ));

/* Local rather than exported: nothing else needs it yet, and
   exporting a non-component from this file would trip
   react-refresh/only-export-components. */
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
};

const About = () => {
  const reduced = useReducedMotion();

  // Magnetic pull on the primary CTA. Written to the node instead of
  // through state so a mousemove never re-renders the hero.
  const pullToCursor = (event) => {
    if (reduced) return;

    const button = event.currentTarget;
    const { left, top, width, height } = button.getBoundingClientRect();
    const x = (event.clientX - left - width / 2) * 0.25;
    const y = (event.clientY - top - height / 2) * 0.25;

    button.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
  };

  const releaseCursor = (event) => {
    event.currentTarget.style.transform = "translate(0, 0) scale(1)";
  };

  const scrollToProjects = () => {
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    /* -mt-20 cancels the pt-20 App puts under the fixed navbar so the
       hero's own background reaches the top of the page; the pt-20
       back on this element keeps the content clear of the navbar. */
    <section
      id="about"
      className="-mt-20 min-h-screen bg-hero-bg flex items-center justify-center pt-20"
    >
      {/* The spec's type scale was drawn against a ~1000px layout, so
          every size below steps up again at lg/xl. Left flat, the hero
          reads smaller than the section headings further down the page. */}
      <div className="w-full mx-auto max-w-6xl xl:max-w-[1240px] px-6 md:px-12 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* ---------------- LEFT: identity ---------------- */}
          {/* Every reveal in the hero is `immediate`: it plays on mount
              as one entrance sequence. Left to the scroll observer, the
              lower items would sit at opacity 0 on a short viewport
              until the visitor happened to scroll. */}
          <div className="flex flex-col items-start">
            {/* Availability badge */}
            <Reveal immediate duration={400}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2D3A2D] bg-[#111D11] px-3 py-1.5 lg:px-3.5 lg:py-2">
                <span className="animate-avail-pulse block w-[7px] h-[7px] rounded-full bg-hero-green" />
                <span className="font-sans text-[11px] lg:text-[12px] font-medium tracking-[0.03em] text-hero-green">
                  Open to remote roles
                </span>
              </span>
            </Reveal>

            {/* Eyebrow */}
            <Reveal
              as="p"
              immediate
              delay={80}
              duration={400}
              className="mt-5 lg:mt-6 mb-2.5 lg:mb-3 font-sans text-[11px] lg:text-[12px] uppercase tracking-[0.12em] text-hero-muted"
            >
              Based in India · Available worldwide
            </Reveal>

            {/* Name */}
            <Reveal
              as="h1"
              immediate
              delay={120}
              duration={500}
              className="mb-2.5 lg:mb-3 font-display text-[30px] sm:text-[40px] lg:text-[52px] xl:text-[60px] font-bold leading-[1.1] text-hero-text"
            >
              Raghuveer Sharma
            </Reveal>

            {/* Typewriter */}
            <Reveal
              variant="fade"
              immediate
              delay={200}
              duration={400}
              className="mb-5 lg:mb-6 flex h-8 lg:h-10 items-center font-sans text-[17px] lg:text-[21px]"
            >
              <span className="text-[#6C6C8A]">I build&nbsp;</span>
              <TypeAnimation
                sequence={heroRoles}
                wrapper="span"
                speed={45}
                cursor
                repeat={Infinity}
                className="font-medium text-hero-accent"
              />
            </Reveal>

            {/* Tagline */}
            <Reveal
              as="p"
              immediate
              delay={280}
              duration={400}
              className="mb-6 lg:mb-8 max-w-[340px] lg:max-w-[450px] font-sans text-[14px] lg:text-[16px] leading-[1.65] text-hero-dim"
            >
              From MongoDB schema design to React UI — I own the whole stack
              and ship things that actually work in production.
            </Reveal>

            {/* Stats */}
            <Stagger
              immediate
              delay={340}
              step={80}
              duration={350}
              style={{ "--reveal-distance": "10px" }}
              className="mb-[26px] lg:mb-8 grid w-full grid-cols-3 gap-4 sm:flex sm:w-auto sm:gap-6 lg:gap-10"
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[22px] lg:text-[28px] font-bold text-hero-text">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 font-sans text-[10px] lg:text-[11px] tracking-[0.04em] text-hero-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Stagger>

            {/* CTAs — wrapper takes the reveal so the buttons keep
                their own transforms for hover and the magnetic pull. */}
            <Reveal variant="pop-up" immediate delay={420} duration={450}>
              <div className="mb-6 lg:mb-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={scrollToProjects}
                  onMouseMove={pullToCursor}
                  onMouseLeave={releaseCursor}
                  className="rounded-lg bg-hero-accent px-[22px] py-2.5 lg:px-7 lg:py-3 font-sans text-[13px] lg:text-[14px] font-semibold text-white transition-[transform,background-color] duration-200 ease-out hover:bg-[#7C6FFA]"
                >
                  View my work
                </button>
                <a
                  href={heroResume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-hero-border px-[22px] py-2.5 lg:px-7 lg:py-3 font-sans text-[13px] lg:text-[14px] text-hero-dim transition-colors duration-200 hover:border-hero-accent hover:text-hero-text"
                >
                  Download resume
                </a>
              </div>
            </Reveal>

            {/* Socials */}
            <Reveal variant="fade" immediate delay={500} duration={400}>
              <div className="flex gap-[18px] lg:gap-6">
                {heroSocials.map((social) => {
                  // Aliased to a capitalised local, not destructured as
                  // `icon: Icon` — see the note in Reveal.jsx: without
                  // eslint-plugin-react, JSX-only use of a *parameter*
                  // reads as unused.
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={
                        social.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-[5px] font-sans text-[12px] lg:text-[13px] text-hero-muted transition-colors duration-150 hover:text-hero-accent"
                    >
                      <Icon size={15} />
                      {social.label}
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* ---------------- RIGHT: the proof ---------------- */}
          <div>
            {/* Reveal on the outside, Tilt on the inside: both write
                `transform`, and the reveal's transition would otherwise
                swallow the tilt's easing. */}
            <Reveal
              variant="fade-right"
              immediate
              delay={500}
              duration={550}
              style={{ "--reveal-distance": "32px" }}
            >
              <Tilt
                tiltEnable={!reduced}
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                perspective={1000}
                transitionSpeed={400}
                className="overflow-hidden rounded-[10px] border border-hero-border bg-hero-surface"
              >
                {/* Editor chrome */}
                <div className="flex items-center justify-between gap-3 border-b border-hero-border bg-hero-card px-3.5 py-2 lg:px-5 lg:py-2.5">
                  <div className="flex gap-[5px]">
                    <span className="block h-2.5 w-2.5 rounded-full bg-[#E24B4A]" />
                    <span className="block h-2.5 w-2.5 rounded-full bg-[#BA7517]" />
                    <span className="block h-2.5 w-2.5 rounded-full bg-[#639922]" />
                  </div>
                  <p className="truncate font-mono text-[11px] lg:text-[12px] text-hero-muted">
                    server.js · Node.js + Express
                  </p>
                  <p className="flex items-center gap-1 font-mono text-[10px] lg:text-[11px] text-hero-green">
                    <span className="animate-avail-pulse">●</span> live
                  </p>
                </div>

                {/* Code body */}
                <div className="overflow-x-auto bg-hero-surface px-[18px] py-4 lg:px-6 lg:py-5 font-mono text-[12px] lg:text-[13.5px] leading-[2] text-[#E8E8F4]">
                  <CodeLines lines={IMPORTS} />
                  <div className="mt-1 mb-1.5 h-px bg-[#1E1E2E]" />
                  <CodeLines lines={SERVER} />
                </div>

                {/* Simulated response — dropped on phones, where the
                    panel is already the tallest thing on screen. */}
                <Stagger
                  immediate
                  delay={700}
                  step={120}
                  duration={250}
                  variant="fade-left"
                  style={{ "--reveal-distance": "6px" }}
                  className="hidden border-t border-[#1A3A1A] bg-[#0A1A0A] px-3.5 py-2.5 lg:px-6 lg:py-3.5 font-mono text-[11px] lg:text-[12.5px] leading-[2] sm:block"
                >
                  <p className="whitespace-pre text-[#6C6C8A]">
                    GET /api/users/profile{"  "}
                    <span className="text-hero-green">200 OK</span>
                  </p>
                  <p className="whitespace-pre text-[#6C6C8A]">
                    {"{  "}
                    <span className="text-[#A5F3C0]">&quot;name&quot;</span>
                    {":   "}
                    <span className="text-hero-green">&quot;Raghuveer&quot;</span>
                    ,
                  </p>
                  <p className="whitespace-pre text-[#6C6C8A]">
                    {"   "}
                    <span className="text-[#A5F3C0]">&quot;role&quot;</span>
                    {":   "}
                    <span className="text-hero-green">
                      &quot;MERN developer&quot;
                    </span>
                    ,
                  </p>
                  <p className="whitespace-pre text-[#6C6C8A]">
                    {"   "}
                    <span className="text-[#A5F3C0]">&quot;status&quot;</span>
                    {": "}
                    <span className="text-hero-green">&quot;available&quot;</span>
                    {"  }"}
                  </p>
                </Stagger>
              </Tilt>
            </Reveal>

            {/* Stack chips */}
            <Stagger
              immediate
              variant="scale-in"
              delay={650}
              step={70}
              duration={200}
              className="mt-3 lg:mt-4 flex flex-wrap gap-2 lg:gap-2.5"
            >
              {heroStack.map((chip) => (
                <span
                  key={chip.label}
                  style={{
                    backgroundColor: chip.bg,
                    borderColor: chip.border,
                    color: chip.text,
                  }}
                  className="rounded-[20px] border px-3 py-1 lg:px-3.5 lg:py-1.5 font-sans text-[10px] lg:text-[11px] font-medium tracking-[0.03em]"
                >
                  {chip.label}
                </span>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
