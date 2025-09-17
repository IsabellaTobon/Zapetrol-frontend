import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../contexts/AuthContext';
import { useFormValidation, authValidationRules } from '../../../hooks/useFormValidation';
import { FormInput } from '../../common/FormInput/FormInput';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { useToast } from '../../common/Toast/Toast';
import type { LoginRequest } from '../../../types';
import '../../../styles/components/auth.css';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();
    const { showToast } = useToast();

    // Configurar validaciones específicas para login
    const loginValidationRules = {
        email: authValidationRules.email,
        password: { required: true, minLength: 1 } // Menos estricto para login
    };

    const { errors, validateForm, clearFieldError } = useFormValidation(loginValidationRules);

    // Cargar datos guardados al montar el componente
    useEffect(() => {
        const savedEmail = localStorage.getItem('zapetrol_remember_email');
        const savedRemember = localStorage.getItem('zapetrol_remember_me') === 'true';

        if (savedEmail && savedRemember) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []); const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            clearFieldError(name);
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
            showToast({
                type: 'error',
                title: 'Error de validación',
                message: 'Por favor corrige los errores en el formulario'
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await authService.login(formData);

            // Manejar "Recordar sesión"
            if (rememberMe) {
                localStorage.setItem('zapetrol_remember_email', formData.email);
                localStorage.setItem('zapetrol_remember_me', 'true');
            } else {
                localStorage.removeItem('zapetrol_remember_email');
                localStorage.removeItem('zapetrol_remember_me');
            }

            // Guardar datos de autenticación en el contexto
            login(response.user, response.access_token);

            // Mostrar notificación de éxito
            showToast({
                type: 'success',
                title: '¡Bienvenido de vuelta!',
                message: `Hola ${response.user.name}, has iniciado sesión correctamente`,
                duration: 3000
            });

            // Redirigir al dashboard
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Error en login:', err);

            let errorMessage = 'Error al iniciar sesión. Intenta de nuevo.';

            // Manejar diferentes tipos de errores
            if (err.response?.status === 401) {
                errorMessage = 'Email o contraseña incorrectos';
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }

            setError(errorMessage);

            // Mostrar notificación de error
            showToast({
                type: 'error',
                title: 'Error de autenticación',
                message: errorMessage,
                duration: 5000
            });
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

                {/* Login Form */}
                <div className="auth-card">
                    <div className="card-header">
                        <h2>Iniciar Sesión</h2>
                        <p>Accede a tu cuenta para encontrar las mejores ofertas</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="error-message" role="alert">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <FormInput
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
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
                            placeholder="Tu contraseña"
                            error={errors.password}
                            required
                            disabled={isLoading}
                            autoComplete="current-password"
                            showPasswordToggle={true}
                            icon={
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <circle cx="12" cy="16" r="1" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            }
                        />

                        <Checkbox
                            checked={rememberMe}
                            onChange={setRememberMe}
                            label="Recordar sesión"
                            size="md"
                        />

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                                    </svg>
                                    Iniciando sesión...
                                </>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            ¿No tienes cuenta?{' '}
                            <Link to="/register" className="auth-link">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
