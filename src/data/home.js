import { ROUTES } from "../routes";

// Editable homepage content. Components read everything from here.

export const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "work", href: "#work" },
  { label: "contact", href: "#contact" },
];

export const HERO = {
  firstName: "Tanvi",
  lastName: "Deshpande",
  role: "Aspiring product designer",
  bio: "I keep every boarding pass, every photo strip, every stamp in my passport. My desk drawer never stood a chance, and neither did this website.",
};

// Scrolls across the banner under the nav.
export const DESTINATIONS = [
  "Costa Rica",
  "Czech Republic",
  "India",
  "Puerto Rico",
  "New York",
  "California",
];

// Rows on the passport "About me" page: [label, value].
export const PASSPORT_FIELDS = [
  ["Surname", "Deshpande"],
  ["Given names", "Tanvi"],
  ["Nationality", "Product design"],
  ["Date of issue", "2026"],
  ["Place of birth", "Your city"],
  ["Authority", "Open to work"],
];

// Luggage tags in the skills section. `flash` is the tag's band colour,
// `tilt` its resting angle in degrees.
export const SKILL_TAGS = [
  {
    code: "FIG",
    dest: "figma",
    name: "Figma",
    flash: "#FF5A4E",
    serial: "BAG‑0001",
    tilt: -2.5,
  },
  {
    code: "WEB",
    dest: "webflow",
    name: "Webflow",
    flash: "#2FA968",
    serial: "BAG‑0002",
    tilt: 2.5,
  },
  {
    code: "MOT",
    dest: "motion design",
    name: "Motion",
    flash: "#FFC53D",
    serial: "BAG‑0003",
    tilt: -2.5,
  },
  {
    code: "BRD",
    dest: "branding",
    name: "Branding",
    flash: "#FF5D8F",
    serial: "BAG‑0004",
    tilt: 2.5,
  },
  {
    code: "TYP",
    dest: "typography",
    name: "Type",
    flash: "#00A6A0",
    serial: "BAG‑0005",
    tilt: -2.5,
  },
];

// Boarding passes in the work section. Set `href` to a case study route to
// make the pass open it; leave it null for projects without a page yet
// (they show as "coming soon"). `accent` colours the ticket's top band; `gate` doubles as the flight number.
export const PROJECTS = [
  {
    category: "branding",
    title: "Orbit Brand Identity",
    blurb:
      "A full identity system for a satellite logistics startup — wordmark, motion, and a launch site.",
    href: null,
    accent: "#FF5A4E",
    gate: "01",
  },
  {
    category: "product · accessibility",
    title: "Delta Airlines Re‑Design",
    blurb:
      "Redesigned Delta's flight-booking flow for speed and accessibility — research, IA, and a full hi-fi prototype.",
    href: ROUTES.deltaCaseStudy,
    accent: "#00A6A0",
    gate: "02",
  },
  {
    category: "motion",
    title: "Fold & Flip Motion Series",
    blurb:
      "A personal series exploring flip and fold transitions inspired by paper ephemera.",
    href: null,
    accent: "#FF5D8F",
    gate: "03",
  },
];

// The project whose case study lives at `href`, so its page header matches its ticket.
export function findProject(href) {
  return PROJECTS.find((project) => project.href === href);
}
