import { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { useLocation } from "wouter";

export default function Nav({ transitionRef }) {
  const [expanded, setExpanded] = useState(false);
  const [theme] = useTheme();

  const [location, setLocation] = useLocation();

  function handleClick(url) {
    setExpanded(false);
    setLocation(url);
  }

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
      <div className={`navbar ${expanded ? "navbar--expanded" : ""}`}>
        <button
          className={`navlink ${expanded ? "navlink--expanded" : ""}`}
          onClick={() => handleClick("/")}
        >
          Home
        </button>
        <button
          className={`navlink ${expanded ? "navlink--expanded" : ""}`}
          onClick={() => handleClick("/about")}
        >
          About
        </button>
        <button
          className={`navlink ${expanded ? "navlink--expanded" : ""}`}
          onClick={() => handleClick("/projects")}
        >
          Projects
        </button>
        <button
          className={`navlink ${expanded ? "navlink--expanded" : ""}`}
          onClick={() => handleClick("/contact")}
        >
          Contact
        </button>
      </div>
    </>
  );
}
