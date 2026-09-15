import { Plane } from "lucide-react";
import CaseStudyLabel from "./CaseStudyLabel";

// Title block plus the "overview boarding pass" of project facts ([label, value] pairs).
export default function CaseStudyHero({ label, title, tagline, meta }) {
  return (
    <header className="px-5 pb-12 pt-16 md:px-10">
      <div className="mx-auto max-w-[1000px]">
        <CaseStudyLabel>{label}</CaseStudyLabel>
        <h1 className="max-w-[16ch] text-[length:clamp(38px,6vw,64px)] font-bold leading-[1.02]">
          {title}
        </h1>
        <div className="mt-[10px] font-fraunces text-[20px] italic text-navy-deep">
          {tagline}
        </div>

        <div className="mt-9 grid grid-cols-1 overflow-hidden rounded-[8px] border border-black/10 bg-paper shadow-[0_20px_40px_-26px_rgba(0,0,0,.35)] md:grid-cols-[1fr_190px]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-[14px] px-[30px] py-[26px]">
            {meta.map(([k, v]) => (
              <div key={k}>
                <div className="font-mono text-[9px] uppercase tracking-[1.5px] text-muted">
                  {k}
                </div>
                <div className="mt-[3px] font-fraunces text-[16px] font-semibold">
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center gap-2 border-t-2 border-dashed border-black/20 bg-kraft-deep p-4 text-center font-mono text-[10px] tracking-[1px] text-navy-deep md:flex-col md:border-l-2 md:border-t-0">
            <Plane size={22} color="#054C48" aria-hidden="true" />
            <div>
              overview
              <br />
              boarding pass
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
