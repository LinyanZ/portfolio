import { createContext, useContext, useState, useEffect } from "react";
import LanguageIcon from "../components/icons/languageIcon";
import { useTheme } from "./themeContext";
import "./language.css";

const languageContext = createContext();
languageContext.displayName = "languageContext";

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const previousLanguage = window.localStorage.getItem("language");
    if (previousLanguage != null) setLanguage(previousLanguage);
    else window.localStorage.setItem("language", "en");
  }, []);

  return (
    <languageContext.Provider
      value={[
        language,
        () => {
          const nextLanguage = language === "en" ? "zh" : "en";
          window.localStorage.setItem("language", nextLanguage);
          setLanguage(nextLanguage);
        },
      ]}
    >
      {children}
    </languageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(languageContext);
  if (!context) {
    throw new Error("useLanguage should be used inside a LanguageProvider.");
  }
  return context;
}

function LanguageToggler() {
  const [theme] = useTheme();
  const [_, toggleLanguage] = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      title="language-toggler"
      className={`language-toggler language-toggler--${theme}`}
    >
      <LanguageIcon />
    </button>
  );
}

export { LanguageProvider, useLanguage, LanguageToggler };
