// Click handler for in-page links (href="#section"): smooth-scrolls to the section instead of
// jumping. It updates the URL's hash without telling the router, since a hash change would re-run
// the layout's own (instant) scroll handling on top of this one. Honours reduced motion.
const behavior = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

export function scrollToHash(e, href) {
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: behavior() });
  window.history.replaceState(null, "", href);
}

// Same, for a link back to the top of the page: scrolls up and clears the hash from the URL.
export function scrollToTop(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: behavior() });
  window.history.replaceState(null, "", window.location.pathname);
}
