// Small red all-caps label above case study headings.
export default function CaseStudyLabel({ children }) {
  return (
    <div className="mb-2 font-mono text-[12px] uppercase tracking-[4px] text-airmail">
      {children}
    </div>
  );
}
