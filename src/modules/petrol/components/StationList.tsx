import React from 'react';
import type { PetrolStation } from '../types/petrol';

interface Props {
  stations: PetrolStation[];
}

export const StationList: React.FC<Props> = ({ stations }) => {
  if (stations.length === 0) return <p>No hay gasolineras disponibles.</p>;

  return (
    <ul>
      {stations.map((station) => (
        <li key={station.idEstacion}>
          <strong>{station.nombreEstacion}</strong> - {station.direccion} ({station.localidad})<br />
          ⛽ Gasolina 95: {station.Gasolina95 ?? 'N/D'} € | Diesel: {station.Diesel ?? 'N/D'} €
        </li>
      ))}
    </ul>
  );
};
