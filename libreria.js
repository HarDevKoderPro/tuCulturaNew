"use strict";

// Clase de Funciones
export class Libreria {
  // Validar Inputs Vacíos
  static hayInputsVacios() {
    const inputsArr = document.querySelectorAll("input");
    return [...inputsArr].some((input) => input.value === "");
  }

  // Validar Email
  static emailValido(email) {
    let regex = /^\w+@\w+\.\w+$/gi;
    return regex.test(email) ? true : false;
  }

  // Borrar Inputs
  static borrarInputs() {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
  }

  // Obtener datos de los inputs
  static obtenerDatosInputs() {
    let datosUsuario = {
      nombre: inputNombre.value,
      apellido: inputApellido.value,
      documento: inputDocumento.value,
      telefono: inputTelefono.value,
      email: inputEmail.value,
      pass: inputPass.value,
      referidoPor: inputReferidoPor.value,
    };

    return datosUsuario;
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

  // Consultar Datos en Base de Datos
  static consultarDato(datosAEnviar, rutaPhp, mensajeExito, mensajeError, url) {
    // Envio de datos Js a variables PHP con fetch
    fetch(rutaPhp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosAEnviar),
    })
      // Respuesta desde archivo PHP (mensaje)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta PHP: ", data);
        // Si se encontró al referente...
        if (data.mensaje === true) {
          Libreria.sweetAlertExito(mensajeExito, ".8em");
          Libreria.borrarInputs();
          setTimeout(() => (window.location.href = url), 1500);
        } else {
          Libreria.sweetAlertError(mensajeError, ".8em");
        }
      })

      // Captura de errores
      .catch((error) => console.error("Error:", error));
  }

  // Enviar datos al servidor
  static enviarDatosServer(datosUsuario) {
    // Envio de datos Js a variables PHP con fetch
    fetch("php/registrarse.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    })
      // Respuesta desde archivo PHP (contenido variables PHP)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Datos PHP: ", data);
        Libreria.sweetAlertExito("Datos Enviados!", "1em");
        Libreria.borrarInputs();
      })

      // Captura de errores
      .catch((error) => console.error("Error:", error));
  }
}
