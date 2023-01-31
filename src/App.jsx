import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ScrollControls } from "@react-three/drei";

import Root from "./components/Root";
import Landing from "./components/Landing";
import About from "./components/About";
import projects from "./data/projects.json";
import Contact from "./components/Contact";
import Projects from "./components/Projects";

import { ThemeToggler } from "./contexts/themeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/projects",
        element: (
          <ScrollControls pages={projects.length} damping={0.1}>
            <Projects />
          </ScrollControls>
        ),
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeToggler />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
