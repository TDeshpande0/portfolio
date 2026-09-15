import SectionLabel from "./SectionLabel";

// A case study section: pill label, optional heading, then its content.
export default function StorySection({ number, label, title, children }) {
  return (
    <section className="mx-auto max-w-[1000px] px-5 py-[60px] md:px-10">
      <SectionLabel number={number}>{label}</SectionLabel>
      {title && (
        <h2 className="mb-6 max-w-[24ch] text-[31px] font-semibold">{title}</h2>
      )}
      {children}
    </section>
  );
}
