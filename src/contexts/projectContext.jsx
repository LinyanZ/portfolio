import { createContext, useContext, useState } from "react";

const projectContext = createContext();
projectContext.displayName = "projectContext";

function ProjectProvider(props) {
  const [project, setProject] = useState(null);
  return <projectContext.Provider value={[project, setProject]} {...props} />;
}

function useProject() {
  const context = useContext(projectContext);
  if (!context) {
    throw new Error("useProject should be used inside a ProjectProvider.");
  }
  return context;
}

export { ProjectProvider, useProject };
