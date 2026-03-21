import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdmissionUpload from "./pages/AdmissionUpload";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import "./App.css";
import AdmissionResult from "./pages/AdmissionResult";
import Analyzing from "./pages/Analyzing";
import Overview from "./pages/admin_pages/Overview";
import Applications from "./pages/admin_pages/Applications";
import ApplicationDetail from "./pages/admin_pages/ApplicationDetail";
import Degrees from './pages/admin_pages/Degrees';
import Intakes from './pages/admin_pages/Intakes';

function AuthLogoutListener() {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => navigate("/login");
    window.addEventListener("auth:logout", handler);
    return () => window.removeEventListener("auth:logout", handler);
  }, [navigate]);
  return null;
}

function App() {
  return (
    <Router>
      <AuthLogoutListener />
      <Routes>
        {/* ── Admin routes — DashboardLayout only, no Navbar/Footer ── */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="applications" element={<Applications />} />
          <Route path="applications/:applicationId" element={<ApplicationDetail />} />
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="degrees" element={<Degrees />} />
          <Route path="intakes" element={<Intakes />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

        {/* ── Public routes — MainLayout with Navbar/Footer ── */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<AdmissionUpload />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/result/:applicationId" element={<AdmissionResult />} />
          {/* <Route path="/result" element={<AdmissionResult />} /> */}
          <Route path="/not-qualified" element={<AdmissionResult />} />
          <Route path="/analyzing" element={<Analyzing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/exam" element={<ExamPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
