import BeforeAfter from "../../../components/case-study/BeforeAfter";
import BodyText from "../../../components/case-study/BodyText";
import BrowserFrame from "../../../components/case-study/BrowserFrame";
import CaseStudyHero from "../../../components/case-study/CaseStudyHero";
import DetailFigure from "../../../components/case-study/DetailFigure";
import FeatureCards from "../../../components/case-study/FeatureCards";
import FlowSteps from "../../../components/case-study/FlowSteps";
import InfoCard from "../../../components/case-study/InfoCard";
import PhaseRoute from "../../../components/case-study/PhaseRoute";
import PullQuote from "../../../components/case-study/PullQuote";
import SectionRule from "../../../components/case-study/SectionRule";
import StorySection from "../../../components/case-study/StorySection";
import SiteFooter from "../../../components/layout/SiteFooter";
import SiteNav from "../../../components/layout/SiteNav";
import { findProject } from "../../../data/home";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { ROUTES } from "../../../routes";
import {
  AFTER,
  BEFORE,
  CAMPAIGN_PAGE,
  CUSTOM_SELECTION_PAGE,
  FLOW_STEPS,
  KEPT,
  META,
  OPTIONS,
  PHASES,
  PORTAL_URL,
  SAVED_DROPDOWN,
  SET_ASIDE,
  SUMMARY,
} from "./content";

const BACK_TO_WORK = `${ROUTES.home}#work`;
const PROJECT = findProject(ROUTES.campaignsCaseStudy);

