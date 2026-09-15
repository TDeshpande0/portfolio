// Standard centred content column used by every page section.
export default function Section({ className = "", children, ...props }) {
  return (
    <section
      className={`mx-auto max-w-[1000px] px-5 py-16 md:px-10 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
