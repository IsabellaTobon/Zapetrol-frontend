/**
 * Utilidades comunes de la aplicación
 */

import { VALIDATION_CONFIG } from './constants';

// ===== UTILIDADES DE VALIDACIÓN =====

/**
 * Valida si un email tiene formato correcto
 */
export const isValidEmail = (email: string): boolean => {
    return VALIDATION_CONFIG.EMAIL_REGEX.test(email.trim());
};

/**
 * Valida si una contraseña cumple los requisitos mínimos
 */
export const isValidPassword = (password: string): boolean => {
    return password.length >= VALIDATION_CONFIG.PASSWORD_MIN_LENGTH;
};

/**
 * Valida si un nombre cumple los requisitos
 */
export const isValidName = (name: string): boolean => {
    const trimmedName = name.trim();
    return trimmedName.length >= VALIDATION_CONFIG.NAME_MIN_LENGTH &&
        trimmedName.length <= VALIDATION_CONFIG.NAME_MAX_LENGTH;
};

// ===== UTILIDADES DE FORMATO =====

/**
 * Capitaliza la primera letra de una cadena
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formatea un precio con símbolo de euro
 */
export const formatPrice = (price: number, decimals: number = 3): string => {
    return `${price.toFixed(decimals)}€`;
};

/**
 * Formatea una fecha en formato español
 */
export const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Formatea una fecha con hora en formato español
 */
export const formatDateTime = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// ===== UTILIDADES DE CADENAS =====

/**
 * Trunca una cadena a la longitud especificada
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

/**
 * Elimina acentos de una cadena para búsquedas
 */
export const removeAccents = (str: string): string => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Convierte una cadena a formato slug (URL amigable)
 */
export const slugify = (str: string): string => {
    return removeAccents(str)
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

// ===== UTILIDADES DE ARRAYS =====

/**
 * Elimina duplicados de un array basándose en una propiedad
 */
export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
    const seen = new Set();
    return array.filter(item => {
        const value = item[key];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
};

/**
 * Ordena un array de objetos por una propiedad
 */
export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

// ===== UTILIDADES DE ALMACENAMIENTO =====

/**
 * Guarda un valor en localStorage de forma segura
 */
export const setStorageItem = (key: string, value: unknown): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn('Error al guardar en localStorage:', error);
    }
};

/**
 * Obtiene un valor de localStorage de forma segura
 */
export const getStorageItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.warn('Error al leer de localStorage:', error);
        return null;
    }
};

/**
 * Elimina un valor de localStorage de forma segura
 */
export const removeStorageItem = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.warn('Error al eliminar de localStorage:', error);
    }
};

// ===== UTILIDADES DE DEBOUNCE/THROTTLE =====

/**
 * Debounce function para optimizar búsquedas
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: number;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * Throttle function para limitar llamadas frecuentes
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== UTILIDADES DE CLASES CSS =====

/**
 * Une clases CSS de forma condicional
 */
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
    return classes.filter(Boolean).join(' ');
};

// ===== UTILIDADES DE ERRORES =====

/**
 * Extrae un mensaje de error legible de diferentes tipos de error
 */
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
    }

    return 'Ha ocurrido un error inesperado';
};

// ===== UTILIDADES DE PERFORMANCE =====

/**
 * Delay asíncrono para testing o efectos
 */
export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry function para reintentar operaciones fallidas
 */
export const retry = async <T>(
    fn: () => Promise<T>,
    attempts: number = 3,
    delayMs: number = 1000
): Promise<T> => {
    try {
        return await fn();
    } catch (error) {
        if (attempts <= 1) {
            throw error;
        }
        await delay(delayMs);
        return retry(fn, attempts - 1, delayMs);
    }
};

// ===== UTILIDADES DE GEOLOCALIZACIÓN =====

/**
 * Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine
 * @param lat1 Latitud del primer punto
 * @param lon1 Longitud del primer punto
 * @param lat2 Latitud del segundo punto
 * @param lon2 Longitud del segundo punto
 * @returns Distancia en kilómetros
 */
export const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number => {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100; // Redondear a 2 decimales
};

/**
 * Convierte grados a radianes
 */
const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
};

/**
 * Formatea la distancia para mostrar al usuario
 */
export const formatDistance = (distance: number): string => {
    if (distance < 1) {
        return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
};

/**
 * Ordena gasolineras por distancia respecto a una ubicación
 */
export const sortStationsByDistance = <T extends { latitud?: string | number; longitud?: string | number }>(
    stations: T[],
    userLatitude: number,
    userLongitude: number
): (T & { distance: number })[] => {
    return stations
        .filter(station => station.latitud && station.longitud)
        .map(station => ({
            ...station,
            distance: calculateDistance(
                userLatitude,
                userLongitude,
                typeof station.latitud === 'string' ? parseFloat(station.latitud) : station.latitud!,
                typeof station.longitud === 'string' ? parseFloat(station.longitud) : station.longitud!
            )
        }))
        .sort((a, b) => a.distance - b.distance);
};
