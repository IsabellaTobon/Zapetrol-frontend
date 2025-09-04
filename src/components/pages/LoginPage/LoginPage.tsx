import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../contexts/AuthContext';
import './AuthPages.css';

export const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        try {
            const response = await authService.login(formData);

            // Guardar datos de autenticación en el contexto
            login(response.user, response.access_token);

            // Redirigir al dashboard
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Error en login:', err);

            // Manejar diferentes tipos de errores
            if (err.response?.status === 401) {
                setError('Email o contraseña incorrectos');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Error al iniciar sesión. Intenta de nuevo.');
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

                {/* Login Form */}
                <div className="auth-card">
                    <div className="card-header">
                        <h2>Iniciar Sesión</h2>
                        <p>Accede a tu cuenta para encontrar las mejores ofertas</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
