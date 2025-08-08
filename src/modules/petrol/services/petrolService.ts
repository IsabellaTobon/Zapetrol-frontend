import type { Municipality, PetrolStation, Province } from "../types/petrol";

const API_BASE = import.meta.env.VITE_EXTERNAL_API;

export const getPetrolProvinces = async (): Promise<Province[]> => {
  const res = await fetch(`${API_BASE}/provincias`);
  if (!res.ok) {
    throw new Error("Error al cargar provincias");
  }
  return res.json();
};

export const getPetrolMunicipalities = async (
  provinceId: number
): Promise<Municipality[]> => {
  const res = await fetch(`${API_BASE}/municipios/provincia/${provinceId}`);
  if (!res.ok) {
    throw new Error("Error al cargar municipios");
  }
  return res.json();
};

export const getPetrolStations = async (
  municipalityId: number
): Promise<PetrolStation[]> => {
  const res = await fetch(`${API_BASE}/estaciones/municipio/${municipalityId}`);
  if (!res.ok) {
    throw new Error("Error al cargar estaciones");
  }
  return res.json();
};
