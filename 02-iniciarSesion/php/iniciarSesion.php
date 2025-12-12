<?php

session_start(); // Inicia la sesión PHP

// Obtener los datos a enviar JSON desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$respuesta = '';

// Configurar credenciales de conexión a la base de datos
//  $host = "190.8.176.115"; // Desarrollo Remoto
$host = "localhost"; // Desarrollo Local
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

// Compruebo si existe el dato a tratar
if (isset(
  $data['email'],
  $data['pass']
)) {

  // Paso contenido de variables JS a variables PHP
  // Elimino espacios al inicio y al final
  $email = trim($data['email']);
  $pass = trim($data['pass']);

  // Preparar consulta segura (prepared statement)
  // IMPORTANTE: Verifica que las columnas se llamen 'id', 'pass', 'nombres', 'apellidos'
  $stmt = $conn->prepare("SELECT id, pass, nombres, apellidos FROM registros WHERE email = ? LIMIT 1");

  // Verificar si la preparación falló
  if ($stmt === false) {
    die(json_encode(["respuesta" => false, "message" => "Error en la preparación: " . $conn->error]));
  }

  // Vincular el parámetro email
  $stmt->bind_param("s", $email);

  // Ejecutar la consulta
  $stmt->execute();

  // Obtener el resultado
  $result = $stmt->get_result();

  // Verificar si se encontró un usuario con ese email
  if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc(); // Obtener datos del usuario

    // Verificar la contraseña (comparación directa por ahora)
    if ($pass === $usuario['pass']) {
      // Login exitoso: guardar datos en la sesión
      $_SESSION['user_id'] = $usuario['id'];
      $_SESSION['email'] = $email;
      $_SESSION['nombres'] = $usuario['nombres'];
      $_SESSION['apellidos'] = $usuario['apellidos'];

      echo json_encode(['respuesta' => true]); // Login exitoso
    } else {
      // Contraseña incorrecta
      echo json_encode(['respuesta' => false]);
    }
  } else {
    // Email no encontrado
    echo json_encode(['respuesta' => false]);
  }

  // Cerrar el statement
  $stmt->close();

  // Si el email consultado no existe...
} else {
  echo json_encode(['status' => 'error', 'respuesta' => 'Datos faltantes']);
}

// Cerrar la conexión
$conn->close();
