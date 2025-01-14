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
  // VALIDAR INPUTS VACIOS
  //---------------------------------------------------------------
  const hayInputsVacios = () => {
    const inputsArr = document.querySelectorAll("input");
    return [...inputsArr].some((input) => input.value === "");
  };

  //---------------------------------------------------------------
  // VALIDAR EMAIL
  //---------------------------------------------------------------
  const emailValido = (email) => {
    // Expresion regular con la estructura basica de un email
    let regex = /^\w+@\w+\.\w+$/gi;

    // Resultado de la validacion
    return regex.test(email) ? true : false;
  };

  //---------------------------------------------------------------
  // SWEET ALERT DE EXITO
  //---------------------------------------------------------------
  const sweetAlertExito = (message, fontSize) => {
    Swal.fire({
      position: "center",
      width: "200px",
      heightAuto: false,
      showConfirmButton: false,
      background: "#ABEBC6",
      icon: "success",
      iconColor: "green",
      color: "green",
      timer: 1300,
      // Personaliza el tamaño del mensaje
      html: `<div style="font-size: ${fontSize}; text-align: center;">${message}</div>`,
    });
  };

  //---------------------------------------------------------------
  // SWEET ALERT DE ERROR
  //---------------------------------------------------------------
  const sweetAlertError = (message, fontSize) => {
    Swal.fire({
      position: "center",
      width: "200px",
      heightAuto: false,
      showConfirmButton: false,
      background: "#E6B0AA",
      icon: "error",
      iconColor: "red",
      color: "red",
      timer: 1300,
      // Personaliza el tamaño del mensaje
      html: `<div style="font-size: ${fontSize}; text-align: center;">${message}</div>`,
    });
  };

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
        sweetAlertExito("Datos Enviados!", "1em");
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
    if (hayInputsVacios()) {
      sweetAlertError("Faltan Datos...", "1em");
    } else {
      // obtengo datos a enviar (inputs)
      let datosUsuario = obtenerDatosInputs();
      if (emailValido(datosUsuario.email) && emailValido(datosUsuario.referidoPor)) {
        //Envio datos al servidor (base de datos)
        enviarDatosServer(datosUsuario);
      } else {
        sweetAlertError("Email no válido", "1em");
      }
    }
  });
}, 50);
