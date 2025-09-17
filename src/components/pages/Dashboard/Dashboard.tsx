import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { userService } from '../../../services/authService';
import type { User } from '../../../types';
import { usePetrolData } from '../../../hooks/usePetrolData';
import { ProvinceSelector } from '../../petrol/ProvinceSelector';
import { MunicipalitySelector } from '../../petrol/MunicipalitySelector';
import { StationList } from '../../petrol/StationList';
import { FavoritesTab } from './FavoritesTab';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [activeTab, setActiveTab] = useState<'petrol' | 'favorites' | 'users' | 'profile'>('petrol');

    // Hook para datos de gasolineras
    const {
        provinces,
        municipalities,
        stations,
        selectedProvince,
        setSelectedProvince,
        selectedMunicipality,
        setSelectedMunicipality
    } = usePetrolData();

    // Cargar usuarios cuando se active la pestaña
    useEffect(() => {
        if (activeTab === 'users') {
            loadUsers();
        }
    }, [activeTab]);

    const loadUsers = async () => {
        setIsLoadingUsers(true);
        try {
            const allUsers = await userService.getAllUsers();
            setUsers(allUsers);
        } catch (error) {
            console.error('Error cargando usuarios:', error);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const handleLogout = () => {
        logout();
        // El redirect se manejará automáticamente por el AuthProvider
    };

    return (
        <div className="dashboard">
            {/* Header del Dashboard */}
            <header className="dashboard-header">
                <div className="container">
                    <div className="header-content">
                        <div className="brand">
                            <span className="logo">⛽</span>
                            <h1>Zapetrol Dashboard</h1>
                        </div>

                        <div className="user-info">
                            <div className="user-details">
                                <span className="user-name">Hola, {user?.name}</span>
                                <span className="user-email">{user?.email}</span>
                            </div>
                            <button onClick={handleLogout} className="btn btn-outline logout-btn">
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navegación por pestañas */}
            <nav className="dashboard-nav">
                <div className="container">
                    <div className="nav-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'petrol' ? 'active' : ''}`}
                            onClick={() => setActiveTab('petrol')}
                        >
                            🔍 Buscar Gasolineras
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            ⭐ Mis Favoritos
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            👥 Gestión de Usuarios
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            👤 Mi Perfil
                        </button>
                    </div>
                </div>
            </nav>

            {/* Contenido del Dashboard */}
            <main className="dashboard-content">
                <div className="container">

                    {/* Pestaña de Búsqueda de Gasolineras */}
                    {activeTab === 'petrol' && (
                        <div className="tab-content">
                            <div className="content-header">
                                <h2>Buscar Gasolineras</h2>
                                <p>Encuentra las mejores ofertas de combustible</p>
                            </div>

                            <div className="search-section">
                                <div className="search-controls">
                                    <ProvinceSelector
                                        provinces={provinces}
                                        selectedId={selectedProvince}
                                        onSelect={setSelectedProvince}
                                        label="Provincia"
                                        disabled={provinces.length === 0}
                                    />

                                    <MunicipalitySelector
                                        municipalities={municipalities}
                                        selectedId={selectedMunicipality}
                                        onSelect={setSelectedMunicipality}
                                        label="Municipio"
                                        disabled={!selectedProvince || municipalities.length === 0}
                                    />
                                </div>

                                {selectedMunicipality && stations.length > 0 && (
                                    <div className="results-section">
                                        <h3>Gasolineras Encontradas ({stations.length})</h3>
                                        <StationList stations={stations} />
                                    </div>
                                )}

                                {selectedMunicipality && stations.length === 0 && (
                                    <div className="no-results">
                                        <p>No se encontraron gasolineras en este municipio</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Pestaña de Favoritos */}
                    {activeTab === 'favorites' && (
                        <FavoritesTab />
                    )}

                    {/* Pestaña de Gestión de Usuarios */}
                    {activeTab === 'users' && (
                        <div className="tab-content">
                            <div className="content-header">
                                <h2>Gestión de Usuarios</h2>
                                <p>Lista de usuarios registrados en el sistema</p>
                            </div>

                            {isLoadingUsers ? (
                                <div className="loading">
                                    <p>Cargando usuarios...</p>
                                </div>
                            ) : (
                                <div className="users-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Email</th>
                                                <th>Fecha de Registro</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pestaña de Perfil */}
                    {activeTab === 'profile' && (
                        <div className="tab-content">
                            <div className="content-header">
                                <h2>Mi Perfil</h2>
                                <p>Información de tu cuenta</p>
                            </div>

                            <div className="profile-card">
                                <div className="profile-info">
                                    <div className="avatar">
                                        <span className="avatar-text">
                                            {user?.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="info-details">
                                        <h3>{user?.name}</h3>
                                        <p className="email">{user?.email}</p>
                                        <p className="join-date">
                                            Miembro desde: {user ? new Date(user.createdAt).toLocaleDateString() : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
