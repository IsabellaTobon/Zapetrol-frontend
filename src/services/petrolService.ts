import type { Municipality, PetrolStation, Province } from "../types";
import { sortStationsByDistance } from '../utils';

const API_BASE = import.meta.env.VITE_EXTERNAL_API;

// Utility para manejar llamadas a la API
const fetchAPI = async (endpoint: string): Promise<any> => {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) {
    throw new Error(`Error en API: ${res.status} ${res.statusText}`);
  }
  return res.json();
};


// ---------> PROVINCIAS <---------
export const getPetrolProvinces = async (): Promise<Province[]> => {
  return fetchAPI('/provincias');
};

// ---------> MUNICIPIOS <---------
export const getPetrolMunicipalities = async (provinceId: number): Promise<Municipality[]> => {
  return fetchAPI(`/municipios/provincia/${provinceId}`);
};

// ---------> ESTACIONES <---------
export const getPetrolStations = async (municipalityId: number): Promise<PetrolStation[]> => {
  return fetchAPI(`/estaciones/municipio/${municipalityId}`);
};

export const getPetrolStationById = async (stationId: number): Promise<PetrolStation> => {
  return fetchAPI(`/estaciones/${stationId}`);
};

// ---------> BÚSQUEDA POR PROXIMIDAD <---------
export const getNearbyStations = async (stationId: number, radius: number = 20): Promise<PetrolStation[]> => {
  return fetchAPI(`/estaciones/cerca/${stationId}?radio=${radius}`);
};

export const getAllStations = async (): Promise<PetrolStation[]> => {
  return fetchAPI('/estaciones');
};

// BUSCAR ESTACIONES CERCANAS POR COORDENADAS
export const getStationsByCoordinates = async (
  latitude: number,
  longitude: number,
  radius: number = 20
): Promise<PetrolStation[]> => {
  try {
    // Intentar usar el endpoint oficial primero
    const res = await fetch(`${API_BASE}/estaciones/radio?latitud=${latitude}&longitud=${longitude}&radio=${radius}`);

    if (res.ok) {
      const stations = await res.json();
      return stations.map((station: PetrolStation) => ({
        ...station,
        distancia: station.distancia || 0
      }));
    }
  } catch (error) {
    console.warn("Endpoint /estaciones/radio no disponible, usando fallback:", error);
  }

  // Fallback: calcular distancias localmente
  try {
    const allStations = await getAllStations();

    const stationsWithCoords = allStations.filter(station =>
      station.latitud && station.longitud
    );

    if (stationsWithCoords.length === 0) {
      return [];
    }

    const stationsWithDistance = sortStationsByDistance(
      stationsWithCoords,
      latitude,
      longitude
    );

    return stationsWithDistance
      .filter(station => station.distance <= radius)
      .map(station => ({
        ...station,
        distancia: station.distance
      }));

  } catch (error) {
    console.error("Error al buscar estaciones por coordenadas:", error);
    return [];
  }
};
