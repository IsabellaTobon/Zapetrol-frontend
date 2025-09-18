import React from 'react';
import { useFavorites } from '../../../hooks/useFavorites';
import { usePetrolData } from '../../../hooks/usePetrolData';
import './FavoritesTab.css';

export const FavoritesTab: React.FC = () => {
    const { favorites, removeFromFavorites, loading: favoritesLoading } = useFavorites();
    const { stations } = usePetrolData();

    // Filtrar las estaciones que están en favoritos
    const favoriteStations = stations.filter(station =>
        favorites.some(fav => fav.stationId === station.idEstacion)
    );

    const handleRemoveFavorite = async (stationId: number) => {
        try {
            const favoriteId = favorites.find(fav => fav.stationId === stationId)?.id;
            if (favoriteId) {
                await removeFromFavorites(favoriteId);
            }
        } catch (error) {
            // Error silencioso al eliminar favorito
        }
    };

    if (favoritesLoading) {
        return (
            <div className="favorites-tab">
                <div className="loading-message">
                    <p>Cargando tus favoritos...</p>
                </div>
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="favorites-tab">
                <div className="empty-favorites">
                    <div className="empty-icon">⭐</div>
                    <h3>Aún no tienes favoritos</h3>
                    <p>Explora las gasolineras y marca las que más te gusten como favoritas.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-tab">
            <div className="favorites-header">
                <h2>Mis Gasolineras Favoritas</h2>
                <span className="favorites-count">{favorites.length} favorita{favorites.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="favorites-grid">
                {favoriteStations.map((station) => {
                    const favorite = favorites.find(fav => fav.stationId === station.idEstacion);

                    return (
                        <div key={station.idEstacion} className="favorite-card">
                            <div className="favorite-header">
                                <h3 className="station-name">{station.nombreEstacion}</h3>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveFavorite(station.idEstacion)}
                                    title="Eliminar de favoritos"
                                >
                                    <span className="remove-icon">❌</span>
                                </button>
                            </div>

                            <div className="station-details">
                                <div className="brand-info">
                                    <span className="brand">{station.marca}</span>
                                    {favorite && (
                                        <span className="added-date">
                                            Agregado: {new Date(favorite.createdAt).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>

                                <div className="location-info">
                                    <span className="icon">📍</span>
                                    <div>
                                        <p className="address">{station.direccion}</p>
                                        <p className="city">{station.localidad} - {station.codPostal}</p>
                                    </div>
                                </div>

                                {station.horario && (
                                    <div className="schedule-info">
                                        <span className="icon">🕒</span>
                                        <p>{station.horario}</p>
                                    </div>
                                )}
                            </div>

                            <div className="fuel-prices">
                                <div className="fuel-row">
                                    <span className="fuel-type">⛽ Gasolina 95</span>
                                    <span className="price">{station.Gasolina95 ?? 'N/D'} €</span>
                                </div>
                                <div className="fuel-row">
                                    <span className="fuel-type">⛽ Gasolina 98</span>
                                    <span className="price">{station.Gasolina98 ?? 'N/D'} €</span>
                                </div>
                                <div className="fuel-row">
                                    <span className="fuel-type">🚛 Diesel</span>
                                    <span className="price">{station.Diesel ?? 'N/D'} €</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
