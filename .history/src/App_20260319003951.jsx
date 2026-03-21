import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdmissionUpload from './pages/AdmissionUpload';
import AboutUs from './pages/AboutUs';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css'; 
import AdmissionResult from './pages/AdmissionResult';


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<AdmissionUpload />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/result/:applicationId" element={<AdmissionResult />} />
          <Route path="/result" element={<AdmissionResult />} />
          <Route path="/not-qualified" element={<AdmissionResult />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about" element={<AboutUs />} />

        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;