import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../contexts/AuthContext';
import { useFormValidation, authValidationRules } from '../../../hooks/useFormValidation';
import { FormInput } from '../../common/FormInput/FormInput';
import { PasswordStrength } from '../../common/PasswordStrength/PasswordStrength';
import type { RegisterRequest } from '../../../types';
import '../../../styles/components/auth.css';
import './RegisterPage.css';

export const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<RegisterRequest & { confirmPassword: string }>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    // Configurar validaciones específicas para registro
    const registerValidationRules = {
        ...authValidationRules,
        confirmPassword: {
            required: true,
            custom: (value: string) => {
                if (value !== formData.password) {
                    return 'Las contraseñas no coinciden';
                }
                return null;
            }
        }
    };

    const { errors, validateForm, clearFieldError } = useFormValidation(registerValidationRules);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            clearFieldError(name);
        }

        // Si cambia la contraseña, también validar confirmPassword
        if (name === 'password' && errors.confirmPassword) {
            clearFieldError('confirmPassword');
        }

        // Limpiar error general
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validar formulario
        const isValid = validateForm(formData as unknown as Record<string, string>);
        if (!isValid) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await authService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            // Guardar datos de autenticación en el contexto
            login(response.user, response.access_token);

            // Redirigir al dashboard
            navigate('/dashboard');
        } catch (err: any) {
            // Manejar diferentes tipos de errores
            if (err.response?.status === 409) {
                setError('Este email ya está registrado');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Error al crear la cuenta. Intenta de nuevo.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Header */}
                <div className="auth-header">
                    <Link to="/" className="back-link">
                        ← Volver al inicio
                    </Link>
                    <div className="brand">
                        <span className="logo">⛽</span>
                        <h1>Zapetrol</h1>
                    </div>
                </div>

                {/* Register Form */}
                <div className="auth-card">
                    <div className="card-header">
                        <h2>Crear Cuenta</h2>
                        <p>Únete a Zapetrol y encuentra las mejores ofertas</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="error-message auth-form-full-width" role="alert">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div className="auth-form-grid">
                            <FormInput
                                label="Nombre"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tu nombre completo"
                                error={errors.name}
                                required
                                disabled={isLoading}
                                autoComplete="name"
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                }
                            />

                            <FormInput
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ejemplo@correo.com"
                                error={errors.email}
                                required
                                disabled={isLoading}
                                autoComplete="email"
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                }
                            />

                            <FormInput
                                label="Contraseña"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Crea una contraseña segura"
                                error={errors.password}
                                required
                                disabled={isLoading}
                                autoComplete="new-password"
                                showPasswordToggle={true}
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <circle cx="12" cy="16" r="1" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                }
                            />

                            {/* Medidor de fortaleza de contraseña */}
                            <PasswordStrength
                                password={formData.password}
                                show={formData.password.length > 0}
                            />

                            <FormInput
                                label="Confirmar contraseña"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirma tu contraseña"
                                error={errors.confirmPassword}
                                required
                                disabled={isLoading}
                                autoComplete="new-password"
                                showPasswordToggle={true}
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M9 12l2 2 4-4" />
                                    </svg>
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full auth-form-full-width"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                                    </svg>
                                    Creando cuenta...
                                </>
                            ) : (
                                'Crear Cuenta'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/login" className="auth-link">
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
