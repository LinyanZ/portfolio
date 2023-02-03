import Plane from "./Plane";
import Phone from "./Phone";

export default function FootprintTracker({ opacityRef }) {
  return (
    <>
      <Plane
        rotation={[Math.PI / 2, -2.1, 0]}
        start={[10, -4, -5]}
        end={{ x: -5, y: 2 }}
      />
      <Plane
        rotation={[Math.PI / 2, 1.9, 0]}
        start={[-5, -3, -5]}
        end={{ x: 5, y: -1 }}
      />
      <Phone opacityRef={opacityRef.current} />
    </>
  );
}
