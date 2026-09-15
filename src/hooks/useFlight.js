import { createContext, useContext } from "react";

export const FlightContext = createContext(null);

// Returns flyTo(path): plays the plane transition, then navigates to `path`.
export function useFlight() {
  return useContext(FlightContext);
}
