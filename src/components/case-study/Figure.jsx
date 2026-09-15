import "./case-study.css";

// Captioned image slot. Currently shows a placeholder note; swap in an <img> when artwork is ready.
export default function Figure({ tab, note, dark }) {
  return (
    <figure className={dark ? "dark" : ""}>
      <figcaption>{tab}</figcaption>
      <div className="ph">{note}</div>
    </figure>
  );
}
