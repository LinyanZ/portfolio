import City from "./City";
import Monitor from "./Monitor";

export default function DataVisualizer({ opacityRef }) {
  return (
    <>
      <City />
      <Monitor opacityRef={opacityRef.current} />
    </>
  );
}
