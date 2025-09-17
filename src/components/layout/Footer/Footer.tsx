import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-section footer-brand">
                        <div className="footer-logo">
                            <h3 className="footer-brand-name">⛽ Zapetrol</h3>
                            <p className="footer-brand-tagline">
                                Tu comparador de precios de combustible de confianza
                            </p>
                        </div>
                        <p className="footer-description">
                            Encuentra las mejores ofertas de gasolina y diésel cerca de ti.
                            Datos oficiales del Ministerio de Industria, Comercio y Turismo.
                        </p>
                        <div className="footer-social">
                            <a href="https://github.com/IsabellaTobon/Zapetrol-frontend"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="GitHub">
                                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="mailto:info@zapetrol.com"
                                className="social-link"
                                aria-label="Email">
                                <svg className="social-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">Enlaces Rápidos</h4>
                        <ul className="footer-links">
                            <li><a href="/" className="footer-link">Inicio</a></li>
                            <li><a href="/dashboard" className="footer-link">Dashboard</a></li>
                            <li><a href="#search" className="footer-link">Buscar Gasolineras</a></li>
                            <li><a href="#about" className="footer-link">Cómo Funciona</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">Recursos</h4>
                        <ul className="footer-links">
                            <li>
                                <a href="https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link">
                                    API Oficial
                                </a>
                            </li>
                            <li><a href="#privacy" className="footer-link">Política de Privacidad</a></li>
                            <li><a href="#terms" className="footer-link">Términos de Uso</a></li>
                            <li><a href="#help" className="footer-link">Ayuda</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">Información</h4>
                        <div className="footer-info">
                            <div className="info-item">
                                <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Datos actualizados cada 30 minutos</span>
                            </div>
                            <div className="info-item">
                                <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Información verificada oficialmente</span>
                            </div>
                            <div className="info-item">
                                <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Cobertura nacional completa</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <div className="footer-copyright">
                            <p>© {currentYear} Zapetrol. Todos los derechos reservados.</p>
                            <p className="footer-disclaimer">
                                Los precios mostrados provienen de fuentes oficiales del Gobierno de España.
                            </p>
                        </div>
                        <div className="footer-badges">
                            <div className="badge">
                                <span className="badge-text">🇪🇸 Datos Oficiales</span>
                            </div>
                            <div className="badge">
                                <span className="badge-text">⚡ Tiempo Real</span>
                            </div>
                            <div className="badge">
                                <span className="badge-text">🔒 Seguro</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};