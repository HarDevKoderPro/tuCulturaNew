<?php
// Obtener los datos a enviar JSON desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$mensaje = '';

// Configurar credenciales de conexión a la base de datos
$host = "190.8.176.115"; // Desarrollo Remoto
// $host = "localhost"; // Desarrollo Local
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

// Compruebo si existen los datos
if (isset(
  $data['email'],
  $data['referidoPor']
)) {

  // Paso contenido de variables JS a variables PHP
  // Elimino espacios al inicio y al final
  $email = trim($data['email']);
  $referidoPor = trim($data['referidoPor']);

  // Sanitizo las variable para evitar inyección de código
  $email = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $referidoPor = htmlspecialchars($referidoPor, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

  // Consulto si el email ya existe
  $sqlEmail = "SELECT 1 FROM referentes WHERE email = '$email' LIMIT 1";
  $result = $conn->query($sqlEmail); // Resultado de la consulta

  // Consulto si el referente existe
  $sqlReferente = "SELECT 1 FROM referentes WHERE email = '$referidoPor' LIMIT 1";
  $result2 = $conn->query($sqlReferente);  // Resultado de la consulta

  // Devolver ambos resultados en un solo JSON
  echo json_encode([
    'emailExists' => $result && $result->num_rows > 0,
    'referenteExists' => $result2 && $result2->num_rows > 0
  ]);

  // Si el email consultado no existe...
} else {
  echo json_encode(['status' => 'error', 'message' => 'Datos faltantes']);
}

// Cerrar la conexión
$conn->close();
