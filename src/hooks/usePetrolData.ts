import { useEffect, useState } from 'react';
import type { Province, Municipality, PetrolStation } from '../types';
import {
  getPetrolProvinces,
  getPetrolMunicipalities,
  getPetrolStations
} from '../services/petrolService';

export const usePetrolData = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [stations, setStations] = useState<PetrolStation[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<number | null>(null);

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const provinces = await getPetrolProvinces();
        setProvinces(provinces);
      } catch (error) {
        // Silent error - provinces not loaded
      }
    };

    getProvinces();
  }, []);

  useEffect(() => {
    const getMunicipalities = async (provinceId: number) => {
      try {
        const municipalities = await getPetrolMunicipalities(provinceId);
        setMunicipalities(municipalities);
      } catch (error) {
        // Silent error - municipalities not loaded
      }
    };

    if (selectedProvince !== null) {
      getMunicipalities(selectedProvince);
      setSelectedMunicipality(null);
      setStations([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    const getStations = async (municipalityId: number) => {
      try {
        const stations = await getPetrolStations(municipalityId);
        setStations(stations);
      } catch (error) {
        // Silent error - stations not loaded
      }
    };

    if (selectedMunicipality !== null) {
      getStations(selectedMunicipality);
    }
  }, [selectedMunicipality]);

  return {
    provinces,
    municipalities,
    stations,
    selectedProvince,
    setSelectedProvince,
    selectedMunicipality,
    setSelectedMunicipality
  };
};
