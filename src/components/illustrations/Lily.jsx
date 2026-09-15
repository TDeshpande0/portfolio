export default function Lily({ uid = "l1", style, className }) {
  const petals = [0, 60, 120, 180, 240, 300];
  const freckles = [
    [-7, -30],
    [6, -34],
    [-11, -42],
    [9, -46],
    [-4, -52],
    [12, -56],
    [-14, -60],
    [3, -64],
    [-8, -72],
    [10, -74],
  ];
  return (
    <svg
      viewBox="0 0 240 240"
      style={style}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${uid}-p`} cx="50%" cy="92%" r="82%">
          <stop offset="0%" stopColor="#DFE08C" />
          <stop offset="12%" stopColor="#E4C39E" />
          <stop offset="30%" stopColor="#D9799F" />
          <stop offset="62%" stopColor="#E296B4" />
          <stop offset="88%" stopColor="#F2C7D7" />
          <stop offset="100%" stopColor="#F7DCE4" />
        </radialGradient>
        <radialGradient id={`${uid}-c`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9CE5E" />
          <stop offset="100%" stopColor="#DCE08F" />
        </radialGradient>
      </defs>
      <g transform="translate(120,120)">
        {petals.map((deg, pi) => (
          <g key={deg} transform={`rotate(${deg})`}>
            {/* broad petal with a recurved, slightly curled tip */}
            <path
              d="M0,0
                 C-16,-18 -30,-40 -30,-64
                 C-30,-84 -20,-100 -8,-106
                 C-2,-109 2,-109 8,-106
                 C20,-100 30,-84 30,-64
                 C30,-40 16,-18 0,0 Z"
              fill={`url(#${uid}-p)`}
              stroke="#5B3243"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* midrib */}
            <path
              d="M0,-6 C1,-40 1,-72 0,-100"
              stroke="#8E4468"
              strokeWidth="1.5"
              fill="none"
              opacity="0.8"
            />
            {/* side veins */}
            {[-20, -13, -6.5, 6.5, 13, 20].map((off, i) => (
              <path
                key={i}
                d={`M${off * 0.1},-8 C${off * 0.62},-34 ${off * 0.92},-60 ${off * 0.74},-92`}
                stroke="#A5557A"
                strokeWidth="1"
                fill="none"
                opacity="0.62"
              />
            ))}
            {/* speckles */}
            {pi % 2 === 0 &&
              freckles.map(([fx, fy], i) => (
                <circle
                  key={i}
                  cx={fx * 0.8}
                  cy={fy}
                  r="1.5"
                  fill="#A83E63"
                  opacity="0.5"
                />
              ))}
          </g>
        ))}

        {/* six stamens with heavy anthers */}
        {[-52, -30, -8, 14, 36, 58].map((deg, i) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <path
              d={`M0,-2 C${4 + i * 0.8},-20 ${7 + i * 1.2},-38 ${6 + i},-54`}
              stroke="#7A4356"
              strokeWidth="1.7"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse
              cx={6 + i}
              cy={-58}
              rx="3.4"
              ry="7"
              fill="#7C2A2C"
              transform={`rotate(${18 + i * 5} ${6 + i} -58)`}
            />
          </g>
        ))}

        {/* pistil */}
        <path
          d="M0,-2 C2,-24 3,-46 2,-66"
          stroke="#7A4356"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="2" cy="-70" rx="4.4" ry="5.6" fill="#E5B93F" />

        {/* green-gold throat */}
        <circle r="13" fill={`url(#${uid}-c)`} />
        <circle r="5.5" fill="#B4B84C" />
      </g>
    </svg>
  );
}
