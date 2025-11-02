importar { Terminal } desde "@es-js/terminal"
importar { obtenerJson } desde "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js"
importar { validarSecreto } desde "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js"

asincrono funcion inicio() {
  Terminal.escribir("Hola! Ingresa la palabra secreta:")

  var secreto = esperar Terminal.leer()

  var dni = "45425298" 

  si (esperar validarSecreto(dni, secreto)) {
    esperar mostrarCotizacion()
  } sino {
    Terminal.escribir(" Palabra secreta inválida")
  }

  Terminal.escribir("\nPresiona ENTER para volver a ingresar")

  esperar Terminal.leerEnter()

  Terminal.limpiar()

  inicio()
}

asincrono funcion mostrarCotizacion() {
  Terminal.escribir("Obteniendo cotización del Dólar Blue... ")

  var url = "https://dolarapi.com/v1/dolares/blue"
  var datos = esperar obtenerJson(url)

  var compra = datos.compra
  var venta = datos.venta
  var promedio = (compra + venta) / 2
  var fecha = new Date(datos.fechaActualizacion).toLocaleString("es-AR")

  Terminal.escribir("\n Cotización del Dólar Blue en Argentina:")
  Terminal.escribir("-------------------------------------------")
  Terminal.escribir(" Compra: $" + compra)
  Terminal.escribir(" Venta:  $" + venta)
  Terminal.escribir(" Promedio: $" + promedio.toFixed(2))
  Terminal.escribir(" Fecha de actualización: " + fecha)
  Terminal.escribir("-------------------------------------------\n")
}

inicio()
