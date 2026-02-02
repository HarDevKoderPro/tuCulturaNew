<?php
// Configuración de conexión
// $host = "localhost";
 $host = "190.8.176.115"; // Desarrollo Remoto
$user = "tucultur";
$password = "@GWMU!J4p-mgyTJ7";
$dbname = "tucultur_asociados";

// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);
mysqli_set_charset($conn, "utf8mb4");

// Verificar conexión
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

// Función para contar registros generales del sistema
function contarRegistros($conn)
{
  $sql = "SELECT COUNT(*) AS total FROM registros";
  $result = $conn->query($sql);

  if ($result) {
    $row = $result->fetch_assoc();
    return $row['total'];
  }
  return 0;
}

// Función para contar registros NIVEL 1 (sin incluirse)
function contarRegistrosUsuario($conn, $emailUsuario)
{
  $sql = "SELECT COUNT(*) AS total 
          FROM registros 
          WHERE referente = '$emailUsuario'
            AND email <> '$emailUsuario'";
  $result = $conn->query($sql);

  if ($result) {
    $row = $result->fetch_assoc();
    return $row['total'];
  }
  return 0;
}

// Función para contar registros NIVEL 2
function contarRegistrosDeReferidos($conn, $emailUsuario)
{
  $sql = "SELECT COUNT(*) AS totalReferidos
            FROM registros
            WHERE referente IN (
                SELECT email
                FROM registros
                WHERE referente = '$emailUsuario'
                  AND email <> '$emailUsuario'
            )";
  $result = $conn->query($sql);

  if ($result) {
    $row = $result->fetch_assoc();
    return $row['totalReferidos'];
  }
  return 0;
}

// Función para contar registros de referidos en Nivel 3 sin usar recursividad SQL
function contarReferidosNivel3($conn, $emailUsuario)
{
  $total = 0;

  // 1. Obtener referidos de nivel 1 (directos del usuario logueado)
  $sqlNivel1 = "SELECT email FROM registros WHERE referente = '$emailUsuario' AND email <> '$emailUsuario'";
  $resNivel1 = $conn->query($sqlNivel1);

  if ($resNivel1) {
    while ($row1 = $resNivel1->fetch_assoc()) {
      $emailNivel1 = $row1['email'];

      // 2. Obtener referidos de nivel 2 (hijos de nivel 1)
      $sqlNivel2 = "SELECT email FROM registros WHERE referente = '$emailNivel1'";
      $resNivel2 = $conn->query($sqlNivel2);

      if ($resNivel2) {
        while ($row2 = $resNivel2->fetch_assoc()) {
          $emailNivel2 = $row2['email'];

          // 3. Contar registros de nivel 3 (hijos de nivel 2)
          $sqlNivel3 = "SELECT COUNT(*) AS total FROM registros WHERE referente = '$emailNivel2'";
          $resNivel3 = $conn->query($sqlNivel3);

          if ($resNivel3) {
            $row3 = $resNivel3->fetch_assoc();
            $total += $row3['total'];
          }
        }
      }
    }
  }

  return $total;
}
