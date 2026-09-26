import { createContext, useContext } from "react";

export const PassportContext = createContext(null);

// Returns openPassport(passportElement): plays the passport transition, then opens the About page.
export function usePassport() {
  return useContext(PassportContext);
}
