/**
 * Selector de provincia con label y estilos mejorados
 */
import React from 'react';
import type { Province } from '../../types';

interface Props {
  provinces: Province[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  label?: string;
  disabled?: boolean;
}

export const ProvinceSelector: React.FC<Props> = ({
  provinces,
  selectedId,
  onSelect,
  label = "Provincia",
  disabled = false
}) => (
  <div className="form-group">
    <label className="form-label" htmlFor="province-select">
      {label}
    </label>
    <select
      id="province-select"
      className="form-select"
      value={selectedId ?? ''}
      onChange={(e) => onSelect(Number(e.target.value))}
      disabled={disabled}
      aria-label="Seleccionar provincia"
    >
      <option value="">
        {disabled ? "Cargando provincias..." : "Selecciona una provincia"}
      </option>
      {provinces.map((prov) => (
        <option key={prov.idProvincia} value={prov.idProvincia}>
          {prov.nombreProvincia}
        </option>
      ))}
    </select>
  </div>
);
