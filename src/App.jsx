import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AnalysisPage from './pages/AnalysisPage';
import './App.css'; 

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<AnalysisPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;