import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./contexts/themeContext";
import "./styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectProvider } from "./contexts/projectContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
