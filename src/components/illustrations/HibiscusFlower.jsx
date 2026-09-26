import { useState } from "react";

// Tanvi's hand-drawn hibiscus, a transparent WebP centred in a square. Size and place it with
// `className` or `style`, like the SVG it replaced. Each one picks its own random turn when it
// first appears, so repeated flowers don't look stamped out.
export default function HibiscusFlower({ style, className = "" }) {
  const [turn] = useState(() => Math.round(Math.random() * 360));
  return (
    <img
      src="/assets/illustrations/hibiscus.webp"
      alt=""
      aria-hidden="true"
      width={240}
      height={240}
      style={{ transform: `rotate(${turn}deg)`, ...style }}
      className={`object-contain ${className}`}
      draggable={false}
    />
  );
}
