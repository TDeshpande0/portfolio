import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import HomePage from "./pages/home/HomePage";
import DeltaCaseStudyPage from "./pages/work/delta-airlines-redesign/DeltaCaseStudyPage";
import { ROUTES } from "./routes";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.deltaCaseStudy} element={<DeltaCaseStudyPage />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Route>
    </Routes>
  );
}
