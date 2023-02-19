import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../contexts/themeContext";
import { useIsLarge } from "../../utils";

const ease = [0, 0.4, 0.2, 1];

function useParallax(value, distance, offset = 0) {
  return useTransform(value, [0, 1], [-distance + offset, distance + offset]);
}

export default function Summary() {
  const [theme] = useTheme();
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const yDiv = useParallax(scrollYProgress, 100);
  const yP = useParallax(scrollYProgress, 100);
  const isLarge = useIsLarge();

  return (
    <section className="max-width-container vertical-center summary-section">
      <div className="flex flex-col min-[900px]:flex-row justify-center items-center min-[1200px]:gap-x-24 gap-x-8 mx-auto">
        <motion.div
          className="my-picture-container"
          ref={ref}
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
            src="./images/me.jpg"
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
      </div>
    </section>
  );
}
