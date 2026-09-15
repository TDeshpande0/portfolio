import Section from "../layout/Section";
import CaseStudyLabel from "./CaseStudyLabel";

export default function CaseStudySection({ label, title, children }) {
  return (
    <Section>
      <CaseStudyLabel>{label}</CaseStudyLabel>
      {title && (
        <h2 className="mb-[30px] max-w-[22ch] text-[32px] font-semibold">
          {title}
        </h2>
      )}
      {children}
    </Section>
  );
}
