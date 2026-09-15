import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FlightProvider from "./FlightProvider";

// Wraps every page: base colours and type, the plane transition, and scroll handling.
export default function SiteLayout() {
  const { pathname, hash } = useLocation();

  // Layout effect so the new page is scrolled into place before it's first painted.
  useLayoutEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="overflow-x-hidden bg-kraft font-sans leading-[1.6] text-ink">
      <FlightProvider>
        <Outlet />
      </FlightProvider>
    </div>
  );
}
