import { useNavMobileStore } from "@/store/navs.store";
import { useEffect, useState } from "react";

// Hook
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export function useWindowClick() {
  const [windowElement, setWindowElement] = useState<{
    parent: string[];
    el: string[];
  }>({
    parent: [],
    el: [],
  });
  const { isVisible } = useNavMobileStore();

  useEffect(() => {
    function handleClick(ev: MouseEvent) {
      if (isVisible) {
        const item = ev.target as HTMLElement;
        setWindowElement({
          el: Array.from(item.classList || []),
          parent: Array.from(item.parentElement?.classList! || []),
        });
      }
    }
    // Add event listener
    window.addEventListener("click", handleClick);

    // Remove event listener on cleanup
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return windowElement;
}
