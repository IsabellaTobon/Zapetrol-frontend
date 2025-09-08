/**
 * Contexto de autenticación
 * Maneja el estado global de autenticación del usuario
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User } from '../services/authService';

// ===== TIPOS =====
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

// ===== CONTEXTO =====
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===== HOOK PERSONALIZADO =====
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

// ===== PROVEEDOR =====
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // ===== EFECTOS =====
    useEffect(() => {
        initializeAuth();
    }, []);

    // ===== FUNCIONES =====
    const initializeAuth = async (): Promise<void> => {
        try {
            const token = authService.getToken();
            if (token) {
                const currentUser = await authService.getProfile();
                setUser(currentUser);
            }
        } catch (error) {
            console.warn('Error al verificar autenticación:', error);
            authService.logout();
        } finally {
            setIsLoading(false);
        }
    };

    const login = (userData: User, token: string): void => {
        authService.saveAuthData({
            access_token: token,
            token_type: 'Bearer',
            user: userData
        });
        setUser(userData);
    };

    const logout = (): void => {
        authService.logout();
        setUser(null);
    };

    const updateUser = (userData: User): void => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // ===== VALOR DEL CONTEXTO =====
    const contextValue: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
