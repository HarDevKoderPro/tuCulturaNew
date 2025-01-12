<?php
header("Content-Type: application/json");

// Configuración de la base de datos
// $host = "190.8.176.115"; // Desarrollo Remoto
$host = "localhost"; // Desarrollo Local
$user = "tucultur";      // Usuario de MySQL
$password = "@GWMU!J4p-mgyTJ7";      // Contraseña de MySQL
$dbname = "tuculturadb"; // Nombre de la base de datos

// Conexión a MySQL
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die(json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]));
}

// Establecer la codificación de caracteres
$conn->set_charset("utf8mb4");

// Leer el cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

// Validar que se envió el email
if (!isset($data["email"]) || empty($data["email"])) {
  echo json_encode(["success" => false, "message" => "Email no enviado."]);
  exit;
}

$email = $conn->real_escape_string($data["email"]);

// Realizar la consulta
$sql = "SELECT 1 FROM referentes WHERE email = '$email' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
  // El email existe
  echo json_encode(["success" => true, "exists" => true]);
} else {
  // El email no existe
  echo json_encode(["success" => true, "exists" => false]);
}

// Cerrar la conexión
$conn->close();
