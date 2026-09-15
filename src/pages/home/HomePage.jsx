import Hero from "../../components/home/Hero";
import Passport from "../../components/home/Passport";
import Postcard from "../../components/home/Postcard";
import SkillTags from "../../components/home/SkillTags";
import Ticker from "../../components/home/Ticker";
import WorkSection from "../../components/home/WorkSection";
import SiteNav from "../../components/layout/SiteNav";
import {
  DESTINATIONS,
  HERO,
  PASSPORT_FIELDS,
  PROJECTS,
  SKILL_TAGS,
} from "../../data/home";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import "./HomePage.css";

export default function HomePage() {
  useDocumentTitle("Tanvi Deshpande — Product Designer");

  return (
    <>
      {/* nav + ticker + hero fill exactly one screen */}
      <div className="first-screen">
        <SiteNav mark="TANVI DESHPANDE">
          <div className="links">
            <a href="#about">about</a>
            <a href="#work">work</a>
            <a href="#contact">contact</a>
          </div>
        </SiteNav>
        <Ticker destinations={DESTINATIONS} />
        <Hero {...HERO} />
      </div>

      <div className="rule" />

      <section id="about" aria-label="About me">
        <Passport fields={PASSPORT_FIELDS} />
      </section>

      <section>
        <h2 className="sec-head">Every skill, packed &amp; ready.</h2>
        <SkillTags tags={SKILL_TAGS} />
      </section>

      <WorkSection projects={PROJECTS} />

      <section id="contact" aria-label="Send a postcard">
        <Postcard />
      </section>

      <footer>issued for portfolio use only · not valid for travel</footer>
    </>
  );
}
