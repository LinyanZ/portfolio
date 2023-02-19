import { useEffect } from "react";
import { useRef } from "react";
import YouTube from "react-youtube";
import { useProject } from "../../contexts/projectContext";

export default function YoutubePlayer({ p, ...props }) {
  const ref = useRef(null);
  const [selectedProject] = useProject();

  useEffect(() => {
    if (ref.current) {
      if (selectedProject !== p) ref.current.target.pauseVideo();
    }
  }, [ref.current, selectedProject]);

  return (
    <YouTube
      opts={{ width: "100%", height: "100%" }}
      videoId={p.youtubeUrl}
      onReady={(e) => (ref.current = e)}
      {...props}
    />
  );
}
