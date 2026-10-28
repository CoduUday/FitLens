import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AthleteDashboard from './pages/AthleteDashboard';
import LiveAnalysisWorkspace from './pages/LiveAnalysisWorkspace';
import SessionHistoryPage from './pages/SessionHistoryPage';
import SessionReportPage from './pages/SessionReportPage';
import ProfilePage from './pages/ProfilePage';
import CoachDashboard from './pages/CoachDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<AthleteDashboard />} />
        <Route path="/analysis" element={<LiveAnalysisWorkspace />} />
        <Route path="/history" element={<SessionHistoryPage />} />
        <Route path="/report/:id" element={<SessionReportPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/coach" element={<CoachDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
