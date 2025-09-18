import React from 'react';
import { usePetrolDataWithGeolocation } from '../../../hooks/usePetrolDataWithGeolocation';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { FeaturesSection } from './FeaturesSection';
import { SearchSection } from './SearchSection';
import { CTASection } from './CTASection';
import './HomePage.css';

export const HomePage: React.FC = () => {
    const {
        provinces,
        municipalities,
        stations,
        selectedProvince,
        setSelectedProvince,
        selectedMunicipality,
        setSelectedMunicipality,
        geolocation,
        searchMode,
        isLoadingStations,
        error,
        handleLocationSearch,
        handleManualSearch
    } = usePetrolDataWithGeolocation();

    const stats = {
        total: stations.length || 11500,
        averagePrice: '1.45€',
        cities: '8,000+'
    };

    return (
        <div className="homepage">
            <HeroSection />

            <StatsSection
                stats={stats}
                isLoading={isLoadingStations}
            />

            <FeaturesSection />

            <SearchSection
                provinces={provinces}
                municipalities={municipalities}
                selectedProvinceId={selectedProvince}
                selectedMunicipalityId={selectedMunicipality}
                stations={stations}
                isLoading={isLoadingStations}
                error={error}
                searchMode={searchMode}
                geolocation={geolocation}
                onProvinceSelect={setSelectedProvince}
                onMunicipalitySelect={setSelectedMunicipality}
                onLocationSearch={handleLocationSearch}
                onManualSearch={handleManualSearch}
            />

            <CTASection />
        </div>
    );
};
