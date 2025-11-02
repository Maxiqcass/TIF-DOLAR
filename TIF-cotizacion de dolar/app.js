// ...existing code...
import { Terminal } from "@es-js/terminal"
import { obtenerJson } from "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js"
import { validarSecreto } from "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js"

async function inicio() {
  Terminal.escribir("Hola! Ingresa la palabra secreta:")
  const secreto = await Terminal.leer()
  const dni = "45425298"

  try {
    if (await validarSecreto(dni, secreto)) {
      await mostrarCotizacion()
    } else {
      Terminal.escribir("Palabra secreta inválida")
    }
  } catch (err) {
    Terminal.escribir("Error: " + err.message)
  }

  Terminal.escribir("\nPresiona ENTER para volver a ingresar")
  await Terminal.leerEnter()
  Terminal.limpiar()
  inicio()
}

async function mostrarCotizacion() {
  Terminal.escribir("Obteniendo cotización del Dólar Blue... ")

  const url = "https://dolarapi.com/v1/dolares/blue"
  let datos
  try {
    datos = await obtenerJson(url)
  } catch (err) {
    Terminal.escribir("No se pudo obtener la cotización: " + err.message)
    return
  }

  const compra = Number(datos.compra)
  const venta = Number(datos.venta)
  const promedio = (compra + venta) / 2
  const fecha = new Date(datos.fechaActualizacion).toLocaleString("es-AR")

  Terminal.escribir("\n Cotización del Dólar Blue en Argentina:")
  Terminal.escribir("-------------------------------------------")
  Terminal.escribir(" Compra: $" + compra)
  Terminal.escribir(" Venta:  $" + venta)
  Terminal.escribir(" Promedio: $" + promedio.toFixed(2))
  Terminal.escribir(" Fecha de actualización: " + fecha)
  Terminal.escribir("-------------------------------------------\n")
}

inicio()
// ...existing code...
