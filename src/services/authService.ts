import apiClient from './api';

export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
    message?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

// Servicio de autenticación
export const authService = {
    // Registrar usuario
    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    },

    // Iniciar sesión
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    },

    // Obtener perfil del usuario
    async getProfile(): Promise<User> {
        const response = await apiClient.get('/auth/profile');
        return response.data;
    },

    // Cerrar sesión (limpiar localStorage)
    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    },

    // Verificar si el usuario está autenticado
    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    },

    // Obtener token almacenado
    getToken(): string | null {
        return localStorage.getItem('access_token');
    },

    // Obtener usuario almacenado
    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Guardar datos de autenticación
    saveAuthData(authResponse: AuthResponse): void {
        localStorage.setItem('access_token', authResponse.access_token);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
    }
};

// Servicio de usuarios (para el dashboard)
export const userService = {
    // Listar todos los usuarios
    async getAllUsers(): Promise<User[]> {
        const response = await apiClient.get('/users');
        return response.data;
    },

    // Obtener usuario por ID
    async getUserById(id: number): Promise<User> {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    },

    // Actualizar usuario
    async updateUser(id: number, data: Partial<User>): Promise<User> {
        const response = await apiClient.patch(`/users/${id}`, data);
        return response.data;
    },

    // Eliminar usuario
    async deleteUser(id: number): Promise<void> {
        await apiClient.delete(`/users/${id}`);
    }
};
