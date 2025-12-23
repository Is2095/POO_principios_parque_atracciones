import * as readlineSync from "readline-sync";
import { Parque } from "./clases/Parque";
import { ATRACCIONES } from "./constantes/constantes";
import { DatosParaMostrarAtraccion } from "./interfaces/interface";

const parque = new Parque();

function mostrarEstadosDeTodasLasAtraciones() {
  const listaAtracciones = parque.listarAtracciones();
  console.log("📋 Mostrando estados de todas las atracciones...");
  listaAtracciones.forEach((a, i) =>
    console.log(`${i + 1}. ${a.nombre} - Estado: ${a.estado}`)
  );
}
function mostrarDatosDeLaAtraccion(datosAMostrar: DatosParaMostrarAtraccion) {
  console.log("📋 Mostrando datos de la atracción...");
  console.log(`-- Nombre atracción: ${datosAMostrar.nombre} --\n`);
  console.log(
    `-- El precio de la entrada es: ${datosAMostrar.precioBaseEntrada} --\n`
  );
  console.log(
    `-- La capacidad máxima de personas es: ${datosAMostrar.capacidadMaximaDePersonas} --\n`
  );
  console.log(
    `-- La cantidad actual de personas es:  ${datosAMostrar.cantidadPersonasActuales} --\n`
  );
  console.log(
    `-- Estado operativo de la atracción es: ${datosAMostrar.estado} --\n`
  );

  datosAMostrar.alturaMinima
    ? console.log(
        `-- La altura mínima requerida es de: ${datosAMostrar.alturaMinima} --\n`
      )
    : "";
  datosAMostrar.enMantenimiento !== undefined
    ? console.log(
        `-- La atracción está en mantenimiento?: ${datosAMostrar.enMantenimiento} --\n`
      )
    : "";
  datosAMostrar.horaApertura
    ? console.log(
        `-- La hora de apertura de la atracción es de: ${datosAMostrar.horaApertura} --\n`
      )
    : "";
  datosAMostrar.horaCierre
    ? console.log(
        `-- La hora de cierre de la atracción es de: ${datosAMostrar.horaCierre} --\n`
      )
    : "";
}

function ingresarPersonas(
  indexAtraccion: number | undefined,
  cantidad: number
) {
  if (indexAtraccion !== undefined && cantidad >= 0) {
    parque.ingresarPersonas(indexAtraccion, cantidad);
  } else throw new Error("Error en el ingreso de datos.");

  console.log(
    `👥 Ingresando ${cantidad} personas a ${parque.nombreAtraccion(
      indexAtraccion
    )}`
  );
}

function activarDesactivar(
  indexAtraccionActivarDesactiva: number,
  activar: boolean
) {
  activar
    ? parque.activarAtraccion(indexAtraccionActivarDesactiva)
    : parque.desactivarAtraccion(indexAtraccionActivarDesactiva);
  console.log(`${activar ? "✔ Activando" : "✖ Desactivando"} la atracción`);
}

function calcularCosto(indexAtraccionParaCalcularCosto: number | null) {
  if (indexAtraccionParaCalcularCosto !== null) {
    const valorCostoDeLaAtraccion = parque.calcularCostoAtraccion(
      indexAtraccionParaCalcularCosto
    );
    console.log(
      `💲 Costo de operación de ${indexAtraccionParaCalcularCosto}: ...`,
      valorCostoDeLaAtraccion
    );
  } else {
    const valorCostoTotalDeOperacion = parque.calcularCostoTotalOperativo();
    if (valorCostoTotalDeOperacion === 0) {
      console.log(
        "No hay ATRACCIONES habilitadas para calcular el costo operativo"
      );
    } else
      console.log(
        "💲 Costo total de operación del parque: ...",
        valorCostoTotalDeOperacion
      );
  }
}

function pedirNombre(): string {
  let nombre: string;

  do {
    nombre = readlineSync.question("\nNombre: ").trim();

    if (nombre === "") {
      console.log("❌ El nombre no puede estar vacío. Intente nuevamente.");
    }
    if (nombre.length < 2) {
      console.log("❌ El nombre debe tener al menos 2 caracteres.");
    }
  } while (nombre === "");
  return nombre;
}

function pedirPrecioBaseDeAtraccion(): number {
  let precio: number = 0;

  do {
    try {
      precio = readlineSync.questionFloat("Precio base de entrada: ");

      if (precio <= 0) {
        console.log("❌ El precio debe ser mayor a 0. Intente nuevamente.");
      }
    } catch {
      console.log("❌ Debe ingresar un número válido.");
      precio = 0;
    }
  } while (precio <= 0);

  return precio;
}
function pedirCapacidadMaximasDePersonas(): number {
  let capacidad: number = 0;

  do {
    try {
      capacidad = readlineSync.questionInt("Capacidad máxima de personas: ");

      if (capacidad <= 0) {
        console.log(
          "❌ La capacidad de la atracción debe ser mayor a 0. Intente nuevamente."
        );
      }
    } catch {
      console.log("❌ Debe ingresar un número válido.");
      capacidad = 0;
    }
  } while (capacidad <= 0);

  return capacidad;
}

