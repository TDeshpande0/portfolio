import "./case-study.css";

export default function CaseStudySection({ label, title, children }) {
  return (
    <section>
      <div className="cs-label">{label}</div>
      {title && <h2 className="cs-head">{title}</h2>}
      {children}
    </section>
  );
}
