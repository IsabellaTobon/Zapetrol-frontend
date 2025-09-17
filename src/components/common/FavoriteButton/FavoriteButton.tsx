import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useFavorites } from '../../../hooks/useFavorites';
import './FavoriteButton.css';

interface FavoriteButtonProps {
    stationId: number;
    className?: string;
}

// Componente para el botón de agregar/quitar favoritos
export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    stationId,
    className = ''
}) => {
    const { isAuthenticated } = useAuth();
    const { isFavorite, getFavoriteId, addToFavorites, removeFromFavorites } = useFavorites();
    const [isProcessing, setIsProcessing] = useState(false);

    // No mostrar si el usuario no está autenticado
    if (!isAuthenticated) {
        return null;
    }

    const isStationFavorite = isFavorite(stationId);
    const favoriteId = getFavoriteId(stationId);

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Evitar que se propague el click a la card

        if (isProcessing) return; // Evitar múltiples clicks

        setIsProcessing(true);

        try {
            if (isStationFavorite && favoriteId) {
                // Eliminar de favoritos
                await removeFromFavorites(favoriteId);
            } else {
                // Agregar a favoritos
                await addToFavorites(stationId);
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <button
            className={`favorite-button ${isStationFavorite ? 'is-favorite' : ''} ${className}`}
            onClick={handleToggleFavorite}
            disabled={isProcessing}
            title={isStationFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
            aria-label={isStationFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
            <span className="favorite-icon">
                {isStationFavorite ? '❤️' : '🤍'}
            </span>
            {isProcessing && <span className="loading-indicator">⏳</span>}
        </button>
    );
};
