// The booking user flow, drawn to scale: legend across the top, then search → filters → special
// assistance → SAF → review → seats → personal info → special equipment → pay.
export default function UserFlowDiagram({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1560 560"
      className={className}
      role="img"
      aria-label="User flow diagram for the Delta booking process"
    >
      <defs>
        <marker
          id="ar"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#123B36" />
        </marker>
      </defs>
      <text
        x="40"
        y="24"
        fontFamily="Space Mono,monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#123B36"
      >
        LEGEND
      </text>
      <circle
        cx="80"
        cy="46"
        r="26"
        fill="#FF8A5C"
        stroke="#C4551F"
        strokeWidth="1.5"
      />
      <text
        x="80"
        y="40.75"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9"
        fontWeight="600"
        fill="#3A1D0B"
      >
        <tspan x="80" dy="0">
          Starting
        </tspan>
        <tspan x="80" dy="10.5">
          Point
        </tspan>
      </text>
      <polygon
        points="210,16.0 253.0,46 210,76.0 167.0,46"
        fill="#FFC53D"
        stroke="#B4832E"
        strokeWidth="1.5"
      />
      <text
        x="210"
        y="40.75"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9"
        fontWeight="600"
        fill="#123B36"
      >
        <tspan x="210" dy="0">
          Decision
        </tspan>
        <tspan x="210" dy="10.5">
          Point
        </tspan>
      </text>
      <rect
        x="298.0"
        y="23.0"
        width="104"
        height="46"
        rx="8"
        fill="#2FA968"
        stroke="#1E7A4C"
        strokeWidth="1.5"
      />
      <text
        x="350"
        y="40.5"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#FFFFFF"
      >
        <tspan x="350" dy="0">
          Positive
        </tspan>
        <tspan x="350" dy="11.0">
          Decision
        </tspan>
      </text>
      <rect
        x="448.0"
        y="23.0"
        width="104"
        height="46"
        rx="8"
        fill="#FFFDF6"
        stroke="#123B36"
        strokeWidth="1.5"
      />
      <text
        x="500"
        y="46.0"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#123B36"
      >
        <tspan x="500" dy="0">
          Process Steps
        </tspan>
      </text>
      <path
        d="M600,46 L664,46"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <text
        x="600"
        y="36"
        fontFamily="Space Mono,monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#5A7B73"
      >
        FLOW DIRECTION
      </text>
      <line
        x1="30"
        y1="96"
        x2="1530"
        y2="96"
        stroke="#123B36"
        strokeOpacity=".15"
        strokeWidth="1"
      />
      <circle
        cx="70"
        cy="330"
        r="34"
        fill="#FF8A5C"
        stroke="#C4551F"
        strokeWidth="1.5"
      />
      <text
        x="70"
        y="324.75"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9"
        fontWeight="600"
        fill="#3A1D0B"
      >
        <tspan x="70" dy="0">
          Search
        </tspan>
        <tspan x="70" dy="10.5">
          Flights
        </tspan>
      </text>
      <path
        d="M104,330 L146,330"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <polygon
        points="200,291.0 254.0,330 200,369.0 146.0,330"
        fill="#FFC53D"
        stroke="#B4832E"
        strokeWidth="1.5"
      />
      <text
        x="200"
        y="324.75"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9"
        fontWeight="600"
        fill="#123B36"
      >
        <tspan x="200" dy="0">
          Apply
        </tspan>
        <tspan x="200" dy="10.5">
          Filters?
        </tspan>
      </text>
      <path
        d="M200,369 L200,440 L236,440"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <text
        x="206"
        y="396"
        fontFamily="Space Mono,monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#5A7B73"
      >
        YES
      </text>
      <rect
        x="246.0"
        y="417.0"
        width="108"
        height="46"
        rx="8"
        fill="#2FA968"
        stroke="#1E7A4C"
        strokeWidth="1.5"
      />
      <text
        x="300"
        y="440.0"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#FFFFFF"
      >
        <tspan x="300" dy="0">
          Filter Flights
        </tspan>
      </text>
      <path
        d="M354,440 L400,440 L400,369"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <path
        d="M200,291 L200,234 L400,234 L400,291"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <text
        x="206"
        y="278"
        fontFamily="Space Mono,monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#5A7B73"
      >
        NO
      </text>
      <polygon
        points="400,289.0 459.0,330 400,371.0 341.0,330"
        fill="#FFC53D"
        stroke="#B4832E"
        strokeWidth="1.5"
      />
      <text
        x="400"
        y="319.5"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9"
        fontWeight="600"
        fill="#123B36"
      >
        <tspan x="400" dy="0">
          Special
        </tspan>
        <tspan x="400" dy="10.5">
          Assistance
        </tspan>
        <tspan x="400" dy="10.5">
          needed?
        </tspan>
      </text>
      <path
        d="M400,289 L400,198 L452,198"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <text
        x="406"
        y="238"
        fontFamily="Space Mono,monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#5A7B73"
      >
        YES
      </text>
      <rect
        x="466.0"
        y="173.0"
        width="128"
        height="50"
        rx="8"
        fill="#2FA968"
        stroke="#1E7A4C"
        strokeWidth="1.5"
      />
      <text
        x="530"
        y="192.5"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#FFFFFF"
      >
        <tspan x="530" dy="0">
          Select Special
        </tspan>
        <tspan x="530" dy="11.0">
          Assistance flight
        </tspan>
      </text>
      <path
        d="M594,198 L650,198 L650,288"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <path
        d="M400,371 L400,422 L650,422 L650,372"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <text
        x="406"
        y="396"
        fontFamily="Space Mono,monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#5A7B73"
      >
        NO
      </text>
      <polygon
        points="650,288.0 706.0,330 650,372.0 594.0,330"
        fill="#FFC53D"
        stroke="#B4832E"
        strokeWidth="1.5"
      />
      <text
        x="650"
        y="319.5"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9"
        fontWeight="600"
        fill="#123B36"
      >
        <tspan x="650" dy="0">
          Interested
        </tspan>
        <tspan x="650" dy="10.5">
          in SAF
        </tspan>
        <tspan x="650" dy="10.5">
          options?
        </tspan>
      </text>
      <path
        d="M650,288 L650,206 L706,206"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <text
        x="656"
        y="246"
        fontFamily="Space Mono,monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#5A7B73"
      >
        YES
      </text>
      <rect
        x="729.0"
        y="181.0"
        width="122"
        height="50"
        rx="8"
        fill="#2FA968"
        stroke="#1E7A4C"
        strokeWidth="1.5"
      />
      <text
        x="790"
        y="200.5"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#FFFFFF"
      >
        <tspan x="790" dy="0">
          Add SAF into
        </tspan>
        <tspan x="790" dy="11.0">
          selection
        </tspan>
      </text>
      <path
        d="M851,206 L900,206 L900,305"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <path
        d="M650,372 L650,426 L900,426 L900,355"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <text
        x="656"
        y="400"
        fontFamily="Space Mono,monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#5A7B73"
      >
        NO
      </text>
      <rect
        x="844.0"
        y="305.0"
        width="112"
        height="50"
        rx="8"
        fill="#FFFDF6"
        stroke="#123B36"
        strokeWidth="1.5"
      />
      <text
        x="900"
        y="330.0"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#123B36"
      >
        <tspan x="900" dy="0">
          Review Booking
        </tspan>
      </text>
      <path
        d="M956,330 L1000,330"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <rect
        x="1006.0"
        y="305.0"
        width="104"
        height="50"
        rx="8"
        fill="#FFFDF6"
        stroke="#123B36"
        strokeWidth="1.5"
      />
      <text
        x="1058"
        y="330.0"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#123B36"
      >
        <tspan x="1058" dy="0">
          Choose Seats
        </tspan>
      </text>
      <path
        d="M1110,330 L1152,330"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <rect
        x="1156.0"
        y="305.0"
        width="116"
        height="50"
        rx="8"
        fill="#FFFDF6"
        stroke="#123B36"
        strokeWidth="1.5"
      />
      <text
        x="1214"
        y="324.5"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#123B36"
      >
        <tspan x="1214" dy="0">
          Enter Personal
        </tspan>
        <tspan x="1214" dy="11.0">
          Information
        </tspan>
      </text>
      <path
        d="M1272,330 L1312,330"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <polygon
        points="1372,288.0 1428.0,330 1372,372.0 1316.0,330"
        fill="#FFC53D"
        stroke="#B4832E"
        strokeWidth="1.5"
      />
      <text
        x="1372"
        y="324.75"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9"
        fontWeight="600"
        fill="#123B36"
      >
        <tspan x="1372" dy="0">
          Add Special
        </tspan>
        <tspan x="1372" dy="10.5">
          Equipment?
        </tspan>
      </text>
      <path
        d="M1372,372 L1372,442 L1400,442"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <text
        x="1378"
        y="410"
        fontFamily="Space Mono,monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#5A7B73"
      >
        YES
      </text>
      <rect
        x="1406.0"
        y="417.0"
        width="128"
        height="50"
        rx="8"
        fill="#2FA968"
        stroke="#1E7A4C"
        strokeWidth="1.5"
      />
      <text
        x="1470"
        y="436.5"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#FFFFFF"
      >
        <tspan x="1470" dy="0">
          Add disability
        </tspan>
        <tspan x="1470" dy="11.0">
          and equipment
        </tspan>
      </text>
      <path
        d="M1470,417 L1470,292 L1470,284"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <path
        d="M1372,288 L1372,220 L1470,220 L1470,234"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <text
        x="1378"
        y="260"
        fontFamily="Space Mono,monospace"
        fontSize="8"
        letterSpacing="1"
        fill="#5A7B73"
      >
        NO
      </text>
      <rect
        x="1418.0"
        y="236.0"
        width="104"
        height="48"
        rx="8"
        fill="#FFFDF6"
        stroke="#123B36"
        strokeWidth="1.5"
      />
      <text
        x="1470"
        y="260.0"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#123B36"
      >
        <tspan x="1470" dy="0">
          Select Seats
        </tspan>
      </text>
      <path
        d="M1470,236 L1470,206"
        fill="none"
        stroke="#123B36"
        strokeWidth="1.4"
        markerEnd="url(#ar)"
      />
      <rect
        x="1418.0"
        y="156.0"
        width="104"
        height="48"
        rx="8"
        fill="#FFFDF6"
        stroke="#123B36"
        strokeWidth="1.5"
      />
      <text
        x="1470"
        y="180.0"
        textAnchor="middle"
        fontFamily="Work Sans,sans-serif"
        fontSize="9.5"
        fontWeight="500"
        fill="#123B36"
      >
        <tspan x="1470" dy="0">
          Pay and Book
        </tspan>
      </text>
    </svg>
  );
}
