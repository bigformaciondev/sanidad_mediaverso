<?php
header('Content-Type: text/plain; charset=UTF-8');

// Calcula la valoración media general
function valoracion_media($data)
{
    $sum = 0;
    $count = 0;

    foreach ($data as $curso) {
        if (isset($curso['valoracion']) && is_numeric($curso['valoracion'])) {
            $sum += $curso['valoracion'];
            $count++;
        }
    }

    return $count > 0 ? $sum / $count : 0;
}

// Calcula duración media total (formato legible)
function duracion_media($data)
{
    $sum = 0;
    $count = 0;

    foreach ($data as $curso) {
        if (isset($curso['tiempo_formacion']) && is_numeric($curso['tiempo_formacion'])) {
            $sum += $curso['tiempo_formacion'];
            $count++;
        }
    }

    if ($count === 0) return "0 horas, 0 minutos, 0 segundos";

    $avg_seconds = $sum / $count;
    $horas = floor($avg_seconds / 3600);
    $minutos = floor(($avg_seconds % 3600) / 60);
    $segundos = $avg_seconds % 60;

    return "{$horas} horas, {$minutos} minutos, {$segundos} segundos";
}

// Duración media por curso
function duracion_media_por_curso($data)
{
    $duraciones = [];

    foreach ($data as $curso) {
        $nombre = strtolower(trim($curso['nombre_formacion'] ?? 'sin nombre'));
        $tiempo = $curso['tiempo_formacion'] ?? 0;

        if (!is_numeric($tiempo)) continue;

        if (!isset($duraciones[$nombre])) {
            $duraciones[$nombre] = ['total' => 0, 'count' => 0];
        }

        $duraciones[$nombre]['total'] += $tiempo;
        $duraciones[$nombre]['count']++;
    }

    foreach ($duraciones as $nombre => $info) {
        $duraciones[$nombre]['media'] = $info['count'] > 0 ? $info['total'] / $info['count'] : 0;
    }

    return $duraciones;
}

// Porcentaje por idioma
function porcentaje_idioma($data)
{
    $cuenta = [];
    $total = 0;

    foreach ($data as $curso) {
        $idioma = strtolower(trim($curso['idioma'] ?? 'no definido'));
        if ($idioma === '') continue;

        if (!isset($cuenta[$idioma])) $cuenta[$idioma] = 0;
        $cuenta[$idioma]++;
        $total++;
    }

    $porcentajes = [];
    foreach ($cuenta as $idioma => $cantidad) {
        $porcentajes[$idioma] = ($total > 0) ? ($cantidad / $total) * 100 : 0;
    }

    return $porcentajes;
}

// Porcentaje por sexo
function porcentaje_sexo($data)
{
    $hombres = 0;
    $mujeres = 0;
    $total = 0;

    foreach ($data as $curso) {
        $sexo = strtolower(trim($curso['sexo'] ?? ''));
        if ($sexo === 'hombre') {
            $hombres++;
            $total++;
        } elseif ($sexo === 'mujer') {
            $mujeres++;
            $total++;
        }
    }

    if ($total === 0) return ['hombres' => 0, 'mujeres' => 0];

    return [
        'hombres' => ($hombres / $total) * 100,
        'mujeres' => ($mujeres / $total) * 100
    ];
}

// Valoración media por idioma
function valoracion_media_por_idioma($data, $idioma)
{
    $sum = 0;
    $count = 0;
    $idioma = strtolower(trim($idioma));

    foreach ($data as $curso) {
        if (strtolower(trim($curso['idioma'] ?? '')) === $idioma && is_numeric($curso['valoracion'])) {
            $sum += $curso['valoracion'];
            $count++;
        }
    }

    return $count > 0 ? $sum / $count : 0;
}

// Valoración media por sexo
function valoracion_media_por_sexo($data, $sexo)
{
    $sexo = strtolower(trim($sexo));
    if (!in_array($sexo, ['hombre', 'mujer'])) return 0;

    $sum = 0;
    $count = 0;

    foreach ($data as $curso) {
        if (strtolower(trim($curso['sexo'] ?? '')) === $sexo && is_numeric($curso['valoracion'])) {
            $sum += $curso['valoracion'];
            $count++;
        }
    }

    return $count > 0 ? $sum / $count : 0;
}

// Cursos más populares (top 5)
function cursos_populares($data)
{
    $conteo = [];

    foreach ($data as $curso) {
        $nombre = strtolower(trim($curso['nombre_formacion'] ?? 'sin nombre'));
        if (!isset($conteo[$nombre])) $conteo[$nombre] = 0;
        $conteo[$nombre]++;
    }

    arsort($conteo);
    return array_slice($conteo, 0, 5, true);
}

// Conteo de edades por rangos
function conteo_edades($data)
{
    $rangos = [
        '15-25' => 0,
        '26-40' => 0,
        '41-65' => 0,
        '65+'   => 0,
    ];

    foreach ($data as $usuario) {
        $edad = $usuario['edad'] ?? null;
        if (!is_numeric($edad)) continue;

        $edad = (int)$edad;

        if ($edad >= 15 && $edad <= 25) {
            $rangos['15-25']++;
        } elseif ($edad >= 26 && $edad <= 40) {
            $rangos['26-40']++;
        } elseif ($edad >= 41 && $edad <= 65) {
            $rangos['41-65']++;
        } elseif ($edad > 65) {
            $rangos['65+']++;
        }
    }

    return $rangos;
}

?>
