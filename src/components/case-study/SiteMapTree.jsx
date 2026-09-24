const LINE = "bg-black/20";

// A one-level site map: a root page over columns of branches and their pages.
// `map` is { root, branches: [{ label, pages, key? }] }; pages listed in `key` are highlighted.
export default function SiteMapTree({ map, legend }) {
  return (
    <div className="mb-[26px] rounded-[12px] border border-black/10 bg-paper px-[22px] py-6 text-center shadow-[0_16px_32px_-26px_rgba(0,0,0,.35)]">
      <div className="inline-block rounded-[8px] bg-navy-deep px-5 py-3 font-fraunces text-[15px] font-semibold text-paper">
        {map.root}
      </div>
      <div className={`mx-auto h-[18px] w-[2px] ${LINE}`} />
      <div className="grid grid-cols-2 gap-[14px] border-t-2 border-black/20 text-left md:grid-cols-6">
        {map.branches.map(({ label, pages, key = [] }) => (
          <div key={label} className="relative pt-[18px]">
            <span
              className={`absolute left-1/2 top-0 h-[18px] w-[2px] ${LINE}`}
            />
            <div className="mb-3 rounded-[7px] bg-navy px-2 py-[9px] text-center text-[12.5px] font-semibold text-white">
              {label}
            </div>
            {pages.length ? (
              <ul className="flex flex-col gap-[7px]">
                {pages.map((page) => (
                  <li
                    key={page}
                    className={`rounded-[6px] border px-[9px] py-2 text-[11.5px] leading-[1.35] ${key.includes(page) ? "border-[#B4832E] bg-gold font-semibold text-[#3A2A05]" : "border-black/10 bg-kraft text-[#2F534C]"}`}
                  >
                    {page}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-center font-mono text-[9px] text-muted">
                No sub-pages
              </p>
            )}
          </div>
        ))}
      </div>
      {legend && (
        <p className="mt-4 flex items-center gap-[7px] text-left font-mono text-[9px] tracking-[1px] text-muted">
          <span className="inline-block h-[11px] w-[11px] rounded-[3px] border border-[#B4832E] bg-gold" />
          {legend}
        </p>
      )}
    </div>
  );
}
