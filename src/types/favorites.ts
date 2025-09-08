// Tipos para el sistema de favoritos
export interface Favorite {
    id: number;
    userId: number;
    stationId: number;
    createdAt: string;
    // Información de la gasolinera incluida en la respuesta
    station?: {
        idEstacion: number;
        nombreEstacion: string;
        direccion: string;
        localidad: string;
        marca: string;
        Gasolina95: string | null;
        Gasolina98: string | null;
        Diesel: string | null;
    };
}

// Request para agregar favorito
export interface AddFavoriteRequest {
    stationId: number;
}
