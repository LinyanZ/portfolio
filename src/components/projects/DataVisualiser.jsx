import City from "./City";
import Monitor from "./Monitor";

export default function DataVisualiser({ opacityRef }) {
  return (
    <>
      <City />
      <Monitor opacityRef={opacityRef.current} />
    </>
  );
}
