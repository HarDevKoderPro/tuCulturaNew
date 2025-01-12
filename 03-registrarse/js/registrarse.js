setTimeout(() => {
  ("use strict");
  // -----------------------------------------------------------------
  // VARIABLES GLOBALES
  // -----------------------------------------------------------------

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
  // FUNCIONES
  // -----------------------------------------------------------------
  // OBTENER DATOS DE LOS INPUTS
  // -----------------------------------------------------------------
  const obtenerDatosInputs = () => {
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
  };

  //---------------------------------------------------------------
  // BORRAR TODOS LOS INPUTS
  //---------------------------------------------------------------
  const borrarInputs = () => {
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
  };

  //---------------------------------------------------------------
  // SWEET ALERT DE EXITO
  //---------------------------------------------------------------
  function sweetAlertExito(mensaje) {
    Swal.fire({
      position: "center",
      width: "180px",
      heightAuto: false,
      showConfirmButton: false,
      title: mensaje,
      background: "#ABEBC6",
      icon: "success",
      iconColor: "green",
      color: "green",
      timer: 1000,
    });
  }

  //---------------------------------------------------------------
  // PASAR DATOS JS A PHP Y ENVIARLOS AL SERVIDOR
  //---------------------------------------------------------------
  const enviarDatosServer = (datosUsuario) => {
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
        console.log("Datos PHP: ", data);
        sweetAlertExito("");
        borrarInputs();
      })

      // Captura de errores
      .catch((error) => console.error("Error:", error));
  };

  // -----------------------------------------------------------------
  // PROGRAMA PRINCIPAL
  // -----------------------------------------------------------------
  // Acciones al presionar botón de envío de datos
  btnRegistrar.addEventListener("click", () => {
    // obtengo datos a enviar (inputs)
    let datosUsuario = obtenerDatosInputs();
    //Envio datos al servidor (base de datos)
    enviarDatosServer(datosUsuario);
  });
}, 50);
