"use strict";

// Clase de Funciones
export class Libreria {
  // Borrado de Inputs
  static borrarInputs() {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
  }

  // Validación de Email
  static emailValido(email) {
    let regex = /^\w+@\w+\.\w+$/gi;
    return regex.test(email) ? true : false;
  }

  // SweetAlert de Error
  static sweetAlertError(message, fontSize) {
    Swal.fire({
      position: "center",
      width: "250px",
      heightAuto: false,
      showConfirmButton: false,
      background: "#E6B0AA",
      icon: "error",
      iconColor: "red",
      color: "red",
      timer: 1300,
      // Personaliza el tamaño del mensaje
      html: `<div style="font-size: ${fontSize}; text-align: center; font-weight:bold">${message}</div>`,
    });
  }

  // SweetAlert de Éxito
  static sweetAlertExito(message, fontSize) {
    Swal.fire({
      position: "center",
      width: "250px",
      heightAuto: false,
      showConfirmButton: false,
      background: "#ABEBC6",
      icon: "success",
      iconColor: "green",
      color: "green",
      timer: 1300,
      // Personaliza el tamaño del mensaje
      html: `<div style="font-size: ${fontSize}; text-align: center; font-weight:bold">${message}</div>`,
    });
  }

  // SweetAlert de Confirmación
  static sweetAlertConfirmacion(mensaje, tamanoTitulo, callback) {
    Swal.fire({
      title: mensaje,
      position: "center",
      icon: "warning",
      iconColor: "#F39C12",
      background: "#F9E79F",
      width: "300px",
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      // Modificar el estilo del título directamente
      didOpen: () => {
        const title = document.querySelector(".swal2-title");
        if (title) {
          title.style.fontSize = tamanoTitulo; // Ajustar el tamaño del título
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  // Consultar Referente en Base de Datos
  static consultarReferente(data) {
    // Envio de datos Js a variables PHP con fetch
    fetch("php/validarReferente.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // Respuesta desde archivo PHP (mensaje)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta PHP: ", data);
        // Si se encontró al referente...
        if (data.mensaje === true) {
          Libreria.sweetAlertExito("Referente confirmado", ".8em");
          Libreria.borrarInputs();
          // Espera un tiempo para solicitar confirmacion de registro
          setTimeout(() => {
            Libreria.sweetAlertConfirmacion(
              "¿Deseas registrarte?",
              "1.1em",
              (confirmado) => {
                if (confirmado) {
                  window.location.href = "../03-registrarse/registrarse.html";
                } else {
                  window.location.href = "./validarReferente.html";
                }
              }
            );
          }, 1500);
        } else {
          Libreria.sweetAlertError("Referente no existe", ".8em");
        }
      })

      // Captura de errores
      .catch((error) => console.error("Error:", error));
  }
}
