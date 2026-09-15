export default function BeachScene() {
  return (
    <svg
      className="beach"
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9BCD0" />
          <stop offset="30%" stopColor="#F3A9C9" />
          <stop offset="58%" stopColor="#CBA6DC" />
          <stop offset="82%" stopColor="#AAA9DE" />
          <stop offset="100%" stopColor="#9EB5E0" />
        </linearGradient>
        <linearGradient id="tp-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5EA1D7" />
          <stop offset="45%" stopColor="#4E96D2" />
          <stop offset="100%" stopColor="#84C1E2" />
        </linearGradient>
        <radialGradient id="tp-moon">
          <stop offset="0%" stopColor="#FFFDF6" />
          <stop offset="72%" stopColor="#FFF6E0" />
          <stop offset="100%" stopColor="#FFF0D2" />
        </radialGradient>
      </defs>

      {/* sky */}
      <rect width="1200" height="300" fill="url(#tp-sky)" />
      <circle cx="900" cy="82" r="66" fill="#FFF3DE" opacity="0.26" />
      <circle cx="900" cy="82" r="29" fill="url(#tp-moon)" />

      <path
        d="M0,0 C5,-6 9,-6 13,-1 C17,-6 21,-6 26,0"
        transform="translate(150,132) scale(1)"
        stroke="#3D3752"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M0,0 C5,-6 9,-6 13,-1 C17,-6 21,-6 26,0"
        transform="translate(212,158) scale(0.85)"
        stroke="#3D3752"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.66"
      />
      <path
        d="M0,0 C5,-6 9,-6 13,-1 C17,-6 21,-6 26,0"
        transform="translate(742,112) scale(0.9)"
        stroke="#3D3752"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.66"
      />
      <path
        d="M0,0 C5,-6 9,-6 13,-1 C17,-6 21,-6 26,0"
        transform="translate(806,140) scale(0.72)"
        stroke="#3D3752"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* sea */}
      <rect y="300" width="1200" height="260" fill="url(#tp-sea)" />
      <path
        d="M-60,326 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        opacity="0.140"
        strokeLinecap="round"
      />
      <path
        d="M10,356 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        opacity="0.165"
        strokeLinecap="round"
      />
      <path
        d="M80,390 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        opacity="0.190"
        strokeLinecap="round"
      />
      <path
        d="M150,428 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        opacity="0.215"
        strokeLinecap="round"
      />
      <path
        d="M220,470 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        opacity="0.240"
        strokeLinecap="round"
      />
      <path
        d="M290,516 q95,-7 195,0 t195,0 t195,0 t195,0 t195,0"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        opacity="0.265"
        strokeLinecap="round"
      />
      {/* moon reflection */}
      <path
        d="M876 300 L928 300 L946 560 L858 560 Z"
        fill="#FFF3DE"
        opacity="0.13"
      />

      {/* headland + palms */}
      <path
        d="M296 300 C332 272 400 256 492 256 C580 256 652 274 688 300 Z"
        fill="#151E2E"
      />
      <g transform="translate(486,196) scale(1,1)">
        <path
          d="M0,0 C7,32 10,66 5,104"
          stroke="#151E2E"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <g fill="#151E2E">
          <path d="M0,2 C-34,-16 -64,-9 -82,11 C-60,-7 -30,-7 0,2 Z" />
          <path d="M0,2 C-26,-34 -11,-60 7,-73 C-2,-51 -8,-26 0,2 Z" />
          <path d="M0,2 C28,-30 58,-32 78,-20 C54,-28 24,-14 0,2 Z" />
          <path d="M0,2 C34,-8 62,12 72,32 C54,12 28,3 0,2 Z" />
          <path d="M0,2 C-17,12 -40,30 -50,52 C-36,26 -16,10 0,2 Z" />
        </g>
      </g>
      <g transform="translate(566,224) scale(0.74,0.74)">
        <path
          d="M0,0 C7,32 10,66 5,104"
          stroke="#151E2E"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <g fill="#151E2E">
          <path d="M0,2 C-34,-16 -64,-9 -82,11 C-60,-7 -30,-7 0,2 Z" />
          <path d="M0,2 C-26,-34 -11,-60 7,-73 C-2,-51 -8,-26 0,2 Z" />
          <path d="M0,2 C28,-30 58,-32 78,-20 C54,-28 24,-14 0,2 Z" />
          <path d="M0,2 C34,-8 62,12 72,32 C54,12 28,3 0,2 Z" />
          <path d="M0,2 C-17,12 -40,30 -50,52 C-36,26 -16,10 0,2 Z" />
        </g>
      </g>

      {/* shoreline sweeping in from the left */}
      <path
        d="M0 316 C104 350 182 410 230 486 C250 518 259 540 264 560 L0 560 Z"
        fill="#F2D6A0"
      />
      <path
        d="M0 316 C104 350 182 410 230 486 C250 518 259 540 264 560"
        stroke="#FFFFFF"
        strokeWidth="9"
        fill="none"
        opacity="0.85"
        strokeLinecap="round"
      />
      <path
        d="M16 336 C116 370 192 424 238 498 C256 528 266 546 271 560"
        stroke="#FFFFFF"
        strokeWidth="4"
        fill="none"
        opacity="0.45"
        strokeLinecap="round"
      />
    </svg>
  );
}
