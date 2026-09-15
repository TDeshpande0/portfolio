import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlightContext } from "../../hooks/useFlight";
import PlaneMark from "../illustrations/PlaneMark";
import "./FlightOverlay.css";

const FLIGHT_MS = 2600;

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
    window.setTimeout(() => {
      navigate(path);
      setFlying(false);
    }, FLIGHT_MS);
  };

  return (
    <FlightContext.Provider value={flyTo}>
      {children}
      {flying && (
        <div className="fly" role="status" aria-live="polite">
          <div className="track" />
          <PlaneMark className="plane" />
          <div className="label">NOW BOARDING · CASE STUDY</div>
        </div>
      )}
    </FlightContext.Provider>
  );
}
