import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GradingInterface from './pages/GradingInterface';
import Attendance from './pages/Attendance';
import Courses from './pages/Courses';
import Resources from './pages/Resources';
import Events from './pages/Events';
import Messages from './pages/Messages';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              {/* Default route always goes to login */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/student" element={
                <ProtectedRoute role="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/faculty" element={
                <ProtectedRoute role="faculty">
                  <FacultyDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="/grading" element={
                <ProtectedRoute role="faculty">
                  <GradingInterface />
                </ProtectedRoute>
              } />
              
              <Route path="/attendance" element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              } />
              
              <Route path="/courses" element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              } />
              
              <Route path="/resources" element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              } />
              
              <Route path="/events" element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              } />

              <Route path="/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />

              {/* Catch all route redirects to root (which shows login) */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                className: 'dark:bg-gray-800 dark:text-white',
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;