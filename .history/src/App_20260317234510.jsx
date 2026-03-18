import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdmissionUpload from './pages/AdmissionUpload';
import AboutUs from './pages/AboutUs';

import './App.css'; 


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<AdmissionUpload />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;