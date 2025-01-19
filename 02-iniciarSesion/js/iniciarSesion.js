"use strict";

// Importo librería de funciones
import { Libreria } from "../../libreria.js";

// Referencias a elementos del DOM
const getEl = (id) => document.getElementById(id);
const inputEmail = getEl("inputEmail");
const inputPass = getEl("inputPass");
const btnIniciarSesion = getEl("btnIniciarSesion");

// Programa Principal
btnIniciarSesion.addEventListener("click", () => {
  // Verifico que no hayan campos vacíos
  let hayInputsVacios = Libreria.hayInputsVacios();
  if (hayInputsVacios) {
    Libreria.sweetAlertError("Faltan datos!", "1em");
  } else {
    let esEmailValido = Libreria.emailValido(inputEmail.value);
    if (!esEmailValido) {
      Libreria.sweetAlertError("Email no válido...");
    } else {
      let usuarioAVerificar = {
        email: inputEmail.value,
        pass: inputPass.value,
      };

      let rutaPhp = "php/iniciarSesion.php";
      Libreria.consultarDato(
        usuarioAVerificar,
        rutaPhp,
        "Acceso concedido!",
        "Email o Contraseña errados!",
        "../00-enConstruccion/enConstruccion.html"
      );
    }
  }
});
