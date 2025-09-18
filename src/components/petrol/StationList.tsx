import React from 'react';
import type { PetrolStation } from '../../types';
import { FavoriteButton } from '../common/FavoriteButton/FavoriteButton';
import './StationList.css';

interface Props {
  stations: (PetrolStation & { distanceText?: string })[];
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
            <div className="station-meta">
              <span className="station-brand">{station.marca}</span>
              {station.distanceText && (
                <span className="station-distance">
                  <svg className="distance-icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"
                      stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {station.distanceText}
                </span>
              )}
            </div>
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
