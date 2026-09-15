import { useEffect, useRef } from "react";

// Tracks horizontal mouse speed (px/ms) across the page so a tag knows how hard it was hit.
export function usePointerVelocity() {
  const pointer = useRef({ x: 0, t: 0, vx: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const p = pointer.current;
      const dt = e.timeStamp - p.t;
      const instant = dt > 0 && dt < 100 ? (e.clientX - p.x) / dt : 0;
      p.vx = 0.6 * instant + 0.4 * p.vx;
      p.x = e.clientX;
      p.t = e.timeStamp;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pointer;
}
