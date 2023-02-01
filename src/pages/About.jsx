import { Html } from "@react-three/drei";
import { useTheme } from "../contexts/themeContext";
import Education from "../components/about/Education";
import Experiences from "../components/about/Experiences";
import Skills from "../components/about/Skills";

function About() {
  const [theme] = useTheme();

  const textColor = `text-neutral-${theme === "dark" ? "200" : "900"}`;
  const titleStyle = `text-[2.4rem] ${textColor} mx-8 my-4`;
  const blockStyle = `background-blur background-blur--${theme} m-4 rounded-lg`;

  return (
    <>
      <Html fullscreen>
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
    </>
  );
}

export default About;
