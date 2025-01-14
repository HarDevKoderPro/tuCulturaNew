setTimeout(() => {
  ("use strict");
  // -----------------------------------------------------------------
  // VARIABLES GLOBALES
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // REFERENCIAS DEL DOM
  // -----------------------------------------------------------------
  const inputReferente = document.getElementById("inputReferente");
  const btnValidarReferente = document.getElementById("btnValidarReferente");

  // -----------------------------------------------------------------
  // FUNCIONES
  // -----------------------------------------------------------------
  // BORRAR INPUTS
  // -----------------------------------------------------------------
  const borrarInputs = () => {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
  };

  // -----------------------------------------------------------------
  // VALIDAR EMAIL
  //------------------------------------------------------------------
  const emailValido = (email) => {
    // Expresion regular con la estructura basica de un email
    let regex = /^\w+@\w+\.\w+$/gi;

    // Resultado de la validacion
    return regex.test(email) ? true : false;
  };

  // -----------------------------------------------------------------
  // SWEET ALERT DE ERROR
  //------------------------------------------------------------------
  const sweetAlertError = (message, fontSize) => {
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
  };

  // -----------------------------------------------------------------
  // SWEET ALERT DE EXITO
  //------------------------------------------------------------------
  const sweetAlertExito = (message, fontSize) => {
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
  };

  // -----------------------------------------------------------------
  // SWEET ALERT DE CONFIRMACION
  //------------------------------------------------------------------
  function sweetAlertConfirmacion(mensaje, tamanoTitulo, callback) {
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

  // -----------------------------------------------------------------
  // CONSULTA DE REFERENTE EN BASE DE DATOS
  //------------------------------------------------------------------
  const consultarReferente = (data) => {
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
          sweetAlertExito("Referente confirmado", ".8em");
          borrarInputs();
          // Espera un tiempo para solicitar confiracion de registro
          setTimeout(() => {
            sweetAlertConfirmacion(
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
          sweetAlertError("Referente no existe", ".8em");
        }
      })

      // Captura de errores
      .catch((error) => console.error("Error:", error));
  };

  // -----------------------------------------------------------------
  // PROGRAMA PRINCIPAL
  // -----------------------------------------------------------------
  btnValidarReferente.addEventListener("click", async () => {
    if (inputReferente.value === "") {
      sweetAlertError("Ingresa referente", "1em");
    } else {
      const email = inputReferente.value; // Obtengo email del referente
      if (!emailValido(inputReferente.value)) {
        sweetAlertError("Email no válido", "1em");
      } else {
        const data = { email }; //Convierto dato a JSON para enviarlo a PHP
        console.log(data); //Verifico que el dato este en formato JSON
        consultarReferente(data); //Realizo consulta a la base de datos
      }
    }
  });
}, 50);
