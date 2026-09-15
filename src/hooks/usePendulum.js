import { useEffect, useRef } from "react";

// Tuning (angles in degrees, time in seconds). stiffness ≈ ω², so ~1.2s swing period.
export const SWING = {
  stiffness: 28,
  damping: 2.2,
  gain: 40, // deg/s of swing per px/ms of mouse speed
  maxVel: 240,
  tapSpeed: 0.9, // simulated px/ms for touch taps
};

// Damped pendulum around `restAngle`. Attach `ref` to the element to rotate and
// call `kick(vx)` with a horizontal speed; positive angles swing the bottom left.
export function usePendulum(restAngle) {
  const ref = useRef(null);
  const sim = useRef({ angle: restAngle, vel: 0, raf: 0, last: 0 });

  useEffect(() => () => cancelAnimationFrame(sim.current.raf), []);

  const kick = (vx) => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const s = sim.current;
    s.vel = Math.max(
      -SWING.maxVel,
      Math.min(SWING.maxVel, s.vel - vx * SWING.gain),
    );
    if (s.raf) return;
    s.last = performance.now();

    const step = (now) => {
      const dt = Math.min(Math.max((now - s.last) / 1000, 0), 1 / 30);
      s.last = now;
      const offset = ((s.angle - restAngle) * Math.PI) / 180;
      const acc =
        -SWING.stiffness * (180 / Math.PI) * Math.sin(offset) -
        SWING.damping * s.vel;
      s.vel += acc * dt;
      s.angle += s.vel * dt;
      if (Math.abs(s.angle - restAngle) < 0.05 && Math.abs(s.vel) < 0.5) {
        s.angle = restAngle;
        s.vel = 0;
        s.raf = 0;
      } else {
        s.raf = requestAnimationFrame(step);
      }
      ref.current.style.transform = `rotate(${s.angle}deg)`;
    };
    s.raf = requestAnimationFrame(step);
  };

  return { ref, kick };
}
