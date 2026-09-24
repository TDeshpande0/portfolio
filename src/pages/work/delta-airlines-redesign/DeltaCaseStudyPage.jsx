import { useState } from "react";
import { Link } from "react-router-dom";
import CaseStudyHero from "../../../components/case-study/CaseStudyHero";
import ComparisonTable from "../../../components/case-study/ComparisonTable";
import FindingCards from "../../../components/case-study/FindingCards";
import InfoCard from "../../../components/case-study/InfoCard";
import Lightbox from "../../../components/case-study/Lightbox";
import NeedsGoals from "../../../components/case-study/NeedsGoals";
import PersonaCard from "../../../components/case-study/PersonaCard";
import PhaseRoute from "../../../components/case-study/PhaseRoute";
import SectionRule from "../../../components/case-study/SectionRule";
import SiteMapTree from "../../../components/case-study/SiteMapTree";
import StickyNotes from "../../../components/case-study/StickyNotes";
import StorySection from "../../../components/case-study/StorySection";
import ZoomableDiagram from "../../../components/case-study/ZoomableDiagram";
import SiteFooter from "../../../components/layout/SiteFooter";
import SiteNav from "../../../components/layout/SiteNav";
import { findProject } from "../../../data/home";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { ROUTES } from "../../../routes";
import {
  AFFINITY,
  COMPARISON_COLUMNS,
  COMPARISON_ROWS,
  FINDINGS,
  META,
  METHODS,
  OBSERVATIONS,
  PERSONAS,
  PHASES,
  RECOMMENDATIONS,
  RESEARCH_GOALS,
  SITE_MAP,
  SUMMARY,
  USER_GOALS,
  USER_NEEDS,
  WIREFRAMES,
} from "./content";
import DeltaUiKit from "./DeltaUiKit";
import UserFlowDiagram from "./UserFlowDiagram";

const BACK_TO_WORK = `${ROUTES.home}#work`;
const PROJECT = findProject(ROUTES.deltaCaseStudy);

const TWO_COLUMNS = "grid grid-cols-1 gap-5 md:grid-cols-2";
const SUBHEAD = "mb-[14px] text-[15px] font-semibold";
const CARD =
  "rounded-[10px] border border-black/[.08] bg-paper px-[26px] py-6 shadow-[0_14px_28px_-22px_rgba(0,0,0,.3)]";

