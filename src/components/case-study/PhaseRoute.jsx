import { scrollToHash } from "../../utils/scrollToHash";

// The numbered design-process stops shown as a flight route.
// `phases` entries are plain labels, or { label, href } to make a stop scroll to that section.
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
        {phases.map((phase, i) => {
          const { label, href } =
            typeof phase === "string" ? { label: phase } : phase;
          const number = String(i + 1).padStart(2, "0");
          const stop = (
            <>
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-gold bg-paper text-[12px] font-bold text-navy-deep transition-colors group-hover:bg-gold">
                {number}
              </span>
              <span className="text-[10px] text-kraft transition-colors group-hover:text-gold">
                {label}
              </span>
            </>
          );
          return (
            <li
              className="relative z-[1] flex flex-col items-center gap-2 font-mono tracking-[1px]"
              key={label}
            >
              {href ? (
                <a
                  href={href}
                  onClick={(e) => scrollToHash(e, href)}
                  className="group flex flex-col items-center gap-2 rounded-lg no-underline outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-navy-deep"
                >
                  {stop}
                </a>
              ) : (
                stop
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
