import { Atraccion } from "./Atracciones";
import { DatosParaMostrarAtraccion } from "../interfaces/interface";

export class MontanaRusa extends Atraccion {
  #alturaMinima: number;
  static costoDeOperacion: number = 0.9;

  constructor(
    nombre: string,
    precioBaseEntrada: number,
    capacidadMaximaDePersonas: number,
    alturaMinima: number
  ) {
    super(nombre, precioBaseEntrada, capacidadMaximaDePersonas);
    this.#alturaMinima = alturaMinima;
  }
  public calcularCostoOperacion(): number {
    return (
      this.precioBaseEntrada *
      MontanaRusa.costoDeOperacion *
      this.capacidadMaxima
    );
  }
  public validarAlturaVisitante(altura: number): boolean {
    return altura >= this.#alturaMinima;
  }
  override mostrarInformacion(): DatosParaMostrarAtraccion  {
     const datosDelSuper = super.mostrarInformacion();
     return {...datosDelSuper, alturaMinima: this.#alturaMinima}
  }
}
