import apiClient from './api';
import type { Favorite, CreateFavoriteRequest } from '../types';

// Servicio para manejar las operaciones de favoritos
export const favoritesService = {
    // Obtener todos los favoritos del usuario autenticado
    async getFavorites(): Promise<Favorite[]> {
        const response = await apiClient.get('/favorites');
        return response.data;
    },

    // Agregar una gasolinera a favoritos
    async addFavorite(data: CreateFavoriteRequest): Promise<Favorite> {
        const response = await apiClient.post('/favorites', data);
        return response.data;
    },

    // Eliminar una gasolinera de favoritos
    async removeFavorite(favoriteId: number): Promise<void> {
        await apiClient.delete(`/favorites/${favoriteId}`);
    },

    // Verificar si una gasolinera específica es favorita
    async isFavorite(stationId: number): Promise<boolean> {
        try {
            const response = await apiClient.get(`/favorites/check/${stationId}`);
            return response.data.isFavorite;
        } catch (error) {
            return false;
        }
    }
};
