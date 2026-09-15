import "./case-study.css";

// The numbered design-process stops shown as a flight route.
export default function PhaseRoute({ phases }) {
  return (
    <div className="routebar">
      <ol className="routeline">
        {phases.map((p, i) => (
          <li className="stop" key={p}>
            <span className="dot">{String(i + 1).padStart(2, "0")}</span>
            <span>{p}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
