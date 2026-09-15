import { useState } from "react";
import { ArrowRight } from "lucide-react";
import PlaneMark from "../illustrations/PlaneMark";

const FIELD_LABEL =
  "font-mono text-[9px] uppercase tracking-[1.5px] text-muted";
const FIELD_VALUE = "mt-[2px] text-[13px] font-semibold";
const EASE = "ease-[cubic-bezier(.4,0,.2,1)]";

// Stub motion pivots on the perforation: its top-left corner on phones (stub below),
// its bottom-left corner on desktop (stub beside), so it peels away from the top.
const STUB_PEEL =
  "md:group-hover:translate-x-[3px] md:group-hover:rotate-[2.5deg] md:group-focus-visible:translate-x-[3px] md:group-focus-visible:rotate-[2.5deg]";
const STUB_TORN =
  "translate-y-9 rotate-[6deg] opacity-0 md:translate-x-[48px] md:translate-y-[28px] md:rotate-[14deg]";
const MAIN_TORN = "-translate-y-1 md:-translate-x-[6px] md:translate-y-0";

export default function BoardingPass({
  title,
  category,
  blurb,
  accent,
  gate,
  onOpen,
}) {
  const [torn, setTorn] = useState(false);
  const boarding = Boolean(onOpen);
  const gateNo = String(gate).padStart(2, "0");

  // Click tears the stub off; case studies then fly, others snap back together.
  const activate = () => {
    if (torn) return;
    setTorn(true);
    window.setTimeout(() => {
      if (onOpen) onOpen();
      else setTorn(false);
    }, 420);
  };

  return (
    // The hover target stays still; only the inner ticket moves, so the cursor never slips off its edge.
    <div
      className="group relative cursor-pointer rounded-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      role="button"
      tabIndex={0}
      aria-label={
        boarding
          ? `View case study: ${title}`
          : `${title}: case study coming soon`
      }
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
    >
      <div className="grid grid-cols-1 transition-transform duration-300 ease-out [filter:drop-shadow(0_14px_16px_rgba(0,0,0,.3))] group-hover:-translate-y-1 group-focus-visible:-translate-y-1 md:grid-cols-[1fr_170px]">
        {/* ---------- main ticket ---------- */}
        <div
          className={`ticket-main overflow-hidden rounded-[6px_6px_0_0] bg-paper transition-transform duration-[400ms] md:rounded-[6px_0_0_6px] ${EASE} ${torn ? MAIN_TORN : ""}`}
        >
          <div className="h-[6px]" style={{ background: accent }} />
          <div className="px-6 pb-5 pt-4 md:px-[30px] md:pb-6">
            {/* header doubles as the flight path: the plane crosses it on hover */}
            <div className={`flex items-center gap-3 ${FIELD_LABEL}`}>
              <span className="shrink-0">boarding pass</span>
              <div className="relative h-4 min-w-[40px] flex-1 overflow-hidden">
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-ink/25" />
                <div
                  className={`absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(.3,.7,.2,1)] group-hover:translate-x-[calc(100%-16px)] group-focus-visible:translate-x-[calc(100%-16px)] ${torn ? "translate-x-[calc(100%-16px)]" : ""}`}
                >
                  <PlaneMark className="h-4 w-4" />
                </div>
              </div>
              <span className="shrink-0">flight TD {gateNo}</span>
            </div>

            <h3 className="mt-3 text-[26px] font-semibold leading-[1.1] md:text-[32px]">
              {title}
            </h3>

            <p className="mt-3 max-w-[56ch] text-[13.5px] text-muted">
              {blurb}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-dashed border-black/15 pt-4 md:grid-cols-[1.4fr_.6fr_1fr]">
              <div>
                <div className={FIELD_LABEL}>class</div>
                <div className={FIELD_VALUE}>{category}</div>
              </div>
              <div className="hidden md:block">
                <div className={FIELD_LABEL}>gate</div>
                <div className={FIELD_VALUE}>{gateNo}</div>
              </div>
              <div>
                <div className={FIELD_LABEL}>status</div>
                <div
                  className={`flex items-center gap-[6px] whitespace-nowrap ${FIELD_VALUE}`}
                >
                  <span
                    className={`h-[7px] w-[7px] shrink-0 rounded-full ${boarding ? "bg-mint motion-safe:animate-pulse" : "bg-gold"}`}
                  />
                  {boarding ? "Now boarding" : "Coming soon"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- stub: peels on hover, tears off on click ---------- */}
        <div
          className={`ticket-stub flex origin-top-left flex-col overflow-hidden rounded-[0_0_6px_6px] border-t-2 border-dashed border-black/15 bg-kraft-deep transition-[transform,opacity] duration-[400ms] md:origin-bottom-left md:rounded-[0_6px_6px_0] md:border-l-2 md:border-t-0 ${EASE} ${torn ? STUB_TORN : STUB_PEEL}`}
        >
          <div
            className="hidden h-[6px] md:block"
            style={{ background: accent }}
          />
          <div className="flex flex-1 flex-row items-center justify-between gap-4 px-6 py-4 md:flex-col md:items-stretch md:px-[18px] md:pb-5 md:pt-4">
            <div>
              <div className={FIELD_LABEL}>gate</div>
              <div className="font-fraunces text-[30px] font-bold leading-none md:text-[40px]">
                {gateNo}
              </div>
            </div>
            <div
              className={`flex items-center gap-[6px] font-mono text-[10px] uppercase tracking-[1.5px] md:mt-auto ${boarding ? "text-navy-deep" : "text-muted"}`}
            >
              {boarding ? "view case" : "coming soon"}
              {boarding && (
                <ArrowRight
                  size={12}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </div>
            <div className="barcode h-[30px] w-[90px] shrink-0 md:w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
