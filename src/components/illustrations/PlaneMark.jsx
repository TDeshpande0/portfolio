export default function PlaneMark({ className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g transform="rotate(90 50 50)">
        <path
          d="M50 8 L58 40 L88 55 L88 62 L58 54 L54 82 L66 90 L66 95 L50 91 L34 95 L34 90 L46 82 L42 54 L12 62 L12 55 L42 40 Z"
          fill="#FFC53D"
          stroke="#FFFDF6"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
