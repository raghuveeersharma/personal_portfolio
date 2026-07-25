import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import profile from "../assets/profile.jpeg";
import { Reveal } from "../animation";

const About = () => {
  return (
    <section
      id="about"
      className="py-4 px-[7vw] md:px-[7vw] lg:px-[16vw] mt-10 md:mt-20 lg:mt-24"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center md:gap-20">
        {/* Left Side */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-4 md:mt-0">
          {/* This is the hero, so every reveal here is `immediate`: it plays
              on mount as one entrance sequence. Left to the scroll observer,
              the lower items (the CV button especially) would sit invisible
              on short viewports until the visitor happened to scroll. */}
          <Reveal
            as="h1"
            immediate
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white leading-tight"
          >
            Hey, I'm
          </Reveal>
          <Reveal
            as="h2"
            immediate
            delay={100}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white leading-tight"
          >
            Raghuveer Sharma
          </Reveal>
          <Reveal
            as="h3"
            immediate
            delay={200}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-accent leading-tight"
          >
            <span className="text-white mr-2">I'm a</span>
            <span>
              <TypeAnimation
                sequence={[
                  "Web Developer",
                  1500,
                  "SaaS Developer",
                  1500,
                  "MERN Stack Developer",
                  1500,
                ]}
                wrapper="span"
                speed={30}
                className="text-accent font-bold text-2xl"
                repeat={Infinity}
              />
            </span>
          </Reveal>
          {/* about me */}
          <Reveal
            as="p"
            immediate
            delay={300}
            className="text-base sm:text-lg text-gray-400 mb-4 mt-10 leading-relaxed"
          >
            Hi, I’m Raghu Sharma. I have completed my Bachelor's degree in
            Information Technology (B.Tech) from Chameli Devi Group of
            Institutions, affiliated with RGPV University. I live in Indore, and
            I’m deeply passionate about leveraging technology to build
            innovative and impactful solutions. With a strong interest in
            full-stack web development.
          </Reveal>
          {/* resume */}
          <Reveal immediate delay={400}>
            <a
              href="https://drive.google.com/file/d/1jQzcFIlcEWLyNvn6_CbqHX3kI9e8BO0m/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 px-4 bg-accent text-gray-200 hover:text-white rounded-full hover:bg-accent-deep transition transform duration-300 ease-in-out mt-4 font-sans text-sm tracking-wide"
            >
              DOWNLOAD CV
            </a>
          </Reveal>
        </div>
        {/* Right Side */}
        <Reveal
          variant="zoom-in"
          immediate
          delay={150}
          duration={900}
          className="w-full md:w-1/2 justify-center md:justify-end"
        >
          <Tilt
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[30rem] md:h-[30rem] border-4 rounded-full border-accent mx-auto md:mx-0"
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.03}
            gyroscope={true}
            transitionSpeed={1000}
          >
            <img
              src={profile}
              alt="profile"
              className="w-full h-full rounded-full shadow-lg object-cover drop-shadow-[0_10px_25px_rgba(130,69,236,0.5)]"
            />
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
