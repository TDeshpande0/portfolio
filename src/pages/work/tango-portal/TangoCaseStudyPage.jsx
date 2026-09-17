import BeforeAfter from "../../../components/case-study/BeforeAfter";
import BodyText from "../../../components/case-study/BodyText";
import BrowserFrame from "../../../components/case-study/BrowserFrame";
import CaseStudyHero from "../../../components/case-study/CaseStudyHero";
import FeatureCards from "../../../components/case-study/FeatureCards";
import InfoCard from "../../../components/case-study/InfoCard";
import PhaseRoute from "../../../components/case-study/PhaseRoute";
import PhoneGallery from "../../../components/case-study/PhoneGallery";
import PullQuote from "../../../components/case-study/PullQuote";
import SectionLabel from "../../../components/case-study/SectionLabel";
import SectionRule from "../../../components/case-study/SectionRule";
import StatCallout from "../../../components/case-study/StatCallout";
import StorySection from "../../../components/case-study/StorySection";
import SiteFooter from "../../../components/layout/SiteFooter";
import SiteNav from "../../../components/layout/SiteNav";
import { findProject } from "../../../data/home";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { ROUTES } from "../../../routes";
import {
  AFTER,
  BEFORE,
  CUT,
  DEMOS,
  DESKTOP_GALLERY,
  FORMATS,
  KEPT,
  META,
  PHASES,
  PHONE_ROWS,
  PORTAL_URL,
  PRODUCTION,
} from "./content";

const BACK_TO_WORK = `${ROUTES.home}#work`;
const PROJECT = findProject(ROUTES.tangoCaseStudy);
const TWO_COLUMNS = "grid grid-cols-1 gap-5 md:grid-cols-2";

