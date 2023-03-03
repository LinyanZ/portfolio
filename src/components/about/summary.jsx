import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../contexts/themeContext";
import { useIsLarge } from "../../utils";
import GithubIcon from "../icons/githubIcon";
import LinkedInIcon from "../icons/linkedInIcon";

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
  const yLinks = useParallax(scrollYProgress, 200);
  const isLarge = useIsLarge();

  return (
    <section className="max-width-container vertical-center summary-section">
      <div className="flex flex-col min-[900px]:flex-row justify-center items-center min-[1200px]:gap-x-24 gap-x-8 mx-auto">
        <motion.div
          className="my-picture-container rounded-xl"
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
            Hi, I'm Linyan, an <b className="font-semibold">MIT</b> student at
            the <b className="font-semibold">University of Melbourne</b>. I'm a
            full-stack web developer / software developer who is passionate to
            create <b className="font-semibold">beautiful</b> and{" "}
            <b className="font-semibold">innovative</b> applications.
          </motion.p>
          <motion.div
            className={`mt-16 flex text--${theme} items-center gap-x-8`}
            style={isLarge ? { y: yLinks } : {}}
          >
            <a className="summary-link" href="/resume.pdf" download>
              Resume
            </a>
            <button
              className="icon"
              onClick={() =>
                window.open("https://github.com/LinyanZ", "_blank").focus()
              }
            >
              <GithubIcon />
            </button>
            <button
              className="icon"
              onClick={() =>
                window
                  .open(
                    "https://www.linkedin.com/in/%E4%B8%B4%E7%A0%9A-%E6%9C%B1-5a63b9215/",
                    "_blank"
                  )
                  .focus()
              }
            >
              <LinkedInIcon />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
