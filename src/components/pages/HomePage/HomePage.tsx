import React from 'react';
import { usePetrolData } from '../../../hooks/usePetrolData';
import { ProvinceSelector } from '../../petrol/ProvinceSelector';
import { MunicipalitySelector } from '../../petrol/MunicipalitySelector';
import { StationList } from '../../petrol/StationList';
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
                <div className="hero-section">
                    <h1 className="hero-title">
                        Encuentra las mejores ofertas de combustible
                    </h1>
                    <p className="hero-subtitle">
                        Compara precios de carburantes en estaciones de servicio.
                    </p>
                </div>

                <section className="search-section">
                    <div className="search-container">
                        <h2 className="search-title">Buscar gasolineras</h2>
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
                    </div>
                </section>

                {stations.length > 0 && (
                    <section className="results-section">
                        <StationList stations={stations} />
                    </section>
                )}
            </div>
        </div>
    );
};
