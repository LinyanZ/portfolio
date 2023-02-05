import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "../../contexts/themeContext";
import { useIsMedium } from "../../utils";

const ease = [0, 0.4, 0.2, 1];

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function Summary() {
  const [theme] = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const ySpring = useSpring(scrollYProgress, {
    stiffness: 10,
    damping: 10,
    restDelta: 0.1,
  });
  const yDiv = useParallax(ySpring, 300);
  const yP = useParallax(ySpring, 200);
  const isMedium = useIsMedium();

  return (
    <section className="about-section">
      <motion.div
        ref={ref}
        className="my-picture-container"
        initial={
          isMedium
            ? {
                scale: 0.9,
              }
            : {}
        }
        whileInView={
          isMedium
            ? {
                scale: 1,
                transition: {
                  duration: 1,
                  ease,
                },
              }
            : {}
        }
        whileHover={
          isMedium
            ? {
                scale: 1.1,
                transition: {
                  duration: 1,
                  ease,
                },
              }
            : {}
        }
      >
        <motion.img
          className="my-picture"
          src="./pictures/me.jpg"
          alt="a picture of myself with my cat on top of my head"
          initial={
            isMedium
              ? {
                  scale: 2,
                }
              : {}
          }
          whileInView={
            isMedium
              ? {
                  scale: 1.3,
                  transition: {
                    duration: 1,
                    ease,
                  },
                }
              : {}
          }
          whileHover={
            isMedium
              ? {
                  scale: 1,
                  transition: {
                    duration: 1,
                    ease,
                  },
                }
              : {}
          }
        />
      </motion.div>
      <motion.div className="summary" style={isMedium ? { y: yDiv } : {}}>
        <h2 className={`summary-title text--${theme}`}>About Me</h2>
        <motion.p
          className={`summary-content text--${theme}`}
          style={isMedium ? { y: yP } : {}}
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
