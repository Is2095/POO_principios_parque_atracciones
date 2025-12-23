import { DatosParaMostrarAtraccion } from "../interfaces/interface";
import { Atraccion } from "./Atracciones";

export class Carrusel extends Atraccion {
  #mantenimiento: boolean;
  static costoOperativoCarrusel = 0.2;

  constructor(
    nombre: string,
    precioBaseEntrada: number,
    capacidadMaxima: number,
    enMantenimiento: boolean = false
  ) {
    super(nombre, precioBaseEntrada, capacidadMaxima);
    this.#mantenimiento = enMantenimiento;
  }
  public calcularCostoOperacion(): number {
    return (
      this.precioBaseEntrada *
      Carrusel.costoOperativoCarrusel *
      this.capacidadMaxima
    );
  }
  override mostrarInformacion(): DatosParaMostrarAtraccion {
    const datosDelSuper = super.mostrarInformacion();
    return { ...datosDelSuper, enMantenimiento: this.#mantenimiento };
  }
}
