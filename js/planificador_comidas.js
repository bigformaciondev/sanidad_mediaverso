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
    table.className = "table w-100 table-striped table-borderless table-space align-middle";

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
// Suponemos que mealPlanData ya está cargado globalmente desde tu JSON de planificador de alimentos
// Función auxiliar para agrupar ingredientes
function groupIngredients(adultos, ninos, semana, dias) {
  // Factor: cada adulto = 1, cada niño = 0.5
  const factor = adultos + ninos * 0.5;
  const grouped = {};

  // Convertir semana y dias a números para comparar correctamente
  const semSeleccionada = parseInt(semana, 10);
  const diaSeleccionado = parseInt(dias, 10);

  mealPlanData.forEach(week => {
    // Si se selecciona "Todas las semanas" (valor "9") o coincide la semana
    if (semana === "9" || parseInt(week.semana, 10) === semSeleccionada) {
      week.dias.forEach(day => {
        // Asumimos que day.dia es un número o convertible a número.
        const diaNumero = parseInt(day.dia, 10);
        // Si se seleccionan "Todos los días" (valor "8") o coincide el día
        if (dias === "8" || diaNumero === diaSeleccionado) {
          // Para cada tipo de comida
          ["almorzo", "comida", "merenda", "cea"].forEach(type => {
            if (day[type]) {
              const meal = day[type];
              if (meal.ingredientes && Array.isArray(meal.ingredientes)) {
                meal.ingredientes.forEach(ing => {
                  // Normalizamos la clave: quitamos espacios y convertimos a minúsculas
                  const key = ing.nombre.trim().toLowerCase() + "|" + ing.unidad.trim().toLowerCase();
                  if (!grouped[key]) {
                    grouped[key] = { nombre: ing.nombre, unidad: ing.unidad, cantidad: 0 };
                  }
                  // Sumamos la cantidad convertida a número y ajustada por el factor
                  grouped[key].cantidad += Number(ing.cantidad) * factor;
                });
              }
            }
          });
        }
      });
    }
  });

  return grouped;
}


// Función para generar el PDF de la cesta de la compra
function generarCestaPDF(adultos, ninos, semana, dias) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Título y filtros en el PDF
  doc.setFontSize(16);
  doc.text("Cesta de la compra", 10, 10);
  doc.setFontSize(12);
  doc.text(`Adultos: ${adultos}   Niños: ${ninos}`, 10, 20);
  doc.text(
    `Semana: ${semana === "9" ? "Todas las semanas" : "Semana " + semana}`,
    10,
    30
  );
  // Para el día, si se selecciona un número, usamos el nombre según currentLang y dayNames
  const dayLabel = dias === "8" ? "Todos los días" : (dayNames[currentLang] && dayNames[currentLang][dias] ? dayNames[currentLang][dias] : dias);
  doc.text(`Días: ${dayLabel}`, 10, 40);

  let y = 50;

  // Agrupamos los ingredientes
  const grouped = groupIngredients(adultos, ninos, semana, dias);
  // Convertimos el objeto agrupado a un array
  const ingredientsArray = Object.values(grouped);
  // Opcional: ordenamos alfabéticamente
  ingredientsArray.sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Listamos cada ingrediente
  ingredientsArray.forEach(ing => {
    // Mostramos la cantidad con 2 decimales
    doc.text(`- ${ing.nombre}: ${ing.cantidad.toFixed(2)} ${ing.unidad}`, 10, y);
    y += 6;
    // Si y supera el límite de la página, añade una nueva página
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  // Guarda el PDF
  doc.save("cesta_de_compra.pdf");
}

// Función para generar el PDF del recetario (puedes dejarlo igual o ajustarlo similarmente)
function generarRecetarioPDF(adultos, ninos, semana, dias) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Encabezado del PDF
  doc.setFontSize(16);
  doc.text("Recetario", 10, 10);
  doc.setFontSize(12);
  doc.text(`Adultos: ${adultos}   Niños: ${ninos}`, 10, 20);
  doc.text(
    `Semana: ${semana === "9" ? "Todas las semanas" : "Semana " + semana}`,
    10,
    30
  );
  const dayLabel =
    dias === "8"
      ? "Todos los días"
      : (dayNames[currentLang] && dayNames[currentLang][dias]
          ? dayNames[currentLang][dias]
          : dias);
  doc.text(`Días: ${dayLabel}`, 10, 40);

  let y = 50;
  const lineHeight = 6; // Altura de línea para cada texto

  // Recorremos los datos del plan de alimentación
  mealPlanData.forEach(week => {
    if (semana === "9" || week.semana == semana) {
      doc.setFontSize(14);
      doc.text(`Semana ${week.semana}:`, 10, y);
      y += lineHeight + 2;
      week.dias.forEach(day => {
        // Filtrar por día: "8" significa todos los días, sino, se compara
        if (dias === "8" || day.dia == dias) {
          doc.setFontSize(12);
          // Mapeamos el número del día al nombre según el idioma actual
          const dayName =
            dayNames[currentLang] && dayNames[currentLang][day.dia]
              ? dayNames[currentLang][day.dia]
              : day.dia;
          doc.text(`Día ${dayName}:`, 10, y);
          y += lineHeight;

          // Para cada tipo de comida
          ["almorzo", "comida", "merenda", "cea"].forEach(type => {
            if (day[type]) {
              const typeLabel =
                mealTypeNames[currentLang][type] || capitalize(type);
              const meal = day[type];

              // Escribe el título de la comida: "Desayuno: <nombre>"
              doc.text(`${typeLabel}: ${meal.nombre}`, 15, y);
              y += lineHeight;

              // Lista los ingredientes (si existen)
              if (meal.ingredientes && meal.ingredientes.length > 0) {
                doc.text("  Ingredientes:", 18, y);
                y += lineHeight;
                meal.ingredientes.forEach(ing => {
                  doc.text(
                    `    - ${ing.nombre}: ${ing.cantidad}${ing.unidad}`,
                    20,
                    y
                  );
                  y += lineHeight;
                  if (y > 280) {
                    doc.addPage();
                    y = 20;
                  }
                });
              }

              // Lista las instrucciones (si existen)
              if (meal.instrucciones && meal.instrucciones.length > 0) {
                doc.text("  Instrucciones:", 18, y);
                y += lineHeight;
                meal.instrucciones.forEach(step => {
                  doc.text(`    • ${step}`, 20, y);
                  y += lineHeight;
                  if (y > 280) {
                    doc.addPage();
                    y = 20;
                  }
                });
              }
              y += 2; // Espacio extra entre comidas
            }
          });
          y += 4; // Espacio entre días
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
        }
      });
      y += 8; // Espacio entre semanas
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    }
  });

  doc.save("recetario.pdf");
}



