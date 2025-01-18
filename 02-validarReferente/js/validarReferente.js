("use strict");
// Se importan funcionalidades desde libreria externa
import { Libreria } from "../../libreria.js";

setTimeout(() => {
  // -----------------------------------------------------------------
  // REFERENCIAS DEL DOM
  // -----------------------------------------------------------------
  const inputReferente = document.getElementById("inputReferente");
  const btnValidarReferente = document.getElementById("btnValidarReferente");

  // -----------------------------------------------------------------
  // PROGRAMA PRINCIPAL
  // -----------------------------------------------------------------
  btnValidarReferente.addEventListener("click", async () => {
    if (inputReferente.value === "") {
      Libreria.sweetAlertError("Ingresa referente", "1em");
    } else {
      const email = inputReferente.value;
      if (!Libreria.emailValido(inputReferente.value)) {
        Libreria.sweetAlertError("Email no válido", "1em");
      } else {
        const data = { email }; //Convierto dato a JSON para enviarlo a PHP
        Libreria.consultarReferente(data); //Consulto Referente en la base de datos
      }
    }
  });
}, 50);
