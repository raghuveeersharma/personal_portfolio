import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import profile from "../assets/profile.jpeg";
const About = () => {
  return (
    <section
      id="about"
      className="py-4 px-[7vw] md:px-[7vw] lg:px-[16vw] font-sans mt-10 md:mt-20 lg:mt-24"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center md:gap-20">
        {/* Left Side */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white leading-tight">
            Hey, I'm
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
            Raghuveer Sharma
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#8245ec] leading-tight">
            <span className="text-white mr-2">I'm a</span>
            <span>
              <TypeAnimation
                sequence={[
                  "Web Developer",
                  1500,
                  "UI/UX Designer",
                  1500,
                  "MERN Stack Developer",
                  1500,
                ]}
                wrapper="span"
                speed={30}
                className="text-[#8245ec] font-bold text-2xl"
                repeat={Infinity}
              />
            </span>
          </h3>
          {/* about me */}
          <p className="text-base sm:text-lg text-gray-400 mb-4 mt-10 leading-relaxed">
            Hi, I’m Raghu Sharma. I have completed my Bachelor's degree in
            Information Technology (B.Tech) from Chameli Devi Group of
            Institutions, affiliated with RGPV University. I live in Indore, and
            I’m deeply passionate about leveraging technology to build
            innovative and impactful solutions. With a strong interest in
            full-stack web development.
          </p>
          {/* resume */}
          <a
            href="https://drive.google.com/file/d/1jQzcFIlcEWLyNvn6_CbqHX3kI9e8BO0m/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-2 px-4 bg-[#8245ec] text-gray-200 hover:text-white rounded-full hover:bg-[#6f3bce] transition transform duration-300 ease-in-out mt-4"
          >
            DOWNLOAD CV
          </a>
        </div>
        {/* Right Side */}
        <div className="w-full md:w-1/2 justify-center md:justify-end">
          <Tilt
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[30rem] md:h-[30rem] border-4 rounded-full border-[#8245ec] mx-auto md:mx-0"
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
        </div>
      </div>
    </section>
  );
};

export default About;
