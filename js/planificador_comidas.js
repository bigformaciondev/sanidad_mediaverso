/***********************************************
 * constantes
 */
// Si tus días van del 1 al 7

const dayNames = {
    es: {
      1: "Lunes",
      2: "Martes",
      3: "Miercoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado",
      7: "Domingo"
    },
    gl: {
        1: "Luns",
        2: "Martes",
        2: "Mércoles",
        4: "Xoves",
        5: "Venres",
        6: "Sábado",
        7: "Domingo"
    }
  };
// Traducciones para los tipos de comida en castellano y gallego
const mealTypeNames = {
    es: {
      almorzo: "Desayuno",
      comida: "Comida",
      merenda: "Merienda",
      cea: "Cena"
    },
    gl: {
      almorzo: "Almorzo",
      comida: "Comida",
      merenda: "Merenda",
      cea: "Cea"
    }
  };
  
  // Define el idioma actual (puede venir de localStorage o de otro mecanismo)
  // Por ejemplo, si no hay idioma definido, se usa "es" (castellano) por defecto:
  const currentLang = localStorage.getItem("language") || "es";
/***********************************************
 * renderWeekTableWithoutThead(weekData)
 * --------------------------------------------
 * Crea una tabla con la primera columna ocupada
 * por "SEMANA X" (vertical) y las columnas con
 * los días de la semana.
 * 
 * Estructura del <tbody>:
 *  Fila 1: [SEMANA X (rowSpan), ... Días ...]
 *  Filas siguientes (almorzo, comida, merenda, cea):
 *    [ ... celdas de cada día con la comida ...]
 ***********************************************/
