import { useRef, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { Reveal, Stagger } from "../animation";

// EmailJS ids, same VITE_* pattern the social/resume links use. They are
// publishable by design (the SDK sends them from the browser), so this is
// about not needing a code change to rotate the template — not secrecy.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const form = useRef();
  // null | "sent" | "error" — rendered inline under the button rather than
  // as a toast, so the whole react-toastify bundle stays off the page for
  // the visitors who never submit anything (which is most of them).
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus(null); // clear the previous result before the retry

    // A missing .env fails inside the SDK with an opaque error, so catch it
    // here and show the same fallback ("email me directly") the visitor
    // would get from a network failure.
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error(
        "EmailJS is not configured — set VITE_EMAILJS_SERVICE_ID, " +
          "VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY (see .env.example)."
      );
      setStatus("error");
      return;
    }

    // The form element itself, captured before the await: nothing unmounts
    // it mid-submit today, but the ref is the only handle the SDK gets and
    // reading it after the dynamic import is a needless dependency on that.
    const formEl = form.current;

    setSending(true);

    // The SDK is ~50kB and only ever needed once a visitor actually submits,
    // so it is fetched here rather than in the entry chunk. The network cost
    // lands inside the "Sending..." state the button already shows.
    try {
      const { default: emailjs } = await import("@emailjs/browser");

      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formEl, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });

      setStatus("sent");
      formEl.reset(); // Reset form fields after sending
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw]"
    >
      {/* Section Title */}
      <Reveal className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">CONTACT</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          I’d love to hear from you—reach out for any opportunities or
          questions!
        </p>
      </Reveal>

      {/* Contact Form */}
      <Reveal
        variant="rise"
        delay={120}
        className="mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-lg shadow-lg border border-gray-700"
      >
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
            name="from_Email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            name="from_name"
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
            disabled={sending}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Send"}
          </button>

          {/* aria-live so the result is announced without moving focus.
              The node is always present — a region that only appears on
              success is often missed by screen readers. */}
          <p
            role="status"
            aria-live="polite"
            className={`text-sm text-center min-h-5 ${
              status === "error" ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {status === "sent" && "Thanks — your message is on its way. ✅"}
            {status === "error" &&
              "Something went wrong. Please try again, or email me directly."}
          </p>
        </form>
      </Reveal>
      {/* Reveals sit directly on these cards — unlike the project/skill
          cards they have no transition of their own to preserve. */}
      <Stagger
        step={120}
        className="flex flex-col lg:flex-row items-center text-center justify-center lg:gap-56 gap-12 md:pb-6 pb-0 mt-28"
      >
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
      </Stagger>
    </section>
  );
};

export default Contact;
