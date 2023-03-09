import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./contexts/themeContext";
import "./styles.css";
import { ProjectProvider } from "./contexts/projectContext";
import { LanguageProvider } from "./contexts/languageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ProjectProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ProjectProvider>
    </ThemeProvider>
  </React.StrictMode>
);
