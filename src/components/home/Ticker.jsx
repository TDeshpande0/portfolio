// One set of destinations is ~1000px wide; 4 sets per group keeps the loop gapless on wide screens.
const REPEAT = 4;

// Two identical groups, each wider than any screen, so sliding the track -50% loops seamlessly.
export default function Ticker({ destinations }) {
  const row = Array.from({ length: REPEAT }, () => destinations).flat();

  return (
    <div className="overflow-hidden border-b-[3px] border-ink bg-ink">
      <div className="flex w-max animate-ticker motion-reduce:animate-none">
        {[0, 1].map((g) => (
          <div
            className="flex min-w-[100vw] shrink-0 justify-around"
            key={g}
            aria-hidden={g === 1 || undefined}
          >
            {row.map((d, i) => (
              <span
                className="whitespace-nowrap py-[9px] font-mono text-[12px] tracking-[3px] text-kraft"
                key={i}
              >
                <span className="mx-[28px] text-gold">✈</span>
                {d}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
