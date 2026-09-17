import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { isCaseStudy, ROUTES } from "../../routes";
import FlightTransition from "../transition/FlightTransition";
import BackToTop from "./BackToTop";

// Leaving a case study for the homepage: a navy circle closes over the case study, the homepage
// swaps in underneath (already scrolled to the work section), and the navy fades away.
const RETURN = {
  close: 550,
  open: 350,
  easing: "cubic-bezier(.6,0,.4,1)",
};

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Wraps every page: base colours and type, the page transitions, and scroll handling.
export default function SiteLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const cover = useRef(null);

  // The page on screen. Going back to the homepage from a case study (the back link, the browser's
  // Back button or a swipe) keeps the case study up until the navy circle has closed over it.
  const [page, setPage] = useState({
    pathname: location.pathname,
    outlet,
    returning: false,
  });
  const [covered, setCovered] = useState(false);

  if (page.pathname !== location.pathname) {
    const returning =
      isCaseStudy(page.pathname) &&
      location.pathname === ROUTES.home &&
      !prefersReducedMotion();
    setPage({
      pathname: location.pathname,
      outlet: returning ? page.outlet : outlet,
      returning,
    });
    if (returning) setCovered(true);
  }

  // Scrolling is handled here (hash links, new pages start at the top), not by the browser.
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  // Layout effect so the new page is scrolled into place before it's first painted.
  useLayoutEffect(() => {
    if (page.returning) return;
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, page.returning]);

  // 1. Close the circle over the case study, then swap in the homepage.
  useEffect(() => {
    if (!page.returning) return;
    const el = cover.current;
    const reach = Math.hypot(innerWidth / 2, innerHeight / 2) + 40;
    const close = el.animate(
      [{ "--reveal-r": `${reach}px` }, { "--reveal-r": "0px" }],
      { duration: RETURN.close, easing: RETURN.easing },
    );
    let active = true;
    close.finished.then(
      () => {
        if (!active) return;
        el.style.setProperty("--reveal-r", "0px");
        setPage((current) => ({ ...current, returning: false }));
      },
      () => {},
    );
    return () => {
      active = false;
      close.cancel();
    };
  }, [page.returning]);

  // 2. With the homepage in place underneath, fade the navy away.
  useEffect(() => {
    if (!covered || page.returning) return;
    const fade = cover.current.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: RETURN.open,
      easing: "ease-out",
      fill: "forwards",
    });
    let active = true;
    fade.finished.then(
      () => active && setCovered(false),
      () => {},
    );
    return () => {
      active = false;
      fade.cancel();
    };
  }, [covered, page.returning]);

  return (
    <div className="overflow-x-hidden bg-kraft font-sans leading-[1.6] text-ink">
      <FlightTransition>
        {page.returning ? page.outlet : outlet}
      </FlightTransition>
      <BackToTop />
      {covered && (
        <div
          ref={cover}
          aria-hidden="true"
          className="flight-backdrop fixed inset-0 z-[9998] bg-navy-deep"
          style={{ "--reveal-r": "9999px" }}
        />
      )}
    </div>
  );
}
