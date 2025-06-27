// import SessionPage from "./pages/session-page"
import { Route, Routes } from "react-router-dom"

import ConfirmEmail from "./pages/confirm-page"
// import { ThemeProvider } from "./components/theme-provider"
import DoExercisePage from "./pages/do-exercise-page"
import ErrorBoundary from "./pages/error-boundary"
import { HistoryPage } from "./pages/history-page"
import MainPage from "./pages/main-page"
import NewType from "./pages/new-type"
import NotFoundPage from "./pages/no-found-page"
import OneExercise from "./pages/one-exercise"
import OneSession from "./pages/one-session"
import OneType from "./pages/one-type"
import ProfilePage from "./pages/profile-page"
import ProgramPage from "./pages/program-page"
import SettingsPage from "./pages/settings-page"
import AuthPage from "./pages/signup-page"
import StatsPage from "./pages/stats-page"
import TimerPage from "./pages/timer-page"
import TrophyPage from "./pages/trophy-page"
import TypesList from "./pages/types-list"
import HomePage from "./pages/home-page"
import IsAuthenticated from "./routing/is-authenticated"
import IsNotAuthenticated from "./routing/is-not-authenticated"
import PrivacyPolicyPage from "./pages/privacy-policy-page"
import MoreInfo from './pages/more-info';
import ResetPassword from "./pages/reset-password"

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Routes>
          {/* Auth Routes */}
          <Route element={<IsNotAuthenticated />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/more-info" element={<MoreInfo />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<IsAuthenticated />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/history/exercise/:exerciseId" element={<OneExercise />} />
            <Route path="/history/session/:sessionId" element={<OneSession />} />
            <Route path="/history/session/:sessionId/do-exercise" element={<DoExercisePage />} />
            <Route path="/profile/type" element={<TypesList />} />
            <Route path="/profile/type/:typeId" element={<OneType />} />
            <Route path="/profile/type/new-type" element={<NewType />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/stats" element={<StatsPage />} />
            <Route path="/profile/trophy" element={<TrophyPage />} />
            <Route path="/profile/timer" element={<TimerPage />} />
            <Route path="/profile/settings" element={<SettingsPage />} />
            <Route path="/profile/reset-password" element={<ResetPassword />} />
            <Route path="/profile/program" element={<ProgramPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
