import { useTheme } from "../contexts/themeContext";
import { Html, Scroll } from "@react-three/drei";

function Landing() {
  const [theme] = useTheme();

  const buttonStyle = `grow text-[1.5rem] font-thin transition duration-300 ease-out ${
    theme === "dark"
      ? "text-neutral-400 hover:text-neutral-200"
      : "text-neutral-900 hover:text-neutral-400"
  }`;

  const nameStyle = `text-center leading-[12rem] text-[11rem] font-thin h-48 ${
    theme === "dark" ? "text-neutral-200" : "text-neutral-700"
  }`;

  const descriptionStyle = `grow text-center text-[1.6rem] font-extra-light ${
    theme === "dark" ? "text-neutral-400" : "text-neutral-900"
  }`;

  return (
    <Scroll html>
      {/* <Html fullscreen> */}
      <div className="landing-section">
        <h1 className={nameStyle}>LINYAN ZHU</h1>
        <div className="flex w-[800px]">
          <h2 className={descriptionStyle}>Full-Stake Developer</h2>
          <h2 className={descriptionStyle}>•</h2>
          <h2 className={descriptionStyle}>Software Developer</h2>
        </div>
        {/* <div className="flex w-[1200px]">
          <button className={buttonStyle}>About</button>
          <button className={buttonStyle}>Experiences</button>
          <button className={buttonStyle}>Projects</button>
        </div> */}
      </div>
      {/* </Html> */}
    </Scroll>
  );
}

export default Landing;