export default function CampaignsCaseStudyPage() {
  useDocumentTitle(`${PROJECT.title} — Tanvi Deshpande`);

  return (
    <>
      <SiteNav
        mark="TANGO CAMPAIGNS"
        back={{ to: BACK_TO_WORK, label: "back to work" }}
      />

      <CaseStudyHero
        label="product design internship · blackhawk network"
        title={PROJECT.title}
        tagline="Letting senders curate the catalog, so bulk rewards offer the brands that fit the occasion."
        summary="Introducing brand collections to Tango Portal campaigns."
        stamp={{ title: "final design", note: "pending page handoff" }}
        accent={PROJECT.accent}
        gate={PROJECT.gate}
        meta={META}
        back={SUMMARY}
      />

      {/* the body of this case study uses slightly roomier line spacing */}
      <div className="leading-[1.65]">
        <PhaseRoute phases={PHASES} wrapOnMobile />

        <StorySection label="Overview">
          <BodyText>
            Campaigns in the Tango Portal let companies send rewards to a group
            of people at once, such as recognizing a team after a successful
            project. A sender names the campaign, chooses the reward, sets
            values for each recipient, and picks how the reward is delivered.
          </BodyText>
          <BodyText>
            Some rewards are a single brand, like a gift card to one restaurant.
            Others, like Reward Link US, let the recipient choose from a catalog
            of hundreds of brands. Those multi-brand rewards were all or
            nothing, and I designed brand collections to give senders control
            over which brands their recipients can choose from.
          </BodyText>
        </StorySection>

        <SectionRule />

        <StorySection
          id="discover"
          number="01"
          label="Discover"
          title="Multi-brand rewards offered no way to narrow the catalog."
        >
          <BodyText>
            When a sender chose a multi-brand reward, every brand in that
            reward&apos;s catalog went out to every recipient. Reward Link US
            carries 1,619 brands; Lunch Link US carries its own smaller set.
            Either way, the sender had no control over which of those brands
            their recipients would see.
          </BodyText>
          <BodyText>
            That created friction for exactly the situations campaigns are built
            for. A company sending a lunch reward to a team, or a welcome gift
            to new hires, may want to offer a focused, relevant set of options
            rather than an entire catalog. Without a way to scope the brands,
            senders either accepted the full list or chose a different reward
            entirely.
          </BodyText>

          <BeforeAfter before={BEFORE} after={AFTER} />
        </StorySection>

        <SectionRule />

        <StorySection
          id="define"
          number="02"
          label="Define"
          title="Add a new capability without changing the page around it."
        >
          <BodyText>
            The brief was focused: add the ability to select specific brands for
            multi-brand rewards, and clean up the surrounding space in the
            process. The New Campaign page was a shared surface, with other
            designers working on different sections at the same time, so my
            feature needed to sit comfortably alongside theirs.
          </BodyText>
          <BodyText>
            It also needed to match the rest of the portal. Any new pattern
            introduced here would set an expectation for other pages, and a
            change in one place would create work everywhere else. The goal was
            a feature that felt native to the product from day one.
          </BodyText>

          <FlowSteps steps={FLOW_STEPS}>
            Brand collections sits between choosing a reward and setting reward
            values. Reward value options already existed.
          </FlowSteps>
        </StorySection>

        <SectionRule />

        <StorySection
          id="design"
          number="03"
          label="Design"
          title="Three ways to decide what recipients can choose."
        >
          <BodyText>
            Once a sender picks a multi-brand reward, a brand collections
            section appears beneath it. The copy states how many brands the
            reward includes, and a simple toggle lets the sender either send
            everything or narrow it down. A summary card underneath always shows
            how many brands are selected along with a preview of their logos,
            and opens a full brand browser for reviewing or adjusting the
            selection.
          </BodyText>

          <FeatureCards items={OPTIONS} />

          <DetailFigure
            image={SAVED_DROPDOWN}
            caption="Saved collections dropdown · searchable, with brand count and region under each name"
          />

          <BodyText>
            Each saved collection lists its brand count and the regions it
            covers, so senders can tell collections apart without opening them.
            The dropdown is searchable, anticipating companies that build up a
            larger library of collections over time.
          </BodyText>

          <BrowserFrame
            image={CAMPAIGN_PAGE}
            url={PORTAL_URL}
            caption="Desktop · New campaign page with brand collections in context"
          />
        </StorySection>

        <SectionRule />

        <StorySection
          id="iterate"
          number="04"
          label="Iterate"
          title="Exploring widely, then designing for consistency."
        >
          <BodyText>
            I explored several different ways to introduce brand selection, some
            of which departed significantly from the portal&apos;s existing
            patterns. Through reviews, the direction narrowed toward a solution
            that reused familiar components and layouts. Changing the pattern on
            this page would have meant changing it on others, and the team
            wanted a cleaner page that added one capability rather than a
            redesign that rippled outward.
          </BodyText>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <InfoCard compact title="What made the final design" items={KEPT} />
            <InfoCard compact title="What I set aside" items={SET_ASIDE} />
          </div>

          <PullQuote>
            Designing inside an established system meant the strongest solution
            was not the most novel one. It was the one that felt like it had
            always been part of the product.
          </PullQuote>
        </StorySection>

        <SectionRule />

        <StorySection
          id="handoff"
          number="05"
          label="Handoff"
          title="Final design, ready for the rest of the page."
        >
          <BodyText>
            Brand collections is complete as a final design. Because the New
            Campaign page is a shared surface, it moves to engineering together
            with the other sections being designed alongside it, so the page can
            be built and released as a coherent whole rather than in pieces.
          </BodyText>

          <BrowserFrame
            image={CUSTOM_SELECTION_PAGE}
            url={PORTAL_URL}
            caption="Desktop · custom selection state, 1,000 of 1,619 brands"
          />
        </StorySection>

        <SectionRule />

        <StorySection
          label="Reflection"
          title="What I would measure once it ships."
        >
          <BodyText>
            Once brand collections is live, the first signal worth tracking is
            how often senders choosing a multi-brand reward narrow the catalog
            rather than sending everything. The second is how often saved
            collections are reused across campaigns, since reuse is what turns
            this from a one-time setting into something that saves senders time.
          </BodyText>
          <BodyText>
            This project also taught me to treat consistency as a design
            requirement rather than a limitation. The most useful version of
            this feature was the one that fit the product so well it did not
            need explaining.
          </BodyText>
        </StorySection>

        <SiteFooter>
          Tango Portal brand collections · Blackhawk Network · 2026
        </SiteFooter>
      </div>
    </>
  );
}