export default function TangoCaseStudyPage() {
  useDocumentTitle(`${PROJECT.title} — Tanvi Deshpande`);

  return (
    <>
      <SiteNav
        mark="CASE STUDY · TANGO PORTAL"
        back={{ to: BACK_TO_WORK, label: "back to work" }}
      />

      <CaseStudyHero
        label="product design internship · blackhawk network"
        title={PROJECT.title}
        tagline="Rebuilding how rewards get personalized."
        summary="A redesign of template selection and customization in the Tango Portal, shipped to production."
        stamp={{ title: "shipped", note: "live in production" }}
        accent={PROJECT.accent}
        gate={PROJECT.gate}
        meta={META}
      />

      {/* the body of this case study uses slightly roomier line spacing */}
      <div className="leading-[1.65]">
        <PhaseRoute phases={PHASES} wrapOnMobile />

        <StorySection label="Overview">
          <BodyText>
            The Tango Portal is how companies send digital rewards to employees
            and customers. Before a reward goes out, the sender picks a template
            that controls what the recipient actually sees: the email, the text
            message, or the printed letter that carries the reward.
          </BodyText>
          <BodyText>
            That template step was the weakest part of the flow. Customization
            came before template selection, the template picker itself was
            buried, and there was no way to preview a template before committing
            to it. I redesigned the entire experience across desktop and mobile
            web, for all three delivery formats, and it shipped to production
            before my internship ended.
          </BodyText>
        </StorySection>

        <SectionRule />

        <StorySection
          id="discover"
          number="01"
          label="Discover"
          title="Customization came before the decision it depended on."
        >
          <BodyText>
            The original flow opened directly into a customization editor, with
            template selection positioned after it. Senders were editing content
            before they had chosen the template that content belonged to, and
            the template picker was difficult to locate once they realized they
            wanted a different starting point.
          </BodyText>

          <StatCallout stat="50%">
            of users exited the customization screen to search for a different
            template. Half of all senders were being routed into the wrong
            starting point, then having to navigate backward to correct it.
          </StatCallout>

          <BodyText>
            Two additional gaps compounded the issue. There was no template
            preview, so selecting a template required senders to guess at what
            the recipient would ultimately receive. Customization was also
            mandatory rather than optional, meaning senders who were satisfied
            with a template as-is still had to move through an editor to
            complete the flow.
          </BodyText>

          <BeforeAfter before={BEFORE} after={AFTER} />
        </StorySection>

        <SectionRule />

        <StorySection
          id="define"
          number="02"
          label="Define"
          title="Making the case with data."
        >
          <BodyText>
            The redesign required a split-screen pattern that did not yet exist
            in the company UI toolkit, which meant additional scope for both
            design and engineering. The initial engineering assessment was that
            the existing flow was functional and did not warrant the investment.
          </BodyText>
          <BodyText>
            The 50% exit rate changed that conversation. Presented as a
            usability concern, the redesign was easy to deprioritize. Presented
            as evidence that half of all senders were abandoning a screen to
            find something the interface should have surfaced immediately, it
            became a measurable problem with a clear cost. With that data in
            hand, engineering and product aligned on moving forward.
          </BodyText>
          <PullQuote>
            The case for the redesign was not that the existing flow looked
            dated. It was that the flow was routing half of its users in the
            wrong direction, and the data made that measurable.
          </PullQuote>
        </StorySection>

        <SectionRule />

        <StorySection
          id="design"
          number="03"
          label="Design · desktop"
          title="Select first, preview throughout, customize by choice."
        >
          <BodyText>
            I introduced a split-screen layout: a searchable template gallery on
            the left, a live preview of the selected template on the right.
            Selecting a template updates the preview instantly, so senders can
            compare options against what the recipient will actually receive
            before committing to anything.
          </BodyText>
          <BodyText>
            Customization moved behind a deliberate &quot;Customize&quot;
            action, with a clear path back to all templates. Senders who like a
            template as-is can select it and move on. Senders who want to edit
            get a focused editor with the preview still live beside them,
            updating as they type.
          </BodyText>

          <BrowserFrame
            image={DESKTOP_GALLERY}
            url={PORTAL_URL}
            caption="Desktop · template gallery with live preview"
          />

          <SectionLabel className="mt-[34px]">
            Three delivery formats
          </SectionLabel>
          <BodyText>
            Every part of this had to work across the three ways a reward can
            reach someone. Each format has a different preview model, a
            different set of editable fields, and a different idea of what
            &quot;looks right&quot; means.
          </BodyText>

          <FeatureCards items={FORMATS} />
        </StorySection>

        <SectionRule />

        <StorySection
          number="03"
          label="Design · mobile web"
          title="Adapting a split-screen pattern to a single column."
        >
          <BodyText>
            Mobile could not simply shrink the desktop layout. With no
            horizontal space for a gallery and preview side by side, I
            restructured the pattern into a stacked flow: a collapsible selector
            at the top holds the chosen template, the preview sits directly
            beneath it, and the same Customize action expands into an editor
            with the preview still in view.
          </BodyText>
          <BodyText>
            Template search became a full-width dropdown list rather than a
            thumbnail grid, since thumbnails at mobile width were too small to
            tell templates apart. Selecting by name and confirming against the
            preview turned out to be faster than squinting at tiles.
          </BodyText>
          <BodyText>
            The same pattern carries all three formats, so the flow stays
            recognizable whether the sender is building an email, a text
            message, or a printed letter.
          </BodyText>

          {PHONE_ROWS.map((shots, i) => (
            <PhoneGallery key={i} shots={shots} followsRow={i > 0} />
          ))}
        </StorySection>

        <SectionRule />

        <StorySection
          id="iterate"
          number="04"
          label="Iterate"
          title="Iteration, review, and scope decisions."
        >
          <BodyText>
            I designed this on my own using the company approved UI toolkit,
            then brought it to recurring design reviews with my UX manager, the
            engineering manager, and product. The split-screen component had no
            toolkit precedent, so a lot of the review time went to making it
            feel native to the rest of the portal rather than like a one-off
            screen.
          </BodyText>
          <BodyText>
            I also handled design handoff to engineering directly, and iterated
            through implementation as questions came up.
          </BodyText>

          <div className={TWO_COLUMNS}>
            <InfoCard compact title="What I pushed for and kept" items={KEPT} />
            <InfoCard compact title="What I cut, and why" items={CUT} />
          </div>
        </StorySection>

        <SectionRule />

        <StorySection
          id="deliver"
          number="05"
          label="Deliver"
          title="Running in production."
        >
          <BodyText>
            The redesign was built and launched on the live Tango Portal before
            the end of my internship. These are recordings of the shipped
            implementation, not prototypes.
          </BodyText>

          {DEMOS.map((demo) => (
            <BrowserFrame key={demo.image.src} url={PORTAL_URL} {...demo} />
          ))}

          <div className={`${TWO_COLUMNS} mt-2`}>
            {PRODUCTION.map((shot) => (
              <BrowserFrame
                key={shot.image.src}
                url={PORTAL_URL}
                inGrid
                {...shot}
              />
            ))}
          </div>
        </StorySection>

        <SectionRule />

        <StorySection label="Reflection" title="What I would watch next.">
          <BodyText>
            The redesign launched right at the end of my internship, so there
            has not been enough time in production to report outcome metrics
            yet. The number I would watch first is the one that justified the
            project: the share of users who abandon customization to go looking
            for another template. If the new flow works, that 50% should fall
            sharply, because the thing those users were hunting for is now the
            first thing they see.
          </BodyText>
          <BodyText>
            The larger lesson was about scope. I came in with more ideas than
            the team could build in a summer, and the version that shipped is
            smaller than the version I designed. Getting a real improvement in
            front of real users mattered more than getting every idea in, and
            the pattern I introduced gives the next round of improvements
            somewhere to build from.
          </BodyText>
        </StorySection>

        <SiteFooter>
          Tango Portal template redesign · Blackhawk Network · 2026
        </SiteFooter>
      </div>
    </>
  );
}
