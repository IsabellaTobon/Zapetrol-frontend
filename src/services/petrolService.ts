import type { Municipality, PetrolStation, Province } from "../types";

const API_BASE = import.meta.env.VITE_EXTERNAL_API;


// ---------> PROVINCIAS <---------
// CARGAR TODAS LAS PROVINCIAS
export const getPetrolProvinces = async (): Promise<Province[]> => {
  const res = await fetch(`${API_BASE}/provincias`);
  if (!res.ok) {
    throw new Error("Error al cargar provincias");
  }
  return res.json();
};


// ---------> MUNICIPIOS <---------
// CARGAR TODOS LOS MUNICIPIOS DE UNA PROVINCIA
export const getPetrolMunicipalities = async (
  provinceId: number
): Promise<Municipality[]> => {
  const res = await fetch(`${API_BASE}/municipios/provincia/${provinceId}`);
  if (!res.ok) {
    throw new Error("Error al cargar municipios");
  }
  return res.json();
};


// ---------> ESTACIONES <---------
// CARGAR TODAS LAS ESTACIONES DE UN MUNICIPIO
export const getPetrolStations = async (
  municipalityId: number
): Promise<PetrolStation[]> => {
  const res = await fetch(`${API_BASE}/estaciones/municipio/${municipalityId}`);
  if (!res.ok) {
    throw new Error("Error al cargar estaciones");
  }
  return res.json();
};


// CARGAR UNA ESTACIÓN POR ID
export const getPetrolStationById = async (
  stationId: number
): Promise<PetrolStation> => {
  const res = await fetch(`${API_BASE}/estaciones/${stationId}`);
  if (!res.ok) {
    throw new Error("Error al cargar la estación");
  }
  return res.json();
};


// CARGAR LOS DETALLES DE UNA ESTACIÓN
export const getStationDetails = async (
  stationId: number
): Promise<PetrolStation> => {
  const res = await fetch(`${API_BASE}/estaciones/detalles/${stationId}`);
  if (!res.ok) {
    throw new Error("Error al cargar los detalles de la estación");
  }
  return res.json();
};
