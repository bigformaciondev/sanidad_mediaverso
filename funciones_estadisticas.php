<?php

// Leemos el archivo JSON
$data = json_decode(file_get_contents('datos.json'), true);


// Función para calcular la valoración media de todos los cursos
function valoracion_media($data)
{
    $sum = 0; // inicializamos el acumulador
    $total = count($data); // Cuenta el número de cursos en data

    foreach ($data as $curso) { // Itero sobre los cursos en 'data'
        $sum += $curso['valoracion']; // acumulamos la nota de cada uno de los cursos
    }
    // return $sum; // suma total de valoraciones
    return $sum / $total; // suma total de valoraciones dividido por el número de cursos
}

// Función para calcular la duración media TOTAL de todos los cursos
function duracion_media($data)
{
    $sum = 0; // usaremos este acumulador para la duracion 
    $total = count($data); // cuenta el número de cursos en data
    foreach ($data as $curso) { // iteramos sobre los cursos
        $sum += $curso['tiempo_formacion']; // accedemos a 'tiempo_formacion' en lugar de 'duracion'
    }
    // Calculamos el total de segundos en promedio
    $tot_segundos = $sum / $total;

    // Convertimos a horas, minutos y segundos. Con floor redondeamos hacia abajo
    $horas = floor($tot_segundos / 3600);  // calcular horas
    $tot_segundos = $tot_segundos % 3600;  // el resto de segundos después de las horas
    $minutos = floor($tot_segundos / 60);  // Calcular minutos
    $segundos = $tot_segundos % 60;  // El resto son los segundos

    // Devolvemos el resultado en formato "X horas Y minutos Z segundos"
    return "{$horas} horas, {$minutos} minutos, {$segundos} segundos";
}

// Función para calcular la duración media POR CURSO
function duracion_media_por_curso($data)
{
    $duraciones = []; // inicializamos un array vacio donde guardamos los resultados por curso
    foreach ($data as $curso) {
        $nombre_curso = $curso['nombre_formacion']; // Cogemos el nobre del curso para identificarlo
        if (!isset($duraciones[$nombre_curso])) { // si no existe el curso en el array, lo inicializamos
            $duraciones[$nombre_curso] = ['total' => 0, 'count' => 0];
        }
        // acumulamos el tiempo de formacion del curso actual en el total 
        $duraciones[$nombre_curso]['total'] += $curso['tiempo_formacion']; // Usamos 'tiempo_formacion'
        $duraciones[$nombre_curso]['count']++; // suma al total de duracion del curso
    }

    // Calcula la media por cada curso
    foreach ($duraciones as $curso => $info) {
        // calcula la duracion media por curso
        $duraciones[$curso]['media'] = $info['total'] / $info['count'];
    }

    return $duraciones;
}

// Función para calcular el porcentaje de cursos en español vs gallego
function porcentaje_idioma($data)
{
    $total = count($data); // total de cursos en el json
    $es = 0; // inicializo la variable para español
    $gl = 0; // inicializo la variable para gallego
    foreach ($data as $curso) { // Iteramos sobre los cursos
        if (strtolower($curso['idioma']) == 'es') { // Convertimos el idioma a minúsculas antes de comparar
            $es++; // aumentamos la variable 'es' en 1
        } elseif (strtolower($curso['idioma']) == 'gl') { // Convertimos el idioma a minúsculas antes de comparar
            $gl++; // aumentamos la variable 'gl' en 1
        }
    }
    return [ // devolvemos el resultado en un array asociativo que se pasa como parámetro a $idiomas en 'index.php'
        'es' => round(($es / $total) * 100, 2), // cono round redondeo el resultado con dos decimales
        'gl' => round(($gl / $total) * 100, 2)
    ];
}

// Función para calcular el porcentaje de hombres vs mujeres
function porcentaje_sexo($data)
{
    $total = count($data); // total de cursos en el JSON (cantidad de elementos en el array $data)

    if ($total == 0)
        return ['hombres' => 0, 'mujeres' => 0]; // Prevención de división por cero: si no hay cursos, devolvemos 0% para hombres y mujeres

    $hombres = 0; // inicializo la variable para contar el número de hombres
    $mujeres = 0; // inicializo la variable para contar el número de mujeres

    foreach ($data as $curso) { // iteramos sobre los cursos
        if (strtolower($curso['sexo']) == 'hombre') { // transformamos a minúsculas y lo comparamos
            $hombres++; // si es positivo se aumenta la variable 'hombres' en 1
        } elseif (strtolower($curso['sexo']) == 'mujer') { // transformamos a minúsculas y si el sexo es mujer
            $mujeres++; // aumento la variable 'mujeres' en 1
        }
    }

    return [ // devolvemos el resultado en un array asociativo que contiene el porcentaje de hombres y mujeres, sin redondear
        'hombres' => ($hombres / $total) * 100,
        'mujeres' => ($mujeres / $total) * 100 // porcentaje
    ];
}

// Función para calcular la valoración media por idioma (español o gallego)
function valoracion_media_por_idioma($data, $idioma)
{
    $sum = 0; // inicializamos el acumulador donde se va a almacenar la suma de las valoraciones segun el idioma
    $count = 0; // inicializamos el contador de cursos en data
    foreach ($data as $curso) { //iteramos por cada curso del array data
        if (strtolower($curso['idioma']) == strtolower($idioma)) {
            $sum += $curso['valoracion']; // acumulamos la valoracion de cada curso
            $count++; // aumentamos el contador para tener un control de todos los cursos que coinciden con el idioma
        }
    }
    // Verificamos si el contador de cursos con ese idioma es mayor que cero
    if ($count > 0) {
        return $sum / $count;  // si hay cursos, devolvemos la media
    } else {
        return 0;  // si no hay cursos con ese idioma, devolvemos 0
    }
}


// Función para calcular la valoración media por sexo (hombres o mujeres)
function valoracion_media_por_sexo($data, $sexo) {
    // si el valor del campo 'sexo' es igual a 'hombre' o 'mujer' transf a minus
    if (!in_array(strtolower($sexo), ['hombre', 'mujer'])) {
        return 0; // Retorna 0 si el sexo proporcionado es inválido
    }

    $sum = 0; // inicializamos el acumulador donde se va a almacenar la suma de las valoraciones según el sexo
    $count = 0; // inicializamos el contador de cursos que coinciden con el sexo proporcionado
    foreach ($data as $curso) {
        if (strtolower($curso['sexo']) == strtolower($sexo)) { // comparamossi coincide 
            $sum += $curso['valoracion']; // acumulamos la valoracion de cada curso coincidente con el sexp
            $count++; // Aumentramos el contador de cursos 
        }
    }
    return $count > 0 ? $sum / $count : 0;
}







// Función para obtener los 5 cursos más populares. SIN HACER.
function cursos_populares($data) {
    usort($data, function($a, $b) {
    });

}

?>