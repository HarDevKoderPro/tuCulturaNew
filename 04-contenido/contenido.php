<?php
session_start();

if (!isset($_SESSION['user_id'])) {
  echo "<script>window.location.href = '../02-iniciarSesion/iniciarSesion.html';</script>";
  exit;
}
if (!isset($_SESSION['user_id'])) {
  header("Location: ../02-iniciarSesion/iniciarSesion.html");
  exit;
}
?>

<!DOCTYPE html>
<html lang='es'>

<head>
  <meta charset='UTF-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0'>
  <title>Contenido Usuarios</title>
  <link rel='stylesheet' href='./css/contenidoDesktop.css'>
  <link rel="stylesheet" href="./css/contenidoMobile.css">
  <link rel="stylesheet" href="../01-principal/css/fonts.css">
  <link rel="shortcut icon" href="../01-principal/imagenes/LogoTCPCircle.png" type="image/x-icon">
</head>

<body>

  <div class="container">

    <section class="encabezado">

      <div class="contenedorLinkSalir">
        <a href="./logout.php" class="linkSalir"><span class="icon-share iconos"></span> Salir</a>
      </div>

      <div class="contenedorDatosLogin">
        <span class="tituloPagina">Zona de Usuarios</span>
        <span class="icon-user"></span>

        <span class="nombreUsuario">
          <?php echo htmlspecialchars($_SESSION['nombres'] . ' ' . $_SESSION['apellidos']); ?>
        </span>

      </div>

      <div class="contenedorLinkEbook">
        <a href="../04-contenido/libros/Creatividad Motivacional.epub" download="Creatividad Motivacional" class="linkEbook">Ebook <span class="icon-download iconos"></span></a>
        <a href="../04-contenido/libros/Creatividad-Motivacional.pdf" download="Creatividad Motivacional" class="linkEbook">PDF <span class="icon-download iconos"></span></a>
      </div>

    </section>

    <section class="contenidoPromocional">

      <div class="contenedorVideoPromocional">
        <!-- <div class="tituloVideo">¿Quienes somos?</div> -->
        <div class="video">
          <video
            controls
            preload="metadata"
            poster="./video/Thumbnail.png">
            <source src="./video/GiraBienes.mp4" type="video/mp4">
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>

      <div class="contenedorTarjetas">TARJETAS</div>

    </section>

    <section class="reporteVentas">
      <div class="scoreVentas">SCORE VENTAS</div>
      <div class="reporteVentas"></div>REPORTE VENTAS
    </section>

  </div>



  <script src='js/script.js' type="module" defer></script>
</body>

</html>