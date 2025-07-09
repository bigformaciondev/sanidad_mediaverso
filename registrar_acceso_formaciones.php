<?php
header("Content-Type: application/json");

$archivo = __DIR__ . '/data/scorm_visits.json';
$nombre = isset($_GET['nombre']) ? basename($_GET['nombre']) : null;

if (!$nombre) {
    http_response_code(400);
    echo json_encode(['error' => 'Nombre de SCORM no válido']);
    exit;
}

if (!file_exists($archivo)) {
    file_put_contents($archivo, json_encode([]));
}

$datos = json_decode(file_get_contents($archivo), true);

if (!isset($datos[$nombre])) {
    $datos[$nombre] = 0;
}

$datos[$nombre]++;

file_put_contents($archivo, json_encode($datos, JSON_PRETTY_PRINT));
echo json_encode(['success' => true, 'nombre' => $nombre, 'total' => $datos[$nombre]]);
