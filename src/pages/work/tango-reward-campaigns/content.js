// Structured content for the Tango Portal reward campaigns (brand collections) case study.
// Images live in public/assets/case-studies/tango-reward-campaigns/. To swap a picture, replace the
// file (keeping its name) or point `src` at a new file; update width/height to the new image's size.

const ASSETS = "/assets/case-studies/tango-reward-campaigns";

// Facts on the header's boarding pass: [label, value].
export const META = [
  ["Role", "Product Design Intern"],
  ["Company", "Blackhawk Network, Tango Portal"],
  ["Timeline", "May to August 2026"],
  ["Manager", "Ryan Gilsdorf"],
  ["Platform", "Desktop web"],
  ["Feature", "Brand collections"],
];

// The back of the header pass, shown when it's flipped over.
export const SUMMARY = {
  title: "The short version",
  subtitle: "Tango Portal campaigns · brand collections",
  rows: [
    [
      "Problem",
      "Multi-brand rewards like Reward Link US carry up to 1,619 brands, and campaigns could only send all of them. Senders had no way to offer a curated set.",
    ],
    [
      "Approach",
      "Introduced brand collections: send every brand, hand-pick a subset, or apply a saved collection that can be reused across campaigns.",
    ],
    [
      "Constraint",
      "Stay consistent with the rest of the portal. Bolder concepts were set aside in favor of a pattern that fit existing pages.",
    ],
    [
      "Role",
      "Sole designer on this feature, within a shared page other designers were also working on.",
    ],
    [
      "Status",
      "Final design complete. Handoff to engineering follows once the other sections of the page are finished.",
    ],
  ],
};

// Route-bar stops. `href` points at the id of the section each one covers.
export const PHASES = [
  { label: "DISCOVER", href: "#discover" },
  { label: "DEFINE", href: "#define" },
  { label: "DESIGN", href: "#design" },
  { label: "ITERATE", href: "#iterate" },
  { label: "HANDOFF", href: "#handoff" },
];

export const BEFORE = [
  "Multi-brand rewards sent every brand in the catalog",
  "No way to select a subset of brands",
  "No way to reuse a set of brands across campaigns",
];

export const AFTER = [
  "Senders choose all brands or a curated subset",
  "Selected count and brand preview visible at a glance",
  "Saved collections reusable across campaigns",
];

export const FLOW_STEPS = [
  { label: "Step 1", name: "Campaign details" },
  { label: "Step 2", name: "Choose reward" },
  { label: "Step 3 · my feature", name: "Brand collections", mine: true },
  { label: "Step 4", name: "Values and delivery" },
];

const option = (file, alt) => ({
  src: `${ASSETS}/${file}`,
  width: 948,
  height: 370,
  alt,
});

export const OPTIONS = [
  {
    number: "option 01",
    title: "All brands",
    text: "The default. Every brand in the reward's catalog is available to recipients, matching the previous behavior.",
    image: option(
      "brands-all.jpg",
      "Brand collections set to All brands, showing 1619 brands selected",
    ),
  },
  {
    number: "option 02",
    title: "Custom selection",
    text: "The sender hand-picks brands in the browser. The card updates to show the selection against the total, such as 1,000 of 1,619.",
    image: option(
      "brands-custom.jpg",
      "Brand collections showing 1000 of 1619 brands selected",
    ),
  },
  {
    number: "option 03",
    title: "Saved collection",
    text: "A previously saved set, like a new hire welcome kit, applied in one step and reusable across future campaigns.",
    image: option(
      "brands-saved-collection.jpg",
      "Brand collections with the New hire welcome kit saved collection applied",
    ),
  },
];

export const SAVED_DROPDOWN = {
  src: `${ASSETS}/saved-collections-dropdown.jpg`,
  width: 948,
  height: 704,
  alt: "Saved brand collections dropdown listing New hire welcome kit, Q2 Incentives, Customer Appreciation, and Coffee and Lunch Run",
};

export const PORTAL_URL = "portal.tangocard.com";

export const CAMPAIGN_PAGE = {
  src: `${ASSETS}/new-campaign-page.jpg`,
  width: 1300,
  height: 1240,
  alt: "The full New Campaign page with campaign details, order configuration, brand collections, reward value, and delivery options",
};

export const CUSTOM_SELECTION_PAGE = {
  src: `${ASSETS}/new-campaign-custom-selection.jpg`,
  width: 1300,
  height: 1240,
  alt: "New Campaign page with a custom brand selection of 1000 of 1619 brands",
};

export const KEPT = [
  "An All brands / saved collection toggle built from existing controls",
  "A summary card showing count and logo preview",
  "A searchable saved collections list with brand count and region",
  "A cleaner layout for the surrounding order configuration",
];

export const SET_ASIDE = [
  "More distinctive concepts that introduced new patterns",
  "Anything that would have required matching changes across other pages",
  "Those ideas remain options if the portal's design system evolves",
];
