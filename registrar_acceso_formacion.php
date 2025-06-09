<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json; charset=UTF-8');

// Log temporal para depuración
file_put_contents(__DIR__ . '/debug_log.txt', "[" . date("Y-m-d H:i:s") . "] SCRIPT EJECUTADO\n", FILE_APPEND);

// Leer la entrada cruda
$raw = file_get_contents('php://input');
file_put_contents(__DIR__ . '/debug_log.txt', date("Y-m-d H:i:s") . " - Llamada recibida\nRaw input:\n" . $raw . "\n", FILE_APPEND);

$data = json_decode($raw, true);

if (!is_array($data) || empty($data['nombre_formacion'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

// Normalización de campos
$nombre = strtolower(trim($data['nombre_formacion']));
$fecha = date("Y-m-d H:i:s");
$url = $data['url'] ?? 'desconocida';
$userAgent = $data['userAgent'] ?? 'Desconocido';

// Archivos
$dir_local = __DIR__ . '/local';
$archivo_json = $dir_local . '/accesos_formacion.json';
$archivo_txt  = __DIR__ . '/resumen_accesos_formacion.txt';

// Asegurar que la carpeta local existe
if (!is_dir($dir_local)) {
    mkdir($dir_local, 0775, true);
    file_put_contents(__DIR__ . '/debug_log.txt', date("Y-m-d H:i:s") . " - Carpeta 'local' creada automáticamente\n", FILE_APPEND);
}

// Cargar datos anteriores
$registros = [];
if (file_exists($archivo_json)) {
    $contenido = file_get_contents($archivo_json);
    $registros = json_decode($contenido, true) ?? [];
} else {
    // Si no existe, inicializar con []
    file_put_contents($archivo_json, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Añadir nuevo acceso
$registros[] = [
    'nombre_formacion' => $nombre,
    'fecha' => $fecha,
    'url' => $url,
    'userAgent' => $userAgent
];

// Guardar JSON actualizado
$resultado = file_put_contents($archivo_json, json_encode($registros, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($resultado === false) {
    file_put_contents(__DIR__ . '/debug_log.txt', date("Y-m-d H:i:s") . " - ❌ Error al guardar JSON\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar JSON']);
    exit;
}

// Generar resumen por curso
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
$contenido_txt .= "Última actualización: $fecha\n\n";
foreach ($conteo as $curso => $total) {
    $contenido_txt .= "• " . ucwords(str_replace('-', ' ', $curso)) . ": $total accesos\n";
}

// Guardar resumen en texto
if (file_put_contents($archivo_txt, $contenido_txt) === false) {
    file_put_contents(__DIR__ . '/debug_log.txt', date("Y-m-d H:i:s") . " - ❌ Error al guardar TXT\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar TXT']);
    exit;
}

file_put_contents(__DIR__ . '/debug_log.txt', date("Y-m-d H:i:s") . " - ✅ Registro guardado correctamente\n", FILE_APPEND);
echo json_encode(['success' => true]);
