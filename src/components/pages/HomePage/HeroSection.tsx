import React from 'react';

export const HeroSection: React.FC = () => {
    const scrollToSearch = () => {
        const searchSection = document.querySelector('.search-section');
        searchSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero-section">
            <div className="hero-particles"></div>
            <div className="hero-background">
                <div className="hero-content">
                    <div className="hero-badge animate-fade-in">
                        <span className="badge-icon">🇪🇸</span>
                        <span>Datos Oficiales del Gobierno de España</span>
                        <div className="badge-shine"></div>
                    </div>
                    <h1 className="hero-title animate-slide-up">
                        Encuentra las mejores
                        <span className="gradient-text"> gasolineras </span>
                        cerca de ti
                    </h1>
                    <p className="hero-subtitle animate-slide-up-delay">
                        Compara precios en tiempo real y ahorra en cada repostaje
                    </p>
                    <div className="hero-cta-group animate-slide-up-delay-2">
                        <button className="cta-primary" onClick={scrollToSearch}>
                            <span>Buscar Ahora</span>
                            <svg className="cta-arrow" viewBox="0 0 24 24">
                                <path d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                        </button>
                        <div className="hero-floating-card">
                            <div className="floating-card-content">
                                <div className="floating-icon">⛽</div>
                                <div className="floating-text">
                                    <span className="floating-number">+50,000</span>
                                    <span className="floating-label">Gasolineras</span>
                                </div>
                                <div className="floating-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};