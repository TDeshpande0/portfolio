// Structured content for the Tango Portal case study.
// Images live in public/assets/case-studies/tango-portal/. To swap a picture, replace the file
// (keeping its name) or point `src` at a new file; update width/height to the new image's size.

const ASSETS = "/assets/case-studies/tango-portal";

// Facts on the header's boarding pass: [label, value].
export const META = [
  ["Role", "Product Design Intern"],
  ["Company", "Blackhawk Network"],
  ["Timeline", "May to August 2026"],
  ["Manager", "Ryan Gilsdorf"],
  ["Platforms", "Desktop and Mobile"],
  ["Formats", "Email, Text, & Print"],
];

// Route-bar stops. `href` points at the id of the section each one covers.
export const PHASES = [
  { label: "DISCOVER", href: "#discover" },
  { label: "DEFINE", href: "#define" },
  { label: "DESIGN", href: "#design" },
  { label: "ITERATE", href: "#iterate" },
  { label: "DELIVER", href: "#deliver" },
];

export const BEFORE = [
  "Customization came before template selection",
  "Template picker was hard to find",
  "No preview when choosing a template",
  "No option to skip customizing",
  "Half of users backed out to find another template",
];

export const AFTER = [
  "Template selection comes first, customization second",
  "Picker is the entry point, not a hidden step",
  "Live preview beside every template",
  "Customizing is a deliberate choice",
  "One path forward instead of a loop",
];

export const FORMATS = [
  {
    number: "format 01",
    title: "Email",
    text: "Sender name, subject line, message body, and branded card image, previewed as a full email.",
  },
  {
    number: "format 02",
    title: "Text",
    text: "Message body with a character counter, previewed inside a phone frame as a real SMS thread.",
  },
  {
    number: "format 03",
    title: "Letter",
    text: "Printable letterhead with reward details and letterhead content split across tabs.",
  },
];

export const PORTAL_URL = "portal.tangocard.com";

export const DESKTOP_GALLERY = {
  src: `${ASSETS}/desktop-template-gallery.jpg`,
  width: 1500,
  height: 868,
  alt: "Desktop template chooser showing a searchable gallery on the left and a live template preview on the right",
};

const phone = (file, caption) => ({
  src: `${ASSETS}/${file}`,
  width: 560,
  height: 1212,
  alt: caption,
  caption,
});

export const PHONE_ROWS = [
  [
    phone("mobile-template-search.jpg", "Template search"),
    phone("mobile-email-select-preview.jpg", "Email · select + preview"),
    phone("mobile-email-customize.jpg", "Email · customize"),
    phone("mobile-text-phone-preview.jpg", "Text · phone preview"),
    phone("mobile-text-customize.jpg", "Text · customize"),
  ],
  [
    phone("mobile-letter-reward-details.jpg", "Letter · reward details"),
    phone("mobile-letter-letterhead-tab.jpg", "Letter · letterhead tab"),
    phone("mobile-letter-edit-details.jpg", "Letter · edit details"),
    phone("mobile-letter-edit-letterhead.jpg", "Letter · edit letterhead"),
  ],
];

export const KEPT = [
  "Template selection before customization",
  "Live preview at every step",
  "Customization as an opt-in action",
  "Parity across email, text, and letter",
  "A mobile pattern that is not just a squeezed desktop",
];

export const CUT = [
  "Additional improvements I had scoped were deliberately left out",
  "The goal was a bare-bones update engineering could ship before my internship ended",
  "Shipping a smaller change that reached real users beat a larger one that stayed in Figma",
];

// Recordings of the shipped flows (animated WebP) and production screenshots.
export const DEMOS = [
  {
    image: {
      src: `${ASSETS}/demo-email-flow.webp`,
      width: 900,
      height: 494,
      alt: "Recording of the shipped email template selection and customization flow",
    },
    caption: "Demo · email template selection and customization",
  },
  {
    image: {
      src: `${ASSETS}/demo-text-flow.webp`,
      width: 900,
      height: 494,
      alt: "Recording of the shipped text template selection and customization flow",
    },
    caption: "Demo · text template selection and customization",
  },
];

export const PRODUCTION = [
  {
    image: {
      src: `${ASSETS}/production-email-gallery.jpg`,
      width: 1400,
      height: 769,
      alt: "Shipped email template gallery with live preview",
    },
    caption: "Production · email gallery",
  },
  {
    image: {
      src: `${ASSETS}/production-text-gallery.jpg`,
      width: 1400,
      height: 769,
      alt: "Shipped text template gallery with phone frame preview",
    },
    caption: "Production · text gallery",
  },
];
