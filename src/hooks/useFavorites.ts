import { useState, useEffect } from 'react';
import { favoritesService } from '../services/favoritesService';
import type { Favorite } from '../types';
import { useAuth } from '../contexts/AuthContext';

// Hook personalizado para manejar el estado de favoritos
export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    // Cargar favoritos del usuario
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
            console.error('Error loading favorites:', err);
        } finally {
            setLoading(false);
        }
    };

    // Agregar gasolinera a favoritos
    const addToFavorites = async (stationId: number): Promise<boolean> => {
        if (!isAuthenticated) return false;

        try {
            const newFavorite = await favoritesService.addFavorite({ stationId });
            setFavorites(prev => [...prev, newFavorite]);
            return true;
        } catch (err) {
            setError('Error al agregar a favoritos');
            console.error('Error adding favorite:', err);
            return false;
        }
    };

    // Eliminar gasolinera de favoritos
    const removeFromFavorites = async (favoriteId: number): Promise<boolean> => {
        try {
            await favoritesService.removeFavorite(favoriteId);
            setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
            return true;
        } catch (err) {
            setError('Error al eliminar de favoritos');
            console.error('Error removing favorite:', err);
            return false;
        }
    };

    // Verificar si una gasolinera es favorita (búsqueda local)
    const isFavorite = (stationId: number): boolean => {
        return favorites.some(fav => fav.stationId === stationId);
    };

    // Obtener el ID del favorito para una gasolinera específica
    const getFavoriteId = (stationId: number): number | null => {
        const favorite = favorites.find(fav => fav.stationId === stationId);
        return favorite?.id || null;
    };

    // Cargar favoritos cuando el usuario se autentica
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
