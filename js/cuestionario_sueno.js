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
  bedtimeInput.addEventListener("change", calcularHorasDeSueño);
  wakeTimeInput.addEventListener("change", calcularHorasDeSueño);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    marcarErrores();

    const edad = parseInt(ageInput.value, 10);
    const fecha = dateInput.value;

    if (!edad || !fecha || !form.checkValidity()) {
      mostrarAlerta("form-error-incompleto");
      return;
    }

    calcularHorasDeSueño();
    const datos = recolectarDatos();

    if (botonClicado === "resultado") {
      mostrarModalResultado(datos);
    } else if (botonClicado === "pdf") {
      generarPDF(datos);
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

  function mostrarModalResultado(datos) {
    const modalContent = document.getElementById("mealModalContent");
    modalContent.innerHTML = `
          <div class="container">
              <h4 class="mb-4 text-primary fw-bold"><i class="bi bi-moon-stars-fill"></i> Resumen del Sueño</h4>
              <div class="row g-3">
      
                <!-- Edad -->
                <div class="col-md-4">
                    <div class="card  shadow-sm border-primary">
                        <div class="card-body text-center">
                            <h6 class="card-title"><i class="bi bi-person-fill"></i> Edad</h6>
                            <p class="card-text fs-5">${datos.edad}</p>
                        </div>
                    </div>
                </div>
      
                <!-- Fecha -->
                <div class="col-md-4">
                    <div class="card  shadow-sm border-primary">
                        <div class="card-body text-center">
                            <h6 class="card-title"><i class="bi bi-calendar-date-fill"></i> Fecha</h6>
                            <p class="card-text fs-5">${datos.fecha}</p>
                        </div>
                    </div>
                </div>
      
                <!-- Horas Dormidas -->
                <div class="col-md-4">
                    <div class="card  shadow-sm border-primary">
                        <div class="card-body text-center">
                            <h6 class="card-title"><i class="bi bi-clock-fill"></i> Horas dormidas</h6>
                            <p class="card-text fs-5">${datos.horasDormidas}</p>
                        </div>
                    </div>
                </div>
      
                <!-- Sumas -->
                <div class="col-md-6">
                    <div class="card   shadow-sm border-warning">
                        <div class="card-body text-center">
                            <h6 class="card-title">Suma Pregunta 5</h6>
                            <p class="card-text fs-5">${datos.sumaPregunta5}</p>
                        </div>
                    </div>
                </div>
      
                <div class="col-md-6">
                    <div class="card   shadow-sm border-warning">
                        <div class="card-body text-center">
                            <h6 class="card-title">Suma otras preguntas</h6>
                            <p class="card-text fs-5">${datos.sumaOtras}</p>
                        </div>
                    </div>
                </div>
      
                <div class="col-12">
                    <div class="card   shadow-sm border-success bg-light">
                        <div class="card-body text-center">
                            <h5 class="card-title fw-bold text-success"><i class="bi bi-clipboard-check-fill"></i> Total</h5>
                            <p class="card-text fs-4">${datos.total}</p>
                        </div>
                    </div>
                </div>
      
              </div>
      
              <!-- Botón para generar PDF -->
              <div class="text-center mt-4">
                  <button class="btn btn-outline-primary" id="descargarPdfDesdeModal">
                      <i class="bi bi-file-earmark-pdf-fill"></i> Descargar PDF
                  </button>
              </div>
          </div>
        `;

    // Asociar el evento click al botón para generar el PDF
    setTimeout(() => {
      const btnPdf = document.getElementById("descargarPdfDesdeModal");
      if (btnPdf) {
        btnPdf.addEventListener("click", () => {
          generarPDF(datos);
        });
      }
    }, 100); // Esperar a que el DOM del modal esté completamente cargado

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById("mealModal"));
    modal.show();
  }
  function generarPDF(datos) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Resumen de Cuestionario de Sueño", 10, 20);
    doc.setFontSize(12);
    doc.text(`Edad: ${datos.edad}`, 10, 30);
    doc.text(`Fecha: ${datos.fecha}`, 10, 40);
    doc.text(`Horas Dormidas: ${datos.horasDormidas}`, 10, 50);
    doc.text(`Suma Pregunta 5: ${datos.sumaPregunta5}`, 10, 60);
    doc.text(`Suma Otras Preguntas: ${datos.sumaOtras}`, 10, 70);
    doc.text(`Total: ${datos.total}`, 10, 80);

    doc.save("resultado-sueno.pdf");
  }
});
