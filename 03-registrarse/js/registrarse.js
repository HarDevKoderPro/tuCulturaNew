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
  // Valido inputs vacíos
  if (Libreria.hayInputsVacios()) {
    Libreria.sweetAlertError("Faltan Datos...", "1em");
  } else {
    // Si los datos estan completos, los extraigo
    let datosUsuario = Libreria.obtenerDatosInputs();
    if (
      // Verifico que tengan formato valido de Email
      Libreria.emailValido(datosUsuario.email) &&
      Libreria.emailValido(datosUsuario.referidoPor)
    ) {
      // Consulto que Email y Referente ingresados existan en la base de datos
      Libreria.consultarDatos(datosUsuario, "php/validarEmails.php", (data) => {
        if (data.emailExists && data.referenteExists) {
          Libreria.sweetAlertError("Email ya existe!",'0.8em');
        } else if (data.emailExists && !data.referenteExists) {
          Libreria.sweetAlertError("Email ya existe, Referente no registrado!",'0.8em');
        } else if (!data.emailExists && !data.referenteExists) {
          Libreria.sweetAlertError("Referente no registrado!",'0.8em');
        } else {
          Libreria.sweetAlertExito("Registro Exitoso!",'0.8em');
          setTimeout(()=>{Libreria.redireccionarA('../00-enConstruccion/enConstruccion.html')}, 1500)
        }
      });

      // Libreria.enviarDatosServer(datosUsuario); //Envio datos al servidor (base de datos)
    } else {
      Libreria.sweetAlertError("Email no válido", "1em");
    }
  }
});
