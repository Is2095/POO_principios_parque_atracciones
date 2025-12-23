import { EstadoAtraccion } from "./enum";

export interface Datos {
  horaApertura?: number;
  horaCierre?: number;
  alturaMinima?: number;
}

export interface DatosParaAgregarAtraccion {
  index: number
  nombre: string;
  precio: number;
  capacidad: number;
  alturaMinima?: number;
  horaApertura?: number;
  horaCierre?: number;
  enMantenimiento?: boolean;
}

export interface DatosParaMostrarAtraccion {
  nombre: string, 
  precioBaseEntrada: number, 
  capacidadMaximaDePersonas: number, 
  cantidadPersonasActuales: number, 
  estado: EstadoAtraccion,
  alturaMinima?: number;
  horaApertura?: number;
  horaCierre?: number;
  enMantenimiento?: boolean;
}
