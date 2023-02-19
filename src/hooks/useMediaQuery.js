import { useState, useEffect } from "react";

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

const useIsSmall = () => useMediaQuery("(min-width: 480px)");
const useIsMedium = () => useMediaQuery("(min-width: 641px)");
const useIsLarge = () => useMediaQuery("(min-width: 1201px)");

export { useIsSmall, useIsMedium, useIsLarge };
