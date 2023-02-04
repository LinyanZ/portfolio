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
      <div className="contact-container">
        <div>
          <motion.h1
            className={`contact-title contact-title--${theme}`}
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
        </div>
        <div className="text-white my-8 text-xl">
          Hope you've enjoyed my portfolio. If you want to have a chat, feel
          free to leave a message for me!
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="hidden" htmlFor="name">
            Name
          </label>
          <input
            className="contact-form__input"
            type="text"
            id="name"
            placeholder="Name"
          />
          <label className="hidden" htmlFor="email">
            Email
          </label>
          <input
            className="contact-form__input"
            type="text"
            id="email"
            placeholder="Email"
          />
          <label className="hidden" htmlFor="message">
            Message
          </label>
          <input
            className="contact-form__input"
            type="text"
            id="message"
            placeholder="Message"
          />
          <button className="contact-form__button" type="submit">
            {state === "idle" && "SEND"}
            {state === "success" && "SENT!"}
            {state === "pending" && "SENDING..."}
            {state === "error" && "RETRY"}
          </button>
        </form>
      </div>
      <Transition />
    </>
  );
}

export default Contact;
