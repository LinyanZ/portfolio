import { useTheme } from "../contexts/themeContext";
import { Html, Scroll } from "@react-three/drei";
import Background from "./particles/Background";

function Landing() {
  const [theme] = useTheme();

  const titleStyle = `text-center leading-[12rem] text-[11rem] font-thin h-48 ${
    theme === "dark" ? "text-neutral-200" : "text-neutral-700"
  }`;

  const descriptionStyle = `grow text-center text-[1.6rem] font-extra-light ${
    theme === "dark" ? "text-neutral-400" : "text-neutral-900"
  }`;

  return (
    <>
      <Html fullscreen>
        <div className="landing-section">
          <h1 className={titleStyle}>LINYAN ZHU</h1>
          <div className="flex w-[800px]">
            <h2 className={descriptionStyle}>Full-Stack Developer</h2>
            <h2 className={descriptionStyle}>•</h2>
            <h2 className={descriptionStyle}>Software Developer</h2>\
          </div>
        </div>
      </Html>
      <Background />
    </>
  );
}

export default Landing;
