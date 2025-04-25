<?php
// Leer datos del POST
$data = json_decode(file_get_contents("php://input"), true);

$respuesta = $data['respuesta'] ?? 'Sin respuesta';
$tiempo = $data['tiempo'] ?? 0;
$idioma = $data['idioma'] ?? 'es';
$url = $data['url'] ?? 'desconocida';
$fechaISO = $data['fecha'] ?? date("c");
$fechaLocal = date("Y-m-d H:i:s");
$userAgent = $data['userAgent'] ?? 'Desconocido';

// Leer contenido actual
$archivo = "encuestas.txt";
$contenido = file_exists($archivo) ? file_get_contents($archivo) : "";

// Línea de log
$nuevaLinea = "[$fechaLocal] Idioma: $idioma | Tiempo: {$tiempo}s | Respuesta: $respuesta | URL: $url | UserAgent: $userAgent\n";

// Añadir al contenido (sin estadísticas)
$contenido = preg_replace('/--- ESTADISTICAS(.|\s)*$/', '', $contenido); // eliminar viejo resumen
$contenido .= $nuevaLinea;

// Calcular estadísticas
$respuestas = [];
foreach (explode("\n", $contenido) as $line) {
    if (preg_match('/Idioma: (\w+).*Respuesta: ([^\|]+)/', $line, $matches)) {
        $idiomaResp = trim($matches[1]);
        $valorResp = trim($matches[2]);

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

file_put_contents($archivo, $contenido . $resumen);

http_response_code(200);
?>
