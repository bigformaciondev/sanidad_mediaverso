<?php

$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    http_response_code(400);
    echo "Error: Datos JSON inválidos.";
    exit;
}

// Capturar datos de la encuesta 
$sexo = $data['sexo'] ?? 'No especificado';
$valoracion = $data['valoracion'] ?? 0;
$tiempoFormacion = $data['tiempo_formacion'] ?? 0;
$nombreFormacion = $data['nombre_formacion'] ?? 'Sin nombre';
$respuesta = $data['respuesta'] ?? 'Sin respuesta';
$tiempo = $data['tiempo'] ?? 0;
$idioma = $data['idioma'] ?? 'es';
$url = $data['url'] ?? 'desconocida';
$fechaISO = $data['fecha'] ?? date("c");
$fechaLocal = date("Y-m-d H:i:s");
$userAgent = $data['userAgent'] ?? 'Desconocido';

// Nueva entrada de la encuesta
$nueva_encuesta = [
    'sexo' => $sexo,
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

// Actualizar archivo datos.json para calcular estadísticas
$archivo_json = 'local/datos_estadisticas.json';
$datos_existentes = file_exists($archivo_json) ? json_decode(file_get_contents($archivo_json), true) : [];

// Añadir la nueva encuesta al array existentfe
$datos_existentes[] = $nueva_encuesta;

// Guardar los datos actualizados en datos.json
file_put_contents($archivo_json, json_encode($datos_existentes, JSON_PRETTY_PRINT)); // JSON_PRETTY PRINT es opcional pero se formatea el json con saltos de linea.

// Genero encuestas.txt
$archivo_txt = 'encuestas_formacion_estadisticas.txt';
$contenido_txt = "\n\n--- REGISTRO DE ENCUESTAS ---\n\n";
$nombreLegible = ucwords(str_replace('-', ' ', $nombreFormacion));
$tiempoEnMin = round($tiempoFormacion / 60, 1); // minutos con 1 decimal
// Añadir cada respuesta individual
$contenido_txt .= "Nuevos registros:\n";
$contenido_txt .= "-------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
$contenido_txt .= "[{$fechaLocal}] Sexo: {$sexo} | Valoración: {$valoracion}/10 | Tiempo: {$tiempoEnMin} min | Formación: {$nombreLegible} | Idioma: {$idioma} | Tiempo en plataforma: {$tiempo}s | Respuesta: {$respuesta} | URL: {$url} | UserAgent: {$userAgent}\n";
$contenido_txt .= "-------------------------------------------------------------------------------------------------------------------------------------------------------------------\n\n";

// Importamos el archivo 'funciones.php' para calcular las estadísicas
include 'funciones_estadisticas.php';

$contenido_txt .= "--- ESTADÍSTICAS RESUMEN ---\n\n";
$contenido_txt .= "Valoración media: " . number_format(valoracion_media($datos_existentes), 2) . "/10\n\n"; // redondeo a 2 decimales
$contenido_txt .= "Duración media: " . duracion_media($datos_existentes) . "\n\n";

$contenido_txt .= "\n--- Duración media por curso ---\n";
$duraciones_por_curso = duracion_media_por_curso($datos_existentes);
foreach ($duraciones_por_curso as $curso => $info) {
    $contenido_txt .= "  - " . ucfirst($curso) . ": " . number_format($info['media'] / 3600, 2) . " horas\n";  // Conversión a horass
}

$contenido_txt .= "\n--- Porcentaje por idioma ---\n";
$porcentaje_idioma = porcentaje_idioma($datos_existentes);
$contenido_txt .= "  - Español: " . number_format($porcentaje_idioma['es'], 2) . "%\n"; // 2 decimales
$contenido_txt .= "  - Gallego: " . number_format($porcentaje_idioma['gl'], 2) . "%\n";

$contenido_txt .= "\n--- Porcentaje por sexo ---\n";
$porcentaje_sexo = porcentaje_sexo($datos_existentes);
$contenido_txt .= "  - Hombres: " . number_format($porcentaje_sexo['hombres'], 2) . "%\n";
$contenido_txt .= "  - Mujeres: " . number_format($porcentaje_sexo['mujeres'], 2) . "%\n";

$contenido_txt .= "\n--- Valoración media por idioma ---\n";
$contenido_txt .= "  - Español: " . number_format(valoracion_media_por_idioma($datos_existentes, 'es'), 2) . "/10\n";
$contenido_txt .= "  - Gallego: " . number_format(valoracion_media_por_idioma($datos_existentes, 'gl'), 2) . "/10\n";

$contenido_txt .= "\n--- Valoración media por sexo ---\n";
$contenido_txt .= "  - Hombres: " . number_format(valoracion_media_por_sexo($datos_existentes, 'hombre'), 2) . "/10\n";
$contenido_txt .= "  - Mujeres: " . number_format(valoracion_media_por_sexo($datos_existentes, 'mujer'), 2) . "/10\n";

file_put_contents($archivo_txt, $contenido_txt, FILE_APPEND); // FILE_APPEND: añade el contenido al final sin sobreescribir

http_response_code(200);
echo "Encuesta guardada y estadísticas actualizadas."; // Sacamos por pantalla el mensaje de confirmación