function renderWeekTableWithoutThead(weekData) {
    // Tipos de comida que se mostrarán en filas
    const mealTypes = ["almorzo", "comida", "merenda", "cea"];

    // Creamos la tabla con clases de Bootstrap
    const table = document.createElement("table");
    table.className = "table  table-striped table-borderless table-space align-middle";

    // Crearemos un único <tbody> que contendrá
    // la fila de encabezado y las filas de comidas
    const tbody = document.createElement("tbody");

    /***********************************************
     * Fila de encabezado:
     *   - Celda "SEMANA X" con rowSpan = 1 + mealTypes.length
     *   - Celdas con los días (Luns, Martes, etc.)
     ***********************************************/
    const headerRow = document.createElement("tr");

    // 1) Celda "SEMANA X"
    const tdSemana = document.createElement("td");
    tdSemana.rowSpan = 1 + mealTypes.length; // 1 (fila de encabezado) + 4 comidas
    tdSemana.className = "text-center fs-5 border border-3 border-primary text-primary verticaltext";
    tdSemana.innerText = `SEMANA ${weekData.semana}`;
    headerRow.appendChild(tdSemana);

    // 2) Celdas para cada día
    weekData.dias.forEach(day => {
        const tdDay = document.createElement("td");
        // Asignamos el nombre mapeado si existe, o mostramos el número como fallback
        const dayLabel = dayNames[currentLang][day.dia] || day.dia;
        tdDay.innerText = dayLabel;

        tdDay.className = "fw-bold text-center bg-primary text-light py-3";
        // Añadimos la clase .table-primary para el fondo azul personalizado
        headerRow.appendChild(tdDay);
    });

    // Insertamos la fila de encabezado en el <tbody>
    tbody.appendChild(headerRow);

    /***********************************************
     * Filas de comida (almorzo, comida, merenda, cea)
     ***********************************************/
    mealTypes.forEach(type => {
        const tr = document.createElement("tr");

        // Celdas para cada día
        weekData.dias.forEach(day => {
            // Usamos la función renderMeal para cada tipo de comida
            // La hemos modificado para que indique "Almorzo: ..." etc.
            const td = renderMeal(type, day);
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    // Insertamos el <tbody> en la tabla
    table.appendChild(tbody);

    return table;
}

/***********************************************
 * renderMeal(mealKey, day)
 * --------------------------------------------
 * Crea una celda <td> que muestra la comida
 * correspondiente a mealKey (almorzo, comida,
 * merenda o cea) y el nombre del plato.
 * 
 * Al hacer clic, abre un modal con ingredientes
 * e instrucciones.
 ***********************************************/
function renderMeal(mealKey, day) {
    const tdMeal = document.createElement("td");
  
    if (day[mealKey]) {
      const meal = day[mealKey];
  
      // Contenedor principal en columna
      const container = document.createElement("div");
      container.className = "d-flex flex-column align-items-center text-center";
  
      // 1) Encabezado con línea izquierda, texto y línea derecha
      const headerLine = document.createElement("div");
      headerLine.className = "d-flex align-items-center text-center mb-2";
  
      const hrLeft = document.createElement("hr");
      hrLeft.className = "flex-grow-1 me-2 border-0 bg-primary";
      hrLeft.style.height = "1px";
      hrLeft.style.width = "32px";
  
      const hrRight = document.createElement("hr");
      hrRight.className = "flex-grow-1 ms-2 border-0 bg-primary";
      hrRight.style.height = "1px";
      hrRight.style.width = "32px";
  
      const mealTypeSpan = document.createElement("span");
      mealTypeSpan.className = "fw-bold";
      // Usamos la traducción del mealType según el idioma actual
      mealTypeSpan.innerText = mealTypeNames[currentLang][mealKey] || mealKey;
  
      headerLine.appendChild(hrLeft);
      headerLine.appendChild(mealTypeSpan);
      headerLine.appendChild(hrRight);
  
      // 2) Texto con el nombre de la comida debajo
      const mealName = document.createElement("p");
      mealName.className = "mb-0";
      mealName.innerText = meal.nombre;
      mealName.style.cursor = "pointer";
      mealName.addEventListener("click", (e) => {
        e.preventDefault();
        openMealModal(meal, mealKey);
      });
  
      // Agregamos el encabezado y el nombre al contenedor
      container.appendChild(headerLine);
      container.appendChild(mealName);
  
      // Añadimos el contenedor a la celda
      tdMeal.appendChild(container);
    } else {
      tdMeal.innerText = "No disponible";
    }
  
    return tdMeal;
  }
  

/***********************************************
 * capitalize(str)
 * --------------------------------------------
 * Convierte la primera letra a mayúscula,
 * útil para "almorzo" -> "Almorzo"
 ***********************************************/
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/***********************************************
 * showWeek(weekNumber)
 * --------------------------------------------
 * Busca la semana en el array global mealPlanData,
 * crea la tabla con renderWeekTableWithoutThead
 * y la inserta en el contenedor #week-container.
 ***********************************************/
function showWeek(weekNumber) {
    const container = document.getElementById("week-container");
    container.innerHTML = "";

    // Buscamos la semana en mealPlanData
    const weekData = mealPlanData.find(week => week.semana === weekNumber);
    if (!weekData) {
        container.innerHTML = `<p>No hay datos para la semana ${weekNumber}</p>`;
        return;
    }

    // Creamos la tabla
    const table = renderWeekTableWithoutThead(weekData);
    container.appendChild(table);
}

/***********************************************
 * renderWeekPagination(totalWeeks = 8)
 * --------------------------------------------
 * Crea los enlaces de paginación para las semanas
 * 1 a totalWeeks, y al hacer clic llama a showWeek(i).
 ***********************************************/
function renderWeekPagination(totalWeeks = 8) {
    const paginationContainer = document.getElementById("week-pagination");
    paginationContainer.innerHTML = "";

    const ul = document.createElement("ul");
    ul.className = "pagination justify-content-center";

    for (let i = 1; i <= totalWeeks; i++) {
        const li = document.createElement("li");
        li.className = "page-item";

        const a = document.createElement("a");
        a.className = "page-link";
        a.href = "#";
        a.innerText = i;
        a.addEventListener("click", function (e) {
            e.preventDefault();
            showWeek(i);
        });

        li.appendChild(a);
        ul.appendChild(li);
    }

    paginationContainer.appendChild(ul);
}

/***********************************************
 * openMealModal(meal, mealType)
 * --------------------------------------------
 * Abre un modal de Bootstrap mostrando ingredientes
 * e instrucciones de la comida seleccionada.
 ***********************************************/
function openMealModal(meal, mealType) {
    const modalTitle = document.getElementById("mealModalLabel");
    modalTitle.innerText = meal.nombre;

    const modalContent = document.getElementById("mealModalContent");
    modalContent.innerHTML = ""; // Limpiar contenido previo

    // Lista de ingredientes
    const ingredientsTitle = document.createElement("h6");
    ingredientsTitle.innerText = "Ingredientes:";
    modalContent.appendChild(ingredientsTitle);

    const ulIngredients = document.createElement("ul");
    meal.ingredientes.forEach(ing => {
        const li = document.createElement("li");
        li.innerText = `${ing.nombre}: ${ing.cantidad}${ing.unidad}`;
        ulIngredients.appendChild(li);
    });
    modalContent.appendChild(ulIngredients);

    // Instrucciones
    const instructionsTitle = document.createElement("h6");
    instructionsTitle.innerText = "Instrucciones:";
    modalContent.appendChild(instructionsTitle);

    const olInstructions = document.createElement("ol");
    meal.instrucciones.forEach(step => {
        const li = document.createElement("li");
        li.innerText = step;
        olInstructions.appendChild(li);
    });
    modalContent.appendChild(olInstructions);

    // Mostrar el modal con la API de Bootstrap
    const mealModal = new bootstrap.Modal(document.getElementById("mealModal"));
    mealModal.show();
}

/***********************************************
 * Inicio al cargar el DOM
 ***********************************************/
document.addEventListener("DOMContentLoaded", function () {
    // Asegúrate de que mealPlanData esté definido
    // (ya sea global o cargado vía fetch antes).
    showWeek(1);           // Muestra la semana 1 por defecto
    renderWeekPagination(); // Genera los controles de paginación (1 a 8)
});
