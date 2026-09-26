import { useId } from "react";

// The red "ARRIVED" entry stamp: a double ring with arced text and a plane. Used on the About
// page and stamped down during the passport transition. Size it with `className`.
export default function ArrivalStamp({ className = "", ...props }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <path id={`${id}top`} d="M60,60 m-42,0 a42,42 0 0,1 84,0" fill="none" />
        <path id={`${id}bot`} d="M60,60 m-42,0 a42,42 0 0,0 84,0" fill="none" />
      </defs>
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="#FF5A4E"
        strokeWidth="3"
        opacity=".9"
      />
      <circle
        cx="60"
        cy="60"
        r="44"
        fill="none"
        stroke="#FF5A4E"
        strokeWidth="1.5"
        opacity=".7"
      />
      <text
        fill="#FF5A4E"
        fontFamily="Space Mono, monospace"
        fontSize="11"
        letterSpacing="2.4"
      >
        <textPath href={`#${id}top`} startOffset="50%" textAnchor="middle">
          ARRIVED
        </textPath>
      </text>
      <text
        fill="#FF5A4E"
        fontFamily="Space Mono, monospace"
        fontSize="10"
        letterSpacing="2"
      >
        <textPath href={`#${id}bot`} startOffset="50%" textAnchor="middle">
          DESIGN · HCI
        </textPath>
      </text>
      <g transform="translate(60,58)">
        <path
          d="M0,-11 L4,-1 L15,4 L15,7 L4,4.5 L2.5,13 L6,16 L6,18 L0,16.5 L-6,18 L-6,16 L-2.5,13 L-4,4.5 L-15,7 L-15,4 L-4,-1 Z"
          fill="#FF5A4E"
          opacity=".95"
          transform="rotate(35)"
        />
      </g>
    </svg>
  );
}
