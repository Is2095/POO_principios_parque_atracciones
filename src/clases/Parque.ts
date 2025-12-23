import { ATRACCIONES, ATRACCIONESVALIDAS } from "../constantes/constantes";
import { EstadoAtraccion } from "../interfaces/enum";
import { Datos, DatosParaAgregarAtraccion } from "../interfaces/interface";
import { Atraccion } from "./Atracciones";
import { Carrusel } from "./Carrusel";
import { CasaDelTerror } from "./CasaDelTerror";
import { MontanaRusa } from "./MontanaRusa";

export class Parque {
  #parque: Atraccion[] = [];


  nombreAtraccion(indexAtraccion: number): string {
    const atraccion = this.#parque[indexAtraccion]
    if(atraccion !== undefined) return atraccion.nombre
    return "Atracción sin nombre"
  }
  mostrarAtraccionesDe(indexAtraccion: number) {
    // this.#parque.filter((atraccion) => atraccion === ATRACCIONES[indexAtraccion])
  }

  agregarAtraccionAlParque(atraccion: Atraccion) {
    this.#parque.push(atraccion);
  }

  listarAtracciones(): { nombre: string; estado: EstadoAtraccion }[] {
    console.log("\n=== Lista de Atracciones ===");
    return this.#parque.map((atraccion) => ({
      nombre: atraccion.nombre,
      estado: atraccion.estado,
    }));
  }
  listarAtraccionesActivas(): string[] {
    console.log("\n=== Lista de Atracciones ===");

    if (this.#parque.length === 0) console.log("No hay atracciones agregadas");

    const atraccionesDisponibles = this.#parque
      .filter((a) => a.estado === EstadoAtraccion.ACTIVO)
      .map((atraccion) => atraccion.nombre);
    return atraccionesDisponibles;
  }

  activarAtraccion(index: number) {
    if (this.validarIndex(index)) this.#parque[index]?.activar();
  }

  desactivarAtraccion(index: number) {
    if (this.validarIndex(index)) this.#parque[index]?.desactivar();
  }

  ingresarPersonas(index: number, cantidadDePersonas: number) {
    if (this.validarIndex(index))
      this.#parque[index]?.ingresarPersonas(cantidadDePersonas);
  }

  calcularCostoTotalOperativo(): number {
    return this.#parque.reduce(
      (total, a) => total + a.calcularCostoOperacion(),
      0
    );
  }

  calcularCostoAtraccion(index: number): number {
    if (this.validarIndex(index) && this.#parque[index]) {
      return this.#parque[index]?.calcularCostoOperacion();
    }
    return 0;
  }

  agregarAtraccion(datosParaAgregarAtraccion: DatosParaAgregarAtraccion) {
    if (
      ATRACCIONES[datosParaAgregarAtraccion.index] ===
        ATRACCIONESVALIDAS.MONTANARUSA &&
      datosParaAgregarAtraccion.alturaMinima !== undefined
    ) {
      const atraccionMontanaRusa = new MontanaRusa(
        datosParaAgregarAtraccion.nombre,
        datosParaAgregarAtraccion.precio,
        datosParaAgregarAtraccion.capacidad,
        datosParaAgregarAtraccion.alturaMinima
      );
      this.#parque.push(atraccionMontanaRusa);
    } else if (
      ATRACCIONES[datosParaAgregarAtraccion.index] ===
        ATRACCIONESVALIDAS.CASADELTERROR &&
      datosParaAgregarAtraccion.horaApertura &&
      datosParaAgregarAtraccion.horaCierre
    ) {
      const atraccionCasaDelTerror = new CasaDelTerror(
        datosParaAgregarAtraccion.nombre,
        datosParaAgregarAtraccion.precio,
        datosParaAgregarAtraccion.capacidad,
        datosParaAgregarAtraccion.horaApertura,
        datosParaAgregarAtraccion.horaCierre
      );
      this.#parque.push(atraccionCasaDelTerror);
    } else if (
      ATRACCIONES[datosParaAgregarAtraccion.index] ===
        ATRACCIONESVALIDAS.CARRUSEL &&
      datosParaAgregarAtraccion.enMantenimiento !== undefined
    ) {
      const atraccionCarrusel = new Carrusel(
        datosParaAgregarAtraccion.nombre,
        datosParaAgregarAtraccion.precio,
        datosParaAgregarAtraccion.capacidad,
        datosParaAgregarAtraccion.enMantenimiento
      );
      this.#parque.push(atraccionCarrusel);
    }

    return;
  }

  mostrarDatosAtracción(index: number) {
    if (this.validarIndex(index) && this.#parque[index]) {
      return this.#parque[index].mostrarInformacion()
    }
  }

  private validarIndex(index: number): boolean {
    if (index < 0 || index >= ATRACCIONES.length) {
      throw new Error("Atracción inválida");
    }
    return true;
  }
  validarDatos(index: number, datos: Datos): boolean {
    if (datos.horaApertura !== undefined && datos.horaCierre !== undefined) {
      const horaApertura = datos.horaApertura;
      const horaCierre = datos.horaCierre;
      if (
        !(
          (horaApertura >= 22 && horaApertura <= 24) ||
          (horaApertura > 0 && horaApertura <= 3)
        )
      )
        throw new Error(
          "El horario de apertura de este juego debe ser a partir de las 3hs a 22hs"
        );
      if (
        !(
          (horaCierre >= 23 && horaCierre <= 24) ||
          (horaCierre >= 0 && horaCierre <= 6)
        )
      )
        throw new Error("El horario de cierre debe ser de 23hs a 6hs");

      const aperturaMin = horaApertura < 4 ? horaApertura + 24 : horaApertura;
      const cierreMin = horaCierre < 7 ? horaCierre + 24 : horaCierre;

      if (!(cierreMin > aperturaMin))
        throw new Error("La hora de cierre debe ser mayor que la de apertura");
    }

    if (!this.validarIndex(index)) throw new Error("Atracción inválida");

    return true;
  }
}
