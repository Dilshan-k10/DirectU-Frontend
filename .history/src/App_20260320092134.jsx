import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdmissionUpload from './pages/AdmissionUpload';
import AboutUs from './pages/AboutUs';
import Register from './pages/Register';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import './App.css'; 
import AdmissionResult from './pages/AdmissionResult';
import Analyzing from './pages/Analyzing';


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
      <MainLayout>
        <Routes>
          <Route path="/" element={<AdmissionUpload />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/result/:applicationId" element={<AdmissionResult />} />
          <Route path="/result" element={<AdmissionResult />} />
          <Route path="/not-qualified" element={<AdmissionResult />} />
          <Route path="/analyzing" element={<Analyzing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />


          
        </Routes>
      </MainLayout>
      
    </Router>
  );
}

export default App;
