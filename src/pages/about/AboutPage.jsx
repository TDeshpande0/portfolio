import { FileText } from "lucide-react";
import Postcard from "../../components/home/Postcard";
import ArrivalStamp from "../../components/illustrations/ArrivalStamp";
import Section from "../../components/layout/Section";
import SiteFooter from "../../components/layout/SiteFooter";
import SiteNav from "../../components/layout/SiteNav";
import { RESUME_URL } from "../../data/site";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { ROUTES } from "../../routes";
import {
  DECLARATIONS,
  FACTS,
  PORTRAIT,
  TIMELINE,
  TRIP_PHOTOS,
} from "./content";

const LABEL = "mb-6 font-mono text-[12px] uppercase tracking-[4px] text-gold";
const BODY = "mb-4 max-w-[56ch] text-[16px] leading-[1.68] text-[#2F534C]";
const CARD_SHADOW = "shadow-[0_14px_28px_-24px_rgba(0,0,0,.35)]";

export default function AboutPage() {
  useDocumentTitle("About — Tanvi Deshpande");

  return (
    <>
      <SiteNav
        mark="ARRIVALS · ABOUT"
        back={{ to: `${ROUTES.home}#about`, label: "back to portfolio" }}
      />

      <header className="mx-auto max-w-[1000px] px-5 pb-6 pt-12 md:px-10 md:pt-[70px]">
        <div className="mb-2 font-mono text-[12px] tracking-[4px] text-airmail">
          now arriving
        </div>
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[300px_1fr] md:gap-10">
          <div className="relative mx-auto w-full max-w-[300px] rotate-[-2deg] border border-black/[.12] bg-paper p-3 shadow-[0_20px_40px_-22px_rgba(0,0,0,.45)]">
            <img
              className="block h-auto w-full"
              src={PORTRAIT.src}
              width={PORTRAIT.width}
              height={PORTRAIT.height}
              alt={PORTRAIT.alt}
              fetchpriority="high"
            />
            <ArrivalStamp
              data-passport-target="stamp"
              className="absolute -bottom-[26px] -right-[26px] h-[104px] w-[104px] rotate-[-13deg]"
            />
          </div>
          <div>
            {/* focused after the passport transition lands */}
            <h1
              data-passport-target="title"
              tabIndex={-1}
              className="mb-4 text-[length:clamp(40px,6vw,64px)] font-bold leading-[.95] tracking-[-.02em] outline-none"
            >
              Hi, I&rsquo;m Tanvi.
            </h1>
            <p className={BODY}>
              I studied computer science and spent most of it drifting toward
              the screen. I gravitated to frontend for a reason: I want to look
              at the thing I am making, not type a page of letters and wait to
              find out what happened. What I actually want is to help build
              something that holds real value for the person using it. That is
              design, and it is why I am doing my master&rsquo;s in Applied
              Cognition and Neuroscience with a specialization in Human Computer
              Interaction, studying how people notice, remember, and decide.
            </p>
            <p className={BODY}>
              I am the friend who starts planning the trip months in advance and
              will happily annoy everyone until it is perfect. Color coded
              itinerary, a packing list built around the weather and the kind of
              trip it is, and a running inventory of the things nobody thinks
              about until they need them. I am the reason we have trash bags for
              the wet clothes. I am the person my family comes to for a rubber
              band, because who packed rubber bands? I did. That is the same
              instinct I bring to a design file.
            </p>
            <p className={BODY}>
              Outside of design, I draw on my iPad, work through coloring books,
              and I am slowly talking myself into paint and pastels. If Michaels
              puts out a ceramic pumpkin in the fall, it is coming home with me.
              Most of what I read is thrillers, murder mysteries, and science
              fiction. I travel every chance I get, mostly for nature, oceans,
              and new cuisines. Costa Rica is still the best trip I have taken.
              I hand drew a lot of what you see in this portfolio.
            </p>
            {RESUME_URL && (
              <a
                className="mt-4 inline-flex items-center gap-[9px] rounded-full bg-navy-deep px-[22px] py-[13px] font-mono text-[11px] uppercase tracking-[1.6px] text-paper no-underline shadow-[0_12px_24px_-16px_rgba(5,76,72,.9)] transition hover:-translate-y-0.5 hover:bg-airmail"
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={15} aria-hidden="true" /> View my resume
              </a>
            )}
          </div>
        </div>
      </header>

      <Section aria-labelledby="route-label">
        <div id="route-label" className={LABEL}>
          route so far
        </div>
        <ol className="relative pl-[34px] before:absolute before:bottom-2 before:left-[9px] before:top-2 before:w-[2px] before:bg-[repeating-linear-gradient(180deg,theme(colors.navy-deep)_0_7px,transparent_7px_13px)] before:content-['']">
          {TIMELINE.map(({ when, what, edu }) => (
            <li
              key={when + what}
              className={`relative grid grid-cols-1 items-start gap-1 py-[14px] before:absolute before:-left-[30px] before:top-5 before:h-[14px] before:w-[14px] before:rounded-full before:border-[3px] before:border-gold before:content-[''] md:grid-cols-[150px_1fr] md:gap-5 ${edu ? "before:bg-gold" : "before:bg-paper"}`}
            >
              <div className="pt-[3px] font-mono text-[10.5px] uppercase tracking-[1.4px] text-airmail">
                {when}
              </div>
              <div className="font-fraunces text-[17px] font-semibold">
                {what}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="customs-label">
        <div id="customs-label" className={LABEL}>
          customs · declare your items
        </div>
        <div className="relative rotate-[-.5deg] rounded-[14px] border-2 border-dashed border-navy-deep/30 bg-paper px-[26px] pb-[22px] pt-[26px] shadow-[0_20px_40px_-28px_rgba(0,0,0,.4)]">
          <span className="absolute -top-[14px] left-1/2 h-7 w-[118px] border-x border-dashed border-black/[.12] bg-gold/75 [transform:translateX(-50%)_rotate(-2deg)]" />
          <div className="mb-5 text-center">
            <b className="block font-fraunces text-[21px] font-semibold italic text-navy-deep">
              Things I am declaring
            </b>
            <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
              form D-01 · nothing to hide
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-x-[22px] gap-y-3 md:grid-cols-2">
            {DECLARATIONS.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[26px_1fr] items-start gap-3 text-[14.5px] leading-[1.45] text-[#2F534C]"
              >
                <span
                  className="flex h-[22px] w-[22px] rotate-[-6deg] items-center justify-center rounded-[5px] border-2 border-navy-deep bg-kraft text-[15px] font-bold leading-none text-airmail"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 text-center font-fraunces text-[13px] italic text-muted">
            All items accounted for. Proceed to baggage claim.
          </div>
        </div>
      </Section>

      <Section aria-labelledby="facts-label">
        <div id="facts-label" className={LABEL}>
          the professional details
        </div>
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {FACTS.map(({ label, value, text }) => (
            <div
              key={label}
              className={`rounded-[10px] border border-black/[.08] bg-paper p-5 ${CARD_SHADOW}`}
            >
              <div className="mb-[7px] font-mono text-[9px] uppercase tracking-[1.6px] text-airmail">
                {label}
              </div>
              <div className="font-fraunces text-[19px] font-semibold leading-[1.28]">
                {value}
              </div>
              <p className="mt-[9px] text-[14px] leading-[1.6] text-[#2F534C]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="photos-label">
        <div id="photos-label" className={LABEL}>
          photo roll · from the trips
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TRIP_PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className={`border border-black/10 bg-paper p-[9px] shadow-[0_14px_28px_-22px_rgba(0,0,0,.4)] transition duration-[250ms] hover:-translate-y-1 hover:rotate-0 hover:scale-[1.02] hover:shadow-[0_20px_34px_-20px_rgba(0,0,0,.5)] ${i % 2 ? "rotate-[1.8deg]" : "rotate-[-1.8deg]"}`}
            >
              <img
                className="block aspect-square h-auto w-full object-cover"
                src={photo.src}
                alt={photo.alt}
                width={620}
                height={620}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" aria-label="Send a postcard">
        <div className={LABEL}>send a postcard</div>
        <Postcard />
      </Section>

      <SiteFooter>
        issued for portfolio use only · not valid for travel
      </SiteFooter>
    </>
  );
}
