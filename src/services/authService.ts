/**
 * Servicio de autenticación
 * Maneja todas las operaciones relacionadas con la autenticación de usuarios
 */

import apiClient from './api';
import type { User, AuthResponse, LoginRequest, RegisterRequest } from '../types';

// ===== CONSTANTES =====
const TOKEN_KEY = 'access_token';
const USER_KEY = 'user';

// ===== SERVICIO DE AUTENTICACIÓN =====
export const authService = {
    /**
     * Registrar nuevo usuario
     */
    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    },

    /**
     * Iniciar sesión
     */
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    },

    /**
     * Obtener perfil del usuario autenticado
     */
    async getProfile(): Promise<User> {
        const response = await apiClient.get('/auth/profile');
        return response.data;
    },

    /**
     * Cerrar sesión y limpiar datos locales
     */
    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    /**
     * Verificar si el usuario está autenticado
     */
    isAuthenticated(): boolean {
        return !!this.getToken();
    },

    /**
     * Obtener token almacenado
     */
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    /**
     * Obtener usuario almacenado en localStorage
     */
    getCurrentUser(): User | null {
        const userStr = localStorage.getItem(USER_KEY);
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
        } catch (error) {
            console.warn('Error al parsear usuario desde localStorage:', error);
            return null;
        }
    },

    /**
     * Guardar datos de autenticación en localStorage
     */
    saveAuthData(authResponse: AuthResponse): void {
        localStorage.setItem(TOKEN_KEY, authResponse.access_token);
        localStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
    },

    /**
     * Limpiar datos de autenticación
     */
    clearAuthData(): void {
        this.logout();
    }
};

// ===== SERVICIO DE USUARIOS =====
export const userService = {
    /**
     * Obtener todos los usuarios (requiere autenticación)
     */
    async getAllUsers(): Promise<User[]> {
        const response = await apiClient.get('/users');
        return response.data;
    },

    /**
     * Obtener usuario por ID
     */
    async getUserById(id: number): Promise<User> {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    },

    /**
     * Actualizar datos del usuario
     */
    async updateUser(id: number, data: Partial<User>): Promise<User> {
        const response = await apiClient.patch(`/users/${id}`, data);
        return response.data;
    },

    /**
     * Eliminar usuario
     */
    async deleteUser(id: number): Promise<void> {
        await apiClient.delete(`/users/${id}`);
    }
};
