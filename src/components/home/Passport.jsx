const LABEL = "font-mono text-[8px] tracking-[1px] text-muted";

const CORNERS = [
  { top: 26, left: 22, borderWidth: "2px 0 0 2px" },
  { top: 26, right: 22, borderWidth: "2px 2px 0 0" },
  { bottom: 44, left: 22, borderWidth: "0 0 2px 2px" },
  { bottom: 44, right: 22, borderWidth: "0 2px 2px 0" },
];

export default function Passport({ fields }) {
  return (
    <div className="passport-paper relative overflow-hidden rounded-[3px] border border-black/15 bg-paper shadow-[0_24px_50px_-26px_rgba(0,0,0,.55)]">
      <span className="perforated-edge absolute inset-y-0 right-0 z-[2] w-[22px] opacity-60" />

      {/* header */}
      <div className="relative z-[1] flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-black/[.13] px-[30px] py-4">
        <div className="font-mono text-[11px] tracking-[3px] text-navy">
          ABOUT ME
        </div>
        <div className="flex items-center gap-[10px]">
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <g fill="none" stroke="#FFC53D" strokeWidth="1.3">
              <path d="M13 4 C9 8,9 16,13 21" />
              <path d="M13 4 C17 8,17 16,13 21" />
              <path d="M9 6 L11 7 M8 9 L10.5 9.5 M7.5 12 L10 12.5 M8 15 L10.5 14.5 M9 18 L11 17" />
              <path d="M17 6 L15 7 M18 9 L15.5 9.5 M18.5 12 L16 12.5 M18 15 L15.5 14.5 M17 18 L15 17" />
            </g>
          </svg>
          <div className="font-fraunces text-[15px] font-bold tracking-[2px]">
            PASSPORT
          </div>
        </div>
        <div className="font-mono text-[11px] tracking-[1px] text-airmail">
          NO. DR—0000001
        </div>
      </div>

      <div className="relative z-[1] grid grid-cols-1 md:grid-cols-[1.3fr_1fr]">
        {/* data fields */}
        <div className="px-[30px] pb-[30px] pt-[26px]">
          <div className="mb-[14px] font-mono text-[10px] tracking-[2px] text-gold">
            type P · code DES · design
          </div>
          {fields.map(([k, v]) => (
            <div
              className="grid grid-cols-[120px_1fr] gap-2 border-b border-black/[.06] py-[7px]"
              key={k}
            >
              <div className="self-center font-mono text-[9px] uppercase tracking-[1px] text-muted">
                {k}
              </div>
              <div className="font-fraunces text-[16px] font-semibold">{v}</div>
            </div>
          ))}
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <div className="border-b-[1.5px] border-ink pb-1 font-fraunces text-[19px] italic text-navy">
                Tanvi Deshpande
              </div>
              <div className={`mt-1 ${LABEL}`}>holder’s signature</div>
            </div>
            <div className="flex flex-col items-center gap-[3px]">
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                aria-hidden="true"
              >
                <rect width="22" height="16" rx="2" fill="#FFC53D" />
                <g fill="none" stroke="#7A5A12" strokeWidth="1">
                  <path d="M11 4 a4 4 0 0 1 0 8" />
                  <path d="M11 6 a2 2 0 0 1 0 4" />
                </g>
              </svg>
              <div className={LABEL}>e‑passport</div>
            </div>
          </div>
        </div>

        {/* photo strip */}
        <div className="relative flex flex-col items-center border-t border-black/[.09] pb-6 pl-[30px] pr-[34px] pt-[26px] md:border-l md:border-t-0">
          <div className="absolute right-[10px] top-[14px] z-[3] flex h-20 w-20 rotate-[-16deg] items-center justify-center rounded-full border-[2.5px] border-airmail text-center font-mono text-[10px] tracking-[2px] text-airmail opacity-90">
            designer
            <br />
            approved
          </div>
          {CORNERS.map((c, i) => (
            <span
              className="absolute z-[2] h-[22px] w-[22px] border-solid border-gold opacity-[.85]"
              key={i}
              style={c}
            />
          ))}
          <div className="relative z-[1] rotate-[-2.5deg] border border-black/[.12] bg-paper px-[9px] pb-[22px] pt-[9px] shadow-[0_14px_30px_-16px_rgba(0,0,0,.4)]">
            {["01", "02", "03"].map((n) => (
              <div
                className="scanlines relative mb-[6px] h-[118px] w-[150px] overflow-hidden bg-navy-deep"
                key={n}
              >
                <span className="absolute bottom-[5px] right-[7px] font-mono text-[9px] text-kraft-deep">
                  {n}
                </span>
              </div>
            ))}
            <div className="mt-2 text-center font-mono text-[9px] tracking-[1px] text-muted">
              photobooth co. · official photo
            </div>
          </div>
        </div>

        {/* machine-readable zone */}
        <div className="relative z-[1] col-span-full break-all border-t-[1.5px] border-black/[.13] bg-black/[.025] px-[30px] pb-[22px] pt-4 font-mono text-[13px] leading-[1.85] tracking-[2.5px]">
          P&lt;DESIGNERXX&lt;&lt;TANVI&lt;DESHPANDE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          <br />
          DR0000001DES0001019X0000000&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;02
        </div>
      </div>
    </div>
  );
}
