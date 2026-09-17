// Structured data for the Delta Airlines case study.

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
