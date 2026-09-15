import "./SiteNav.css";

// Top bar: a label on the left, and whatever links/buttons are passed as children on the right.
export default function SiteNav({ mark, children }) {
  return (
    <nav>
      <div className="mark">{mark}</div>
      {children}
    </nav>
  );
}
