import Navbar from "../components/Navbar";
import About from "../components/About";
import Skills from "../components/Skills";
import Services from "../components/services/Services.jsx";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BlurBlob from "../BlurBlob";
import Projects from "../components/Projects";
import NavigatorToTop from "../components/NavigatorToTop";

const HomePage = () => {
  return (
    <div className="bg-ink">
      <BlurBlob
        position={{ top: "35%", left: "20%" }}
        size={{ width: "30%", height: "40%" }}
      />

      <div className="grid-lines absolute inset-0"></div>

      <div className="relative pt-20">
        <Navbar />
        <About />
        <NavigatorToTop />
        <Skills />
        <Services />
        <Experience />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
