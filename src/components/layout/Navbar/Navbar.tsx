import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ThemeToggle } from '../../common/ThemeToggle/ThemeToggle';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo y nombre de la app */}
                <Link to="/" className="navbar-brand">
                    <span className="logo">⛽</span>
                    <h2>Zapetrol</h2>
                </Link>

                {/* Botones de autenticación o usuario */}
                <div className="navbar-actions">
                    <ThemeToggle />

                    {isAuthenticated ? (
                        // Usuario autenticado
                        <>
                            <Link to="/dashboard" className="btn btn-outline-white">
                                Dashboard
                            </Link>
                            <div className="user-menu">
                                <span className="user-greeting">Hola, {user?.name}</span>
                                <button
                                    className="btn btn-white"
                                    onClick={handleLogout}
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </>
                    ) : (
                        // Usuario no autenticado
                        <>
                            <Link to="/login" className="btn btn-outline-white">
                                Iniciar Sesión
                            </Link>
                            <Link to="/register" className="btn btn-white">
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
