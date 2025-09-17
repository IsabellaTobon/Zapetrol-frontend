import React from 'react';

interface StatsData {
    total: number;
    averagePrice: string;
    cities: string;
}

interface StatsProps {
    stats: StatsData;
    isLoading: boolean;
}

export const StatsSection: React.FC<StatsProps> = ({ stats, isLoading }) => {
    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-content">
                    <div className="stats-card animate-slide-up">
                        <div className="stat-icon-wrapper">
                            <svg className="stat-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">
                                {isLoading ? '...' : stats.total.toLocaleString()}
                            </div>
                            <div className="stat-label">Gasolineras Activas</div>
                        </div>
                        <div className="stat-glow"></div>
                    </div>

                    <div className="stats-card animate-slide-up-delay">
                        <div className="stat-icon-wrapper">
                            <svg className="stat-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2v20m0-20 7 7m-7-7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">
                                {isLoading ? '...' : stats.averagePrice}
                            </div>
                            <div className="stat-label">Precio Promedio</div>
                        </div>
                        <div className="stat-glow"></div>
                    </div>

                    <div className="stats-card animate-slide-up-delay-2">
                        <div className="stat-icon-wrapper">
                            <svg className="stat-icon" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">
                                {isLoading ? '...' : stats.cities}
                            </div>
                            <div className="stat-label">Ciudades Cubiertas</div>
                        </div>
                        <div className="stat-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};