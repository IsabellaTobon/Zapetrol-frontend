export interface Province {
  nombreProvincia: string;
  idProvincia: number;
}

export interface Municipality {
  idMunicipio: number;
  nombreMunicipio: string;
  idProvincia: number;
}

export interface PetrolStation {
  idEstacion: number;
  nombreEstacion: string;
  direccion: string;
  codPostal: string;
  localidad: string;
  horario: string;
  Gasolina95: string | null;
  Diesel: string | null;
  latitud: string;
  longitud: string;
  marca: string;
}
