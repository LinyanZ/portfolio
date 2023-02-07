import { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { Link } from "react-router-dom";

export default function Nav() {
  const [expanded, setExpanded] = useState(false);
  const [theme] = useTheme();

  return (
    <div className={`max-width-container navbar`}>
      <Link
        to="/"
        className={`navlink navlink--${theme} ${
          expanded ? "navlink--expanded" : ""
        }`}
        onClick={() => setExpanded(false)}
      >
        Home
      </Link>
      <Link
        to="/about"
        className={`navlink navlink--${theme} ${
          expanded ? "navlink--expanded" : ""
        }`}
        onClick={() => setExpanded(false)}
      >
        About
      </Link>
    </div>
  );
}
