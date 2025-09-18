import { useState } from 'react';

interface GeolocationState {
    location: {
        latitude: number;
        longitude: number;
    } | null;
    isLoading: boolean;
    error: string | null;
    isSupported: boolean;
}

export const useGeolocation = () => {
    const [state, setState] = useState<GeolocationState>({
        location: null,
        isLoading: false,
        error: null,
        isSupported: 'geolocation' in navigator,
    });

    const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation no está soportada por este navegador'));
                return;
            }

            setState(prev => ({ ...prev, isLoading: true, error: null }));

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setState(prev => ({
                        ...prev,
                        location,
                        isLoading: false,
                        error: null,
                    }));
                    resolve(location);
                },
                (error) => {
                    let errorMessage = 'Error desconocido al obtener la ubicación';

                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Acceso a la ubicación denegado por el usuario';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Información de ubicación no disponible';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Tiempo de espera agotado al obtener la ubicación';
                            break;
                    }

                    setState(prev => ({
                        ...prev,
                        isLoading: false,
                        error: errorMessage,
                    }));
                    reject(new Error(errorMessage));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000, // 5 min
                }
            );
        });
    };

    const clearLocation = () => {
        setState(prev => ({
            ...prev,
            location: null,
            error: null,
        }));
    };

    return {
        ...state,
        getCurrentLocation,
        clearLocation,
    };
};