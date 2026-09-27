// Standard centred content column used by every page section. When a nav link scrolls to one, it
// stops 28px short, so the content lands clear of the floating nav with the same breathing room
// as the work section's heading.
export default function Section({ className = "", children, ...props }) {
  return (
    <section
      className={`mx-auto max-w-[1000px] scroll-mt-[28px] px-5 py-16 md:px-10 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
