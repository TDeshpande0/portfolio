// Structured data for the Delta Airlines case study.
// Images live in public/assets/case-studies/delta-airlines-redesign/. Persona photos are from Unsplash
// (free Unsplash License): Aisha by Christina @ wocintechchat.com, David by nrd (@nicotitto).

import {
  Accessibility,
  CircleDollarSign,
  Leaf,
  MousePointerClick,
} from "lucide-react";

const ASSETS = "/assets/case-studies/delta-airlines-redesign";

// Facts on the overview boarding pass: [label, value].
export const META = [
  ["Role", "UX / UI Designer"],
  ["Duration", "8 weeks"],
  ["Tools", "Figma, Sketch"],
  ["Target", "Frequent flyers"],
  ["Platform", "Web & mobile"],
  ["Team", "Solo project"],
];

// Route stops at the top of the page; each one scrolls to its section.
export const PHASES = [
  { label: "Empathize", href: "#empathize" },
  { label: "Define", href: "#define" },
  { label: "Ideate", href: "#ideate" },
  { label: "Prototype", href: "#prototype" },
  { label: "Test", href: "#test" },
];

export const COMPARISON_COLUMNS = [
  "Criteria",
  "Delta",
  "Emirates",
  "Qatar",
  "United",
];

// [criterion, Delta, Emirates, Qatar, United] — "yes" strong, "mid" partial, "no" weak.
export const COMPARISON_ROWS = [
  ["Navigation clarity", "mid", "yes", "yes", "mid"],
  ["Accessibility features", "no", "mid", "yes", "no"],
  ["Booking efficiency", "mid", "yes", "mid", "mid"],
  ["Visual design", "mid", "yes", "yes", "no"],
  ["Mobile experience", "no", "mid", "yes", "no"],
];

// The summary card under the header pass, revealed when it's peeled off.
export const SUMMARY = {
  title: "The short version",
  subtitle: "Delta Airlines · booking redesign",
  rows: [
    [
      "Problem",
      "Delta's booking flow overwhelmed first-time flyers with long forms, confusing seat selection, and accessibility options buried deep in the experience.",
    ],
    [
      "Approach",
      "Restructured the flow around three clear paths, cut booking from seven steps to four, and surfaced accessibility requests at the very first step instead of hiding them in settings.",
    ],
    [
      "Scope",
      "Desktop web, end to end: competitive analysis, user research, personas, information architecture, user flows, and low to high fidelity screens.",
    ],
    [
      "Role",
      "Solo designer across all phases, from research through a tested high-fidelity prototype.",
    ],
    [
      "Outcome",
      "Usability testing showed faster completion and accessibility options found without assistance. Self-directed project, not shipped.",
    ],
  ],
};

export const RESEARCH_GOALS = [
  "Identify pain points across the booking journey",
  "Understand how accessibility needs go unmet",
  "Benchmark against major competitor airlines",
];

export const METHODS = [
  "Competitive analysis of 4 major carriers",
  "User surveys (42 respondents)",
  "Affinity mapping & persona development",
];

// Sticky notes from affinity mapping.
export const AFFINITY = [
  "“Too many steps before I even see a price”",
  "Couldn’t find wheelchair assistance option",
  "Seat map is hard to read on mobile",
  "Wants clearer baggage fee breakdown",
  "Confused by add-on upsells",
  "Appreciates loyalty status being visible",
];

// `level` on each scale: 0 low, 1 moderate, 2 high. `on` marks a priority need that applies.
export const PERSONAS = [
  {
    name: "Aisha",
    role: "The environmentally conscious professional",
    photo: {
      src: `${ASSETS}/persona-aisha.jpg`,
      alt: "Portrait of a young woman with long dark hair",
    },
    quote:
      "I need to book flights that align with my environmental values while having all the information I need easily accessible.",
    needs: [
      { label: "Wheelchair access" },
      { label: "Boarding assistance" },
      { label: "Baggage policies" },
      { label: "Hearing support" },
    ],
    bio: "Aisha, a 31 year old environmental consultant, travels monthly for client meetings and conferences. She’s highly tech-savvy and prioritizes sustainable travel options. She occasionally experiences anxiety during travel and appreciates clear, detailed information upfront.",
    scales: [
      { label: "Tech exposure", level: 2 },
      { label: "Sustainability priority", level: 2 },
      { label: "Assistance needs", level: 0 },
    ],
    goals: [
      "Find flights with lowest carbon footprint",
      "Access detailed flight information easily",
      "Understand baggage policies clearly",
      "Book sustainability options when available",
      "Get comprehensive trip information in one place",
    ],
    frustrations: [
      "Limited information about flight environmental impact",
      "Scattered information about baggage and policies",
      "Overwhelming amount of scattered information",
      "No clear way to compare flight environmental impact",
      "Complex process for adding special requests",
    ],
  },
  {
    name: "David",
    role: "Retired assisted traveler",
    photo: {
      src: `${ASSETS}/persona-david.jpg`,
      alt: "Portrait of an older man in glasses and a brown hat",
    },
    quote:
      "I want to be able to book my own flights, but I need to be sure all our medical and accessibility needs will be met.",
    needs: [
      { label: "Wheelchair access", on: true },
      { label: "Boarding assistance" },
      { label: "Baggage policies" },
      { label: "Hearing support" },
    ],
    bio: "David, 67 year old retired high school teacher, travels 3-4 times yearly to visit his grandchildren and for medical appointments. He uses a wheelchair. He’s comfortable with basic computer tasks but gets overwhelmed by complex websites.",
    scales: [
      { label: "Tech exposure", level: 0 },
      { label: "Sustainability priority", level: 0 },
      { label: "Assistance needs", level: 2 },
    ],
    goals: [
      "Book flights with confidence without family help",
      "Easily request medical assistance",
      "Find and understand baggage rules for medical equipment",
      "Get clear confirmation of all special arrangements",
      "Access customer support when needed",
    ],
    frustrations: [
      "Difficulty locating accessibility options",
      "Complex navigation with too many steps",
      "Cluttered interfaces",
      "Hard to find information about medical equipment policies",
      "Uncertainty about assistance confirmation",
    ],
  },
];

