//asignar un nombre y versión al cache
const CACHE_NAME = "Cache_TuCultura",
  urlsToCache = [
    "./",
    "sw.js",
    "manifest.json",
    "index.html",
    "css/estilosContenido.css",
    "css/estilosLogin.css",
    "css/estilosPayu.css",
    "css/estilosPrincipal.css",
    "css/estilosPrincipalDesktop.css",
    "css/estilosPrincipalTablet.css",
    "css/estilosReporteVentas.css",
    "css/fonts.css",
    "css/fonts2.css",
    "css/formularioPagos.css",
    "css/formularioRegistrate.css",
    "css/formularioSubirDatosPagoCliente.css",
    "css/IcoMoon-Free.ttf",
    "css/normalize.css",
    "fonts/Helvetica.ttf",
    "imagenes/mejoradas/facebook.png",
    "imagenes/mejoradas/libro.png",
    "imagenes/mejoradas/logo.png",
    "imagenes/mejoradas/mision.png",
    "imagenes/mejoradas/Terminos.png",
    "imagenes/mejoradas/vision.png",
    "imagenes/mejoradas/whatsapp.png",
    "imagenes/cabecera.jpg",
    "imagenes/cerrar.png",
    "imagenes/descargar-archivo.png",
    "imagenes/Facebook.jpg",
    "imagenes/fondo-producto.jpg",
    "imagenes/LogoTCPCircle.png",
    "imagenes/LogoTCP.png",
    "imagenes/libro.png",
    "imagenes/Limeade.jpg",
    "imagenes/logo.png",
    "imagenes/mision.jpg",
    "imagenes/qr.png",
    "imagenes/terminos.jpg",
    "imagenes/ventas2.png",
    "imagenes/vision.jpg",
    "imagenes/whatsapp.jpg",
    "js/main.js",
    "php/cerrar.php",
    "php/cerrarConexion.php",
    "php/conexion.php",
    "php/contador-ventas.php",
    "php/contenido.php",
    "php/datos.php",
    "php/funciones.php",
    "php/index2.php",
    "php/logAdmin.php",
    "php/login.php",
    "php/pagosCheck.php",
    "php/pagosOpciones.php",
    "php/recibeLink.php",
    "php/refrescos.php",
    "php/reporteventas.php",
    "php/subirDatosPagoClientes.php",
    "videos/GiraBienes.mp4",
    "vistas/contenidoVista.php",
    "vistas/loginVista.php",
    "vistas/pagosVista1.php",
    "vistas/pagosVista2.php",
    "vistas/payuVista.php",
    "vistas/registrateVista.php",
    "vistas/subirDatosPagoClienteVista.php"
  ];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => console.log("Falló registro de cache", err))
  );
});

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log("[Servicio Worker] Obteniendo recurso: " + e.request.url);
      return (
        r ||
        fetch(e.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            console.log(
              "[Servicio Worker] Almacena el nuevo recurso: " + e.request.url
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
