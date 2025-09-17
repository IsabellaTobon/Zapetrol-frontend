import React from 'react';
import { ProvinceSelector } from '../../petrol/ProvinceSelector';
import { MunicipalitySelector } from '../../petrol/MunicipalitySelector';
import { StationList } from '../../petrol/StationList';
import type { Province, Municipality, PetrolStation } from '../../../types';

interface SearchSectionProps {
    provinces: Province[];
    municipalities: Municipality[];
    selectedProvinceId: number | null;
    selectedMunicipalityId: number | null;
    stations: PetrolStation[];
    isLoading: boolean;
    error: string | null;
    onProvinceSelect: (id: number) => void;
    onMunicipalitySelect: (id: number) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
    provinces,
    municipalities,
    selectedProvinceId,
    selectedMunicipalityId,
    stations,
    isLoading,
    error,
    onProvinceSelect,
    onMunicipalitySelect
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
                    </div>

                    {(selectedProvinceId || selectedMunicipalityId || stations.length > 0 || isLoading || error) && (
                        <div className="search-results">
                            <StationList
                                stations={stations}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};