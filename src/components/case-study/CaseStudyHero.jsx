import { usePeel } from "../../hooks/usePeel";
import PlaneMark from "../illustrations/PlaneMark";
import CaseStudyLabel from "./CaseStudyLabel";

const FRAME =
  "mx-auto max-w-[1000px] [filter:drop-shadow(0_14px_16px_rgba(0,0,0,.14))]";
const FIELD_LABEL =
  "font-mono text-[9px] uppercase tracking-[1.5px] text-muted";

// The case study header is the project's boarding pass, full size, with the stub already torn off.
// `data-flight-target` marks the pieces the ticket-to-header transition lands on.
// Optional: `summary` (a short line under the tagline) and `stamp` ({ title, note }), a rubber
// stamp for project status such as "shipped · live in production", and `back`
// ({ title, subtitle, rows: [label, text][] }), a summary card under the pass, which peels
// off like a sticker when clicked or dragged.
export default function CaseStudyHero({
  label,
  title,
  tagline,
  summary,
  stamp,
  accent,
  gate,
  meta,
  back,
}) {
  const pass = (ref, hidden, className = "") => (
    <div
      ref={ref}
      className={`ticket-main relative overflow-hidden rounded-[6px_6px_0_0] bg-paper md:rounded-[6px_0_0_6px] ${className}`}
      data-flight-target="card"
      aria-hidden={hidden || undefined}
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
        {summary && (
          <p className="mt-2 max-w-[56ch] text-[15.5px] text-[#2F534C]">
            {summary}
          </p>
        )}
        {stamp && (
          <div className="mt-5 inline-block rotate-[-8deg] rounded-[6px] border-[2.5px] border-mint px-4 py-2 text-center font-mono uppercase text-mint opacity-90 md:absolute md:right-10 md:top-[88px] md:mt-0">
            <div className="text-[16px] font-bold leading-none tracking-[4px]">
              {stamp.title}
            </div>
            <div className="mt-[6px] text-[8px] leading-none tracking-[1.5px]">
              {stamp.note}
            </div>
          </div>
        )}

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
  );

  return (
    <header className="px-5 pb-12 pt-10 md:px-10 md:pt-14">
      {back ? (
        <PeelFrame pass={pass} back={back} />
      ) : (
        <div className={FRAME} data-flight-frame>
          {pass()}
        </div>
      )}
    </header>
  );
}

// The pass stuck over its summary card, with the flap that draws the peeled part's underside.
function PeelFrame({ pass, back }) {
  const { frame, card, flap, peeled, handlers } = usePeel();
  return (
    <div
      ref={frame}
      className={`${FRAME} group relative grid cursor-grab touch-pan-y select-none active:cursor-grabbing`}
      data-flight-frame
      {...handlers}
    >
      <SummaryCard {...back} hidden={!peeled} className="[grid-area:1/1]" />
      {pass(card, peeled, "[grid-area:1/1]")}
      {/* the shadow sits on a wrapper, since the flap's own clip would cut it off; the flap keeps
          the pass's notches, so a lifted corner carries its hole punch with it */}
      <div className="pointer-events-none [filter:drop-shadow(-4px_-2px_6px_rgba(0,0,0,.18))] [grid-area:1/1]">
        <div
          ref={flap}
          className="ticket-main invisible h-full w-full origin-top-left rounded-[6px_6px_0_0] md:rounded-[6px_0_0_6px]"
          aria-hidden="true"
        />
      </div>
      {/* Keyboard access: its clicks bubble up to the frame's click handler. */}
      <button
        type="button"
        aria-expanded={peeled}
        className="absolute -top-[13px] right-5 z-[6] translate-y-[5px] whitespace-nowrap rounded-full bg-airmail px-[13px] py-[6px] font-mono text-[10px] tracking-[1.2px] text-white opacity-0 shadow-[0_6px_14px_-8px_rgba(0,0,0,.6)] outline-none transition duration-[250ms] focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-gold group-hover:translate-y-0 group-hover:opacity-100"
      >
        {peeled ? "Click to stick it back" : "Click or peel for summary"}
      </button>
    </div>
  );
}

function SummaryCard({ title, subtitle, rows, hidden, className }) {
  return (
    <div
      className={`ticket-main flex flex-col rounded-[6px_6px_0_0] border border-l-[6px] border-black/10 border-l-gold bg-paper px-6 py-7 md:rounded-[6px_0_0_6px] md:px-10 md:py-9 ${className}`}
      aria-hidden={hidden || undefined}
    >
      <h3 className="mb-1 font-fraunces text-[21px] font-semibold md:text-[26px]">
        {title}
      </h3>
      <p className="mb-4 font-mono text-[9px] uppercase tracking-[1.5px] text-muted">
        {subtitle}
      </p>
      <dl className="grid flex-1 grid-cols-1 gap-[3px] md:grid-cols-[120px_1fr] md:content-evenly md:gap-x-6 md:gap-y-4">
        {rows.map(([label, text]) => (
          <div key={label} className="contents">
            <dt className="pt-[3px] font-mono text-[9px] uppercase tracking-[1.3px] text-navy md:pt-[6px] md:text-[10px]">
              {label}
            </dt>
            <dd className="mb-[9px] text-[14px] leading-[1.55] text-[#2F534C] md:mb-0 md:text-[16px]">
              {text}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
