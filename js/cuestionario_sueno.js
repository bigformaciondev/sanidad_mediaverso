document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("sleepForm");
  const ageInput = document.getElementById("age");
  const dateInput = document.getElementById("date");
  const bedtimeInput = document.getElementById("bedtime");
  const wakeTimeInput = document.getElementById("wakeTime");
  const sleepHoursInput = document.getElementById("sleepHours");

  let botonClicado = null;

  const resultadoBtn = form.querySelector("button.btn-primary");
  const pdfBtn = form.querySelector("button.btn-outline-primary");

  resultadoBtn.addEventListener("click", () => (botonClicado = "resultado"));
  pdfBtn.addEventListener("click", () => (botonClicado = "pdf"));
  // Calcular año date automaticamente
  ageInput.addEventListener("input", function () {
    const edad = parseInt(this.value, 10);
    if (!isNaN(edad) && edad > 0 && edad < 120) {
      const hoy = new Date();
      const anioNacimiento = hoy.getFullYear() - edad;
      const fechaNacimiento = `${anioNacimiento}-01-01`;
      dateInput.value = fechaNacimiento;
    } else {
      // Si se borra o se pone una edad inválida, limpiamos la fecha
      dateInput.value = "";
    }
  });

  // Calcular horas automáticamente cuando cambian las horas
  bedtimeInput.addEventListener("change", () => {
    if (wakeTimeInput.value) {
      calcularHorasDeSueño();
    }
  });
  
  wakeTimeInput.addEventListener("change", () => {
    if (bedtimeInput.value) {
      calcularHorasDeSueño();
    }
  });
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    marcarErrores();

    const edad = parseInt(ageInput.value, 10);
    const fecha = dateInput.value;

    if (!edad || !fecha || !form.checkValidity()) {
      mostrarAlerta("form-error-incompleto");
      return;
    }

    const datos = recolectarDatos();
    // Construir la ruta del JSON según el idioma
    const idioma = localStorage.getItem("language") || "es";
    let jsonPath;
    if (idioma === "gl") {
      jsonPath = "../../local/cuestionario_sueno.json";
    } else {
      jsonPath = "../../local/cuestionario_sueno_es.json";
    }
    fetch(jsonPath)
      .then((response) => response.json())
      .then((jsonPSQI) => {
        const resultadoPSQI = procesarPSQI(datos, jsonPSQI);

        if (botonClicado === "resultado") {
          mostrarModalResultadoConPSQI(resultadoPSQI, datos);
        } else if (botonClicado === "pdf") {
          generarPDFconPSQI(resultadoPSQI, datos);
        }
      })
      .catch((error) => {
        console.error("Error al cargar el JSON del PSQI:", error);
        alert(
          "Hubo un problema al procesar los resultados. Inténtalo de nuevo."
        );
      });
  });
  const advertenciaEdad = document.getElementById("edadAdvertencia");

  ageInput.addEventListener("input", function () {
    const edad = parseInt(this.value, 10);
    const hoy = new Date();

    if (!isNaN(edad) && edad > 0 && edad < 120) {
      // Establecer la fecha automáticamente
      const anioNacimiento = hoy.getFullYear() - edad;
      dateInput.value = `${anioNacimiento}-01-01`;

      // Mostrar advertencia si es menor de 14
      if (edad < 14) {
        const idioma = localStorage.getItem("language") || "es";
        advertenciaEdad.style.display = "block";
        advertenciaEdad.textContent =
          idioma === "gl"
            ? "Este cuestionario é útil para persoas maiores de 14 anos. Siga as recomendacións do seu pediatra de referencia se é menor de esa idade."
            : "Este cuestionario es útil para personas mayores de 14 años. Siga las recomendaciones de su pediatra de referencia para personas menores de esa edad.";
      } else {
        advertenciaEdad.style.display = "none";
        advertenciaEdad.textContent = "";
      }
    } else {
      // Limpiar si edad inválida
      dateInput.value = "";
      advertenciaEdad.style.display = "none";
      advertenciaEdad.textContent = "";
    }
  });

  function mostrarAlerta(claveTraduccion) {
    const mensajes = {
      es: {
        "form-error-incompleto":
          "Por favor, complete todos los campos obligatorios.",
      },
      gl: {
        "form-error-incompleto":
          "Por favor, complete todos os campos obrigatorios.",
      },
    };
    const idioma = localStorage.getItem("language") || "es";
    alert(mensajes[idioma][claveTraduccion]);
  }

  function marcarErrores() {
    // Limpia todos los errores anteriores
    const etiquetas = form.querySelectorAll("label.form-label");
    etiquetas.forEach((label) => label.classList.remove("text-danger"));

    // Inputs sueltos
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      const container = input.closest(".form-group, .mb-3, .col-md-4");
      const label = container?.querySelector("label.form-label");
      if (input.required && !input.value && label) {
        label.classList.add("text-danger");
      }
    });

    // Para inputs tipo radio agrupados por nombre
    const radioGroups = {};
    form.querySelectorAll('input[type="radio"]').forEach((radio) => {
      if (!radioGroups[radio.name]) radioGroups[radio.name] = [];
      radioGroups[radio.name].push(radio);
    });

    Object.values(radioGroups).forEach((radios) => {
      const algunoSeleccionado = radios.some((r) => r.checked);
      if (!algunoSeleccionado) {
        const contenedor = radios[0].closest(".col-md-4, .mb-3");
        const label = contenedor?.querySelector("label.form-label");
        if (label) label.classList.add("text-danger");
      }
    });
  }

  function calcularHorasDeSueño() {
    const horaInicio = bedtimeInput.value;
    const horaFin = wakeTimeInput.value;
    if (!horaInicio || !horaFin) return;

    const [h1, m1] = horaInicio.split(":").map(Number);
    const [h2, m2] = horaFin.split(":").map(Number);

    let minutosDormidos = h2 * 60 + m2 - (h1 * 60 + m1);
    if (minutosDormidos <= 0) minutosDormidos += 1440;

    const horasDormidas = (minutosDormidos / 60).toFixed(1);
    sleepHoursInput.value = horasDormidas;
  }

  function recolectarDatos() {
    const datos = {
      edad: ageInput.value,
      fecha: dateInput.value,
      horasDormidas: sleepHoursInput.value,
      campos: {},
      sumaPregunta5: 0,
      sumaOtras: 0,
      total: 0,
    };

    const radios = form.querySelectorAll('input[type="radio"]:checked');
    radios.forEach((radio) => {
      datos.campos[radio.name] = radio.value;
      const valor = parseInt(radio.value, 10);
      if (!isNaN(valor) && valor >= 1 && valor <= 4) {
        if (radio.name.startsWith("5-")) {
          datos.sumaPregunta5 += valor;
        } else {
          datos.sumaOtras += valor;
        }
      }
    });
    datos.total = datos.sumaPregunta5 + datos.sumaOtras;
    return datos;
  }
  function procesarPSQI(datosFormulario, jsonPSQI) {
  const componentes = jsonPSQI.componentes;
  const edad = parseInt(datosFormulario.edad, 10);
  const horasDormidas = parseFloat(datosFormulario.horasDormidas || 0);
  const campos = datosFormulario.campos;
  const resultado = {
    componentes: {},
    total: 0,
  };

  console.log("🔍 Edad:", edad);
  console.log("🔍 Horas dormidas:", parseInt(horasDormidas));
  console.log("🔍 Campos recogidos:", campos);

  for (const num in componentes) {
    const comp = componentes[num];
    let puntuacion = 0;
    let comentario = "";

    console.log(`\n📘 Procesando componente ${num} - ${comp.nombre}`);

    switch (num) {
      case "1":
        puntuacion = parseInt(campos[comp.pregunta] || 0);
        comentario = comp.comentarios[puntuacion] || "";
        break;

      case "2":
        const sleepTime = campos["sleepTime"];
        const valSleepTime = Object.entries(comp.preguntas.sleepTime).find(
          ([txt]) => txt === obtenerTextoSleepTime(sleepTime)
        )?.[1] || 0;
        const val5a = parseInt(campos["5-a"] || 0);
        const suma2 = valSleepTime + val5a;

        puntuacion = suma2;
        comentario = comp.comentarios[puntuacion] || "";
        break;

      case "3":
        let edadGrupo = edad >= 65 ? "65+" : edad >= 18 ? "18-64" : "14-17";
        let horasStr = clasificarDuracionSueno(edad, horasDormidas);
        puntuacion = comp.tablas[edadGrupo][horasStr] ?? 0;
        comentario = comp.comentarios[`${puntuacion}`];

        console.log("▶️ Duración del sueño");
        console.log("  👥 Grupo edad:", edadGrupo);
        console.log("  🕒 Horas categorizadas:", horasStr);
        console.log("  ✅ Puntuación:", puntuacion, "| Comentario:", comentario);
        break;

      case "4":
        const horaAcostarse = document.getElementById("bedtime").value;
        const horaDespertarse = document.getElementById("wakeTime").value;
        const duracionEstimada = calcularDiferenciaHoras(horaAcostarse, horaDespertarse);
        const eficiencia = (horasDormidas / duracionEstimada) * 100;

        if (eficiencia > 85) puntuacion = 0;
        else if (eficiencia > 75) puntuacion = 1;
        else if (eficiencia > 65) puntuacion = 2;
        else puntuacion = 3;

        comentario = comp.comentarios[`${puntuacion}`] || comp.comentarios["1-2"];

        console.log("▶️ Eficiencia del sueño");
        console.log("  🛏️ Acostarse:", horaAcostarse);
        console.log("  ⏰ Levantarse:", horaDespertarse);
        console.log("  ⌛ Duración estimada:", duracionEstimada);
        console.log("  📊 Eficiencia calculada:", eficiencia.toFixed(2) + "%");
        console.log("  ✅ Puntuación:", puntuacion, "| Comentario:", comentario);
        break;

      case "5":
        const preguntas5 = comp.preguntas;
        let suma5 = 0;
        console.log("▶️ Perturbaciones del sueño");
        preguntas5.forEach((p) => {
          const val = parseInt(campos[p] || 0);
          const score = comp.puntuacion[val] || 0;
          suma5 += score;
          console.log(`  ❓ ${p} → ${val} → +${score}`);
        });
        puntuacion = calcularPorRango(suma5, comp.rango);
        comentario = comp.comentarios[`${puntuacion}`];
        console.log("  ➕ Suma total:", suma5);
        console.log("  ✅ Puntuación:", puntuacion, "| Comentario:", comentario);
        break;

      case "6":
        puntuacion = parseInt(campos[comp.pregunta] || 0);
        comentario = comp.comentarios[`${puntuacion}`];
        console.log("▶️ Medicación hipnótica:", puntuacion, comentario);
        break;

      case "7":
        const val8a = comp.preguntas["8-a"][campos["8-a"]] ?? 0;
        const val9a = comp.preguntas["9-a"][campos["9-a"]] ?? 0;
        const suma7 = val8a + val9a;
        comentario = comp.comentarios[`${suma7}`] || comp.comentarios[`${suma7}`];

        console.log("▶️ Disfunción diurna");
        console.log("  🚗 8-a:", campos["8-a"], "→", val8a);
        console.log("  😩 9-a:", campos["9-a"], "→", val9a);
        console.log("  ➕ Suma:", suma7);
        console.log("  ✅ Puntuación:", puntuacion, "| Comentario:", comentario);
        break;
    }

    resultado.componentes[comp.nombre] = {
      puntuacion,
      comentario,
    };
    resultado.total += puntuacion;

    console.log(`✅ Total acumulado tras ${comp.nombre}:`, resultado.total);
  }

  console.log("\n📊 Resultado final del PSQI:", resultado);
  return resultado;
}

  function obtenerTextoSleepTime(valor) {
    switch (valor) {
      case "1":
        return "Menos de 15 min";
      case "2":
        return "Entre 16-30 min";
      case "3":
        return "Entre 31-60 min";
      case "4":
        return "Más de 60 min";
      default:
        return "";
    }
  }

  function calcularDiferenciaHoras(horaInicio, horaFin) {
    const [h1, m1] = horaInicio.split(":").map(Number);
    const [h2, m2] = horaFin.split(":").map(Number);
    let minutos = h2 * 60 + m2 - (h1 * 60 + m1);
    if (minutos <= 0) minutos += 1440;
    return (minutos / 60).toFixed(1);
  }

  function calcularPorRango(valor, rangos) {
    for (const clave in rangos) {
      if (clave.includes("-")) {
        const [min, max] = clave.split("-").map(Number);
        if (valor >= min && valor <= max) return parseInt(rangos[clave]);
      } else if (clave.includes(">")) {
        const min = parseInt(clave.slice(1));
        if (valor > min) return parseInt(rangos[clave]);
      } else if (clave.includes("<")) {
        const max = parseInt(clave.slice(1));
        if (valor < max) return parseInt(rangos[clave]);
      } else {
        if (parseInt(clave) === valor) return parseInt(rangos[clave]);
      }
    }
    return 0;
  }
  function clasificarDuracionSueno(edad, horas) {
    if (edad < 18) {
      if (horas > 8) return ">8";
      if (horas > 7) return ">7-8";
      if (horas >= 6) return "6-7";
      return "<6";
    }
  
    if (edad >= 18 && edad < 65) {
      if (horas > 7) return ">7";
      if (horas > 6) return ">6-7";
      if (horas >= 5) return "5-6";
      return "<5";
    }
  
    if (edad >= 65) {
      if (horas > 7) return ">7";
      if (horas > 6) return ">6-7";
      if (horas >= 5) return "5-6";
      return "<5";
    }
  
    return ""; // en caso de que no encaje en nada
  }
  
  function mostrarModalResultadoConPSQI(resultadoPSQI, datosFormulario) {
    const modalContent = document.getElementById("mealModalContent");
  
    let html = `
      <div class="container">
        <h4 class="mb-4 text-primary fw-bold" data-translate="psqi-titulo">
          <i class="bi bi-moon-stars-fill"></i> Índice de Calidad del Sueño (PSQI)
        </h4>
  
        <div class="row g-3">
          <div class="col-md-4">
            <div class="card shadow-sm border-primary h-100">
              <div class="card-body text-center">
                <h6 class="card-title" data-translate="modal-edad">
                  <i class="bi bi-person-fill"></i> Edad
                </h6>
                <p class="card-text fs-5">${datosFormulario.edad}</p>
              </div>
            </div>
          </div>
  
          <div class="col-md-4">
            <div class="card shadow-sm border-primary h-100">
              <div class="card-body text-center">
                <h6 class="card-title" data-translate="modal-fecha">
                  <i class="bi bi-calendar-date-fill"></i> Fecha
                </h6>
                <p class="card-text fs-5">${datosFormulario.fecha}</p>
              </div>
            </div>
          </div>
  
          <div class="col-md-4">
            <div class="card shadow-sm border-primary h-100">
              <div class="card-body text-center">
                <h6 class="card-title" data-translate="modal-horas-dormidas">
                  <i class="bi bi-clock-fill"></i> Horas dormidas
                </h6>
                <p class="card-text fs-5">${datosFormulario.horasDormidas}</p>
              </div>
            </div>
          </div>
        </div>
  
        <hr class="my-4">
  
        <div class="row g-4">
    `;
  
    for (const nombre in resultadoPSQI.componentes) {
      const comp = resultadoPSQI.componentes[nombre];
      const nombreTraducidoKey = `psqi-${nombre}`;
      const comentarioKey = `psqi-${nombre}-comentario`;
  
      html += `
        <div class="col-12">
          <div class="card border-info shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title text-capitalize" data-translate="${nombreTraducidoKey}">
                ${nombre.replace(/-/g, " ")}
              </h5>
              <p class="card-text" data-translate="${comentarioKey}">
                ${comp.comentario}
              </p>
            </div>
          </div>
        </div>`;
    }
  
    html += `
        </div>
        <!-- Botón para generar PDF -->
        <div class="text-center mt-4">
          <button class="btn btn-outline-primary" id="descargarPdfDesdeModal">
            <i class="bi bi-file-earmark-pdf-fill"></i> Descargar PDF
          </button>
        </div>
      </div>
    `;
  
    modalContent.innerHTML = html;
  
    setTimeout(() => {
      const btnPdf = document.getElementById("descargarPdfDesdeModal");
      if (btnPdf) {
        btnPdf.addEventListener("click", () => {
          generarPDFconPSQI(resultadoPSQI, datosFormulario);
        });
      }
    }, 100);
  
    const modal = new bootstrap.Modal(document.getElementById("mealModal"));
    modal.show();
  }
  

  function generarPDFconPSQI(resultadoPSQI, datosFormulario) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const margenIzq = 10;
    let y = 20;
  
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Resumen del Índice de Calidad del Sueño (PSQI)", margenIzq, y);
  
    y += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Edad: ${datosFormulario.edad}`, margenIzq, y);
    y += 10;
    doc.text(`Fecha: ${datosFormulario.fecha}`, margenIzq, y);
    y += 10;
    doc.text(`Horas dormidas: ${datosFormulario.horasDormidas}`, margenIzq, y);
    y += 15;
  
    // Componentes PSQI
    for (const nombre in resultadoPSQI.componentes) {
      const comp = resultadoPSQI.componentes[nombre];
      const titulo = nombre.replace(/-/g, " ");
  
      // Traducción opcional del título (si usas el sistema multilenguaje)
      // const idioma = localStorage.getItem("language") || "es";
      // const traduccion = traducciones[idioma][`psqi-${nombre}`] || titulo;
  
      doc.setFont("helvetica", "bold");
      doc.text(titulo.charAt(0).toUpperCase() + titulo.slice(1), margenIzq, y);
      y += 7;
  
      doc.setFont("helvetica", "normal");
      const comentarioLineas = doc.splitTextToSize(comp.comentario, 180);
      doc.text(comentarioLineas, margenIzq, y);
      y += comentarioLineas.length * 7;
  
      y += 5; // Espacio adicional entre componentes
  
      // Salto de página si se pasa del margen inferior
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }
  
    // Puntuación total al final
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`Puntuación total PSQI: ${resultadoPSQI.total}`, margenIzq, y + 10);
  
    doc.save("resultado-psqi.pdf");
  }
  
});