export const FINDINGS = [
  {
    icon: CircleDollarSign,
    title: "Pricing transparency",
    text: "Hidden fees and unclear pricing were the most common complaints, affecting both frequent and occasional travelers.",
  },
  {
    icon: MousePointerClick,
    title: "Two different users",
    text: "Frequent travelers value a faster booking process, price stability, and advanced features, while occasional travelers struggle more with basic navigation and information overload.",
  },
  {
    icon: Accessibility,
    title: "Accessibility barriers",
    text: "Users who need special assistance reported difficulties in locating accessibility options, highlighting a need for better support and clearer accessibility features.",
  },
  {
    icon: Leaf,
    title: "Eco-friendly interest",
    text: "Most respondents would consider eco-friendly travel options if they were not more expensive.",
  },
];

export const USER_NEEDS = [
  "Clear, upfront pricing without hidden fees.",
  "Fast and efficient booking process for frequent travelers.",
  "Accessible features and support for users needing special assistance.",
  "Simple and intuitive navigation for non-tech-savvy users.",
  "Eco-friendly travel options that do not increase costs.",
];

export const USER_GOALS = [
  "Find and book flights easily without encountering hidden fees or confusing navigation",
  "Enjoy a streamlined booking process that caters to both frequent flyers’ need for efficiency and occasional travelers’ need for simplicity",
  "Propose design improvements to simplify the navigation and streamline the booking process.",
];

// Site map. `key` marks the pages this redesign focused on.
export const SITE_MAP = {
  root: "Delta Airlines Homepage",
  branches: [
    {
      label: "Travel Info",
      pages: [
        "Travel Planning Center",
        "Ticket changes/refunds",
        "Baggage",
        "Delta Sky Club",
        "Trip Protection",
      ],
    },
    {
      label: "Book",
      pages: ["Flight Search", "Hotels", "Cars", "Vacations"],
      key: ["Flight Search", "Hotels", "Cars", "Vacations"],
    },
    {
      label: "Help",
      pages: [
        "Help Center",
        "Accessible Travel Services",
        "Baggage & Travel Fees",
        "Children & Infant Travel",
        "Pet Travel on Delta",
        "FAQ’s",
        "Certificates, eCredits, or Delta Gift Cards",
      ],
    },
    {
      label: "My Trips",
      pages: ["Flight Status", "Trip Management"],
      key: ["Flight Status", "Trip Management"],
    },
    { label: "Check-in", pages: [] },
    {
      label: "SkyMiles",
      pages: [
        "Join SkyMiles",
        "My SkyMiles",
        "Manage Account",
        "Manage Certificates / e-gift cards",
      ],
      key: ["Join SkyMiles", "My SkyMiles"],
    },
  ],
};

export const WIREFRAMES = {
  src: `${ASSETS}/lofi-wireframes.jpg`,
  width: 1400,
  height: 662,
  alt: "Low fidelity wireframes: homepage, trip summary, seat map, passenger details, and fare summary",
};

export const LOGO = {
  src: `${ASSETS}/logo-lockups.jpg`,
  width: 311,
  height: 388,
  alt: "Delta logo lockups in four colourways",
};

export const NAV_BAR = {
  src: `${ASSETS}/nav-bar.jpg`,
  width: 1011,
  height: 58,
  alt: "Booking nav bar: Flights, Passengers, Seats, Add-ons, Payment",
};

export const PROMOS = [
  {
    src: `${ASSETS}/promo-delta-one.jpg`,
    width: 369,
    height: 481,
    alt: "Delta One promotional card",
  },
  {
    src: `${ASSETS}/promo-comfort-plus.jpg`,
    width: 369,
    height: 481,
    alt: "Delta Comfort+ promotional card",
  },
];

// Delta's own brand colours, shown as they are rather than in the site's palette.
export const SWATCHES = [
  "#11172B",
  "#C31256",
  "#0B1F66",
  "#4470C3",
  "#33798E",
  "#4A784A",
  "#BD591E",
  "#FFFFFF",
];

// [font, label, display size in px, weight]
export const TYPE_SCALE = [
  ["serif", "PT Serif Bold · 45", 38, 700],
  ["serif", "PT Serif Bold · 32", 27, 700],
  ["serif", "PT Serif Bold · 24", 20, 700],
  ["serif", "PT Serif Regular · 16", 14, 400],
  ["serif", "PT Serif Regular · 14", 12, 400],
  ["sans", "Fira Sans Regular · 36", 31, 400],
  ["sans", "Fira Sans Medium · 25", 21, 500],
  ["sans", "Fira Sans Regular · 20", 17, 400],
  ["sans", "Fira Sans Regular · 14", 12, 400],
  ["sans", "Fira Sans Bold · 12", 11, 700],
];

export const OBSERVATIONS = [
  "All participants completed booking in under 4 minutes",
  "Accessibility request found within 10 seconds by both relevant participants",
  "One participant missed the fare breakdown toggle",
];

export const RECOMMENDATIONS = [
  "Surface fare breakdown by default, not behind a toggle",
  "Add a confirmation microcopy after assistance requests",
  "Test seat map further on smaller viewports",
];
