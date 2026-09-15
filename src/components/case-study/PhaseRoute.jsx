// The numbered design-process stops shown as a flight route.
// `wrapOnMobile`: on phones the stops wrap onto centred rows and the dashed route line is hidden.
export default function PhaseRoute({ phases, wrapOnMobile = false }) {
  return (
    <div
      className={`bg-navy-deep py-[30px] ${wrapOnMobile ? "px-5 md:px-10" : "px-10"}`}
    >
      <ol
        className={`relative mx-auto flex max-w-[1000px] list-none items-center before:absolute before:inset-x-5 before:top-[17px] before:z-0 before:h-[2px] before:bg-[repeating-linear-gradient(90deg,theme(colors.gold)_0_8px,transparent_8px_14px)] before:content-[''] ${
          wrapOnMobile
            ? "flex-wrap justify-center gap-4 before:hidden md:flex-nowrap md:justify-between md:gap-0 md:before:block"
            : "justify-between"
        }`}
      >
        {phases.map((p, i) => (
          <li
            className="relative z-[1] flex flex-col items-center gap-2 font-mono tracking-[1px]"
            key={p}
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-gold bg-paper text-[12px] font-bold text-navy-deep">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-kraft">{p}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
