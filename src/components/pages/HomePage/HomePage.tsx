import React from 'react';
import { usePetrolData } from '../../../modules/petrol/hooks/usePetrolData';
import { ProvinceSelector } from '../../../modules/petrol/components/ProvinceSelector';
import { MunicipalitySelector } from '../../../modules/petrol/components/MunicipalitySelector';
import { StationList } from '../../../modules/petrol/components/StationList';
import './HomePage.css';

export const HomePage: React.FC = () => {
    const {
        provinces,
        municipalities,
        stations,
        selectedProvince,
        setSelectedProvince,
        selectedMunicipality,
        setSelectedMunicipality
    } = usePetrolData();

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Encuentra la Gasolinera más Barata</h1>
                        <p className="hero-subtitle">
                            Compara precios de combustible en tiempo real y ahorra en cada repostaje
                        </p>

                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">💰</div>
                                <h3>Precios Actualizados</h3>
                                <p>Información en tiempo real de todas las gasolineras</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">📍</div>
                                <h3>Ubicación Precisa</h3>
                                <p>Encuentra gasolineras cerca de tu ubicación</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">⚡</div>
                                <h3>Búsqueda Rápida</h3>
                                <p>Filtra por provincia y municipio fácilmente</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search Section */}
            <section className="search-section">
                <div className="container">
                    <h2>Buscar Gasolineras</h2>

                    <div className="search-controls">
                        <ProvinceSelector
                            provinces={provinces}
                            selectedId={selectedProvince}
                            onSelect={setSelectedProvince}
                        />

                        {selectedProvince && (
                            <MunicipalitySelector
                                municipalities={municipalities}
                                selectedId={selectedMunicipality}
                                onSelect={setSelectedMunicipality}
                            />
                        )}
                    </div>

                    {selectedMunicipality && stations.length > 0 && (
                        <div className="results-section">
                            <h3>Gasolineras Encontradas ({stations.length})</h3>
                            <StationList stations={stations} />
                        </div>
                    )}
                </div>
            </section>

            {/* Info Section */}
            <section className="info-section">
                <div className="container">
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>¿Por qué usar Zapetrol?</h3>
                            <ul>
                                <li>✓ Datos oficiales del Ministerio</li>
                                <li>✓ Actualización diaria de precios</li>
                                <li>✓ Interfaz simple y rápida</li>
                                <li>✓ Completamente gratuito</li>
                            </ul>
                        </div>

                        <div className="info-card">
                            <h3>Combustibles Disponibles</h3>
                            <ul>
                                <li>⛽ Gasolina 95</li>
                                <li>⛽ Gasolina 98</li>
                                <li>🚛 Diesel</li>
                                <li>🔋 Más tipos próximamente</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
