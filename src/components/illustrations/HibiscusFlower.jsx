export default function HibiscusFlower({ uid = "h1", style, className }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg
      viewBox="0 0 220 220"
      style={style}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${uid}-p`} cx="50%" cy="92%" r="86%">
          <stop offset="0%" stopColor="#C9483E" />
          <stop offset="14%" stopColor="#EC8874" />
          <stop offset="46%" stopColor="#F7B39A" />
          <stop offset="100%" stopColor="#FDEBCF" />
        </radialGradient>
      </defs>
      <g transform="translate(110,116)">
        {petals.map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <path
              d="M0,0 C-26,-8 -47,-28 -47,-54 C-47,-78 -24,-92 -4,-83 C-1,-81 1,-81 4,-83 C24,-92 47,-78 47,-54 C47,-28 26,-8 0,0 Z"
              fill={`url(#${uid}-p)`}
              stroke="#C0503F"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {[-26, -13, 0, 13, 26].map((off, i) => (
              <path
                key={i}
                d={`M${off * 0.14},-8 C${off * 0.6},-30 ${off * 0.86},-50 ${off * 0.8},-70`}
                stroke="#D9705C"
                strokeWidth="0.9"
                fill="none"
                opacity="0.7"
              />
            ))}
          </g>
        ))}
        {/* deep throat */}
        <circle r="15" fill="#C0453B" opacity="0.92" />
        <circle r="7" fill="#9E332C" />
        {/* style column with anthers */}
        <path
          d="M0,-4 C6,-26 14,-46 22,-62"
          stroke="#D2564A"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
        />
        {[
          [18, -66],
          [24, -70],
          [28, -62],
          [22, -58],
          [30, -68],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.2" fill="#E2685A" />
        ))}
        {[
          [8, -30],
          [11, -37],
          [14, -44],
          [17, -51],
          [10, -33],
          [13, -41],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.9" fill="#F0C64B" />
        ))}
      </g>
    </svg>
  );
}
