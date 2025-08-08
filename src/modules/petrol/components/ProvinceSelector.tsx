import React from 'react';
import type { Province } from '../types/petrol';

interface Props {
  provinces: Province[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export const ProvinceSelector: React.FC<Props> = ({ provinces, selectedId, onSelect }) => (
  <select value={selectedId ?? ''} onChange={(e) => onSelect(Number(e.target.value))}>
    <option value="">Selecciona una provincia</option>
    {provinces.map((prov) => (
      <option key={prov.idProvincia} value={prov.idProvincia}>
        {prov.nombreProvincia}
      </option>
    ))}
  </select>
);
