import { Html, ScrollControls } from "@react-three/drei";
import { useTheme } from "../contexts/themeContext";
import Education from "../components/about/Education";
import Experiences from "../components/about/Experiences";
import Skills from "../components/about/Skills";

function About() {
  const [theme] = useTheme();

  const textColor = `text-neutral-${theme === "dark" ? "200" : "900"}`;
  const titleStyle = `text-[2.4rem] ${textColor} mx-8 my-4`;
  const blockStyle = `background-blur background-blur--${theme} m-4 rounded-lg`;

  const nameStyle = `text-center leading-[12rem] text-[11rem] font-thin h-48 ${
    theme === "dark" ? "text-neutral-200" : "text-neutral-700"
  }`;

  const descriptionStyle = `grow text-center text-[1.6rem] font-extra-light ${
    theme === "dark" ? "text-neutral-400" : "text-neutral-900"
  }`;

  return (
    <>
      <ScrollControls>
        <Html fullscreen>
          <div className="landing-section">
            <h1 className={nameStyle}>LINYAN ZHU</h1>
            <div className="flex w-[800px]">
              <h2 className={descriptionStyle}>Full-Stack Developer</h2>
              <h2 className={descriptionStyle}>•</h2>
              <h2 className={descriptionStyle}>Software Developer</h2>\
            </div>
          </div>
          <div className="w-[100vw] h-[100vh] flex flex-column items-center justify-center">
            <div>
              <div className="row-span-2 col-span-3">
                <h1
                  className={`text-center text-[10rem] font-thin h-full ${textColor}`}
                >
                  About
                </h1>
              </div>
              <div className="w-[1600px] h-[800px] grid grid-rows-8 grid-cols-11 rounded-lg">
                <div className={`${blockStyle} row-span-3 col-span-5`}>
                  <h2 className={titleStyle}>Summary</h2>
                </div>
                <Education theme={theme} />
                <Experiences theme={theme} />
                <Skills theme={theme} />
              </div>
            </div>
          </div>
        </Html>
      </ScrollControls>
    </>
  );
}

export default About;
