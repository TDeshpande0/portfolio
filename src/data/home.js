import { ROUTES } from "../routes";

// Editable homepage content. Components read everything from here.

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
// make the pass open it; leave it null for projects without a page yet.
export const PROJECTS = [
  {
    category: "branding",
    from: "ORBIT",
    to: "LAUNCH",
    blurb:
      "A full identity system for a satellite logistics startup — wordmark, motion, and a launch site.",
    href: null,
  },
  {
    category: "product · accessibility",
    from: "DELTA",
    to: "BOOKED",
    blurb:
      "Redesigned Delta's flight-booking flow for speed and accessibility — research, IA, and a full hi-fi prototype.",
    href: ROUTES.deltaCaseStudy,
  },
  {
    category: "motion",
    from: "FOLD",
    to: "FLIP",
    blurb:
      "A personal series exploring flip and fold transitions inspired by paper ephemera.",
    href: null,
  },
];
