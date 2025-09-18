/**
 * Perssonalized hook for form validation
 * Brings common validations and error handling
 */

import { useState, useCallback } from 'react';

interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
}

interface ValidationRules {
    [key: string]: ValidationRule;
}

interface ValidationErrors {
    [key: string]: string;
}

export interface UseFormValidationReturn {
    errors: ValidationErrors;
    validateField: (name: string, value: string) => string | null;
    validateForm: (data: Record<string, string>) => boolean;
    clearErrors: () => void;
    clearFieldError: (name: string) => void;
}

export const useFormValidation = (rules: ValidationRules): UseFormValidationReturn => {
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateField = useCallback((name: string, value: string): string | null => {
        const rule = rules[name];
        if (!rule) return null;

        // Required validation
        if (rule.required && (!value || value.trim() === '')) {
            return 'Este campo es obligatorio';
        }

        // Skip other validations if field is empty and not required
        if (!value || value.trim() === '') {
            return null;
        }

        // Min length validation
        if (rule.minLength && value.length < rule.minLength) {
            return `Debe tener al menos ${rule.minLength} caracteres`;
        }

        // Max length validation
        if (rule.maxLength && value.length > rule.maxLength) {
            return `No puede exceder ${rule.maxLength} caracteres`;
        }

        // Pattern validation
        if (rule.pattern && !rule.pattern.test(value)) {
            switch (name) {
                case 'email':
                    return 'El formato del email no es válido';
                case 'password':
                    return 'La contraseña debe contener: 1 mayúscula, 1 minúscula, 1 número y 1 símbolo especial';
                default:
                    return 'El formato no es válido';
            }
        }

        // Custom validation
        if (rule.custom) {
            return rule.custom(value);
        }

        return null;
    }, [rules]);

    const validateForm = useCallback((data: Record<string, string>): boolean => {
        const newErrors: ValidationErrors = {};
        let isValid = true;

        Object.keys(rules).forEach(fieldName => {
            const error = validateField(fieldName, data[fieldName] || '');
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [rules, validateField]);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    const clearFieldError = useCallback((name: string) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }, []);

    return {
        errors,
        validateField,
        validateForm,
        clearErrors,
        clearFieldError
    };
};

// Validation rules for authentication forms
export const authValidationRules = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        required: true,
        minLength: 6,
        // Non obligatory pattern, only minimum length
    }
};
