import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/themeContext";
import { useLanguage } from "../contexts/languageContext";

export default function Contact() {
  const [theme] = useTheme();
  const [language] = useLanguage();
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
      <h1 className={`contact-title text--${theme}`}>
        {language === "en" ? "Get in Touch" : "联系我"}
      </h1>
      <div className={`contact-message text--${theme}`}>
        {language === "en"
          ? "Hope you've enjoyed my portfolio! If you want to have a chat, feel free to leave me a message."
          : "希望您能喜欢我的作品集！如果您想跟我聊两句，请随时给我留言。"}
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="hidden" htmlFor="name">
          {language === "en" ? "Name" : "姓名"}
        </label>
        <input
          className={`contact-form__input text--${theme}`}
          type="text"
          id="name"
          placeholder={language === "en" ? "Name" : "姓名"}
        />
        <label className="hidden" htmlFor="email">
          {language === "en" ? "Email" : "电子邮箱"}
        </label>
        <input
          className={`contact-form__input text--${theme}`}
          type="text"
          id="email"
          placeholder={language === "en" ? "Email" : "电子邮箱"}
        />
        <label className="hidden" htmlFor="message">
          {language === "en" ? "Message" : "留言"}
        </label>
        <input
          className={`contact-form__input text--${theme}`}
          type="text"
          id="message"
          placeholder={language === "en" ? "Message" : "留言"}
        />
        <button className={`contact-form__button text--${theme}`} type="submit">
          {state === "idle" && (language === "en" ? "SEND" : "发送")}
          {state === "success" && (language === "en" ? "SENT!" : "已发送！")}
          {state === "pending" &&
            (language === "en" ? "SENDING..." : "正在发送...")}
          {state === "error" && (language === "en" ? "RETRY" : "重试")}
        </button>
      </form>
    </section>
  );
}
