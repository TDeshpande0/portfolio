import { useEffect, useState } from "react";

// True once the page has scrolled more than `offset` pixels from the top.
export function useScrolledPast(offset) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > offset);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [offset]);

  return scrolled;
}
