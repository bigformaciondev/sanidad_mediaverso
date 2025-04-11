<?php
$data = json_decode(file_get_contents("php://input"), true);

$respuesta = $data['respuesta'] ?? 'Sin respuesta';
$tiempo = $data['tiempo'] ?? 0;
$fecha = date("Y-m-d H:i:s");

$linea = "[$fecha] Tiempo: {$tiempo}s - Respuesta: {$respuesta}\n";

file_put_contents("encuestas.txt", $linea, FILE_APPEND);
http_response_code(200);
?>
