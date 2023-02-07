import { useTheme } from "../contexts/themeContext";

export default function Hero() {
  const [theme] = useTheme();

  return (
    <section className="max-width-container vertical-center hero-section">
      <h1 className={`hero-text hero--top-left text--${theme}`}>
        Hi, I'm <br />
        LINYAN ZHU
      </h1>
      <p className={`short-description text--${theme}`}>
        A Full-Stack / Software Developer
      </p>
    </section>
  );
}
