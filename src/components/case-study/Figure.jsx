// Captioned image slot. Currently shows a placeholder note; swap in an <img> when artwork is ready.
// Dark figures keep the extra inner padding they had in the original design.
export default function Figure({ tab, note, dark }) {
  return (
    <figure
      className={`overflow-hidden rounded-[10px] border border-black/10 shadow-[0_16px_32px_-24px_rgba(0,0,0,.4)] ${
        dark ? "bg-[#0E1F30] px-5 py-[74px] md:px-10" : "bg-paper"
      }`}
    >
      <figcaption className="bg-navy-deep px-4 py-2 font-mono text-[9px] uppercase tracking-[1.5px] text-gold">
        {tab}
      </figcaption>
      <div
        className={`m-[14px] flex min-h-[150px] items-center justify-center rounded-[6px] border border-dashed p-6 text-center font-mono text-[10px] tracking-[1px] ${
          dark
            ? "border-white/20 text-kraft-deep"
            : "border-black/15 text-muted"
        }`}
      >
        {note}
      </div>
    </figure>
  );
}
