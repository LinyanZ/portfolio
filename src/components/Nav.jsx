import gsap from "gsap";
import { useState } from "react";
import { NavLink, useLinkClickHandler } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";

const links = [
  { link: "", label: "Home" },
  { link: "about", label: "About" },
  { link: "projects", label: "Projects" },
  { link: "contact", label: "Contact" },
];

function Link({ to, label, expanded, setExpanded, transitionRef }) {
  const handleClick = useLinkClickHandler(to);

  return (
    <NavLink
      className={`navlink ${expanded ? "navlink--expanded" : ""}`}
      to={to}
      onClick={(e) => {
        e.preventDefault();
        setExpanded(false);
        gsap.to(transitionRef.current.scale, {
          x: 20,
          y: 20,
          z: 20,
          duration: 0.5,
          onComplete: () => {
            handleClick(e);
            gsap.to(transitionRef.current.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.5,
            });
          },
        });
      }}
    >
      {label}
    </NavLink>
  );
}

export default function Nav({ transitionRef }) {
  const [expanded, setExpanded] = useState(false);
  const [theme] = useTheme();

  return (
    <div className="navbar">
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
        className={`navbar-background ${
          expanded ? "navbar-background--expanded" : ""
        }`}
      >
        {links.map((l) => (
          <Link
            key={l.label}
            to={l.link}
            label={l.label}
            expanded={expanded}
            setExpanded={setExpanded}
            transitionRef={transitionRef}
          />
        ))}
      </div>
    </div>
  );
}
