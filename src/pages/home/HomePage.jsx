import Hero from "../../components/home/Hero";
import Passport from "../../components/home/Passport";
import Postcard from "../../components/home/Postcard";
import SkillTags from "../../components/home/SkillTags";
import Ticker from "../../components/home/Ticker";
import WorkSection from "../../components/home/WorkSection";
import Section from "../../components/layout/Section";
import SiteFooter from "../../components/layout/SiteFooter";
import SiteNav from "../../components/layout/SiteNav";
import {
  DESTINATIONS,
  HERO,
  NAV_LINKS,
  PASSPORT_FIELDS,
  PROJECTS,
  SKILL_TAGS,
} from "../../data/home";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function HomePage() {
  useDocumentTitle("Tanvi Deshpande — Product Designer");

  return (
    <>
      {/* nav + ticker + hero fill exactly one screen */}
      <div className="flex min-h-screen flex-col supports-[height:100svh]:min-h-svh">
        <SiteNav mark="TANVI DESHPANDE" links={NAV_LINKS} />
        <Ticker destinations={DESTINATIONS} />
        <Hero {...HERO} />
      </div>

      <div className="mx-auto max-w-[1000px] border-t-[3px] border-ink" />

      <Section id="about" aria-label="About me">
        <Passport fields={PASSPORT_FIELDS} />
      </Section>

      <Section>
        <h2 className="mb-7 max-w-[20ch] font-fraunces text-[36px] font-medium italic text-ink">
          Every skill, packed &amp; ready.
        </h2>
        <SkillTags tags={SKILL_TAGS} />
      </Section>

      <WorkSection projects={PROJECTS} />

      <Section id="contact" aria-label="Send a postcard">
        <Postcard />
      </Section>

      <SiteFooter>
        issued for portfolio use only · not valid for travel
      </SiteFooter>
    </>
  );
}
