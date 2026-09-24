// Research findings: items are { icon (a lucide-react icon), title, text }.
export default function FindingCards({ items }) {
  return (
    <div className="mb-[30px] mt-[6px] grid grid-cols-1 gap-[18px] md:grid-cols-2">
      {items.map(({ icon, title, text }) => {
        const Icon = icon;
        return (
          <div
            key={title}
            className="grid grid-cols-[52px_1fr] items-start gap-4 rounded-[12px] border border-black/[.08] bg-paper px-[22px] py-5 shadow-[0_14px_28px_-24px_rgba(0,0,0,.35)]"
          >
            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-navy-deep">
              <Icon
                className="h-[26px] w-[26px] text-gold"
                aria-hidden="true"
              />
            </span>
            <div>
              <h5 className="mb-[7px] mt-[2px] font-mono text-[10px] font-bold uppercase tracking-[1.6px] text-airmail">
                {title}
              </h5>
              <p className="text-[13.5px] leading-[1.55] text-[#2F534C]">
                {text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
