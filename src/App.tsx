import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/layout/Navbar/Navbar';
import { HomePage } from './components/pages/HomePage/HomePage';
import { LoginPage } from './components/pages/LoginPage/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage/RegisterPage';
import { Dashboard } from './components/pages/Dashboard/Dashboard';
import { ProtectedRoute } from './components/common/ProtectedRoute/ProtectedRoute';
import './App.css';

// Componente para redirigir usuarios autenticados desde login/register
const AuthRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            {/* Rutas públicas con Navbar */}
            <Route path="/" element={
              <>
                <Navbar />
                <HomePage />
              </>
            } />

            {/* Rutas de autenticación sin Navbar */}
            <Route path="/login" element={
              <AuthRedirect>
                <LoginPage />
              </AuthRedirect>
            } />

            <Route path="/register" element={
              <AuthRedirect>
                <RegisterPage />
              </AuthRedirect>
            } />

            {/* Rutas protegidas */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Ruta por defecto - redirigir a home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
