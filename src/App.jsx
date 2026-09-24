import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import HomePage from "./pages/home/HomePage";
import CampaignsCaseStudyPage from "./pages/work/tango-reward-campaigns/CampaignsCaseStudyPage";
import DeltaCaseStudyPage from "./pages/work/delta-airlines-redesign/DeltaCaseStudyPage";
import TangoCaseStudyPage from "./pages/work/tango-portal/TangoCaseStudyPage";
import { ROUTES } from "./routes";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.tangoCaseStudy} element={<TangoCaseStudyPage />} />
        <Route
          path={ROUTES.campaignsCaseStudy}
          element={<CampaignsCaseStudyPage />}
        />
        <Route path={ROUTES.deltaCaseStudy} element={<DeltaCaseStudyPage />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Route>
    </Routes>
  );
}
