import { EstadoAtraccion } from "../interfaces/enum";
import { DatosParaMostrarAtraccion } from "../interfaces/interface";

export abstract class Atraccion {
  #nombre: string;
  #precioBaseEntrada: number;
  #capacidadMaximaDePersonas: number;
  #cantidadPersonasActuales: number = 0;
  #estado: EstadoAtraccion;

  constructor(
    nombre: string,
    precioBaseEntrada: number,
    capacidadMaximaDePersonas: number
  ) {
    this.#nombre = nombre;
    this.#precioBaseEntrada = precioBaseEntrada;
    this.#capacidadMaximaDePersonas = capacidadMaximaDePersonas;
    this.#estado = EstadoAtraccion.ACTIVO;
  }

  get nombre(): string {
    return this.#nombre;
  }
  get precioBaseEntrada(): number {
    return this.#precioBaseEntrada;
  }
  get capacidadMaxima(): number {
    return this.#capacidadMaximaDePersonas;
  }
  get cantidadPersonasActuales(): number {
    return this.#cantidadPersonasActuales;
  }
  get estado(): EstadoAtraccion {
    return this.#estado;
  }

  // Metodos protegidos de modificación
  protected set agregarPersonas(cantidad: number) {
    if (
      cantidad >= 0 &&
      this.cantidadPersonasActuales + cantidad <=
        this.capacidadMaxima
    ) {
      this.#cantidadPersonasActuales += cantidad;
    } else throw new Error("No se puede ingresar ese número de personas.");
  }

  protected set estado(estado: EstadoAtraccion) {
    this.#estado = estado;
  }

  // Métodos comunes
  public activar() {
    this.#estado = EstadoAtraccion.ACTIVO;
  }

  public desactivar() {
    this.#estado = EstadoAtraccion.INACTIVO;
    this.#cantidadPersonasActuales = 0;
  }
  public ingresarPersonas(cantidad: number): void {
    if (cantidad <= 0)
      throw new Error("La cantidad de personas debe ser mayor a 0");
    if (this.estado === EstadoAtraccion.INACTIVO)
      throw new Error("La atracción elegida no está activa");
    this.agregarPersonas = cantidad;
  }

  public mostrarInformacion(): DatosParaMostrarAtraccion {

    const datosAtraccion = {
      nombre: this.nombre,
      precioBaseEntrada: this.precioBaseEntrada,
      capacidadMaximaDePersonas: this.capacidadMaxima,
      cantidadPersonasActuales: this.cantidadPersonasActuales,
      estado: this.estado
      }
      return datosAtraccion
  }

  abstract calcularCostoOperacion(): number;
}
