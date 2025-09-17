import React from 'react';
import type { PetrolStation } from '../../types';
import { FavoriteButton } from '../common/FavoriteButton/FavoriteButton';
import './StationList.css';

interface Props {
  stations: PetrolStation[];
}

export const StationList: React.FC<Props> = ({ stations }) => {
  if (stations.length === 0) return <p>No hay gasolineras disponibles.</p>;

  return (
    <div className="station-grid">
      {stations.map((station) => (
        <div key={station.idEstacion} className="station-card">
          <FavoriteButton
            stationId={station.idEstacion}
          />

          <div className="station-header">
            <h3 className="station-name">{station.nombreEstacion}</h3>
            <span className="station-brand">{station.marca}</span>
          </div>

          <div className="station-info">
            <div className="location">
              <span className="icon">📍</span>
              <div>
                <p className="address">{station.direccion}</p>
                <p className="city">{station.localidad} - {station.codPostal}</p>
              </div>
            </div>

            {station.horario && (
              <div className="schedule">
                <span className="icon">🕒</span>
                <p>{station.horario}</p>
              </div>
            )}
          </div>

          <div className="fuel-prices">
            <div className="fuel-item">
              <span className="fuel-type">⛽ Gasolina 95</span>
              <span className="price">{station.Gasolina95 ?? 'N/D'} €</span>
            </div>
            <div className="fuel-item">
              <span className="fuel-type">⛽ Gasolina 98</span>
              <span className="price">{station.Gasolina98 ?? 'N/D'} €</span>
            </div>
            <div className="fuel-item">
              <span className="fuel-type">🚛 Diesel</span>
              <span className="price">{station.Diesel ?? 'N/D'} €</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
