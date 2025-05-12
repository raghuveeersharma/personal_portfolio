import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_x8hut4o", "template_rw6nx8f", form.current, {
        publicKey: "MKlmHK9s8eZZ-bfY0",
      })
      .then(
        () => {
          setIsSent(true);
          form.current.reset(); // Reset form fields after sending
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw]"
    >
      {/* Toast Container */}
      <ToastContainer />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">CONTACT</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          I’d love to hear from you—reach out for any opportunities or
          questions!
        </p>
      </div>

      {/* Contact Form */}
      <div className="mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white text-center">
          Connect With Me <span className="ml-1">🚀</span>
        </h3>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="mt-4 flex flex-col space-y-4"
        >
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            Send
          </button>
        </form>
      </div>
      <div className="flex flex-col lg:flex-row items-center text-center justify-center lg:gap-56 gap-12 md:pb-6 pb-0 mt-28">
        <div className="flex flex-col items-center text-center text-white w-full lg:w-56 h-52 pt-0 hover:scale-105 duration-700 ">
          <span className="text-5xl lg:pt-2">
            <IoLocationOutline />
          </span>
          <h1 className="text-[#ff0077] font-bold md:text-2xl text-lg mt-5">
            Where to find me
          </h1>
          <p className="mt-4 text-slate-400">
            Raj nagar, Indore, Madhya Pradesh
          </p>
        </div>
        <div className="flex flex-col items-center text-center text-white w-full lg:w-56 h-52 pt-0 hover:scale-105 duration-700 ">
          <span className="text-5xl">
            <MdOutlineEmail />
          </span>
          <h1 className="text-[#ff0077] font-bold md:text-2xl text-lg mt-5">
            Email me at
          </h1>
          <p className="mt-4 text-slate-400">
            <a
              href="mailto:sharmaraghu157@gmail.com"
              className="hover:underline"
            >
              sharmaraghu157@gmail.com
            </a>{" "}
            <br />
            <a
              href="mailto:sharmaveer157@gmail.com"
              className="hover:underline"
            >
              sharmaveer157@gmail.com
            </a>
            <br />
            <a
              href="mailto:raghuverrsharma@gmail.com"
              className="hover:underline"
            >
              raghuverrsharma@gmail.com
            </a>
          </p>
        </div>
        <div className="flex flex-col items-center text-center text-white w-full lg:w-56 h-52 pt-0 hover:scale-105 duration-700">
          <span className="text-5xl lg:pt-2">
            <IoCallOutline />
          </span>
          <h1 className="text-[#ff0077] font-bold md:text-2xl text-lg mt-5">
            Call me at
          </h1>
          <p className="mt-4 text-slate-400">
            {" "}
            <a
              href="tel:+919575136951"
              className="hover:underline text-slate-400 text-sm md:text-lg relative z-20"
            >
              +91 95751 36951
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
