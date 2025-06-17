const traduccionesEncuesta = {
  es: {
    titulo: "¿Cómo valorarías tu experiencia?",
    opciones: ["😠", "😐", "😊", "😍"],
    valores: ["Muy mala", "Regular", "Buena", "Excelente"],
    agradecimiento: "¡Gracias por tu opinión!",
    cerrar: "Cerrar"
  },
  gl: {
    titulo: "Como valorarías a túa experiencia?",
    opciones: ["😠", "😐", "😊", "😍"],
    valores: ["Moi mala", "Regular", "Boa", "Excelente"],
    agradecimiento: "Grazas pola túa opinión!",
    cerrar: "Pechar"
  },
};

const idioma = localStorage.getItem("language") || "gl";
const textos = traduccionesEncuesta[idioma];
let tiempoInicio = Date.now();

// Solo mostrar una vez por sesión
if (!sessionStorage.getItem("encuesta-mostrada")) {
  setTimeout(() => {
    mostrarPopupEncuesta();
    sessionStorage.setItem("encuesta-mostrada", "true");
  }, 60000); // Mostrar después de 60 segundos
}

function mostrarPopupEncuesta() {
  const backdrop = document.createElement("div");
  backdrop.id = "popup-backdrop";
  Object.assign(backdrop.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: "9998"
  });

  const popup = document.createElement("div");
  popup.id = "popup-encuesta";
  popup.classList.add("position-fixed", "top-50", "start-50", "translate-middle", "bg-white", "p-4", "rounded-3", "shadow", "text-center");
  popup.style.zIndex = "9999";
  popup.style.width = "90%";
  popup.style.maxWidth = "600px";
  popup.style.fontFamily = "'Xunta Sans', 'Poppins', sans-serif";

  const btnCerrar = document.createElement("button");
  btnCerrar.innerHTML = "&times;";
  btnCerrar.setAttribute("aria-label", textos.cerrar);
  btnCerrar.classList.add("btn", "btn-link", "position-absolute", "top-0", "end-0", "m-2", "fs-3", "text-secondary");
  Object.assign(btnCerrar.style, {
    textDecoration: "none",
    border: "none",
    background: "transparent"
  });

  btnCerrar.addEventListener("click", () => {
    const tiempoTotal = Math.round((Date.now() - tiempoInicio) / 1000);
    cerrarEncuesta();

    enviarEncuesta({
      respuesta: "cerrado-sin-responder",
      tiempo: tiempoTotal,
    });
  });

  popup.appendChild(btnCerrar);

  const titulo = document.createElement("h5");
  titulo.innerText = textos.titulo;
  titulo.classList.add("mb-3", "text-primary", "fw-bold");
  popup.appendChild(titulo);

  const contenedorCaritas = document.createElement("div");
  contenedorCaritas.className = "d-flex justify-content-between align-items-center px-4 flex-wrap gap-3";

  textos.opciones.forEach((carita, index) => {
    const span = document.createElement("span");
    span.innerText = carita;
    span.dataset.value = textos.valores[index];
    Object.assign(span.style, {
      fontSize: "3rem",
      cursor: "pointer"
    });
    span.classList.add("mx-2", "emoji-hover");

    span.addEventListener("click", () => {
      const tiempoTotal = Math.round((Date.now() - tiempoInicio) / 1000);
      popup.innerHTML = `<p class="text-primary fw-bold">${textos.agradecimiento}</p>`;

      enviarEncuesta({
        respuesta: span.dataset.value,
        tiempo: tiempoTotal,
      });

      setTimeout(() => cerrarEncuesta(), 3000);
    });

    contenedorCaritas.appendChild(span);
  });

  popup.appendChild(contenedorCaritas);
  document.body.appendChild(backdrop);
  document.body.appendChild(popup);
}

function cerrarEncuesta() {
  const popup = document.getElementById("popup-encuesta");
  const backdrop = document.getElementById("popup-backdrop");
  if (popup) document.body.removeChild(popup);
  if (backdrop) document.body.removeChild(backdrop);
}

function enviarEncuesta({ respuesta, tiempo }) {
  fetch("guardar_encuesta.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      respuesta: respuesta,
      tiempo: tiempo,
      idioma: idioma,
      url: window.location.href,
      fecha: new Date().toISOString(),
      userAgent: navigator.userAgent
    })
  }).catch((err) => {
    console.error("Error al enviar encuesta:", err);
  });
}
