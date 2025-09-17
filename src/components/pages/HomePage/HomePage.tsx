import React from 'react';
import { usePetrolData } from '../../../hooks/usePetrolData';
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
        setSelectedMunicipality
    } = usePetrolData();

    const stats = {
        total: stations.length || 11500,
        averagePrice: '1.45�',
        cities: '8,000+'
    };

    return (
        <div className="homepage">
            <HeroSection />

            <StatsSection
                stats={stats}
                isLoading={false}
            />

            <FeaturesSection />

            <SearchSection
                provinces={provinces}
                municipalities={municipalities}
                selectedProvinceId={selectedProvince}
                selectedMunicipalityId={selectedMunicipality}
                stations={stations}
                isLoading={false}
                error={null}
                onProvinceSelect={setSelectedProvince}
                onMunicipalitySelect={setSelectedMunicipality}
            />

            <CTASection />
        </div>
    );
};
