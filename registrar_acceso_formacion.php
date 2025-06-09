<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json; charset=UTF-8');

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data) || empty($data['nombre_formacion'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$nombre = strtolower(trim($data['nombre_formacion']));
$fecha = date("Y-m-d H:i:s");
$url = $data['url'] ?? 'desconocida';
$userAgent = $data['userAgent'] ?? 'Desconocido';

// 📁 Archivos
$archivo_json = __DIR__ . '/local/accesos_formacion.json';
$archivo_txt  = __DIR__ . '/resumen_accesos_formacion.txt';

// 📄 Cargar accesos previos
$registros = [];
if (file_exists($archivo_json)) {
    $contenido = file_get_contents($archivo_json);
    $registros = json_decode($contenido, true) ?? [];
}

// 📝 Añadir nuevo acceso
$registros[] = [
    'nombre_formacion' => $nombre,
    'fecha' => $fecha,
    'url' => $url,
    'userAgent' => $userAgent
];

// 💾 Guardar JSON actualizado
if (!file_put_contents($archivo_json, json_encode($registros, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar JSON']);
    exit;
}

// 📊 Generar resumen .txt (conteo por formación)
$conteo = [];
foreach ($registros as $r) {
    $formacion = $r['nombre_formacion'];
    if (!isset($conteo[$formacion])) {
        $conteo[$formacion] = 0;
    }
    $conteo[$formacion]++;
}

arsort($conteo);

$contenido_txt = "--- RESUMEN DE ACCESOS A FORMACIONES ---\n";
$contenido_txt .= "Última actualización: " . $fecha . "\n\n";
foreach ($conteo as $curso => $total) {
    $contenido_txt .= "• " . ucwords(str_replace('-', ' ', $curso)) . ": $total accesos\n";
}

// 💾 Guardar resumen en texto plano
if (!file_put_contents($archivo_txt, $contenido_txt)) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar TXT']);
    exit;
}

echo json_encode(['success' => true]);
