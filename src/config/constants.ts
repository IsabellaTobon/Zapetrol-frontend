/**
 * Constantes de configuración de la aplicación
 */

// ===== CONFIGURACIÓN API =====
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
} as const;

// ===== CONFIGURACIÓN DE AUTENTICACIÓN =====
export const AUTH_CONFIG = {
    TOKEN_KEY: 'access_token',
    USER_KEY: 'user',
    THEME_KEY: 'theme',
    TOKEN_EXPIRY_KEY: 'token_expiry',
} as const;

// ===== CONFIGURACIÓN DE LA APLICACIÓN =====
export const APP_CONFIG = {
    NAME: 'Zapetrol',
    VERSION: '1.0.0',
    DESCRIPTION: 'Comparador de precios de combustibles en España',
    AUTHOR: 'Tu Nombre',
    GITHUB_URL: 'https://github.com/tu-usuario/zapetrol-frontend',
} as const;

// ===== CONFIGURACIÓN DE PAGINACIÓN =====
export const PAGINATION_CONFIG = {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    DEFAULT_PAGE: 1,
} as const;

// ===== CONFIGURACIÓN DE TEMA =====
export const THEME_CONFIG = {
    DEFAULT_THEME: 'light' as const,
    STORAGE_KEY: 'theme',
    THEMES: ['light', 'dark'] as const,
} as const;

// ===== RUTAS DE LA APLICACIÓN =====
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    FAVORITES: '/favorites',
} as const;

// ===== MENSAJES DE ERROR =====
export const ERROR_MESSAGES = {
    GENERIC: 'Ha ocurrido un error inesperado',
    NETWORK: 'Error de conexión. Verifica tu conexión a internet',
    AUTH_REQUIRED: 'Debes iniciar sesión para continuar',
    AUTH_INVALID: 'Credenciales inválidas',
    NOT_FOUND: 'El recurso solicitado no existe',
    SERVER_ERROR: 'Error del servidor. Inténtalo más tarde',
    VALIDATION: 'Por favor, verifica los datos ingresados',
} as const;

// ===== MENSAJES DE ÉXITO =====
export const SUCCESS_MESSAGES = {
    LOGIN: '¡Bienvenido de vuelta!',
    REGISTER: '¡Cuenta creada exitosamente!',
    LOGOUT: '¡Hasta pronto!',
    SAVE: 'Guardado exitosamente',
    UPDATE: 'Actualizado exitosamente',
    DELETE: 'Eliminado exitosamente',
} as const;

// ===== CONFIGURACIÓN DE VALIDACIÓN =====
export const VALIDATION_CONFIG = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 8,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
} as const;

// ===== TIPOS DERIVADOS =====
export type Theme = typeof THEME_CONFIG.THEMES[number];
export type Route = typeof ROUTES[keyof typeof ROUTES];
export type ErrorMessage = typeof ERROR_MESSAGES[keyof typeof ERROR_MESSAGES];
export type SuccessMessage = typeof SUCCESS_MESSAGES[keyof typeof SUCCESS_MESSAGES];
