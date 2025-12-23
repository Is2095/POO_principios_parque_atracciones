# 🎡 Sistema de Gestión de Parque de Atracciones

Proyecto de consola desarrollado en **TypeScript** que simula la gestión de un parque de atracciones.  
Permite administrar atracciones, controlar su estado operativo, gestionar el ingreso de personas y calcular costos de operación, aplicando **Programación Orientada a Objetos (POO)** y buenas prácticas de diseño.

---

## 📌 Objetivo del proyecto

El objetivo principal es **practicar y consolidar conceptos de POO en TypeScript**, tales como:

- Abstracción
- Encapsulamiento
- Herencia
- Polimorfismo
- Uso de enums e interfaces
- Validación de datos
- Manejo de errores
- Arquitectura modular

Todo esto implementado en un **menú interactivo por consola**.

---

## 🧠 Conceptos de POO aplicados

El proyecto hace uso de:

- **Clases abstractas** para definir comportamientos comunes de las atracciones
- **Herencia** para especializar distintos tipos de atracciones
- **Encapsulamiento** mediante atributos privados y métodos públicos
- **Interfaces** para tipar datos que se muestran o se transfieren
- **Enums / constantes** para tipos de atracciones
- **Validaciones** para entradas del usuario
- **Separación de responsabilidades** (clases, interfaces, constantes)

---

## 🏗️ Funcionalidades principales

Desde el menú principal el usuario puede:

1. ➕ Agregar nuevas atracciones (con datos específicos según el tipo)
2. 📋 Ver el estado de todas las atracciones
3. 👥 Ingresar personas a una atracción
4. ✔ Activar / ✖ Desactivar atracciones
5. 💲 Calcular el costo de operación:
   - De una atracción específica
   - De todo el parque
6. 🔍 Ver datos detallados de una atracción
9. 🚪 Salir del sistema

---

## 📂 Estructura general del proyecto

```text
src/
│
├── clases/
│   ├── Parque.ts
│   ├── Atraccion.ts
│   └── (clases específicas de atracciones)
│
├── interfaces/
│   ├── interface.ts
│   └── enum.ts
│
├── constantes/
│   └── constantes.ts
│
└── index.ts
```

---

## 🛠️ Tecnologías utilizadas

- **TypeScript**
- **Node.js**
- **readline-sync** (entrada de datos por consola)

---

## ▶️ Cómo ejecutar el proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Is2095/POO_principios_parque_atracciones.git
cd POO_principios_parque_atracciones
```
### 2️⃣ Instalar dependencias
```bash
npm install
```
### 3️⃣ Ejecutar el proyecto
```bash
npm run dev
```

---

## 📋 Ejemplo de uso por consola

```text
Bienvenido al sistema del Parque de Atracciones 🎡

1. Agregar nueva atracción
2. Ver estado de todas las atracciones
3. Ingresar personas a una atracción
4. Activar/Desactivar atracción
5. Calcular costo total de operación
6. Ver datos de atracción
9. Salir
```

### El sistema valida:

- Campos vacíos
- Valores numéricos inválidos
- Cantidades menores o iguales a cero
- Selecciones incorrectas del menú

---

## ✅ Validaciones implementadas

- Nombre no vacío y con longitud mínima
- Precio base mayor a 0
- Capacidad máxima mayor a 0
- Manejo de errores ante entradas no numéricas
- Cancelación segura de selecciones

---

## 🎯 Aprendizajes clave

- Diseño de un sistema orientado a objetos completo
- Modelado de un dominio real (parque de atracciones)
- Manejo de estado y lógica de negocio
- Uso correcto de TypeScript en proyectos de consola
- Mejora de la experiencia del usuario en CLI

---

## 🚀 Posibles mejoras futuras

- Persistencia de datos (JSON o base de datos)
- Tests unitarios
- Refactorización de validaciones en una clase común
- Uso de patrones de diseño (Factory, Strategy)
- Interfaz gráfica o API REST

---

## ✍️ Autor

**Ismael Díaz**  
Desarrollador Full Stack con enfoque en backend 

🔗 [LinkedIn](https://www.linkedin.com/in/ismael-diaz-3b440b27a/)

Proyecto realizado como práctica de Programación Orientada a Objetos en TypeScript.