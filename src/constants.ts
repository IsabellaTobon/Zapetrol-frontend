/**
 * Constantes de configuración de la aplicación
 */

// ===== CONFIGURACIÓN DE VALIDACIÓN =====
export const VALIDATION_CONFIG = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 6, // Cambiado a 6 caracteres
    NAME_MIN_LENGTH: 3,
    NAME_MAX_LENGTH: 50,
} as const;

// Tipos relacionados
export type ValidationRule = (value: string) => string | null;
export type ValidationRules = Record<string, ValidationRule[]>;