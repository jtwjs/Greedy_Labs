import { useState, useEffect } from "react";

enum ScrollDirection {
  up = "up",
  down = "down",
}

interface UseScrollDirection {
  direction: ScrollDirection;
}

export default function useScrollDirection(threshold = 50): UseScrollDirection {
  const [scrollDir, setScrollDir] = useState(ScrollDirection.up);

  useEffect(() => {
    let previousScrollYPosition = window.scrollY;

    const scrolledMoreThanThreshold = (currentScrollYPosition: number) =>
      Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold;

    const isScrollingUp = (currentScrollYPosition: number) =>
      currentScrollYPosition > previousScrollYPosition &&
      !(previousScrollYPosition > 0 && currentScrollYPosition === 0) &&
      !(currentScrollYPosition > 0 && previousScrollYPosition === 0);

    const updateScrollDirection = () => {
      const currentScrollYPosition = window.scrollY;

      if (scrolledMoreThanThreshold(currentScrollYPosition)) {
        const newScrollDirection = isScrollingUp(currentScrollYPosition)
          ? ScrollDirection.down
          : ScrollDirection.up;
        setScrollDir(newScrollDirection);
        previousScrollYPosition =
          currentScrollYPosition > 0 ? currentScrollYPosition : 0;
      }
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return {
    direction: scrollDir,
  };
}
