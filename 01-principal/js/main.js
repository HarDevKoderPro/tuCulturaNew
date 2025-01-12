// ---------------------------------------------------------------------
// Verificación de compatibilidad del navegador con service worker
// ---------------------------------------------------------------------
const verificarServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => console.log("Registro de SW exitoso", reg))
      .catch((err) => console.warn("Error al tratar de registrar el sw", err));
  }
};

// ---------------------------------------------------------------------
// Efecto toggle para mostrar-ocultar el menu movil
// ---------------------------------------------------------------------
$(document).ready(main);
var contador = 1;
function main() {
  $(".menu_bar span").click(function (e) {
    e.preventDefault(); //Se evita que regrese al inicio al presionar hamburguesa
    if (contador == 1) {
      $("nav").animate({
        left: "0",
      });
      contador = 0;
    } else {
      contador = 1;
      $("nav").animate({
        left: "-100%",
      });
    }
  });
  // --------------------------------------------------------------------------
  // Al hacer clic sobre los enlaces del menu, oculta el panel de navegación
  // --------------------------------------------------------------------------
  $("header nav ul li a").click(function () {
    contador = 1;
    $("nav").animate({
      left: "-100%",
    });
  });
}
// --------------------------------------------------------------------------
// Mensaje de advertencia al pagar la compra directa
// --------------------------------------------------------------------------
const mensaje = () => {
  alert(
    'Advertencia:\nRecuerda dar click en "Volver al sitio de la tienda" de la página de PAYU luego de realizar el pago para realizar la descarga'
  );
};

// var mensajeCompraDirecta = document.getElementById("linkCompraDirecta");
// mensajeCompraDirecta.addEventListener("click", mensaje);

// --------------------------------------------------------------------------
// Overlay para mostrar codigos QR
// --------------------------------------------------------------------------
// Oculta el overlay al presionar la x
function overlayClose() {
  document.getElementById("overlay").style.display = "none";
  document
  .querySelectorAll('input[name="tipoPago"]')
  .forEach((x) => (x.checked = false));
}

// Muestra el Overlay al presionr boton de pago con QR
function overlayShow() {
  if (!document.querySelector('input[name="tipoPago"]:checked')) {
    alert("Error, Selecciona un tipo de Pago");
  } else {
    document.getElementById("overlay").style.display = "block";
  }
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
  .register("../sw.js")
  .then((reg) => console.log("Registro de SW exitoso", reg))
  .catch((err) => console.warn("Error al tratar de registrar el sw", err));
}

// --------------------------------------------------------------------------
// CARRUSEL DE IMAGENES
// --------------------------------------------------------------------------
// ------------------------------------------------------------------------
// Referencio elementos del DOM
// ------------------------------------------------------------------------
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const carruseles = document.querySelector(".carruseles");
let posicion = 0;
let transitionTime;

// ------------------------------------------------------------------------
// Efecto deslizante
// ------------------------------------------------------------------------
const transicion = (posicion, transitionTime) => {
  carruseles.style.transform = `translate(-${posicion}%)`;
  carruseles.style.transition = `all ease ${transitionTime}`;
};

// ------------------------------------------------------------------------
// Desplazamiento al hacer clic en flecha derecha (>)
// ------------------------------------------------------------------------
const clicBotonDerecho = () => {
  [posicion, transitionTime] =
    posicion < 80 ? [(posicion += 20), "1s"] : [(posicion += -80), ".0s"];
  transicion(posicion, transitionTime);
};

// ------------------------------------------------------------------------
// Desplazamiento al hacer clic en flecha izquierda (<)
// ------------------------------------------------------------------------
const clicBotonIzquierdo = () => {
  [posicion, transitionTime] =
    posicion === 0 ? [(posicion -= -80), "0s"] : [(posicion -= 20), "1s"];
  transicion(posicion, transitionTime);
};

// ------------------------------------------------------------------------
// Programa principal
// ------------------------------------------------------------------------
btnLeft.addEventListener("click", clicBotonIzquierdo);
btnRight.addEventListener("click", clicBotonDerecho);
setInterval(clicBotonDerecho, 2500);
