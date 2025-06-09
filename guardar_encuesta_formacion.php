<?php

$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    http_response_code(400);
    echo "Error: Datos JSON inválidos.";
    exit;
}

// Normalizamos y validamos campos
$sexo = strtolower(trim($data['sexo'] ?? 'no especificado'));
$edad = is_numeric($data['edad']) ? (int)$data['edad'] : null;
$valoracion = is_numeric($data['valoracion']) ? (float)$data['valoracion'] : 0;
$tiempoFormacion = is_numeric($data['tiempo_formacion']) ? (int)$data['tiempo_formacion'] : 0;
$nombreFormacion = trim($data['nombre_formacion'] ?? 'Sin nombre');
$respuesta = $data['respuesta'] ?? 'Sin respuesta';
$tiempo = is_numeric($data['tiempo']) ? (int)$data['tiempo'] : 0;
$idioma = strtolower(trim($data['idioma'] ?? 'es'));
$url = $data['url'] ?? 'desconocida';
$fechaISO = $data['fecha'] ?? date("c");
$fechaLocal = date("Y-m-d H:i:s");
$userAgent = $data['userAgent'] ?? 'Desconocido';

// Nueva entrada de la encuesta
$nueva_encuesta = [
    'sexo' => $sexo,
    'edad' => $edad,
    'valoracion' => $valoracion,
    'tiempo_formacion' => $tiempoFormacion,
    'nombre_formacion' => $nombreFormacion,
    'respuesta' => $respuesta,
    'tiempo' => $tiempo,
    'idioma' => $idioma,
    'url' => $url,
    'fecha' => $fechaISO,
    'userAgent' => $userAgent
];

// Ruta al archivo JSON
$archivo_json = __DIR__ . '/local/datos_estadisticas.json';

// Leer datos existentes
$datos_existentes = [];
if (file_exists($archivo_json)) {
    $contenido = file_get_contents($archivo_json);
    if ($contenido !== false) {
        $datos_existentes = json_decode($contenido, true) ?? [];
    }
}

// Añadir la nueva encuesta
$datos_existentes[] = $nueva_encuesta;

// Guardar datos actualizados
if (file_put_contents($archivo_json, json_encode($datos_existentes, JSON_PRETTY_PRINT)) === false) {
    http_response_code(500);
    echo "Error al guardar el archivo JSON.";
    exit;
}

// Generar archivo .txt (se sobrescribe cada vez)
$archivo_txt = __DIR__ . '/encuestas_formacion_estadisticas.txt';
$contenido_txt = "--- REGISTRO DE ENCUESTAS ---\n\n";
$nombreLegible = ucwords(str_replace('-', ' ', $nombreFormacion));
$tiempoEnMin = round($tiempoFormacion / 60, 1);

$contenido_txt .= "Última respuesta:\n";
$contenido_txt .= "-------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
$contenido_txt .= "[{$fechaLocal}] Sexo: {$sexo} | Valoración: {$valoracion}/10 | Tiempo: {$tiempoEnMin} min | Formación: {$nombreLegible} | Idioma: {$idioma} | Tiempo en plataforma: {$tiempo}s | Respuesta: {$respuesta} | URL: {$url} | UserAgent: {$userAgent}\n";
$contenido_txt .= "-------------------------------------------------------------------------------------------------------------------------------------------------------------------\n\n";

// Incluir funciones estadísticas
include __DIR__ . '/funciones_estadisticas.php';

// Estadísticas
$contenido_txt .= "--- ESTADÍSTICAS RESUMEN ---\n\n";
$contenido_txt .= "Valoración media: " . number_format(valoracion_media($datos_existentes), 2) . "/10\n\n";
$contenido_txt .= "Duración media: " . duracion_media($datos_existentes) . "\n\n";

$contenido_txt .= "\n--- Duración media por curso ---\n";
foreach (duracion_media_por_curso($datos_existentes) as $curso => $info) {
    $contenido_txt .= "  - " . ucfirst($curso) . ": " . number_format($info['media'] / 3600, 2) . " horas\n";
}

$contenido_txt .= "\n--- Porcentaje por idioma ---\n";
foreach (porcentaje_idioma($datos_existentes) as $lang => $percent) {
    $contenido_txt .= "  - " . ucfirst($lang) . ": " . number_format($percent, 2) . "%\n";
}

$contenido_txt .= "\n--- Porcentaje por sexo ---\n";
$sexo_stats = porcentaje_sexo($datos_existentes);
$contenido_txt .= "  - Hombres: " . number_format($sexo_stats['hombres'], 2) . "%\n";
$contenido_txt .= "  - Mujeres: " . number_format($sexo_stats['mujeres'], 2) . "%\n";

$contenido_txt .= "\n--- Valoración media por idioma ---\n";
foreach (['es', 'gl'] as $lang) {
    $contenido_txt .= "  - " . ucfirst($lang) . ": " . number_format(valoracion_media_por_idioma($datos_existentes, $lang), 2) . "/10\n";
}

$contenido_txt .= "\n--- Valoración media por sexo ---\n";
foreach (['hombre', 'mujer'] as $s) {
    $contenido_txt .= "  - " . ucfirst($s) . ": " . number_format(valoracion_media_por_sexo($datos_existentes, $s), 2) . "/10\n";
}

$contenido_txt .= "\n--- Conteo de Edades ---\n";
foreach (conteo_edades($datos_existentes) as $rango => $conteo) {
    $contenido_txt .= "  - Rango $rango: $conteo usuarios\n";
}

$contenido_txt .= "\n--- Top 5 Cursos Más Populares ---\n";
$posicion = 1;
foreach (cursos_populares($datos_existentes) as $curso => $conteo) {
    $contenido_txt .= "  $posicion. " . $curso . ": " . $conteo . " encuestas\n";
    $posicion++;
}

// Guardar estadísticas en .txt (sobrescribe)
if (file_put_contents($archivo_txt, $contenido_txt) === false) {
    http_response_code(500);
    echo "Error al guardar el archivo TXT.";
    exit;
}

http_response_code(200);
echo "Encuesta guardada y estadísticas actualizadas.";
