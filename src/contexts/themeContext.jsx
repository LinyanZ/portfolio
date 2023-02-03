import { createContext, useContext, useState, useEffect } from "react";
import "./theme.css";

const themeContext = createContext();
themeContext.displayName = "themeContext";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const previousTheme = window.localStorage.getItem("theme");
    if (previousTheme != null) setTheme(previousTheme);
    else window.localStorage.setItem("theme", "dark");
  }, []);

  return (
    <themeContext.Provider
      value={[
        theme,
        () => {
          const nextTheme = theme === "dark" ? "light" : "dark";
          window.localStorage.setItem("theme", nextTheme);
          setTheme(nextTheme);
        },
      ]}
    >
      {children}
    </themeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(themeContext);
  if (!context) {
    throw new Error("useTheme should be used inside a ThemeProvider.");
  }
  return context;
}

function ThemeToggler() {
  const [theme, setTheme] = useTheme();

  return (
    <button
      className={`theme-toggler theme-toggler--${theme}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="theme-toggler"
    >
      <ion-icon name="contrast-outline" />
    </button>
  );
}

export { ThemeProvider, useTheme, ThemeToggler };
