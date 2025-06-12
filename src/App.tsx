import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { LoginPage, SignupPage } from "./pages/auth";
import { LandingPage, DiabetesTestPage, ResultPageLanding } from "./pages/landingPage";
import {
  DashboardLayout,
  DashboardHome,
  ProfilePage,
  SettingsPage,
  CheckPage,
  ResultPageDashboard,
} from "./pages/dashboard";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/test" element={<DiabetesTestPage />} />
          <Route path="/result" element={<ResultPageLanding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="check" element={<CheckPage />} />
              <Route path="result" element={<ResultPageDashboard />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
