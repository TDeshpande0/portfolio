// A titled card. Pass `items` for a bullet list, or children for free-form content.
// `compact`: the tighter spacing and bulleted list used by the newer case study layout.
export default function InfoCard({
  title,
  items,
  children,
  compact = false,
  className = "",
}) {
  return (
    <div
      className={`rounded-[10px] border border-black/[.08] bg-paper px-[26px] py-6 shadow-[0_14px_28px_-22px_rgba(0,0,0,.3)] ${className}`}
    >
      <h4
        className={`font-sans text-[15px] font-semibold ${compact ? "mb-[9px]" : "mb-[10px]"}`}
      >
        {title}
      </h4>
      {items ? (
        <ul
          className={`pl-[18px] text-[14px] text-muted ${compact ? "list-disc" : ""}`}
        >
          {items.map((item) => (
            <li className={compact ? "mb-[6px]" : "mb-[5px]"} key={item}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  );
}
