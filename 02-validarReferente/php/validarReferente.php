<?php
// Obtener los datos a enviar JSON desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$mensaje = '';

// Configurar credenciales de conexión a la base de datos
// $host = "190.8.176.115"; // Desarrollo Remoto
$host = "localhost"; // Desarrollo Local
$user = "tucultur";      // Usuario de MySQL
$password = "@GWMU!J4p-mgyTJ7";      // Contraseña de MySQL
$dbname = "tuculturadb"; // Nombre de la base de datos

// Conectar a base de datos MySQL
$conn = new mysqli($host, $user, $password, $dbname);

// Establecer la codificación de caracteres
mysqli_set_charset($conn, "utf8mb4");

// Verificar la conexión
if ($conn->connect_error) {
  die(json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]));
}

// Compruebo si existe el dato a tratar
if (isset($data['email'])) {

  // Paso contenido de variables JS a variables PHP
  // Elimino espacios al inicio y al final
  $email = trim($data['email']);

  // Sanitizo las variable para evitar inyección de código
  $email = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

  // Realizo la consulta del referente
  $sql = "SELECT 1 FROM referentes WHERE email = '$email' LIMIT 1";

  // Guardo resultado de la consulta en variable
  $result = $conn->query($sql);

  // Si el email consultado existe...
  if ($result && $result->num_rows > 0) {
    echo json_encode(['mensaje' => true]); //devuelve true

    // Si el email consultado no existe...
  } else {
    echo json_encode(['mensaje' => false]); //Devuelve false
  }
  
} else {
  echo json_encode(['status' => 'error', 'message' => 'Datos faltantes']);
}

// Cerrar la conexión
$conn->close();
