import { useState, useEffect } from "react";

export default function useObjectSize(objRef) {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    function updateSize() {
      if (objRef.current) {
        setSize([objRef.current.clientWidth, objRef.current.clientHeight]);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [objRef]);

  return size;
}
