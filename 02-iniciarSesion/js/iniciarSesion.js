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
    Libreria.sweetAlert('error', 'Faltan datos!', '0.8em');
  } else {
    let esEmailValido = Libreria.emailValido(inputEmail.value);
    if (!esEmailValido) {
      Libreria.sweetAlert('error', 'Email no válido...', '0.8em');
    } else {
      let usuarioAVerificar = {
        email: inputEmail.value,
        pass: inputPass.value,
      };

      // Validación de Email y pass para permitir login del usuario
      Libreria.enviarDatosParaConsultas(usuarioAVerificar,"php/iniciarSesion.php", (data)=>{
        if(data.respuesta){
          Libreria.sweetAlert('exito', 'Acceso concedido!', '0.8em');
          setTimeout(() => {
            Libreria.redireccionarA("../00-enConstruccion/enConstruccion.html");
          }, 1500);
        }else{
          Libreria.sweetAlert('error', 'Email o contraseña errados!', '0.8em');
        }
      });
    }
  }
});
