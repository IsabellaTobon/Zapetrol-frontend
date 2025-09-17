import React from 'react';

export const FeaturesSection: React.FC = () => {
    return (
        <section className="features-section">
            <div className="container">
                <div className="features-header animate-fade-in">
                    <h2 className="section-title">¿Por qué elegir Zapetrol?</h2>
                    <p className="section-subtitle">
                        Tu compañero inteligente para encontrar el combustible más barato
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-card animate-slide-up">
                        <div className="feature-icon-wrapper">
                            <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                    fill="currentColor" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Datos en Tiempo Real</h3>
                        <p className="feature-description">
                            Información actualizada directamente desde las fuentes oficiales del gobierno
                        </p>
                        <div className="feature-glow"></div>
                    </div>

                    <div className="feature-card animate-slide-up-delay">
                        <div className="feature-icon-wrapper">
                            <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"
                                    stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Búsqueda Inteligente</h3>
                        <p className="feature-description">
                            Encuentra gasolineras cerca de ti con filtros avanzados y mapas interactivos
                        </p>
                        <div className="feature-glow"></div>
                    </div>

                    <div className="feature-card animate-slide-up-delay-2">
                        <div className="feature-icon-wrapper">
                            <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Completamente Gratuito</h3>
                        <p className="feature-description">
                            Sin registros, sin pagos, sin restricciones. Acceso completo y gratuito
                        </p>
                        <div className="feature-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};