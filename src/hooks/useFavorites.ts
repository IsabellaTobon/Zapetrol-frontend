import { useState, useEffect } from 'react';
import { favoritesService } from '../services/favoritesService';
import type { Favorite } from '../types';
import { useAuth } from '../contexts/AuthContext';

// Personalized hook to manage user favorites
export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    // Charge user favorites from the API
    const loadFavorites = async () => {
        if (!isAuthenticated) {
            setFavorites([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await favoritesService.getFavorites();
            setFavorites(data);
        } catch (err) {
            setError('Error al cargar favoritos');
        } finally {
            setLoading(false);
        }
    };

    // Add a petrol station to favorites
    const addToFavorites = async (stationId: number): Promise<boolean> => {
        if (!isAuthenticated) return false;

        try {
            const newFavorite = await favoritesService.addFavorite({ stationId });
            setFavorites(prev => [...prev, newFavorite]);
            return true;
        } catch (err) {
            setError('Error al agregar a favoritos');
            return false;
        }
    };

    // Remove a petrol station from favorites
    const removeFromFavorites = async (favoriteId: number): Promise<boolean> => {
        try {
            await favoritesService.removeFavorite(favoriteId);
            setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
            return true;
        } catch (err) {
            setError('Error al eliminar de favoritos');
            return false;
        }
    };

    // Verify if a petrol station is in favorites
    const isFavorite = (stationId: number): boolean => {
        return favorites.some(fav => fav.stationId === stationId);
    };

    // Get the favorite ID for a specific petrol station
    const getFavoriteId = (stationId: number): number | null => {
        const favorite = favorites.find(fav => fav.stationId === stationId);
        return favorite?.id || null;
    };

    // Charge user favorites when authenticated
    useEffect(() => {
        loadFavorites();
    }, [isAuthenticated]);

    return {
        favorites,
        loading,
        error,
        loadFavorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getFavoriteId
    };
};
