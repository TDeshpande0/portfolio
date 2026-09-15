import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlightContext } from "../../hooks/useFlight";
import PlaneMark from "../illustrations/PlaneMark";

const FLIGHT_MS = 2600;
// Matches the overlay's `animate-fade` duration (tailwind.config.js), plus a frame of margin.
const OVERLAY_OPAQUE_MS = 270;

// Provides flyTo(path) to the app and renders the "now boarding" overlay while it plays.
export default function FlightProvider({ children }) {
  const navigate = useNavigate();
  const [flying, setFlying] = useState(false);

  const flyTo = (path) => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      navigate(path);
      return;
    }
    setFlying(true);
    // Swap pages as soon as the overlay fully covers the screen, so the destination
    // renders behind the plane and is ready the moment the overlay lifts.
    window.setTimeout(() => navigate(path), OVERLAY_OPAQUE_MS);
    window.setTimeout(() => setFlying(false), FLIGHT_MS);
  };

  return (
    <FlightContext.Provider value={flyTo}>
      {children}
      {flying && (
        <div
          className="fixed inset-0 z-[9999] flex animate-fade items-center justify-center bg-navy-deep"
          role="status"
          aria-live="polite"
        >
          <div className="absolute inset-x-0 top-1/2 h-[2px] bg-[repeating-linear-gradient(90deg,theme(colors.gold)_0_10px,transparent_10px_20px)] opacity-50" />
          <PlaneMark className="absolute top-1/2 h-[70px] w-[70px] animate-flyacross" />
          <div className="absolute bottom-[60px] animate-fadein font-mono text-[12px] tracking-[3px] text-kraft opacity-0">
            NOW BOARDING · CASE STUDY
          </div>
        </div>
      )}
    </FlightContext.Provider>
  );
}