// Asignamos eventos a los botones del formulario
// Función para validar y sanitizar los valores del formulario
function validateFormValues(adultos, ninos, semana, dias) {
  // Verifica que sean números y no negativos
  if (isNaN(adultos) || adultos < 1 || adultos > 100) {
    alert("Por favor, ingresa un valor válido para Adultos (1 - 100).");
    return false;
  }
  if (isNaN(ninos) || ninos < 1 || ninos > 100) {
    alert("Por favor, ingresa un valor válido para Niños (1 - 100).");
    return false;
  }
  // Para semana: si no es "9" (todas las semanas), debe estar entre 1 y 8
  if (semana !== "9") {
    const semNum = parseInt(semana, 10);
    if (isNaN(semNum) || semNum < 1 || semNum > 8) {
      alert("Por favor, selecciona una semana válida (1 - 8) o 'Todas las semanas'.");
      return false;
    }
  }
  // Para días: si no es "8" (todos los días), debe estar entre 1 y 7
  if (dias !== "8") {
    const diaNum = parseInt(dias, 10);
    if (isNaN(diaNum) || diaNum < 1 || diaNum > 7) {
      alert("Por favor, selecciona un día válido (1 - 7) o 'Todos los días'.");
      return false;
    }
  }
  return true;
}

// Asignamos eventos a los botones del formulario
document.getElementById("btnRecetario").addEventListener("click", function(e) {
  e.preventDefault();
  
  // Obtener valores y eliminar espacios en blanco
  const adultosStr = document.getElementById("adultosForm").value.trim();
  const ninosStr = document.getElementById("kidsForm").value.trim();
  const semana = document.getElementById("semanaForm").value.trim();
  const dias = document.getElementById("diasForm").value.trim();
  
  // Convertir a números
  const adultos = parseInt(adultosStr, 10);
  const ninos = parseInt(ninosStr, 10);
  
  // Validar datos
  if (!validateFormValues(adultos, ninos, semana, dias)) {
    return; // Si falla la validación, no se continúa
  }
  
  generarRecetarioPDF(adultos, ninos, semana, dias);
});

document.getElementById("btnCesta").addEventListener("click", function(e) {
  e.preventDefault();
  
  const adultosStr = document.getElementById("adultosForm").value.trim();
  const ninosStr = document.getElementById("kidsForm").value.trim();
  const semana = document.getElementById("semanaForm").value.trim();
  const dias = document.getElementById("diasForm").value.trim();
  
  const adultos = parseInt(adultosStr, 10);
  const ninos = parseInt(ninosStr, 10);
  
  if (!validateFormValues(adultos, ninos, semana, dias)) {
    return;
  }
  
  generarCestaPDF(adultos, ninos, semana, dias);
});

