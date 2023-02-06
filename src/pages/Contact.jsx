import Transition from "../components/Transition";
import { useTheme } from "../contexts/themeContext";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import React, { useState } from "react";

function Contact() {
  const [theme] = useTheme();
  const [state, setState] = useState("idle");

  function handleSubmit(e) {
    e.preventDefault();

    const templateParams = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setState("success");
        },
        (error) => {
          setState("error");
        }
      );

    setState("pending");
  }

  return (
    <>
      <section className="max-width-container vertical-center mx-auto my-32 sm:my-64 p-[2rem]">
        <motion.h1
          className={`contact-title text--${theme}`}
          initial={{
            opacity: 0,
            y: "25%",
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.7,
            },
          }}
        >
          Get in Touch
        </motion.h1>
        <div className={`contact-message text--${theme}`}>
          Hope you've enjoyed my portfolio! If you want to have a chat, feel
          free to leave me a message.
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="hidden" htmlFor="name">
            Name
          </label>
          <input
            className={`contact-form__input text--${theme}`}
            type="text"
            id="name"
            placeholder="Name"
          />
          <label className="hidden" htmlFor="email">
            Email
          </label>
          <input
            className={`contact-form__input text--${theme}`}
            type="text"
            id="email"
            placeholder="Email"
          />
          <label className="hidden" htmlFor="message">
            Message
          </label>
          <input
            className={`contact-form__input text--${theme}`}
            type="text"
            id="message"
            placeholder="Message"
          />
          <button
            className={`contact-form__button text--${theme}`}
            type="submit"
          >
            {state === "idle" && "SEND"}
            {state === "success" && "SENT!"}
            {state === "pending" && "SENDING..."}
            {state === "error" && "RETRY"}
          </button>
        </form>
      </section>
      <Transition />
    </>
  );
}

export default Contact;
