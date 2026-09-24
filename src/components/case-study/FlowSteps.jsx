// A flow broken into numbered steps, with the designer's own step highlighted in navy.
// `steps` are { label, name, mine? }; `children` is the legend line under the row.
export default function FlowSteps({ steps, children }) {
  return (
    <>
      <div className="mb-2 mt-6 grid grid-cols-2 md:grid-cols-4">
        {steps.map(({ label, name, mine }) => (
          <div
            key={name}
            className={`border px-[18px] py-4 md:first:rounded-l-[10px] md:last:rounded-r-[10px] ${mine ? "border-navy-deep bg-navy-deep text-paper" : "border-black/[.08] bg-paper"}`}
          >
            <b
              className={`mb-1 block font-mono text-[9px] uppercase tracking-[1.4px] ${mine ? "text-gold" : "text-muted"}`}
            >
              {label}
            </b>
            <span className="text-[14px] font-semibold">{name}</span>
          </div>
        ))}
      </div>
      <p className="mb-[22px] font-mono text-[10px] text-muted">
        <i className="mr-[6px] inline-block h-[10px] w-[10px] rounded-[2px] bg-navy-deep align-[-1px]" />
        {children}
      </p>
    </>
  );
}
