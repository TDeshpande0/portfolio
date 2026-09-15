// A navy panel pairing one big number with the sentence that explains it.
export default function StatCallout({ stat, children }) {
  return (
    <div className="my-[26px] grid grid-cols-1 items-center gap-[26px] rounded-[12px] bg-navy-deep px-[34px] py-[30px] text-center md:grid-cols-[200px_1fr] md:text-left">
      <div className="font-fraunces text-[62px] font-bold leading-none text-gold">
        {stat}
      </div>
      <p className="text-[15.5px] text-paper">{children}</p>
    </div>
  );
}
