import Transition from "../components/Transition";
import { useTheme } from "../contexts/themeContext";
import { motion } from "framer-motion";

function Contact() {
  const [theme] = useTheme();

  const nameStyle = `text-center leading-[12rem] text-[11rem] font-thin h-48 z-10 ${
    theme === "dark" ? "text-neutral-200" : "text-neutral-700"
  }`;

  return (
    <>
      <div
        className={`flex-column flex h-[100vh] w-full items-center justify-center`}
      >
        <motion.h1
          className={nameStyle}
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
          Contact
        </motion.h1>
      </div>
      <Transition />
    </>
  );
}

export default Contact;
