import "./case-study.css";

// A titled card. Pass `items` for a bullet list, or children for free-form content.
export default function InfoCard({ title, items, children, style }) {
  return (
    <div className="card" style={style}>
      <h4>{title}</h4>
      {items ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  );
}
