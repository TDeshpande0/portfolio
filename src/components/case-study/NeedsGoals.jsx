const HEADING =
  "mb-[14px] font-mono text-[10px] font-bold uppercase tracking-[1.8px] text-airmail";

// User needs as a diamond-bulleted list beside numbered user goals.
export default function NeedsGoals({ needs, goals }) {
  return (
    <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
      <div className="rounded-[12px] border border-black/[.08] bg-paper px-6 py-[22px] shadow-[0_14px_28px_-24px_rgba(0,0,0,.3)]">
        <h4 className={HEADING}>User needs</h4>
        <ul>
          {needs.map((need) => (
            <li
              key={need}
              className="relative mb-[11px] pl-[26px] text-[14px] leading-[1.5] text-[#2F534C] before:absolute before:left-0 before:top-[6px] before:h-[9px] before:w-[9px] before:rotate-45 before:rounded-[2px] before:bg-gold before:content-[''] last:mb-0"
            >
              {need}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h4 className={HEADING}>User goals</h4>
        {goals.map((goal, i) => (
          <div
            key={goal}
            className="grid grid-cols-[26px_1fr] items-start gap-3 rounded-[10px] bg-navy-deep px-[18px] py-4 text-[14px] leading-[1.5] text-paper"
          >
            <span className="pt-[2px] font-mono text-[11px] font-bold text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{goal}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
