/**
 * Tipos globales de la aplicación
 */

// ===== TIPOS DE COMBUSTIBLES =====
export interface Province {
    nombreProvincia: string;
    idProvincia: number;
}

export interface Municipality {
    idMunicipio: number;
    nombreMunicipio: string;
    idProvincia: number;
}

export interface PetrolStation {
    idEstacion: number;
    nombreEstacion: string;
    direccion: string;
    codPostal: string;
    localidad: string;
    horario: string;
    Gasolina95: string | null;
    Gasolina98: string | null;
    Diesel: string | null;
    marca: string;
}

// ===== TIPOS DE FAVORITOS =====
export interface Favorite {
    id: number;
    userId: number;
    stationId: number;
    createdAt: string;
    // Información de la gasolinera incluida en la respuesta
    station?: {
        idEstacion: number;
        nombreEstacion: string;
        direccion: string;
        localidad: string;
        marca: string;
        Gasolina95: string | null;
        Gasolina98: string | null;
        Diesel: string | null;
    };
}

export interface CreateFavoriteRequest {
    stationId: number;
}

// ===== TIPOS DE AUTENTICACIÓN =====
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

// ===== TIPOS DE TEMA =====
export type Theme = 'light' | 'dark';

// ===== TIPOS DE API =====
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

// ===== TIPOS DE COMPONENTES =====
export interface ComponentProps {
    children?: React.ReactNode;
    className?: string;
}

export interface FormProps extends ComponentProps {
    onSubmit?: (data: any) => void;
    loading?: boolean;
    disabled?: boolean;
}

// ===== TIPOS DE ESTADO =====
export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

export interface PaginationState {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}
