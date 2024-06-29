import { useEffect, useRef } from "react";

function useScrollToTop() {
  const isScrollingRef = useRef(true); // Use useRef to persist the isScrolling value

  useEffect(() => {
    const scrollToTop = () => {
      if (!isScrollingRef.current) return;
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      if (isScrollingRef.current) {
        window.requestAnimationFrame(scrollToTop);
      }
    };

    scrollToTop();

    return () => {
      isScrollingRef.current = false; // Update the ref when the effect is cleaned up
    };
  }, []);
}

export default useScrollToTop;
