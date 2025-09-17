/**
 * Componente de input mejorado con validación visual y mejor UX
 */

import React, { useState, useId } from 'react';
import './FormInput.css';

interface FormInputProps {
    label: string;
    type?: 'text' | 'email' | 'password';
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    minLength?: number;
    maxLength?: number;
    icon?: React.ReactNode;
    helpText?: string;
    showPasswordToggle?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    required = false,
    disabled = false,
    autoComplete,
    minLength,
    maxLength,
    icon,
    helpText,
    showPasswordToggle = false
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputId = useId();
    const helpId = useId();
    const errorId = useId();

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
    const hasValue = value.length > 0;
    const isValid = !error && hasValue;

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className={`form-input-container ${error ? 'has-error' : ''} ${isValid ? 'is-valid' : ''} ${isFocused ? 'is-focused' : ''}`}>
            <label htmlFor={inputId} className="form-input-label">
                {label}
                {required && <span className="required-asterisk">*</span>}
            </label>

            <div className="form-input-wrapper">
                {icon && (
                    <div className="form-input-icon">
                        {icon}
                    </div>
                )}

                <input
                    id={inputId}
                    type={inputType}
                    name={name}
                    className={`form-input ${icon ? 'has-icon' : ''}`}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder || label}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    minLength={minLength}
                    maxLength={maxLength}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim()}
                />

                {type === 'password' && showPasswordToggle && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        disabled={disabled}
                        aria-label={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                        {isPasswordVisible ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                )}

                {isValid && (
                    <div className="validation-icon success">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20,6 9,17 4,12" />
                        </svg>
                    </div>
                )}

                {error && (
                    <div className="validation-icon error">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    </div>
                )}
            </div>

            {helpText && !error && (
                <div id={helpId} className="form-input-help">
                    {helpText}
                </div>
            )}

            {error && (
                <div id={errorId} className="form-input-error" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};
