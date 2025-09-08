/**
 * Componente principal de la aplicación
 * Configura el enrutamiento y los proveedores de contexto
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/layout/Navbar/Navbar';
import { HomePage } from './components/pages/HomePage/HomePage';
import { LoginPage } from './components/pages/LoginPage/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage/RegisterPage';
import { Dashboard } from './components/pages/Dashboard/Dashboard';
import { ProtectedRoute } from './components/common/ProtectedRoute/ProtectedRoute';
import './App.css';

// ===== COMPONENTES AUXILIARES =====

/**
 * Redirige usuarios autenticados desde páginas de auth
 */
const AuthRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

/**
 * Layout para páginas públicas con Navbar
 */
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

// ===== COMPONENTE PRINCIPAL =====
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="app">
            <Routes>
              {/* Páginas públicas con navegación */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <HomePage />
                  </PublicLayout>
                }
              />

              {/* Páginas de autenticación (sin navegación) */}
              <Route
                path="/login"
                element={
                  <AuthRedirect>
                    <LoginPage />
                  </AuthRedirect>
                }
              />

              <Route
                path="/register"
                element={
                  <AuthRedirect>
                    <RegisterPage />
                  </AuthRedirect>
                }
              />

              {/* Páginas protegidas */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback - redirigir a home */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
