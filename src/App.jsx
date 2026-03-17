import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdmissionUpload from './pages/AdmissionUpload';
import AdmissionNotQualified from './pages/AdmissionNotQualified';
import AboutUs from './pages/AboutUs';
import './App.css'; 


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<AdmissionUpload />} />
          <Route path="/not-qualified" element={<AdmissionNotQualified />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;