import React from 'react';
import { ProvinceSelector } from '../../petrol/ProvinceSelector';
import { MunicipalitySelector } from '../../petrol/MunicipalitySelector';
import { StationList } from '../../petrol/StationList';
import { LocationButton } from '../../common/LocationButton/LocationButton';
import type { Province, Municipality, PetrolStation } from '../../../types';
import { formatDistance } from '../../../utils';

interface SearchSectionProps {
    provinces: Province[];
    municipalities: Municipality[];
    selectedProvinceId: number | null;
    selectedMunicipalityId: number | null;
    stations: (PetrolStation & { distance?: number })[];
    isLoading: boolean;
    error: string | null;
    searchMode: 'manual' | 'location';
    geolocation: {
        location: { latitude: number; longitude: number } | null;
        isLoading: boolean;
        error: string | null;
        isSupported: boolean;
    };
    onProvinceSelect: (id: number) => void;
    onMunicipalitySelect: (id: number) => void;
    onLocationSearch: () => void;
    onManualSearch: () => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
    provinces,
    municipalities,
    selectedProvinceId,
    selectedMunicipalityId,
    stations,
    isLoading,
    error,
    searchMode,
    geolocation,
    onProvinceSelect,
    onMunicipalitySelect,
    onLocationSearch,
    onManualSearch
}) => {
    return (
        <section className="search-section">
            <div className="container">
                <div className="search-wrapper">
                    <div className="search-header">
                        <h2 className="search-title">
                            <span className="search-icon">🔍</span>
                            Busca tu gasolinera ideal
                        </h2>
                        <p className="search-subtitle">
                            Encuentra las mejores opciones en tu área
                        </p>
                    </div>

                    <div className="search-form">
                        {/* Toggle entre búsqueda manual y por ubicación */}
                        <div className="search-mode-toggle">
                            <button
                                className={`mode-button ${searchMode === 'manual' ? 'active' : ''}`}
                                onClick={onManualSearch}
                            >
                                <svg className="mode-icon" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                        stroke="currentColor" strokeWidth="2" />
                                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                Búsqueda Manual
                            </button>
                            <button
                                className={`mode-button ${searchMode === 'location' ? 'active' : ''}`}
                                onClick={onLocationSearch}
                                disabled={!geolocation.isSupported}
                            >
                                <svg className="mode-icon" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                Por Ubicación
                            </button>
                        </div>

                        {searchMode === 'manual' ? (
                            <div className="search-steps">
                                <div className={`search-step ${selectedProvinceId ? 'completed' : 'active'}`}>
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <div className="step-label">Provincia</div>
                                        <ProvinceSelector
                                            provinces={provinces}
                                            selectedId={selectedProvinceId}
                                            onSelect={onProvinceSelect}
                                        />
                                    </div>
                                </div>

                                <div className={`search-step ${selectedMunicipalityId ? 'completed' : selectedProvinceId ? 'active' : 'disabled'}`}>
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <div className="step-label">Municipio</div>
                                        <MunicipalitySelector
                                            municipalities={municipalities}
                                            selectedId={selectedMunicipalityId}
                                            onSelect={onMunicipalitySelect}
                                        />
                                    </div>
                                </div>

                                <div className={`search-step ${stations.length > 0 ? 'completed' : 'disabled'}`}>
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <div className="step-label">Resultados</div>
                                        <div className="step-info">
                                            {isLoading ? 'Buscando...' :
                                                stations.length > 0 ? `${stations.length} gasolineras encontradas` :
                                                    'Selecciona ubicación'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="location-search">
                                <LocationButton
                                    onLocationRequest={onLocationSearch}
                                    isLoading={geolocation.isLoading}
                                    hasLocation={!!geolocation.location}
                                    error={geolocation.error}
                                    isSupported={geolocation.isSupported}
                                />
                                {geolocation.location && (
                                    <div className="location-info">
                                        <svg className="location-check" viewBox="0 0 24 24" fill="none">
                                            <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                        <span>
                                            Mostrando gasolineras cercanas a tu ubicación
                                            {stations.length > 0 && ` (${stations.length} encontradas)`}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {(selectedProvinceId || selectedMunicipalityId || stations.length > 0 || isLoading || error || geolocation.location) && (
                        <div className="search-results">
                            {searchMode === 'location' && stations.length > 0 && (
                                <div className="results-header">
                                    <h3>🎯 Gasolineras más cercanas</h3>
                                    <span className="results-subtitle">Ordenadas por distancia</span>
                                </div>
                            )}
                            <StationList
                                stations={stations.map(station => ({
                                    ...station,
                                    distanceText: station.distancia ? formatDistance(station.distancia) : undefined
                                }))}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};