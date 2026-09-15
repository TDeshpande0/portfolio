import { Plane } from "lucide-react";
import "./case-study.css";

// Title block plus the "overview boarding pass" of project facts ([label, value] pairs).
export default function CaseStudyHero({ label, title, tagline, meta }) {
  return (
    <header className="cs-hero">
      <div className="cs-hero-inner">
        <div className="cs-label">{label}</div>
        <h1>{title}</h1>
        <div className="tagline">{tagline}</div>

        <div className="ovpass">
          <div className="meta">
            {meta.map(([k, v]) => (
              <div key={k}>
                <div className="k">{k}</div>
                <div className="v">{v}</div>
              </div>
            ))}
          </div>
          <div className="stub">
            <Plane size={22} color="#054C48" aria-hidden="true" />
            <div>
              overview
              <br />
              boarding pass
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
