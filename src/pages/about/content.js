// Content for the About page. Photos live in public/assets/about/.

const ASSETS = "/assets/about";

export const PORTRAIT = {
  src: `${ASSETS}/portrait.webp`,
  width: 540,
  height: 602,
  alt: "Tanvi Deshpande",
};

// "Route so far". `edu` marks education stops (filled gold dot).
export const TIMELINE = [
  {
    when: "Expected May 2027",
    what: "MS, Applied Cognition and Neuroscience, HCI",
    edu: true,
  },
  {
    when: "Summer 2026",
    what: "Product Design Intern, Blackhawk Network",
  },
  { when: "May 2025", what: "BS, Computer Science", edu: true },
  { when: "Summer 2024", what: "Intern, Emerson Automation Solutions" },
  { when: "Summer 2023", what: "Intern, Emerson Automation Solutions" },
];

export const DECLARATIONS = [
  "Phone storage full of food, landmarks, and aesthetics",
  "Digital camera, charged and loaded",
  "Every boarding pass and luggage tag, ever",
  "Color coded, fully planned itineraries",
  "One overpacked suitcase",
  "Snacks (non negotiable)",
];

export const FACTS = [
  {
    label: "Currently",
    value: "Open to work",
    text: "Looking for product and UX roles where I can own a problem from research through handoff.",
  },
  {
    label: "Background",
    value: "Computer science, turned design",
    text: "I think in visuals and in edge cases, I explore the odd solution before the obvious one, and I hand off work engineers can actually build.",
  },
  {
    label: "Studying",
    value: "Cognition and HCI",
    text: "Attention, memory, and decision making, applied to how people actually use interfaces.",
  },
];

// "Photo roll · from the trips": square, 620px.
export const TRIP_PHOTOS = [
  "Looking out over the bay from a waterfront pier, city towers behind",
  "Twin waterfalls pouring down a mossy rock face",
  "Taking in a deep green canyon from a lookout",
  "A clear green lake at the foot of a waterfall",
  "Waves breaking on dark rocks under a pale sky",
  "A volcano with its peak in the clouds, above green fields",
  "Canyon walls mirrored in still water",
].map((alt, i) => ({ src: `${ASSETS}/trip-${i + 1}.webp`, alt }));
