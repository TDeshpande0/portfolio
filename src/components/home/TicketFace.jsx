import PlaneMark from "../illustrations/PlaneMark";

const FIELD_LABEL =
  "font-mono text-[9px] uppercase tracking-[1.5px] text-muted";
const FIELD_VALUE = "mt-[2px] text-[13px] font-semibold";

// The printed face of a project ticket (everything below the accent band).
// Rendered by the real ticket and by the flight transition's clone, so the two match exactly.
export default function TicketFace({
  title,
  category,
  blurb,
  gate,
  boarding,
  planeArrived,
}) {
  return (
    <div className="px-6 pb-5 pt-4 md:px-[30px] md:pb-6">
      {/* header doubles as the flight path: the plane crosses it on hover */}
      <div className={`flex items-center gap-3 ${FIELD_LABEL}`}>
        <span className="shrink-0" data-flight-source="board-label">
          boarding pass
        </span>
        <div className="relative h-4 min-w-[40px] flex-1 overflow-hidden">
          <div
            className="absolute inset-x-0 top-1/2 border-t border-dashed border-ink/25"
            data-flight-source="path"
          />
          <div
            className={`absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(.3,.7,.2,1)] group-hover:translate-x-[calc(100%-16px)] group-focus-visible:translate-x-[calc(100%-16px)] ${planeArrived ? "translate-x-[calc(100%-16px)]" : ""}`}
          >
            <div className="h-4 w-4" data-flight-source="plane">
              <PlaneMark className="h-full w-full" />
            </div>
          </div>
        </div>
        <span className="shrink-0" data-flight-source="flight-label">
          flight TD {gate}
        </span>
      </div>

      <h3
        className="mt-3 text-[26px] font-semibold leading-[1.1] md:text-[32px]"
        data-flight-source="title"
      >
        {title}
      </h3>

      <p className="mt-3 max-w-[56ch] text-[13.5px] text-muted">{blurb}</p>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-dashed border-black/15 pt-4 md:grid-cols-[1.4fr_.6fr_1fr]">
        <div>
          <div className={FIELD_LABEL}>class</div>
          <div className={FIELD_VALUE}>{category}</div>
        </div>
        <div className="hidden md:block">
          <div className={FIELD_LABEL}>gate</div>
          <div className={FIELD_VALUE}>{gate}</div>
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
  );
}
