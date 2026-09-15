import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FlightProvider from "./FlightProvider";

// Wraps every page: the .tp style root, the plane transition, and scroll handling.
export default function SiteLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="tp">
      <FlightProvider>
        <Outlet />
      </FlightProvider>
    </div>
  );
}
