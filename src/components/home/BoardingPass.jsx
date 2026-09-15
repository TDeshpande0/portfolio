import { useState } from "react";
import { ArrowRight } from "lucide-react";

const SHADOW = "shadow-[0_20px_40px_-26px_rgba(0,0,0,.6)]";
const MOVE = "[transition:transform_.45s_cubic-bezier(.4,0,.2,1),opacity_.4s]";
// Divider details (notches + dashed seam) only show when the stub sits beside the ticket.
const DIVIDER = "hidden [transition:opacity_.2s] md:block";

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
      className="group relative grid cursor-pointer grid-cols-1 rounded-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:grid-cols-[1fr_150px]"
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
      {["-top-[11px]", "-bottom-[11px]"].map((edge) => (
        <span
          key={edge}
          className={`absolute right-[150px] z-[3] -mr-[11px] h-[22px] w-[22px] rounded-full bg-navy-deep ${edge} ${DIVIDER} ${torn ? "opacity-0" : ""}`}
        />
      ))}
      <span
        className={`absolute bottom-0 right-[150px] top-0 z-[2] border-l-2 border-dashed border-black/20 ${DIVIDER} ${torn ? "opacity-0" : ""}`}
      />

      {/* main ticket: tilts on hover, flies off when torn */}
      <div
        className={`rounded-[6px_6px_0_0] bg-paper px-[30px] py-6 md:rounded-[6px_0_0_6px] ${SHADOW} ${MOVE} ${
          torn
            ? "opacity-0 [transform:translate(-90px,55px)_rotate(-12deg)]"
            : "group-hover:[transform:translate(-4px,2px)_rotate(-1deg)]"
        }`}
      >
        <div className="mb-[10px] font-mono text-[10px] tracking-[1px] text-gold">
          {category}
        </div>
        <div className="mb-[6px] flex items-center gap-[14px] font-fraunces text-[24px] font-semibold">
          {from}
          <ArrowRight size={16} color="#FF5A4E" aria-hidden="true" />
          {to}
        </div>
        <p className="max-w-[44ch] text-[13.5px] text-muted">{blurb}</p>
      </div>

      {/* stub */}
      <div
        className={`flex flex-row items-center justify-between rounded-[0_0_6px_6px] bg-kraft-deep px-[18px] py-5 md:flex-col md:items-end md:rounded-[0_6px_6px_0] ${SHADOW} ${MOVE} ${
          torn
            ? "opacity-0 [transform:translate(120px,-65px)_rotate(16deg)]"
            : "group-hover:[transform:translate(8px,-2px)_rotate(2deg)]"
        }`}
      >
        <span className="font-mono text-[10px] tracking-[1px] text-navy">
          view case →
        </span>
        <div className="barcode h-[34px] w-full" />
      </div>
    </div>
  );
}