function elegirAtraccio(pregunta: string): number {
  const atracciones: string[] = parque.listarAtraccionesActivas();
  if (atracciones.length === 0) return -1;

  const index = readlineSync.keyInSelect(atracciones, pregunta);
  return index;
}

function elegirAtraccion(pregunta: string): string | undefined {
  const index = readlineSync.keyInSelect(ATRACCIONES, pregunta);

  const nombre = pedirNombre();
  const precio = pedirPrecioBaseDeAtraccion();
  const capacidad = pedirCapacidadMaximasDePersonas();

  if (ATRACCIONES[index] != undefined) {
  } else throw new Error("Atracción no encontrada");
  try {
    if (index === 0) {
      const altura = readlineSync.question(
        "Altura mínima requerida (ejemplo: 1.75 o 1,75): "
      );
      const entradaNormalizada = altura.replace(",", ".");
      const alturaMinima = parseFloat(entradaNormalizada);

      parque.agregarAtraccion({
        index,
        nombre,
        precio,
        capacidad,
        alturaMinima,
      });
      console.log("\n Atracción guardada");
    } else if (index === 1) {
      const apertura = readlineSync.questionInt("Hora de apertura (24h): ");
      const cierre = readlineSync.questionInt("Hora de cierre (24h): ");

      if (
        parque.validarDatos(index, {
          horaApertura: apertura,
          horaCierre: cierre,
        })
      ) {
        parque.agregarAtraccion({
          index,
          nombre,
          precio,
          capacidad,
          horaApertura: apertura,
          horaCierre: cierre,
        });
      }
      console.log("\n Atracción guardada");
      return;
    } else if (index === 2) {
      const mantenimiento = readlineSync.keyInYN(
        "La atracción estará en mantenimiento?: "
      );
      if (typeof mantenimiento === "boolean") {
        parque.agregarAtraccion({
          index,
          nombre,
          precio,
          capacidad,
          enMantenimiento: mantenimiento,
        });
        console.log("\n Atracción guardada");
      } else {
        throw new Error("valor inadecuado");
      }
    } else {
      throw new Error("Opción no válida");
    }
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
  }
  return ATRACCIONES[index - 1];
}

// ---------------------------------------------------------------------
// Menú principal
// ---------------------------------------------------------------------

function mostrarMenu() {
  let salir = false;

  console.log("Bienvenido al sistema del Parque de Atracciones 🎡");

  while (!salir) {
    console.log(`
1. Agregar nueva atracción
2. Ver estado de todas las atracciones
3. Ingresar personas a una atracción
4. Activar/Desactivar atracción
5. Calcular costo total de operación
6. Ver datos de atracción
9. Salir
    `);

    const opcion = readlineSync.questionInt("Elegí una opción: ");

    switch (opcion) {
      case 1:
        console.log("Elegí qué atracción querés agregar:");
        const tipo = elegirAtraccion("Seleccioná tipo de atracción:");
        break;

      case 2:
        mostrarEstadosDeTodasLasAtraciones();
        break;

      case 3:
        const indexAtraccion = elegirAtraccio(
          "¿A qué atracción querés ingresar personas?"
        );
        if (indexAtraccion !== -1) {
          const cantidad = readlineSync.questionInt("¿Cuántas personas? ");
          ingresarPersonas(indexAtraccion, cantidad);
        }
        break;

      case 4:
        const indexAtraccionActivarDesactiva = elegirAtraccio(
          "Seleccioná la atracción:"
        );
        if (indexAtraccionActivarDesactiva !== -1) {
          const activarYN = readlineSync.keyInYN(
            "¿Querés ACTIVAR la atracción? (N = desactivar)"
          );
          const activar: boolean = activarYN === true;
          activarDesactivar(indexAtraccionActivarDesactiva, activar);
        }
        break;

      case 5:
        console.log("¿Qué costo querés calcular?");
        const opcionesCosto = ["Una atracción específica", "Todo el parque"];
        const selector = readlineSync.keyInSelect(
          opcionesCosto,
          "Elegí una opción:"
        );

        if (selector === 0) {
          const indexAtraccionParaCalcularCosto = elegirAtraccio(
            "Seleccioná la atracción:"
          );
          if (indexAtraccionParaCalcularCosto !== -1)
            calcularCosto(indexAtraccionParaCalcularCosto);
        } else if (selector === 1) {
          calcularCosto(null);
        } else {
          console.log("Operación cancelada.");
        }
        break;

      case 6:
        const indexAtraccionMostrarDatos = elegirAtraccio(
          "Seleccioná la atracción para ver los detalles: "
        );
        if (indexAtraccionMostrarDatos !== -1) {
          const datosDeAtraccion = parque.mostrarDatosAtracción(
            indexAtraccionMostrarDatos
          );
          if (datosDeAtraccion !== undefined)
            mostrarDatosDeLaAtraccion(datosDeAtraccion);
        }
        break;

      case 9:
        console.log("Gracias por venir 🎉");
        salir = true;
        break;

      default:
        console.log("❌ Opción inválida, intentá nuevamente.");
        break;
    }
  }
}

// Ejecutar menú
mostrarMenu();
