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

    // Cargar provincias al inicio
    useEffect(() => {
        const getProvinces = async () => {
            try {
                const provinces = await getPetrolProvinces();
                setProvinces(provinces);
            } catch (error) {
                console.error('Error al cargar provincias:', error);
                setError('Error al cargar provincias');
            }
        };

        getProvinces();
    }, []);

    // Cargar municipios cuando se selecciona una provincia
    useEffect(() => {
        const getMunicipalities = async (provinceId: number) => {
            try {
                const municipalities = await getPetrolMunicipalities(provinceId);
                setMunicipalities(municipalities);
            } catch (error) {
                console.error('Error al cargar municipios:', error);
                setError('Error al cargar municipios');
            }
        };

        if (selectedProvince !== null && searchMode === 'manual') {
            getMunicipalities(selectedProvince);
            setSelectedMunicipality(null);
            setStations([]);
        }
    }, [selectedProvince, searchMode]);

    // Cargar gasolineras cuando se selecciona un municipio
    useEffect(() => {
        const getStations = async (municipalityId: number) => {
            try {
                setIsLoadingStations(true);
                setError(null);
                const stations = await getPetrolStations(municipalityId);
                setStations(stations);
            } catch (error) {
                console.error('Error al cargar gasolineras:', error);
                setError('Error al cargar gasolineras');
            } finally {
                setIsLoadingStations(false);
            }
        };

        if (selectedMunicipality !== null && searchMode === 'manual') {
            getStations(selectedMunicipality);
        }
    }, [selectedMunicipality, searchMode]);

    // Buscar gasolineras cercanas cuando se obtiene la ubicación
    useEffect(() => {
        const findNearbyStations = async () => {
            if (!geolocation.location || searchMode !== 'location') return;

            try {
                setIsLoadingStations(true);
                setError(null);

                // Usar la nueva API de búsqueda por coordenadas
                const nearbyStations = await getStationsByCoordinates(
                    geolocation.location.latitude,
                    geolocation.location.longitude,
                    20 // Radio de 20km
                );

                setStations(nearbyStations);

                // Si no se encontraron estaciones, mostrar un mensaje útil
                if (nearbyStations.length === 0) {
                    setError('No se encontraron gasolineras en un radio de 20km de tu ubicación');
                }

            } catch (error) {
                console.error('Error al buscar gasolineras cercanas:', error);
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
            // Limpiar selecciones manuales
            setSelectedProvince(null);
            setSelectedMunicipality(null);
            setMunicipalities([]);
        } catch (error) {
            console.error('Error al obtener ubicación:', error);
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
        // Datos básicos
        provinces,
        municipalities,
        stations,

        // Selecciones manuales
        selectedProvince,
        setSelectedProvince,
        selectedMunicipality,
        setSelectedMunicipality,

        // Geolocalización
        geolocation,
        searchMode,

        // Estados de carga y error
        isLoadingStations,
        error,

        // Acciones
        handleLocationSearch,
        handleManualSearch,
    };
};