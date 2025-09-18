import React from 'react';
import './LocationButton.css';

interface LocationButtonProps {
    onLocationRequest: () => void;
    isLoading: boolean;
    hasLocation: boolean;
    error: string | null;
    isSupported: boolean;
}

export const LocationButton: React.FC<LocationButtonProps> = ({
    onLocationRequest,
    isLoading,
    hasLocation,
    error,
    isSupported
}) => {
    if (!isSupported) {
        return (
            <div className="location-button disabled">
                <svg className="location-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                        stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                    <path d="M18 18L6 6" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>Geolocalización no disponible</span>
            </div>
        );
    }

    return (
        <div className="location-container">
            <button
                className={`location-button ${hasLocation ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
                onClick={onLocationRequest}
                disabled={isLoading}
                title="Usar mi ubicación actual"
            >
                <div className="location-content">
                    {isLoading ? (
                        <>
                            <div className="location-spinner">
                                <svg className="spinner" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"
                                        fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                                        <animate attributeName="stroke-dashoffset" dur="2s" values="31.416;0;31.416"
                                            repeatCount="indefinite" />
                                    </circle>
                                </svg>
                            </div>
                            <span>Obteniendo ubicación...</span>
                        </>
                    ) : hasLocation ? (
                        <>
                            <svg className="location-icon active" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                    fill="currentColor" />
                                <circle cx="12" cy="9" r="2.5" fill="white" />
                            </svg>
                            <span>Ubicación detectada</span>
                            <div className="location-pulse"></div>
                        </>
                    ) : (
                        <>
                            <svg className="location-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                    stroke="currentColor" strokeWidth="2" />
                                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Usar mi ubicación</span>
                        </>
                    )}
                </div>
            </button>

            {error && (
                <div className="location-error">
                    <svg className="error-icon" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};