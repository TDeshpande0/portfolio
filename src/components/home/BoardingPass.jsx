import { useState } from "react";
import { ArrowRight } from "lucide-react";
import "./BoardingPass.css";

export default function BoardingPass({ category, from, to, blurb, onOpen }) {
  const [torn, setTorn] = useState(false);

  const activate = () => {
    if (torn) return;
    setTorn(true);
    window.setTimeout(() => {
      if (onOpen) onOpen();
      else setTorn(false);
    }, 420);
  };

  return (
    <div
      className={`bpass${torn ? " tearing" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`View case study: ${from} to ${to}`}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
    >
      <span className="notch top" />
      <span className="notch bot" />
      <span className="seam" />
      <div className="main">
        <div className="cat">{category}</div>
        <div className="route">
          {from}
          <ArrowRight size={16} color="#FF5A4E" aria-hidden="true" />
          {to}
        </div>
        <p className="blurb">{blurb}</p>
      </div>
      <div className="stub">
        <span className="go">view case →</span>
        <div className="barcode" />
      </div>
    </div>
  );
}
