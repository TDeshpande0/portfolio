// A titled card. Pass `items` for a bullet list, or children for free-form content.
export default function InfoCard({ title, items, children, className = "" }) {
  return (
    <div
      className={`rounded-[10px] border border-black/[.08] bg-paper px-[26px] py-6 shadow-[0_14px_28px_-22px_rgba(0,0,0,.3)] ${className}`}
    >
      <h4 className="mb-[10px] font-sans text-[15px] font-semibold">{title}</h4>
      {items ? (
        <ul className="pl-[18px] text-[14px] text-muted">
          {items.map((item) => (
            <li className="mb-[5px]" key={item}>
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
