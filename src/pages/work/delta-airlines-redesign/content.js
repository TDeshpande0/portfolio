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

export const PHASES = ["Empathize", "Define", "Ideate", "Prototype", "Test"];

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
