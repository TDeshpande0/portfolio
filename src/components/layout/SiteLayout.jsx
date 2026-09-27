import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { isCaseStudy, ROUTES } from "../../routes";
import FlightTransition from "../transition/FlightTransition";
import PassportTransition from "../transition/PassportTransition";
import BackToTop from "./BackToTop";

// Leaving a case study (or the About page) for the homepage: a navy circle closes over it, the
// homepage swaps in underneath (already scrolled to where you left it), and the navy fades away.
const RETURN = {
  close: 550,
  open: 450,
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
      (isCaseStudy(page.pathname) || page.pathname === ROUTES.about) &&
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
      // fill: hold the closed circle after it ends; otherwise it snaps back open for a frame
      // before the page swaps, flashing the case study
      { duration: RETURN.close, easing: RETURN.easing, fill: "forwards" },
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
    const el = cover.current;
    // The circle is closed, so the mask is no longer needed: a plain navy sheet fades more cleanly.
    el.style.webkitMask = "none";
    el.style.mask = "none";
    let active = true;
    let fade = null;
    // Wait for the homepage's first paint (heavy on phones) before fading, so the fade starts from
    // solid navy instead of the page appearing half-faded.
    const frame = (fn) => requestAnimationFrame(() => active && fn());
    frame(() =>
      frame(() => {
        fade = el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: RETURN.open,
          easing: "ease-in-out",
          fill: "forwards",
        });
        fade.finished.then(
          () => active && setCovered(false),
          () => {},
        );
      }),
    );
    return () => {
      active = false;
      fade?.cancel();
    };
  }, [covered, page.returning]);

  return (
    <div className="isolate overflow-x-hidden bg-kraft font-sans leading-[1.6] text-ink">
      <FlightTransition>
        <PassportTransition>
          {page.returning ? page.outlet : outlet}
        </PassportTransition>
      </FlightTransition>
      <BackToTop />
      {covered && (
        <div
          ref={cover}
          aria-hidden="true"
          className="flight-backdrop fixed inset-x-0 -bottom-60 -top-60 z-[9998] bg-navy-deep will-change-[opacity]"
          style={{ "--reveal-r": "9999px" }}
        />
      )}
    </div>
  );
}
