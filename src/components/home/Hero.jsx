export default function Hero({ firstName, lastName, role, bio }) {
  return (
    <header className="relative flex flex-1 flex-col justify-center overflow-hidden px-5 pb-[130px] pt-16 md:px-10 md:py-12">
      {/* phones and tablets (below 1024px) show the busy right side of the drawing behind the copy, so it sits on frosted paper there */}
      <div className="relative z-[6] mx-auto w-full max-w-[1000px] max-lg:-mx-2 max-lg:rounded-[18px] max-lg:bg-kraft/[.72] max-lg:p-4 max-lg:backdrop-blur-[6px] md:max-lg:w-fit md:max-lg:px-7 md:max-lg:py-6 xl:max-w-[1120px]">
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
