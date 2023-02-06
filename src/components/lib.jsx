import { useVideoTexture } from "@react-three/drei";
import React from "react";

function DetailBlock({ title, startDate, endDate, description, remark }) {
  return (
    <div className="detail-container">
      <div className="detail-top-row">
        <p className="detail-title">{title}</p>
        <p className="detail-date">{`${startDate} - ${endDate}`}</p>
      </div>
      <p className="detail-description">{description}</p>
      {remark && (
        <ul className="">
          {remark.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}
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

export { DetailBlock, VideoMaterial };
