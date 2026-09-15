import "./Ticker.css";

// One set of destinations is ~1000px wide; 4 sets per group keeps the loop gapless on wide screens.
const REPEAT = 4;

export default function Ticker({ destinations }) {
  const row = Array.from({ length: REPEAT }, () => destinations).flat();

  return (
    <div className="ticker">
      <div className="ticker-track">
        {[0, 1].map((g) => (
          <div
            className="ticker-group"
            key={g}
            aria-hidden={g === 1 || undefined}
          >
            {row.map((d, i) => (
              <span className="ticker-item" key={i}>
                <span className="plane">✈</span>
                {d}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
