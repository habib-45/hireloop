export function WireGlobe({ className }: { className?: string }) {
  const longitudes = [120, 240, 370, 500, 630, 740]
  const latitudes = [
    { cx: 800, cy: 293, rx: 274, ry: 94 },
    { cx: 800, cy: 384, rx: 459, ry: 157 },
    { cx: 800, cy: 568, rx: 655, ry: 224 },
    { cx: 800, cy: 805, rx: 773, ry: 264 },
  ]

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 900"
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <radialGradient id="wire-globe-fill" cx="50%" cy="14%" r="78%">
          <stop offset="0%" stopColor="#7a66ff" stopOpacity="0.55" />
          <stop offset="32%" stopColor="#4c36b8" stopOpacity="0.38" />
          <stop offset="64%" stopColor="#24175e" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#050506" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wire-globe-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b9adff" stopOpacity="0.65" />
          <stop offset="55%" stopColor="#7a6cff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#453a9e" stopOpacity="0.08" />
        </linearGradient>
        <clipPath id="wire-globe-clip">
          <circle cx="800" cy="1000" r="800" />
        </clipPath>
        <filter id="wire-globe-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      <circle
        cx="800"
        cy="1000"
        r="800"
        fill="url(#wire-globe-fill)"
      />
      <circle
        cx="800"
        cy="1000"
        r="802"
        fill="none"
        stroke="#8a7cff"
        strokeOpacity="0.28"
        strokeWidth="2"
        filter="url(#wire-globe-glow)"
      />

      <g clipPath="url(#wire-globe-clip)">
        <g
          fill="none"
          stroke="url(#wire-globe-stroke)"
          strokeWidth="1.15"
        >
          {longitudes.map((rx) => (
            <ellipse
              key={`lon-${rx}`}
              cx="800"
              cy="1000"
              rx={rx}
              ry="800"
            />
          ))}

          {latitudes.map((lat) => (
            <ellipse
              key={`lat-${lat.cy}`}
              cx={lat.cx}
              cy={lat.cy}
              rx={lat.rx}
              ry={lat.ry}
            />
          ))}

          <circle cx="800" cy="1000" r="800" strokeOpacity="0.55" />
        </g>
      </g>
    </svg>
  )
}
