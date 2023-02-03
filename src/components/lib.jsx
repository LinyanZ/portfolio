import { useVideoTexture } from "@react-three/drei";
import React from "react";

function Tag({ text, theme }) {
  return (
    <div className={`tag tag--${theme}`}>
      <p>{text}</p>
    </div>
  );
}

const VideoMaterial = React.forwardRef(({ url, opacity }, ref) => {
  const texture = useVideoTexture(url);
  return (
    <meshBasicMaterial
      map={texture}
      toneMapped={false}
      opacity={opacity}
      transparent
      ref={ref}
    />
  );
});

export { Tag, VideoMaterial };
