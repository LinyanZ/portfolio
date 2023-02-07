import Transition from "../components/Transition";
import Hero from "../components/Hero";
import { useTheme } from "../contexts/themeContext";

function Project({ url }) {
  const [theme] = useTheme();

  return (
    <div
      className={`max-width-container project-container project-container--${theme}`}
    >
      <video className="project-video" autoPlay={true} muted={true}>
        <source src={url} type="video/mp4" />
      </video>
      <div className={`project-description text--${theme}`}>
        <h2>Project Title</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          fugiat suscipit veniam delectus assumenda, necessitatibus placeat esse
          consequuntur. Ipsa, quae? Quasi possimus ducimus.
        </p>
        <ul>
          <li>React.js</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>MongoDB</li>
          <li>Docker</li>
          <li>Express</li>
          <li>MongoDB</li>
          <li>Docker</li>
        </ul>
        <button>Learn More</button>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <div>
        <Project url="./videos/thirdPersonShooter.mp4" />
        <Project url="./videos/dataVisualizer.mp4" />
        <Project url="./videos/footprintTracker.mp4" />
      </div>
      <Transition />
    </>
  );
}

export default Home;
