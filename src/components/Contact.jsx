import { useTheme } from "../contexts/themeContext";
import { Html } from "@react-three/drei";
import projects from "../data/projects.json";

function Contact() {
  const [theme] = useTheme();

  const nameStyle = `text-center leading-[12rem] text-[11rem] font-thin h-48 ${
    theme === "dark" ? "text-neutral-200" : "text-neutral-700"
  }`;

  return (
    <Html fullscreen>
      <div
        className={`w-[100vw] h-[100vh] mt-[${
          projects.length + 4
        }00vh] flex justify-center flex-column items-center`}
      >
        <h1 className={nameStyle}>Contact</h1>
      </div>
    </Html>
  );
}

export default Contact;
