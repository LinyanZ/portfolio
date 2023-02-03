import { createContext, useContext, useState, useEffect } from "react";

const projectContext = createContext();
projectContext.displayName = "projectContext";

function ProjectProvider({ children }) {
  const [project, setProject] = useState(-1);

  return (
    <projectContext.Provider value={[project, setProject]}>
      {children}
    </projectContext.Provider>
  );
}

function useProject() {
  const context = useContext(projectContext);
  if (!context) {
    throw new Error("useProject should be used inside a ProjectProvider.");
  }
  return context;
}

export { ProjectProvider, useProject };
