import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../contexts/AuthContext';
import '../../../styles/components/auth.css';

export const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validaciones del frontend
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setIsLoading(false);
            return;
        }

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
            console.error('Error en registro:', err);

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
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre completo"
                                required
                                disabled={isLoading}
                                autoComplete="name"
                                minLength={2}
                                maxLength={50}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ingresa tu correo electrónico"
                                required
                                disabled={isLoading}
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Crea una contraseña segura"
                                required
                                disabled={isLoading}
                                autoComplete="new-password"
                                minLength={8}
                            />
                            <small className="form-help">Mínimo 8 caracteres</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-input"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirma tu contraseña"
                                required
                                disabled={isLoading}
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
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
