import { Navigate, Route, Routes } from "react-router-dom";

import { LandingPage } from "./pages/landing-page";
import { NotFoundPage } from "./pages/not-found-page";
import { SupportPage } from "./pages/support-page";

// The privacy policy is the static page public/privacy-policy/index.html
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/more-info" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
