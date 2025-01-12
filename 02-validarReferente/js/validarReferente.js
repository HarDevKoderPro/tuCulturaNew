// "use strict";

// Variables Globales

// Referencias del DOM
const inputReferente = document.getElementById("inputReferente");
const btnValidarReferente = document.getElementById("btnValidarReferente");

// Funciones
// Validar formato de email
function validarEmail(email) {
  let regex = /^\w+@\w+\.\w+$/gi;
  return regex.test(email);
}

// Sweet Alert Error
function sweetAlertError(mensaje) {
  Swal.fire({
    position: "center",
    width: "300px",
    heightAuto: false,
    showConfirmButton: false,
    title: mensaje,
    background: "#E6B0AA",
    icon: "error",
    iconColor: "red",
    color: "red",
    timer: 2000,
    customClass: {
      title: "swal-title", // Clase personalizada para el título
    },
  });
}

// Sweet Alert Exito
function sweetAlertExito(mensaje) {
  Swal.fire({
    position: "center",
    width: "300px",
    heightAuto: false,
    showConfirmButton: false,
    title: mensaje,
    background: "#ABEBC6",
    icon: "success",
    iconColor: "green",
    color: "green",
    timer: 2000,
  });
}

// Sweet Alert de confirmacion
const sweetAlertConfirmacion = (mensaje, callback) => {
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
    confirmButtonText: "Si",
    cancelButtonText: "No",
    customClass: {
      title: "swal-title", // Clase personalizada para el título
    },
  }).then((result) => {
    if (result.isConfirmed) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

// -----------------------------------------------------------------
// PROGRAMA PRINCIPAL
// -----------------------------------------------------------------

// Escuchar el evento del botón
btnValidarReferente.addEventListener("click", async () => {
  const email = inputReferente.value;

  // Validar el formato del email
  if (!validarEmail(email)) {
    sweetAlertError("Email no válido.");
    return;
  }

  // Preparar los datos para enviar
  const data = { email };

  try {
    // Realizar la solicitud POST al servidor
    const response = await fetch("php/validarReferente.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Verificar la respuesta
    if (result.success) {
      if (result.exists) {
        sweetAlertExito("");
        setTimeout(() => {
          // window.location.href = "../index.html";
          inputReferente.value = "";
        }, 1000);
        setTimeout(() => {
          sweetAlertConfirmacion("Deseas registrarte?", (respuesta) => {
            if (respuesta) {
              window.location.href = "../03-registrarse/registrarse.html";
            } else {
              window.location.href = "./validarReferente.html";
            }
          });
        }, 2000);
      } else {
        sweetAlertError("Referente no registrado");
      }
    } else {
      alert("Ocurrió un error: " + result.message);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    sweetAlertError("Error en la consulta");
  }
});
