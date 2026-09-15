import PlaneMark from "../illustrations/PlaneMark";
import CaseStudyLabel from "./CaseStudyLabel";

const FIELD_LABEL =
  "font-mono text-[9px] uppercase tracking-[1.5px] text-muted";

// The case study header is the project's boarding pass, full size, with the stub already torn off.
// `data-flight-target` marks the pieces the ticket-to-header transition lands on.
export default function CaseStudyHero({
  label,
  title,
  tagline,
  accent,
  gate,
  meta,
}) {
  return (
    <header className="px-5 pb-12 pt-10 md:px-10 md:pt-14">
      <div className="mx-auto max-w-[1000px] [filter:drop-shadow(0_14px_16px_rgba(0,0,0,.14))]">
        <div
          className="ticket-main overflow-hidden rounded-[6px_6px_0_0] bg-paper md:rounded-[6px_0_0_6px]"
          data-flight-target="card"
        >
          <div className="h-[6px]" style={{ background: accent }} />
          <div className="px-6 pb-8 pt-4 md:px-10 md:pb-10 md:pt-5">
            {/* flight path, plane already landed at the destination */}
            <div className={`flex items-center gap-3 ${FIELD_LABEL}`}>
              <span className="shrink-0" data-flight-target="board-label">
                boarding pass
              </span>
              <div className="relative flex h-5 min-w-[40px] flex-1 items-center justify-end">
                <div
                  className="absolute inset-x-0 top-1/2 border-t border-dashed border-ink/25"
                  data-flight-target="path"
                />
                <div className="relative h-5 w-5" data-flight-target="plane">
                  <PlaneMark className="h-full w-full" />
                </div>
              </div>
              <span className="shrink-0" data-flight-target="flight-label">
                flight TD {gate}
              </span>
            </div>

            <div className="mt-8">
              <CaseStudyLabel>{label}</CaseStudyLabel>
            </div>
            <h1
              className="text-[length:clamp(38px,6vw,64px)] font-semibold leading-[1.1] outline-none"
              data-flight-target="title"
              tabIndex={-1}
            >
              {title}
            </h1>
            <div className="mt-3 font-fraunces text-[20px] italic text-navy-deep">
              {tagline}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-dashed border-black/15 pt-6 md:grid-cols-3">
              {meta.map(([k, v]) => (
                <div key={k}>
                  <div className={FIELD_LABEL}>{k}</div>
                  <div className="mt-[3px] font-fraunces text-[16px] font-semibold">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
