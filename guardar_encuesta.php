<?php
// Mostrar errores para debug (elimina en producción)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Leer datos del POST
$data = json_decode(file_get_contents("php://input"), true);

$respuesta   = $data['respuesta']   ?? 'Sin respuesta';
$tiempo      = $data['tiempo']      ?? 0;
$idioma      = $data['idioma']      ?? 'es';
$url         = $data['url']         ?? 'desconocida';
$fechaISO    = $data['fecha']       ?? date("c");
$fechaLocal  = date("Y-m-d H:i:s");
$userAgent   = $data['userAgent']   ?? 'Desconocido';

// Ruta del archivo
$archivo = "encuestas.txt";

// Leer contenido actual
$contenido = file_exists($archivo) ? file_get_contents($archivo) : "";

// Eliminar resumen anterior (corrige tilde y salto de línea)
$contenido = preg_replace('/--- ESTADÍSTICAS ACTUALIZADAS ---.*$/s', '', $contenido);

// Línea de log
$nuevaLinea = "[$fechaLocal] Idioma: $idioma | Tiempo: {$tiempo}s | Respuesta: $respuesta | URL: $url | UserAgent: $userAgent\n";
$contenido .= $nuevaLinea;

// Calcular estadísticas
$respuestas = [];
foreach (explode("\n", $contenido) as $line) {
    if (preg_match('/Idioma: (\w+).*Respuesta: ([^\|]+)/', $line, $matches)) {
        $idiomaResp = trim($matches[1]);
        $valorResp  = trim($matches[2]);

        if (!isset($respuestas[$idiomaResp])) $respuestas[$idiomaResp] = [];
        if (!isset($respuestas[$idiomaResp][$valorResp])) $respuestas[$idiomaResp][$valorResp] = 0;

        $respuestas[$idiomaResp][$valorResp]++;
    }
}

// Construir resumen
$resumen = "\n--- ESTADÍSTICAS ACTUALIZADAS ---\n";
foreach ($respuestas as $lang => $grupo) {
    $resumen .= strtoupper($lang) . ":\n";
    foreach ($grupo as $respuesta => $total) {
        $resumen .= "  - $respuesta: $total\n";
    }
}

// Escribir resultado final al archivo
if (!file_put_contents($archivo, $contenido . $resumen)) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo guardar el archivo']);
    exit;
}

http_response_code(200);
echo json_encode(['success' => true]);
?>