export default function DeltaCaseStudyPage() {
  useDocumentTitle(`${PROJECT.title} — Tanvi Deshpande`);
  const [wireframesOpen, setWireframesOpen] = useState(false);

  return (
    <>
      <SiteNav
        mark={`CASE STUDY · ${PROJECT.gate}`}
        back={{ to: BACK_TO_WORK, label: "back to work" }}
      />

      <CaseStudyHero
        label="product design · airline booking"
        title={PROJECT.title}
        tagline="Making travel faster."
        accent={PROJECT.accent}
        gate={PROJECT.gate}
        meta={META}
        back={SUMMARY}
      />

      <PhaseRoute phases={PHASES} />

      <StorySection label="overview">
        <p className="max-w-[70ch] text-[15px] text-muted">
          Delta Airlines&apos; online booking experience is overwhelming for
          first-time flyers: long forms, confusing seat selection, and buried
          accessibility options. This project redesigns the flight-booking flow
          into something faster, clearer, and genuinely usable for every kind of
          traveler.
        </p>
      </StorySection>

      <SectionRule />

      <StorySection
        id="empathize"
        number="01"
        label="empathize"
        title="Understanding the traveler."
      >
        <div className={`${TWO_COLUMNS} mb-[30px]`}>
          <InfoCard compact title="Research goals" items={RESEARCH_GOALS} />
          <InfoCard compact title="Methodologies" items={METHODS} />
        </div>

        <h4 className={SUBHEAD}>Competitive analysis</h4>
        <ComparisonTable columns={COMPARISON_COLUMNS} rows={COMPARISON_ROWS} />

        <h4 className={`${SUBHEAD} mt-[34px]`}>User surveys</h4>
        <div className={CARD}>
          <p className="text-[14px] text-muted">
            <strong className="text-ink">68%</strong> of respondents said
            they&apos;d abandoned a booking midway due to confusion over seat
            selection or add-on pricing.{" "}
            <strong className="text-ink">1 in 5</strong> disabled travelers said
            they couldn&apos;t find accessibility options at all.
          </p>
        </div>

        <h4 className={`${SUBHEAD} mt-[34px]`}>Affinity mapping</h4>
        <StickyNotes notes={AFFINITY} />

        <h4 className={`${SUBHEAD} mt-[34px]`}>User personas</h4>
        {PERSONAS.map((persona) => (
          <PersonaCard key={persona.name} {...persona} />
        ))}
      </StorySection>

      <SectionRule />

      <StorySection
        id="define"
        number="02"
        label="define"
        title="Turning research into a problem."
      >
        <FindingCards items={FINDINGS} />
        <div className="relative mb-[30px] rounded-[10px] bg-navy-deep px-[34px] py-[30px] text-paper">
          <span
            aria-hidden="true"
            className="absolute left-[18px] top-[6px] font-fraunces text-[64px] leading-none text-gold opacity-50"
          >
            “
          </span>
          <p className="relative pl-[18px] text-[16px] leading-[1.7]">
            The flight booking experience is hindered by hidden fees,
            inefficient processes, and poor accessibility, leading to user
            frustration and mistrust. Frequent travelers seek faster, more
            streamlined bookings, while those needing special assistance face
            significant barriers. Additionally, interest in eco-friendly options
            is growing but limited by cost concerns. A more transparent,
            efficient, and inclusive platform is needed to meet these diverse
            needs.
          </p>
        </div>
        <NeedsGoals needs={USER_NEEDS} goals={USER_GOALS} />
      </StorySection>

      <SectionRule />

      <StorySection
        id="ideate"
        number="03"
        label="ideate"
        title="Structuring the new flow."
      >
        <h4 className={`${SUBHEAD} mb-[10px]`}>Information architecture</h4>
        <SiteMapTree
          map={SITE_MAP}
          legend="Highlighted pages are the paths this redesign focused on"
        />

        <h4 className={`${SUBHEAD} mb-[10px]`}>User flow</h4>
        <ZoomableDiagram
          label="User flow diagram"
          caption="User flow · legend included"
        >
          <UserFlowDiagram />
        </ZoomableDiagram>

        <h4 className={`${SUBHEAD} mb-[10px]`}>Low-fidelity wireframes</h4>
        <button
          type="button"
          onClick={() => setWireframesOpen(true)}
          className="block w-full cursor-zoom-in overflow-hidden rounded-[10px] border border-black/10 bg-[#0E1F30] text-left shadow-[0_16px_32px_-24px_rgba(0,0,0,.4)]"
          aria-label="Open the low-fidelity wireframes full screen"
        >
          <div className="bg-navy-deep px-4 py-2 font-mono text-[9px] uppercase tracking-[1.5px] text-gold">
            low-fidelity key screens
          </div>
          <img
            className="block h-auto w-full"
            src={WIREFRAMES.src}
            width={WIREFRAMES.width}
            height={WIREFRAMES.height}
            alt={WIREFRAMES.alt}
            loading="lazy"
          />
        </button>
        <Lightbox
          open={wireframesOpen}
          onClose={() => setWireframesOpen(false)}
          label="Low-fidelity wireframes"
        >
          <img src={WIREFRAMES.src} alt={WIREFRAMES.alt} />
        </Lightbox>
      </StorySection>

      <SectionRule />

      <StorySection
        id="prototype"
        number="04"
        label="prototype"
        title="Building the system."
      >
        <DeltaUiKit />
      </StorySection>

      <SectionRule />

      <StorySection
        id="test"
        number="05"
        label="test"
        title="Validating with real travelers."
      >
        <InfoCard title="Usability test plan" className="mb-[30px]">
          <p className="text-[14px] text-muted">
            8 participants, mixed booking experience levels, including 2 with
            accessibility needs. Moderated remote sessions, task-based (book a
            round trip, request assistance, review fare breakdown).
          </p>
        </InfoCard>
        <div className={TWO_COLUMNS}>
          <InfoCard compact title="Key observations" items={OBSERVATIONS} />
          <InfoCard
            compact
            title="Insights & recommendations"
            items={RECOMMENDATIONS}
          />
        </div>
      </StorySection>

      <SectionRule />

      <StorySection label="final thoughts">
        <div className="rounded-[10px] border border-black/10 bg-paper px-[38px] py-[34px] shadow-[0_20px_40px_-26px_rgba(0,0,0,.33)]">
          <p className="text-[15px] text-muted">
            This redesign reframed the booking flow around trust and clarity,
            with upfront pricing, faster paths to the fare that fits, and
            accessibility support treated as a core part of the journey rather
            than an afterthought. Next step: extend the same flow logic to the
            mobile app&apos;s day-of-travel experience.
          </p>
        </div>
      </StorySection>

      <SiteFooter>
        <Link to={BACK_TO_WORK} className="underline">
          back to all projects
        </Link>
      </SiteFooter>
    </>
  );
}
