import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ThemeToggle } from '../../common/ThemeToggle/ThemeToggle';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo y nombre de la app */}
                <Link to="/" className="navbar-brand" onClick={closeMenu}>
                    <span className="logo">⛽</span>
                    <h2>Zapetrol</h2>
                </Link>

                {/* Botón hamburguesa para móvil */}
                <button
                    className="mobile-menu-toggle md:hidden"
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className={isMenuOpen ? 'rotate-90' : ''}
                    >
                        {isMenuOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <>
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </>
                        )}
                    </svg>
                </button>

                {/* Navegación principal */}
                <div className={`navbar-actions ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
                    <div className="navbar-links">
                        <ThemeToggle />

                        {isAuthenticated ? (
                            // Usuario autenticado
                            <>
                                <Link
                                    to="/dashboard"
                                    className="btn btn-outline-white"
                                    onClick={closeMenu}
                                >
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
                                <Link
                                    to="/login"
                                    className="btn btn-outline-white"
                                    onClick={closeMenu}
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-white"
                                    onClick={closeMenu}
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
