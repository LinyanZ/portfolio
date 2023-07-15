import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme } from "../contexts/themeContext";
import { useIsLarge } from "../utils";
import GithubIcon from "./icons/githubIcon";
import LinkedInIcon from "./icons/linkedInIcon";
import { useLanguage } from "../contexts/languageContext";

const ease = [0, 0.4, 0.2, 1];

function useParallax(value, distance, offset = 0) {
  return useTransform(value, [0, 1], [-distance + offset, distance + offset]);
}

export default function Summary() {
  const [theme] = useTheme();
  const [language] = useLanguage();

  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.00001,
  });
  const yDiv = useParallax(y, 100);
  const yP = useParallax(y, 100);
  const yLinks = useParallax(y, 200);
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
          <h2 className={`summary-title text--${theme}`}>
            {language === "en" ? "About Me" : "个人简介"}
          </h2>
          <motion.p
            className={`summary-content text--${theme}`}
            style={isLarge ? { y: yP } : {}}
          >
            {language === "en" ? (
              <>
                Hi, I'm Linyan, an <b className="font-semibold">MIT</b> student
                at the <b className="font-semibold">University of Melbourne</b>.
                I'm a software developer who loves {" "}
                <b className="font-semibold">GAMES</b> and possesses {" "}
                <b className="font-semibold">SOLID</b> programming skills. I enjoy {" "}
                <b className="font-semibold">TACKLING CHALLENGES</b> in game development 
                and learning cutting-edge technologies to create{" "}
                <b className="font-semibold">VISUALLY STUNNING</b> works.
              </>
            ) : (
              <>
                哈喽，我是临砚，一个在
                <b className="font-semibold">墨尔本大学</b>上学的
                <b className="font-semibold">IT硕士</b>学生。我是一位
                <b className="font-semibold">热爱游戏</b>的软件开发者，拥有
                <b className="font-semibold">扎实</b>的编程技能。我在游戏开发过程中喜欢
                <b className="font-semibold">解决挑战</b>，学习前沿的技术制作
                <b className="font-semibold">视觉精美</b>的作品。
              </>
            )}
          </motion.p>
          <motion.div
            className={`mt-16 flex text--${theme} items-center gap-x-8`}
            style={isLarge ? { y: yLinks } : {}}
          >
            <a
              className="summary-link"
              href={
                language === "en"
                  ? "/Linyan Zhu Resume.pdf"
                  : "/朱临砚 简历.pdf"
              } // TODO: update resume link.
              download
            >
              {language === "en" ? "Resume" : "简历"}
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
