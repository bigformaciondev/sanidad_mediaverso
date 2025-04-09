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
    7: "Domingo",
  },
  gl: {
    1: "Luns",
    2: "Martes",
    3: "Mércores",
    4: "Xoves",
    5: "Venres",
    6: "Sábado",
    7: "Domingo",
  },
};
// Traducciones para los tipos de comida en castellano y gallego
const mealTypeNames = {
  es: {
    almorzo: "Desayuno",
    comida: "Comida",
    merenda: "Merienda",
    cea: "Cena",
  },
  gl: {
    almorzo: "Almorzo",
    comida: "Comida",
    merenda: "Merenda",
    cea: "Cea",
  },
};

// Define el idioma actual (puede venir de localStorage o de otro mecanismo)
// Por ejemplo, si no hay idioma definido, se usa "es" (castellano) por defecto:
function getCurrentLanguage() {
  return localStorage.getItem("language") || "es";
}
let mealPlanData = []; // Definimos aquí la variable global

function loadMealPlanData() {
  const lang = getCurrentLanguage();
  let jsonPath;

  if (lang === "gl") {
    jsonPath = "../../local/plan_alimentacion_completo.json";
  } else {
    jsonPath = "../../local/plan_alimentacion_completo_es.json";
  }

  return fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      mealPlanData = data;
      showWeek(1); // Mostrar semana 1 al cargar
      renderWeekPagination();
    })
    .catch(error => {
      console.error("Error al cargar el plan de alimentación:", error);
    });
}

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
  table.className =
    "table w-100 table-striped table-borderless table-space align-middle";

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
  tdSemana.className =
    "text-center fs-5 border border-3 border-primary text-primary verticaltext";
  tdSemana.innerText = `SEMANA ${weekData.semana}`;
  headerRow.appendChild(tdSemana);

  // 2) Celdas para cada día
  weekData.dias.forEach((day) => {
    const tdDay = document.createElement("td");
    // Asignamos el nombre mapeado si existe, o mostramos el número como fallback
    const dayLabel = dayNames[getCurrentLanguage()][day.dia] || day.dia;
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
  mealTypes.forEach((type) => {
    const tr = document.createElement("tr");

    // Celdas para cada día
    weekData.dias.forEach((day) => {
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
    mealTypeSpan.innerText = mealTypeNames[getCurrentLanguage()][mealKey] || mealKey;

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
if (typeof mealPlanData !== "undefined" && mealPlanData) {
    const weekData = mealPlanData.find((week) => week.semana === weekNumber);
    if (!weekData) {
      container.innerHTML = `<p>No hay datos para la semana ${weekNumber}</p>`;
      return;
    }
  
    // Creamos la tabla
    const table = renderWeekTableWithoutThead(weekData);
    container.appendChild(table);
  }
  
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
  meal.ingredientes.forEach((ing) => {
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
  meal.instrucciones.forEach((step) => {
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
  showWeek(1); // Muestra la semana 1 por defecto
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

  mealPlanData.forEach((week) => {
    // Si se selecciona "Todas las semanas" (valor "9") o coincide la semana
    if (semana === "9" || parseInt(week.semana, 10) === semSeleccionada) {
      week.dias.forEach((day) => {
        // Asumimos que day.dia es un número o convertible a número.
        const diaNumero = parseInt(day.dia, 10);
        // Si se seleccionan "Todos los días" (valor "8") o coincide el día
        if (dias === "8" || diaNumero === diaSeleccionado) {
          // Para cada tipo de comida
          ["almorzo", "comida", "merenda", "cea"].forEach((type) => {
            if (day[type]) {
              const meal = day[type];
              if (meal.ingredientes && Array.isArray(meal.ingredientes)) {
                meal.ingredientes.forEach((ing) => {
                  // Normalizamos la clave: quitamos espacios y convertimos a minúsculas
                  const key =
                    ing.nombre.trim().toLowerCase() +
                    "|" +
                    ing.unidad.trim().toLowerCase();
                  if (!grouped[key]) {
                    grouped[key] = {
                      nombre: ing.nombre,
                      unidad: ing.unidad,
                      cantidad: 0,
                    };
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
async function generarCestaPDF(adultos, ninos, semana, dias) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 10;
  const lineHeight = 8;
  let y = 30;
  let pageNumber = 1;

  const idioma = localStorage.getItem("language") || "es";
  const { t } = await cargarTraducciones();

  const dayNames = {
    es: { 1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado", 7: "Domingo", 8: "Todos los días" },
    gl: { 1: "Luns", 2: "Martes", 3: "Mércores", 4: "Xoves", 5: "Venres", 6: "Sábado", 7: "Domingo", 8: "Todos os días" }
  };

  getImageData("/assets/img/planificador-comidas-subbanner1.png", function (headerData) {
    getImageData("/assets/logo/logo-xunta-azul.png", function (footerData) {

      function addHeaderFooter() {
        doc.addImage(headerData, "PNG", 20, 5, 170, 15);
        doc.addImage(footerData, "PNG", 20, pageHeight - 20, 30, 15);
        doc.setFont("Xunta Sans", "italic");
        doc.setFontSize(10);
        doc.text(`${t("pagina")} ${pageNumber}`, pageWidth - 30, pageHeight - 10);
      }

      addHeaderFooter();

      doc.setFont("Xunta Sans", "bold");
      doc.setFontSize(16);
      doc.text(t("titulo-cesta-compra") || "Cesta de la Compra", pageWidth / 2, y, { align: "center" });
      y += lineHeight;

      doc.setFont("Xunta Sans", "normal");
      doc.setFontSize(12);
      doc.text(`${t("adultos")}: ${adultos}  |  ${t("ninos")}: ${ninos}`, margin, y);
      y += lineHeight;
      doc.text(`${t("semana")}: ${semana === "9" ? t("todas-semanas") : t("semana") + " " + semana}`, margin, y);
      y += lineHeight;

      const dayLabel = dayNames[idioma][dias] || dias;
      doc.text(`${t("día")}: ${dayLabel}`, margin, y);
      y += lineHeight + 5;

      const grouped = groupIngredients(adultos, ninos, semana, dias);
      const ingredientsArray = Object.values(grouped);
      ingredientsArray.sort((a, b) => a.nombre.localeCompare(b.nombre));

      doc.setFont("Xunta Sans", "bold");
      doc.setTextColor(0, 0, 150);
      doc.text(t("lista-ingredientes") || "Lista de Ingredientes:", margin, y);
      y += lineHeight;
      doc.setFont("Xunta Sans", "normal");
      doc.setTextColor(0, 0, 0);

      let colLeft = margin + 10;
      let colRight = pageWidth / 2;
      let useRightCol = false;

      ingredientsArray.forEach((ing) => {
        if (y > pageHeight - 30) {
          doc.addPage();
          pageNumber++;
          y = 30;
          addHeaderFooter();
        }
        const posX = useRightCol ? colRight : colLeft;
        doc.text(`- ${ing.nombre}: ${ing.cantidad.toFixed(2)} ${ing.unidad}`, posX, y);
        useRightCol = !useRightCol;
        if (!useRightCol) y += lineHeight;
      });

      doc.save("cesta_de_compra.pdf");
    });
  });
}

async function cargarTraducciones() {
  const idioma = localStorage.getItem("language") || "es";
  try {
    const res = await fetch("../../local/lang.json");
    const json = await res.json();
    return { t: (key) => json[idioma]?.[key] || key };
  } catch (err) {
    console.error("Error al cargar lang.json:", err);
    return { t: (key) => key }; // Fallback
  }
}

async function generarRecetarioPDF(adultos, ninos, semana, dias) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 10;
  const lineHeight = 8;
  let y = 40;
  let pageNumber = 1;

  const idioma = localStorage.getItem("language") || "es";
  const { t } = await cargarTraducciones(); // ✅ Carga dinámica del idioma

  const dayNames = {
    es: {
      1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado", 7: "Domingo", 8: "Todos los días"
    },
    gl: {
      1: "Luns", 2: "Martes", 3: "Mércores", 4: "Xoves", 5: "Venres", 6: "Sábado", 7: "Domingo", 8: "Todos os días"
    }
  };

  const mealTypeNames = {
    es: {
      almorzo: "Desayuno",
      comida: "Comida",
      merenda: "Merienda",
      cea: "Cena"
    },
    gl: {
      almorzo: "Almorzo",
      comida: "Xantar",
      merenda: "Merenda",
      cea: "Cea"
    }
  };

  getImageData("/assets/img/planificador-comidas-subbanner1.png", function (headerData) {
    getImageData("/assets/logo/logo-xunta-azul.png", function (footerData) {
      
      function addHeaderFooter() {
        doc.addImage(headerData, "PNG", 20, 5, 170, 15);
        doc.addImage(footerData, "PNG", 10, pageHeight - 25, 30, 15);
        doc.setFont("Xunta Sans", "italic");
        doc.setFontSize(10);
        doc.text(`${t("pagina")} ${pageNumber}`, pageWidth - 30, pageHeight - 10);
      }

      addHeaderFooter();

      // 📝 Título
      doc.setFont("times", "bold");
      doc.setFontSize(18);
      doc.text(t("recetario-semanal"), pageWidth / 2, y, { align: "center" });
      y += lineHeight;

      // 👤 Datos
      doc.setFont("Xunta Sans", "normal");
      doc.setFontSize(12);
      doc.text(`${t("adultos")}: ${adultos}  |  ${t("ninos")}: ${ninos}`, margin, y);
      y += lineHeight;
      doc.text(`${t("semana")}: ${semana === "9" ? t("todas-semanas") : t("semana") + " " + semana}`, margin, y);
      y += lineHeight;
      const dayLabel = dayNames[idioma][dias];
      doc.text(`${t("día")}: ${dayLabel}`, margin, y);
      y += lineHeight + 5;

      // 🧾 Contenido
      mealPlanData.forEach((week) => {
        if (semana === "9" || week.semana == semana) {
          doc.setFontSize(14);
          doc.setTextColor(0, 0, 150);
          doc.text(`${t("semana")} ${week.semana}`, margin, y);
          y += lineHeight;

          week.dias.forEach((day) => {
            if (dias === "8" || day.dia == dias) {
              const dayName = dayNames[idioma][day.dia];
              doc.setFontSize(12);
              doc.setTextColor(0, 0, 0);
              doc.text(`${t("día")}: ${dayName}`, margin, y);
              y += lineHeight;

              ["almorzo", "comida", "merenda", "cea"].forEach((type) => {
                if (day[type]) {
                  const meal = day[type];
                  const typeLabel = mealTypeNames[idioma][type] || type;

                  doc.setFont("Xunta Sans", "bold");
                  doc.text(`${typeLabel}:`, margin, y);
                  doc.setFont("Xunta Sans", "normal");
                  doc.text(meal.nombre, margin + 30, y);
                  y += lineHeight;

                  if (meal.ingredientes.length > 0) {
                    doc.setFont("Xunta Sans", "bold");
                    doc.text(`${t("ingredientes")}:`, margin + 5, y);
                    doc.setFont("Xunta Sans", "normal");
                    y += lineHeight;

                    let colLeft = margin + 10;
                    let colRight = pageWidth / 2;
                    let useRightCol = false;

                    meal.ingredientes.forEach((ing) => {
                      if (y > pageHeight - 40) {
                        doc.addPage();
                        pageNumber++;
                        y = 40;
                        addHeaderFooter();
                      }
                      const posX = useRightCol ? colRight : colLeft;
                      doc.text(`- ${ing.nombre}: ${ing.cantidad}${ing.unidad}`, posX, y);
                      useRightCol = !useRightCol;
                      if (!useRightCol) y += lineHeight;
                    });
                    y += lineHeight;
                  }

                  if (meal.instrucciones.length > 0) {
                    doc.setFont("Xunta Sans", "bold");
                    doc.text(`${t("instrucciones")}:`, margin + 5, y);
                    doc.setFont("Xunta Sans", "normal");
                    y += lineHeight;

                    meal.instrucciones.forEach((step) => {
                      if (y > pageHeight - 40) {
                        doc.addPage();
                        pageNumber++;
                        y = 40;
                        addHeaderFooter();
                      }
                      doc.text(`• ${step}`, margin + 10, y);
                      y += lineHeight;
                    });
                  }
                  y += 8;
                }
              });

              doc.setDrawColor(100);
              doc.line(margin, y, pageWidth - margin, y);
              y += 5;
            }
          });
        }
      });

      doc.save("recetario.pdf");
    });
  });
}




function getImageData(url, callback) {
  const img = new Image();
  // Permitir solicitudes de origen cruzado si las imágenes se sirven localmente
  img.crossOrigin = "Anonymous";
  img.src = url;
  img.onload = function () {
    // Crear un canvas para extraer la imagen en base64
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    callback(dataURL);
  };
  img.onerror = function (err) {
    console.error("Error al cargar la imagen: " + url, err);
    callback(null); // En caso de error, se pasa null
  };
}

/**
 * Agrega la cabecera en la página actual.
 * @param {jsPDF} doc - La instancia de jsPDF.
 * @param {boolean} isFirstPage - Si es la primera página, se usa una imagen distinta.
 * @param {string} firstPageHeaderData - Base64 de la cabecera especial (solo para la primera página).
 * @param {string} headerData - Base64 de la cabecera para las páginas siguientes.
 * @returns {number} - La coordenada Y a partir de la cual se puede escribir.
 */
function addHeader(doc, isFirstPage, firstPageHeaderData, headerData) {
  let yOffset = 0;
  if (isFirstPage && firstPageHeaderData) {
    // Ajusta la posición y dimensiones según necesites
    doc.addImage(firstPageHeaderData, "PNG", 10, 5, 190, 30);
    yOffset = 40; // Espacio para la imagen especial de la primera página
  } else if (headerData) {
    doc.addImage(headerData, "PNG", 10, 5, 190, 20);
    yOffset = 30;
  }
  return yOffset;
}

/**
 * Agrega el pie de página en la página actual.
 * @param {jsPDF} doc - La instancia de jsPDF.
 * @param {string} footerData - Base64 de la imagen del pie de página.
 */
function addFooter(doc, footerData) {
  if (footerData) {
    // Ajusta la posición Y y dimensiones según tu diseño
    doc.addImage(footerData, "PNG", 10, 280, 190, 20);
  }
}

// Asignamos eventos a los botones del formulario
// Función para validar y sanitizar los valores del formulario
function validateFormValues(adultos, ninos, semana, dias) {
  // Convertir a número por si llegan como strings
  adultos = parseInt(adultos, 10);
  ninos = parseInt(ninos, 10);

  // Validación: adultos y niños deben estar en el rango permitido
  if (isNaN(adultos) || adultos < 0 || adultos > 100) {
    alert("Por favor, ingresa un valor válido para Adultos (0 - 100).");
    return false;
  }

  if (isNaN(ninos) || ninos < 0 || ninos > 100) {
    alert("Por favor, ingresa un valor válido para Niños (0 - 100).");
    return false;
  }

  // Validación: al menos uno debe ser mayor a 0
  if (adultos === 0 && ninos === 0) {
    alert("Debe haber al menos un adulto o un niño para generar el menú.");
    return false;
  }

  // Validación de semana (1-8) o 9 = "todas las semanas"
  if (semana !== "9") {
    const semNum = parseInt(semana, 10);
    if (isNaN(semNum) || semNum < 1 || semNum > 8) {
      alert("Por favor, selecciona una semana válida (1 - 8) o 'Todas las semanas'.");
      return false;
    }
  }

  // Validación de días (1-7) o 8 = "todos los días"
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
document.getElementById("btnRecetario").addEventListener("click", function (e) {
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

document.getElementById("btnCesta").addEventListener("click", function (e) {
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
