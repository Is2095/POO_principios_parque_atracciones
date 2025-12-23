import { DatosParaMostrarAtraccion } from "../interfaces/interface";
import { Atraccion } from "./Atracciones";

export class CasaDelTerror extends Atraccion {
  #horaApertura: number;
  #horaCierre: number;
  static costoOperativoCasaDelTerror = 0.6;

  constructor(
    nombre: string,
    precioBaseEntrada: number,
    capacidadMaximaDePersonas: number,
    apertura: number,
    cierre: number
  ) {
    super(nombre, precioBaseEntrada, capacidadMaximaDePersonas);
    this.#horaApertura = apertura;
    this.#horaCierre = cierre;
  }
  public calcularCostoOperacion(): number {
    return (
      this.precioBaseEntrada *
      CasaDelTerror.costoOperativoCasaDelTerror *
      this.capacidadMaxima
    );
  }
  override mostrarInformacion(): DatosParaMostrarAtraccion {
    const datosDelSuper = super.mostrarInformacion();
    return { ...datosDelSuper, horaApertura: this.#horaApertura, horaCierre: this.#horaCierre };
  }
}
