"use strict";

// Importo libreria de funciones
import { Libreria } from "../../libreria.js";

// -----------------------------------------------------------------
// REFERENCIAS DEL DOM
// -----------------------------------------------------------------
const getEl = (id) => document.getElementById(id);
const inputNombre = getEl("inputNombre");
const inputApellido = getEl("inputApellido");
const inputDocumento = getEl("inputDocumento");
const inputTelefono = getEl("inputTelefono");
const inputEmail = getEl("inputEmail");
const inputPass = getEl("inputPass");
const inputReferidoPor = getEl("inputReferidoPor");
const btnRegistrar = getEl("btnRegistrar");

// -----------------------------------------------------------------
// PROGRAMA PRINCIPAL
// -----------------------------------------------------------------

// Acciones al presionar botón de envío de datos
btnRegistrar.addEventListener("click", () => {
  if (Libreria.hayInputsVacios()) {
    Libreria.sweetAlertError("Faltan Datos...", "1em");
  } else {
    let datosUsuario = Libreria.obtenerDatosInputs(); // obtengo datos a enviar (inputs)
    if (
      Libreria.emailValido(datosUsuario.email) &&
      Libreria.emailValido(datosUsuario.referidoPor)
    ) {
      Libreria.enviarDatosServer(datosUsuario); //Envio datos al servidor (base de datos)
    } else {
      Libreria.sweetAlertError("Email no válido", "1em");
    }
  }
});
