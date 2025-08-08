import React from 'react';
import type { Municipality } from '../types/petrol';

interface Props {
  municipalities: Municipality[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export const MunicipalitySelector: React.FC<Props> = ({ municipalities, selectedId, onSelect }) => (
  <select value={selectedId ?? ''} onChange={(e) => onSelect(Number(e.target.value))}>
    <option value="">Selecciona un municipio</option>
    {municipalities.map((mun) => (
      <option key={mun.idMunicipio} value={mun.idMunicipio}>
        {mun.nombreMunicipio}
      </option>
    ))}
  </select>
);
