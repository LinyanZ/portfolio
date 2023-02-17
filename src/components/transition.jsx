import { motion } from "framer-motion";
import { useTheme } from "../contexts/themeContext";

export default function Transition() {
  const [theme] = useTheme();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: 1.2 } }}
      className={`transition-screen transition-screen--${theme}`}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    >
      <motion.h1 className="text-[4rem] sm:text-[6rem] lg:text-[7rem] xl:text-[8rem]">
        Welcome
      </motion.h1>
    </motion.div>
  );
}
