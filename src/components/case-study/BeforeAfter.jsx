const PANELS = [
  {
    key: "before",
    label: "Before",
    panel: "border-[rgba(255,90,78,.3)] bg-[rgba(255,90,78,.07)]",
    tag: "text-[#C0392B]",
  },
  {
    key: "after",
    label: "After",
    panel: "border-[rgba(47,169,104,.32)] bg-[rgba(47,169,104,.08)]",
    tag: "text-[#1E7A4C]",
  },
];

// Side-by-side "before" (red) and "after" (green) lists.
export default function BeforeAfter({ before, after }) {
  const lists = { before, after };
  return (
    <div className="my-6 grid grid-cols-1 gap-5 md:grid-cols-2">
      {PANELS.map(({ key, label, panel, tag }) => (
        <div
          key={key}
          className={`rounded-[10px] border px-6 py-[22px] ${panel}`}
        >
          <div
            className={`mb-[10px] font-mono text-[10px] uppercase tracking-[2px] ${tag}`}
          >
            {label}
          </div>
          <ul className="list-disc pl-[18px] text-[14px] text-[#2F534C]">
            {lists[key].map((item) => (
              <li className="mb-[7px]" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
