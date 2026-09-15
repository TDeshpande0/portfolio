import { Link } from "react-router-dom";
import CaseStudyHero from "../../../components/case-study/CaseStudyHero";
import CaseStudySection from "../../../components/case-study/CaseStudySection";
import ComparisonTable from "../../../components/case-study/ComparisonTable";
import Figure from "../../../components/case-study/Figure";
import InfoCard from "../../../components/case-study/InfoCard";
import PhaseRoute from "../../../components/case-study/PhaseRoute";
import SiteFooter from "../../../components/layout/SiteFooter";
import SiteNav from "../../../components/layout/SiteNav";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { ROUTES } from "../../../routes";
import { COMPARISON_COLUMNS, COMPARISON_ROWS, META, PHASES } from "./content";

const BACK_TO_WORK = `${ROUTES.home}#work`;

const TWO_COLUMNS = "grid grid-cols-1 gap-5 md:grid-cols-2";
const SUBHEAD = "mb-[14px] text-[15px] font-semibold";

export default function DeltaCaseStudyPage() {
  useDocumentTitle("Delta Airlines Re‑Design — Tanvi Deshpande");

  return (
    <>
      <SiteNav
        mark="CASE STUDY · 01"
        back={{ to: BACK_TO_WORK, label: "back to work" }}
      />

      <CaseStudyHero
        label="product design · airline booking"
        title="Delta Airlines Re‑Design"
        tagline="Making travel faster."
        meta={META}
      />

      <PhaseRoute phases={PHASES} />

      <CaseStudySection label="overview">
        <p className="max-w-[70ch] text-[15px] text-muted">
          Delta’s online booking experience overwhelms first-time flyers — long
          forms, confusing seat selection, and buried accessibility options.
          This project rebuilds the flight-booking flow into something faster,
          clearer, and genuinely usable for every kind of traveler.
        </p>
      </CaseStudySection>

      <CaseStudySection
        label="01 · empathize"
        title="Understanding the traveler."
      >
        <div className={`${TWO_COLUMNS} mb-[30px]`}>
          <InfoCard
            title="Research goals"
            items={[
              "Identify pain points across the booking journey",
              "Understand how accessibility needs go unmet",
              "Benchmark against major competitor airlines",
            ]}
          />
          <InfoCard
            title="Methodologies"
            items={[
              "Competitive analysis of four major carriers",
              "User surveys and interviews",
              "Affinity mapping & persona development",
            ]}
          />
        </div>

        <h4 className={SUBHEAD}>Competitive analysis</h4>
        <ComparisonTable columns={COMPARISON_COLUMNS} rows={COMPARISON_ROWS} />

        <h4 className={`${SUBHEAD} mt-[34px]`}>User personas</h4>
        <div className={TWO_COLUMNS}>
          <Figure
            tab="passport · persona 01"
            note="Aisha — the environmentally conscious professional"
          />
          <Figure
            tab="passport · persona 02"
            note="David — the retired assisted traveler"
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        label="02 · define"
        title="Turning research into a problem."
      >
        <div className="mb-[30px] rounded-[10px] bg-navy-deep px-[34px] py-[30px] text-[16px] leading-[1.7] text-paper">
          The flight booking experience is hindered by hidden fees, inefficient
          processes, and poor accessibility, leading to user frustration and
          mistrust. Travelers needing special assistance face significant
          barriers.
        </div>
        <div className={TWO_COLUMNS}>
          <InfoCard
            title="User needs"
            items={[
              "Clear, upfront pricing without hidden fees",
              "Fast, self-serve accessibility requests",
              "A seat map that’s readable on any device",
            ]}
          />
          <InfoCard
            title="User goals"
            items={[
              "Book a flight without confusing navigation",
              "Understand every fee before paying",
              "Trust that accessibility needs will be met",
            ]}
          />
        </div>
      </CaseStudySection>

      <CaseStudySection label="03 · ideate" title="Structuring the new flow.">
        <div className="flex flex-col gap-6">
          <Figure tab="site map" note="Information architecture" />
          <Figure tab="user flow · legend included" note="User flow diagram" />
          <Figure
            tab="low-fidelity key screens"
            note="Low-fidelity wireframes"
            dark
          />
        </div>
      </CaseStudySection>

      <CaseStudySection label="04 · prototype" title="Building the system.">
        <div className={`${TWO_COLUMNS} mb-5`}>
          <Figure tab="typography" note="PT Serif · Fira Sans specimen" />
          <Figure tab="buttons · tags · overlay" note="UI component library" />
        </div>
        <div className="flex flex-col gap-5">
          <Figure
            tab="special assistance seating card"
            note="Special assistance card"
          />
          <Figure tab="promotional cards" note="Delta One · Delta Comfort+" />
          <Figure
            tab="high-fidelity key screens"
            note="Hi-fi screens — web &amp; mobile"
            dark
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        label="05 · test"
        title="Validating with real travelers."
      >
        <InfoCard title="Usability test plan" className="mb-[30px]">
          <p className="text-[14px] text-muted">
            Participants completed tasks covering flight search, seat selection,
            special assistance requests, and the SAF option, with a focus on
            inclusivity and accessibility.
          </p>
        </InfoCard>
        <div className={TWO_COLUMNS}>
          <InfoCard
            title="Key observations"
            items={[
              "Participants completed booking noticeably faster",
              "Assistance options were found without help",
              "The fare breakdown toggle was occasionally missed",
            ]}
          />
          <InfoCard
            title="Insights & recommendations"
            items={[
              "Surface the fare breakdown by default",
              "Confirm assistance requests with clear microcopy",
              "Keep testing the seat map on smaller viewports",
            ]}
          />
        </div>
      </CaseStudySection>

      <SiteFooter>
        <Link to={BACK_TO_WORK} className="underline">
          back to all projects
        </Link>
      </SiteFooter>
    </>
  );
}
