<?php
// Obtener los datos a enviar JSON desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$mensaje = '';

// Configurar credenciales de conexión a la base de datos
// $host = "190.8.176.115"; // Desarrollo Remoto
$host = "localhost"; // Desarrollo Local
$user = "tucultur";      // Usuario de MySQL
$password = "@GWMU!J4p-mgyTJ7";      // Contraseña de MySQL
$dbname = "tucultur_pruebas"; // Nombre de la base de datos

// Conectar a base de datos MySQL
$conn = new mysqli($host, $user, $password, $dbname);

// Establecer la codificación de caracteres
mysqli_set_charset($conn, "utf8mb4");

// Verificar la conexión
if ($conn->connect_error) {
  die(json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]));
}

// Comprobar si los datos están presentes
if (isset(
  $data['nombre'],
  $data['apellido'],
  $data['documento'],
  $data['telefono'],
  $data['email'],
  $data['pass'],
  $data['referidoPor']
)) {

  // Pasar contenido de variables JS a variables PHP y elimino espacios al inicio y al final
  $nombre = trim($data['nombre']);
  $apellido = trim($data['apellido']);
  $documento = trim($data['documento']);
  $telefono = trim($data['telefono']);
  $email = trim($data['email']);
  $pass = trim($data['pass']);
  $referidoPor = trim($data['referidoPor']);

  // Sanitizar las variables
  $nombre = htmlspecialchars($nombre, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $apellido = htmlspecialchars($apellido, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $documento = htmlspecialchars($documento, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $telefono = htmlspecialchars($telefono, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $email = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $pass = htmlspecialchars($pass, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $referidoPor = htmlspecialchars($referidoPor, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

  // Insertar datos en la tabla registros
  $sqlInsertRegistro = "INSERT INTO registros (nombre, apellido, documento, telefono, email, pass, referidoPor) 
    VALUES ('$nombre', '$apellido', '$documento', '$telefono', '$email', '$pass', '$referidoPor')";

  if ($conn->query($sqlInsertRegistro) === TRUE) {

    // Insertar el email en la tabla referentes
    $sqlInsertReferente = "INSERT INTO referentes (email) VALUES ('$email')";
    if ($conn->query($sqlInsertReferente) === TRUE) {
      $mensaje = 'Datos enviados exitosamente!';
    }
  } else {
    $mensaje = 'Error al almacenar los datos: ' . $conn->error;
  }

  // Respuesta en Array para usar con JS
  echo json_encode([
    'nombre' => $nombre,
    'apellido' => $apellido,
    'documento' => $documento,
    'telefono' => $telefono,
    'email' => $email,
    'pass' => $pass,
    'referidoPor' => $referidoPor,
    'mensaje' => $mensaje,
  ]);

  //Respuesta simple para alerts
  // echo json_encode(['mensaje' => $mensaje]);

  // Mensaje de error si falta alguno de los datos a enviar (input vacío)
} else {
  echo json_encode(['status' => 'error', 'message' => 'Datos faltantes']);
}

// Cerrar la conexión
$conn->close();
