/**
 * Selector de municipio con label y estilos mejorados
 */
import React from 'react';
import type { Municipality } from '../../types';

interface Props {
  municipalities: Municipality[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  label?: string;
  disabled?: boolean;
}

export const MunicipalitySelector: React.FC<Props> = ({
  municipalities,
  selectedId,
  onSelect,
  label = "Municipio",
  disabled = false
}) => (
  <div className="form-group">
    <label className="form-label" htmlFor="municipality-select">
      {label}
    </label>
    <select
      id="municipality-select"
      className="form-select"
      value={selectedId ?? ''}
      onChange={(e) => onSelect(Number(e.target.value))}
      disabled={disabled}
      aria-label="Seleccionar municipio"
    >
      <option value="">
        {disabled ? "Selecciona primero una provincia" : "Selecciona un municipio"}
      </option>
      {municipalities.map((mun) => (
        <option key={mun.idMunicipio} value={mun.idMunicipio}>
          {mun.nombreMunicipio}
        </option>
      ))}
    </select>
  </div>
);
