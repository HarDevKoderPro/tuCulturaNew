<?php
// Obtener los datos a enviar JSON desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$respuesta = '';

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

// Compruebo si existe el dato a tratar
if (isset(
  $data['email'],
  $data['pass']
)) {

  // Paso contenido de variables JS a variables PHP
  // Elimino espacios al inicio y al final
  $email = trim($data['email']);
  $pass = trim($data['pass']);

  // Sanitizo las variable para evitar inyección de código
  $email = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $pass = htmlspecialchars($pass, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

  // Realizo la consulta del Email (Primera consulta)
  $sqlEmail = "SELECT 1 FROM registros WHERE email = '$email' LIMIT 1";
  $result = $conn->query($sqlEmail); // Resultado de la consulta

  // Realizo la consulta del password (Segunda consulta)
  $sqlPassword = "SELECT 1 FROM registros WHERE pass = '$pass' LIMIT 1";
  $result2 = $conn->query($sqlPassword);  // Resultado de la consulta

  // Verifico si ambas consultas son correctas
  if ($result && $result->num_rows > 0 && $result2 && $result2->num_rows > 0) {
    echo json_encode(['respuesta' => true]); //devuelve true  
  } else {
    echo json_encode(['respuesta' => false]); //devuelve false  
  }

  // Si el email consultado no existe...
} else {
  echo json_encode(['status' => 'error', 'respuesta' => 'Datos faltantes']);
}

// Cerrar la conexión
$conn->close();
