<?php
// Obtener los datos a enviar JSON desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$respuesta = '';

// Configurar credenciales de conexión a la base de datos
$host = "190.8.176.115"; // Desarrollo Remoto
// $host = "localhost"; // Desarrollo Local
$user = "tucultur";      // Usuario de MySQL
$password = "@GWMU!J4p-mgyTJ7";      // Contraseña de MySQL
$dbname = "tucultur_asociados"; // Nombre de la base de datos

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
  $data['nombres'],
  $data['apellidos'],
  $data['documento'],
  $data['telefono'],
  $data['email'],
  $data['pass'],
  $data['referente']
)) {

  // Pasar contenido de variables JS a variables PHP y elimino espacios al inicio y al final
  $nombres = trim($data['nombres']);
  $apellidos = trim($data['apellidos']);
  $documento = trim($data['documento']);
  $telefono = trim($data['telefono']);
  $email = trim($data['email']);
  $pass = trim($data['pass']);
  $referente = trim($data['referente']);

  // Sanitizar las variables
  $nombres = htmlspecialchars($nombres, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $apellidos = htmlspecialchars($apellidos, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $documento = htmlspecialchars($documento, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $telefono = htmlspecialchars($telefono, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $email = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $pass = htmlspecialchars($pass, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $referidoPor = htmlspecialchars($referente, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

  // Obtener la fecha actual en formato YYYY-MM-DD
  $fecha_actual = date("Y-m-d");

  // Insertar datos en la tabla registros (primera consulta)
  $sqlInsertRegistro = "INSERT INTO registros (nombres, apellidos, documento, telefono, email, pass, referente, fecha) 
    VALUES ('$nombres', '$apellidos', '$documento', '$telefono', '$email', '$pass', '$referente', '$fecha_actual')";
  // Si se registra exitosamente el usuario, se procede a guardar al referente
  if ($conn->query($sqlInsertRegistro) === TRUE) {
    // Insertar el email en la tabla referentes (segunda consulta)
    $sqlInsertReferente = "INSERT INTO referentes (nombres, apellidos, email) VALUES ('$nombres', '$apellidos', '$email')";
    if ($conn->query($sqlInsertReferente) === TRUE) {
      $respuesta = 'Datos enviados exitosamente!';
      // Actualizar el campo registros en la tabla referentes
      $sqlIncrementarReferente = "UPDATE referentes SET registros = registros + 1 WHERE email = '$referente'";
      if ($conn->query($sqlIncrementarReferente)) {
        $respuesta = 'Datos enviados exitosamente!';
      } else {
        $respuesta = 'Usuario registrado pero error al actualizar referente: ' . $conn->error;
      }
    } else {
      $respuesta = 'Error al almacenar el referente: ' . $conn->error;
    }
  } else {
    $respuesta = 'Error al almacenar los datos: ' . $conn->error;
  }

  // Respuesta del servidor
  echo json_encode(['respuesta' => $respuesta]);

  // Si falta alguno de los datos a enviar (input vacío)
} else {
  echo json_encode(['status' => 'error', 'respuesta' => 'Datos faltantes']);
}

// Cerrar la conexión
$conn->close();
