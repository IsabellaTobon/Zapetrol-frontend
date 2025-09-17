import React from 'react';

export const CTASection: React.FC = () => {
    const scrollToSearch = () => {
        const searchSection = document.querySelector('.search-section');
        searchSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-content">
                    <div className="cta-background">
                        <div className="cta-particles"></div>
                        <div className="cta-glow"></div>
                    </div>

                    <div className="cta-inner">
                        <h2 className="cta-title animate-fade-in">
                            ¿Listo para ahorrar en combustible?
                        </h2>
                        <p className="cta-subtitle animate-fade-in-delay">
                            Únete a miles de usuarios que ya están ahorrando con Zapetrol
                        </p>

                        <div className="cta-actions animate-slide-up">
                            <button className="cta-button primary" onClick={scrollToSearch}>
                                <span>Empezar Ahora</span>
                                <svg className="cta-icon" viewBox="0 0 24 24">
                                    <path d="M5 12h14m-7-7 7 7-7 7" />
                                </svg>
                            </button>

                            <div className="cta-features">
                                <div className="cta-feature">
                                    <svg className="feature-check" viewBox="0 0 24 24">
                                        <path d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span>Sin registro</span>
                                </div>
                                <div className="cta-feature">
                                    <svg className="feature-check" viewBox="0 0 24 24">
                                        <path d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span>Completamente gratis</span>
                                </div>
                                <div className="cta-feature">
                                    <svg className="feature-check" viewBox="0 0 24 24">
                                        <path d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span>Datos actualizados</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};