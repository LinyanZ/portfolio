import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/themeContext";

export default function Contact() {
  const [theme] = useTheme();
  const [state, setState] = useState("idle");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !e.target.name.value ||
      !e.target.email.value ||
      !e.target.message.value
    ) {
      return;
    }

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
          setTimeout(() => {
            setState("idle");
          }, 5000);
        },
        (error) => {
          setState("error");
        }
      );

    setState("pending");
  }

  return (
    <section className="max-w-[1024px] vertical-center contact-container sm:h-screen">
      <h1 className={`contact-title text--${theme}`}>Get in Touch</h1>
      <div className={`contact-message text--${theme}`}>
        Hope you've enjoyed my portfolio! If you want to have a chat, feel free
        to leave me a message.
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
        <button className={`contact-form__button text--${theme}`} type="submit">
          {state === "idle" && "SEND"}
          {state === "success" && "SENT!"}
          {state === "pending" && "SENDING..."}
          {state === "error" && "RETRY"}
        </button>
      </form>
    </section>
  );
}
