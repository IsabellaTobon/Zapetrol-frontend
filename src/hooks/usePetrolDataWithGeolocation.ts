import { useState, useEffect } from 'react';
import type { Province, Municipality, PetrolStation } from '../types';
import {
    getPetrolProvinces,
    getPetrolMunicipalities,
    getPetrolStations,
    getStationsByCoordinates
} from '../services/petrolService';
import { useGeolocation } from './useGeolocation';

export const usePetrolDataWithGeolocation = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
    const [stations, setStations] = useState<PetrolStation[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
    const [selectedMunicipality, setSelectedMunicipality] = useState<number | null>(null);
    const [isLoadingStations, setIsLoadingStations] = useState(false);
    const [searchMode, setSearchMode] = useState<'manual' | 'location'>('manual');
    const [error, setError] = useState<string | null>(null);

    const geolocation = useGeolocation();

    // Charge provinces on mount
    useEffect(() => {
        const getProvinces = async () => {
            try {
                const provinces = await getPetrolProvinces();
                setProvinces(provinces);
            } catch (error) {
                setError('Error al cargar provincias');
            }
        };

        getProvinces();
    }, []);

    // Charge municipalities when a province is selected
    useEffect(() => {
        const getMunicipalities = async (provinceId: number) => {
            try {
                const municipalities = await getPetrolMunicipalities(provinceId);
                setMunicipalities(municipalities);
            } catch (error) {
                setError('Error al cargar municipios');
            }
        };

        if (selectedProvince !== null && searchMode === 'manual') {
            getMunicipalities(selectedProvince);
            setSelectedMunicipality(null);
            setStations([]);
        }
    }, [selectedProvince, searchMode]);

    // Charge petrol stations when a municipality is selected
    useEffect(() => {
        const getStations = async (municipalityId: number) => {
            try {
                setIsLoadingStations(true);
                setError(null);
                const stations = await getPetrolStations(municipalityId);
                setStations(stations);
            } catch (error) {
                setError('Error al cargar gasolineras');
            } finally {
                setIsLoadingStations(false);
            }
        };

        if (selectedMunicipality !== null && searchMode === 'manual') {
            getStations(selectedMunicipality);
        }
    }, [selectedMunicipality, searchMode]);

    // Search for nearby petrol stations when location is obtained
    useEffect(() => {
        const findNearbyStations = async () => {
            if (!geolocation.location || searchMode !== 'location') return;

            try {
                setIsLoadingStations(true);
                setError(null);

                // Use the new API for searching by coordinates
                const nearbyStations = await getStationsByCoordinates(
                    geolocation.location.latitude,
                    geolocation.location.longitude,
                    20 // Radius of 20km
                );

                setStations(nearbyStations);

                // If no stations were found, show a helpful message
                if (nearbyStations.length === 0) {
                    setError('No se encontraron gasolineras en un radio de 20km de tu ubicación');
                }

            } catch (error) {
                setError('No se pudieron cargar las gasolineras cercanas. Intenta con la búsqueda manual.');
            } finally {
                setIsLoadingStations(false);
            }
        };

        findNearbyStations();
    }, [geolocation.location, searchMode]);

    const handleLocationSearch = async () => {
        try {
            setError(null);
            await geolocation.getCurrentLocation();
            setSearchMode('location');
            // Clear manual selections
            setSelectedProvince(null);
            setSelectedMunicipality(null);
            setMunicipalities([]);
        } catch (error) {
            setError('Error al obtener la ubicación');
        }
    };

    const handleManualSearch = () => {
        setSearchMode('manual');
        setStations([]);
        setError(null);
        geolocation.clearLocation();
    };

    return {
        // Basic data
        provinces,
        municipalities,
        stations,

        // Manual selections
        selectedProvince,
        setSelectedProvince,
        selectedMunicipality,
        setSelectedMunicipality,

        // Geolocation
        geolocation,
        searchMode,

        // Loading and error states
        isLoadingStations,
        error,

        // Actions
        handleLocationSearch,
        handleManualSearch,
    };
};