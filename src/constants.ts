/**
 * Constantes de configuración de la aplicación
 */

// ===== CONFIGURACIÓN DE VALIDACIÓN =====
export const VALIDATION_CONFIG = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 8,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
} as const;

// Tipos relacionados
export type ValidationRule = (value: string) => string | null;
export type ValidationRules = Record<string, ValidationRule[]>;