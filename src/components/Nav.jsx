import { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { Link } from "react-router-dom";

export default function Nav() {
  const [expanded, setExpanded] = useState(false);
  const [theme] = useTheme();

  return (
    <>
      <button
        className={`navbar-menu navbar-menu--${theme} ${
          expanded ? "navbar-menu--expanded" : ""
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Menu</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M80 160h352M80 256h352M80 352h352"
          />
        </svg>
      </button>
      <div
        className={`navbar ${
          expanded ? "navbar--expanded" : ""
        } background-blur background-blur--${theme}`}
      >
        <Link
          to="/"
          className={`navlink navlink--${theme} ${
            expanded ? "navlink--expanded" : ""
          }`}
          onClick={() => setExpanded(false)}
        >
          About
        </Link>
        <Link
          to="/projects"
          className={`navlink navlink--${theme} ${
            expanded ? "navlink--expanded" : ""
          }`}
          onClick={() => setExpanded(false)}
        >
          Projects
        </Link>
        <Link
          to="/contact"
          className={`navlink navlink--${theme} ${
            expanded ? "navlink--expanded" : ""
          }`}
          onClick={() => setExpanded(false)}
        >
          Contact
        </Link>
      </div>
    </>
  );
}
