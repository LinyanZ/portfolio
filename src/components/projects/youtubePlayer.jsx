import { useEffect } from "react";
import { useRef } from "react";
import YouTube from "react-youtube";
import { useProject } from "../../contexts/projectContext";

const PLAYING = 1;

export default function YoutubePlayer({ p, ...props }) {
  const ref = useRef(null);
  const [selectedProject] = useProject();
  const shouldPause = selectedProject !== p;

  useEffect(() => {
    if (ref.current && ref.current.getPlayerState() === PLAYING && shouldPause)
      ref.current.pauseVideo();
  }, [ref.current, shouldPause]);

  return (
    <YouTube
      videoId={p.youtubeUrl}
      onReady={(e) => (ref.current = e.target)}
      {...props}
    />
  );
}
