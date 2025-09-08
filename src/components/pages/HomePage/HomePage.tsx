import React from 'react';
import { usePetrolData } from '../../../hooks/usePetrolData';
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
            <div className="space-y-12">
                {/* Hero Section */}
                <div className="hero-section">
                    <h1 className="hero-title">
                        Encuentra las mejores
                        <span className="hero-title-accent">ofertas de combustible</span>
                    </h1>
                    <p className="hero-subtitle">
                        Compara precios de carburantes en estaciones de servicio cercanas.
                        Información actualizada del Ministerio de Industria, Comercio y Turismo.
                    </p>
                </div>

                {/* Search Form */}
                <section className="search-section">
                    <div className="search-container">
                        <h2 className="search-title">Buscar Gasolineras</h2>

                        <div className="search-form">
                            <div className="search-controls">
                                <ProvinceSelector
                                    provinces={provinces}
                                    selectedId={selectedProvince}
                                    onSelect={setSelectedProvince}
                                    label="Selecciona tu provincia"
                                    disabled={provinces.length === 0}
                                />

                                <MunicipalitySelector
                                    municipalities={municipalities}
                                    selectedId={selectedMunicipality}
                                    onSelect={setSelectedMunicipality}
                                    label="Selecciona tu municipio"
                                    disabled={!selectedProvince || municipalities.length === 0}
                                />
                            </div>

                            {selectedMunicipality && stations.length > 0 && (
                                <div className="results-section">
                                    <h3 className="results-title">
                                        Gasolineras Encontradas ({stations.length})
                                    </h3>
                                    <StationList stations={stations} />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon feature-icon-blue">
                            <svg className="feature-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Ubicación Precisa</h3>
                        <p className="feature-description">
                            Selecciona tu provincia y municipio para encontrar las estaciones más cercanas a ti.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon feature-icon-green">
                            <svg className="feature-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Precios Actualizados</h3>
                        <p className="feature-description">
                            Información en tiempo real de los precios de gasolina, diésel y otros carburantes.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon feature-icon-yellow">
                            <svg className="feature-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Comparación Inteligente</h3>
                        <p className="feature-description">
                            Compara precios fácilmente y encuentra la mejor opción para tu repostaje.
                        </p>
                    </div>
                </div>

                {/* How it works Section */}
                <div className="info-section">
                    <div className="info-container">
                        <h2 className="info-title">
                            ¿Cómo funciona?
                        </h2>
                        <div className="info-grid">
                            <div className="info-column">
                                <h3 className="step-title">
                                    1. Selecciona tu ubicación
                                </h3>
                                <p className="step-description">
                                    Elige tu provincia y municipio para encontrar
                                    las estaciones más cercanas a ti.
                                </p>
                                <h3 className="step-title">
                                    2. Compara precios
                                </h3>
                                <p className="step-description">
                                    Visualiza los precios de gasolina 95, gasolina 98, diésel y otros
                                    carburantes en todas las estaciones de la zona.
                                </p>
                            </div>
                            <div className="info-column">
                                <h3 className="step-title">
                                    3. Encuentra la mejor opción
                                </h3>
                                <p className="step-description">
                                    Filtra por distancia, tipo de combustible o precio para encontrar
                                    la estación que mejor se adapte a tus necesidades.
                                </p>
                                <h3 className="step-title">
                                    4. Obtén información detallada
                                </h3>
                                <p className="step-description">
                                    Accede a horarios, servicios disponibles y la última actualización
                                    de precios de cada estación.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Source */}
                <div className="data-source-section">
                    <h2 className="data-source-title">
                        Datos oficiales
                    </h2>
                    <p className="data-source-description">
                        Todos los precios provienen de la API oficial del Ministerio de Industria,
                        Comercio y Turismo del Gobierno de España. La información se actualiza
                        regularmente para garantizar la máxima precisión.
                    </p>
                    <div className="data-source-link">
                        <a
                            href="https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="api-link"
                        >
                            <svg className="api-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Ver API oficial
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
