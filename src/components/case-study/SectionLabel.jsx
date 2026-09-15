// Pill label for a case study section, with an optional gold number chip ("01", "02", ...).
// Each half paints its own background and both stretch to the pill's full height, so the rounded
// edges blend against the page rather than a navy layer underneath (which left a dark hairline).
export default function SectionLabel({ number, children, className = "" }) {
  return (
    <div
      className={`mb-[18px] inline-flex items-stretch overflow-hidden rounded-full font-sans text-[11.5px] font-semibold uppercase tracking-[1.8px] text-paper shadow-[0_8px_18px_-12px_rgba(5,76,72,.7)] ${className}`}
    >
      {number && (
        <span className="flex items-center bg-gold px-[11px] font-mono text-[11px] font-bold tracking-[1px] text-navy-deep">
          {number}
        </span>
      )}
      <span
        className={`flex items-center bg-navy-deep py-[7px] pr-[17px] ${number ? "pl-[14px]" : "pl-[17px]"}`}
      >
        {children}
      </span>
    </div>
  );
}
