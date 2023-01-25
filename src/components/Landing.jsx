import { useTheme } from "../contexts/themeContext";

function Landing() {
  const [theme] = useTheme();
  return (
    <div className="landing-section">
      <h1
        className={`text-center text-8xl text-neutral-200 font-thin ${
          theme === "dark" ? "" : "text-gray-700"
        }`}
      >
        LINYAN ZHU
      </h1>
      <div className="flex w-[600px] my-4">
        <button className="grow text-sm text-neutral-400 font-thin hover:text-neutral-200 transition duration-200">
          About
        </button>
        <button className="grow text-sm text-neutral-400 font-thin hover:text-neutral-200 transition duration-200">
          Experiences
        </button>
        <button className="grow text-sm text-neutral-400 font-thin hover:text-neutral-200 transition duration-200">
          Projects
        </button>
      </div>
    </div>
  );
}

export default Landing;
