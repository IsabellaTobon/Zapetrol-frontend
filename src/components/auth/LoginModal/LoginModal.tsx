import React, { useState } from 'react';
import { Modal } from '../../common/Modal/Modal';
import './LoginModal.css';

interface LoginModalProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // TODO: Aquí conectar con el backend cuando esté listo
            console.log('Login attempt:', { email, password });

            // Simulación de login
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Cerrar modal en éxito
            onClose();
        } catch (err) {
            setError('Email o contraseña incorrectos');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal onClose={onClose}>
            <div className="login-modal">
                <div className="modal-header">
                    <h2>Iniciar Sesión</h2>
                    <p>Accede a tu cuenta de Zapetrol</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
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

                <div className="modal-footer">
                    <p>
                        ¿No tienes cuenta?{' '}
                        <button
                            type="button"
                            className="link-button"
                            onClick={onSwitchToRegister}
                        >
                            Regístrate aquí
                        </button>
                    </p>
                </div>
            </div>
        </Modal>
    );
};
