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

// Función para contar registros NIVEL 3 (solo hasta nivel 3)
function contarRegistrosDeReferidosMultinivel($conn, $emailUsuario)
{
  $sql = "WITH RECURSIVE Referidos (email, referente, nivel) AS (
                -- Nivel inicial: referidos directos del usuario logueado
                SELECT email, referente, 1 AS nivel
                FROM registros
                WHERE referente = '$emailUsuario'
                  AND email <> '$emailUsuario'

                UNION ALL

                -- Niveles siguientes: referidos de los referidos
                SELECT r.email, r.referente, Referidos.nivel + 1
                FROM registros r
                INNER JOIN Referidos ON r.referente = Referidos.email
                WHERE Referidos.nivel < 3   -- límite: solo hasta nivel 3
            )
            SELECT COUNT(*) AS totalReferidos
            FROM registros
            WHERE email IN (SELECT email FROM Referidos WHERE nivel = 3)";

  $result = $conn->query($sql);

  if ($result) {
    $row = $result->fetch_assoc();
    return $row['totalReferidos'];
  }
  return 0;
}
