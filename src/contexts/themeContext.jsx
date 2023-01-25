import { createContext, useContext, useState } from "react";

const themeContext = createContext();
themeContext.displayName = "themeContext";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  return (
    <themeContext.Provider value={[theme, setTheme]}>
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

export { ThemeProvider, useTheme };
