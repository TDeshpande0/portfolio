import BeachScene from "../illustrations/BeachScene";
import HibiscusFlower from "../illustrations/HibiscusFlower";
import Lily from "../illustrations/Lily";

const BLOOM =
  "absolute z-[5] [filter:drop-shadow(0_6px_10px_rgba(60,30,40,.28))]";

export default function Hero({ firstName, lastName, role, bio }) {
  return (
    <header className="relative flex-1 overflow-hidden px-5 pb-[130px] pt-16 md:px-10 md:pb-[170px] md:pt-[100px]">
      <BeachScene className="absolute inset-0 z-0 block h-full w-full" />

      <Lily
        uid="heroB"
        className={BLOOM}
        style={{ bottom: 96, left: 36, width: 168, height: 168 }}
      />
      <HibiscusFlower
        uid="heroA"
        className={BLOOM}
        style={{ bottom: 52, left: 12, width: 104, height: 104 }}
      />
      <HibiscusFlower
        uid="heroC"
        className={BLOOM}
        style={{ bottom: 68, left: 168, width: 74, height: 74, opacity: 0.96 }}
      />
      <div className="hero-scrim pointer-events-none absolute inset-0 z-[4]" />

      <div className="relative z-[6] mx-auto max-w-[1000px]">
        <h1 className="max-w-[900px] text-[length:clamp(52px,9vw,116px)] font-bold leading-[.9] tracking-[-.025em]">
          {firstName}
          <br />
          {lastName}
        </h1>
        <p className="mt-5 flex items-center gap-4 font-fraunces text-[length:clamp(24px,3.2vw,38px)] font-medium italic leading-[1.15] tracking-[-.01em] text-navy-deep before:h-[2px] before:w-[clamp(28px,4vw,56px)] before:flex-none before:rounded-[2px] before:bg-airmail before:content-['']">
          {role}
        </p>
        <p className="mt-[22px] max-w-[38ch] text-pretty text-[length:clamp(17px,1.4vw,19px)] font-normal leading-[1.65] tracking-[-.005em] text-[#2F514A]">
          {bio}
        </p>
      </div>
    </header>
  );
}
