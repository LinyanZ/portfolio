import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../contexts/themeContext";
import { useIsLarge, useIsMedium } from "../../utils";

const ease = [0, 0.4, 0.2, 1];

function useParallax(value, distance, offset = 0) {
  return useTransform(value, [0, 1], [-distance + offset, distance + offset]);
}

export default function Summary() {
  const [theme] = useTheme();
  const { scrollYProgress } = useScroll();
  const yDiv = useParallax(scrollYProgress, -120, -120);
  const yP = useParallax(scrollYProgress, -100, -120);
  const isLarge = useIsLarge();

  return (
    <section className="max-width-container vertical-center summary-section">
      <motion.div
        className="my-picture-container"
        initial={{
          scale: 0.9,
        }}
        whileInView={{
          scale: 1,
          transition: {
            duration: 1,
            ease,
          },
        }}
        whileHover={{
          scale: 1.1,
          transition: {
            duration: 1,
            ease,
          },
        }}
        viewport={{ once: true }}
      >
        <motion.img
          className="my-picture"
          src="./pictures/me.jpg"
          alt="a picture of myself with my cat on top of my head"
          initial={{
            scale: 2,
          }}
          whileInView={{
            scale: 1.3,
            transition: {
              duration: 1,
              ease,
            },
          }}
          whileHover={{
            scale: 1,
            transition: {
              duration: 1,
              ease,
            },
          }}
          viewport={{ once: true }}
        />
      </motion.div>
      <motion.div className="summary" style={isLarge ? { y: yDiv } : {}}>
        <h2 className={`summary-title text--${theme}`}>About Me</h2>
        <motion.p
          className={`summary-content text--${theme}`}
          style={isLarge ? { y: yP } : {}}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum nam
          quia omnis nemo facilis itaque placeat! Vitae eveniet, sit,
          consequuntur, perspiciatis repudiandae iure beatae totam in possimus
          aut necessitatibus a.
        </motion.p>
      </motion.div>
    </section>
  );
}
