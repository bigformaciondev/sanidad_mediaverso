const traduccionesEncuesta = {
    es: {
      titulo: "¿Cómo valorarías tu experiencia?",
      opciones: ["😠", "😐", "😊", "😍"],
      agradecimiento: "¡Gracias por tu opinión!",
      cerrar: "Cerrar"
    },
    gl: {
      titulo: "Como valorarías a túa experiencia?",
      opciones: ["😠", "😐", "😊", "😍"],
      agradecimiento: "Grazas pola túa opinión!",
      cerrar: "Pechar"
    },
  };

  const idioma = localStorage.getItem("language") || "es";
  const textos = traduccionesEncuesta[idioma];
  let tiempoInicio = Date.now();

  setTimeout(() => {
    mostrarPopupEncuesta();
  }, 10000); // 30 segundos

  function mostrarPopupEncuesta() {
    // BACKDROP OSCURO
    const backdrop = document.createElement("div");
    backdrop.id = "popup-backdrop";
    backdrop.style.position = "fixed";
    backdrop.style.top = 0;
    backdrop.style.left = 0;
    backdrop.style.width = "100vw";
    backdrop.style.height = "100vh";
    backdrop.style.backgroundColor = "rgba(0,0,0,0.6)";
    backdrop.style.zIndex = "9998";

    // POPUP
    const popup = document.createElement("div");
    popup.id = "popup-encuesta";
    popup.classList.add("position-fixed", "top-50", "start-50", "translate-middle", "bg-white", "p-4", "rounded-3", "shadow", "text-center");
    popup.style.zIndex = "9999";
    popup.style.width = "90%";
    popup.style.maxWidth = "600px";
    popup.style.fontFamily = "'Xunta Sans', 'Poppins', sans-serif";

    // BOTÓN X
    const btnCerrar = document.createElement("button");
    btnCerrar.innerHTML = "&times;";
    btnCerrar.setAttribute("aria-label", textos.cerrar);
    btnCerrar.classList.add("btn", "btn-link", "position-absolute", "top-0", "end-0", "m-2", "fs-3", "text-secondary");
    btnCerrar.style.textDecoration = "none";
    btnCerrar.style.border = "none";
    btnCerrar.style.background = "transparent";
    btnCerrar.addEventListener("click", () => {
      const tiempoTotal = Math.round((Date.now() - tiempoInicio) / 1000);
      document.body.removeChild(popup);
      document.body.removeChild(backdrop);

      fetch('guardar_encuesta.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          respuesta: "cerrado-sin-responder",
          tiempo: tiempoTotal,
          idioma: idioma
        })
      });
    });
    popup.appendChild(btnCerrar);

    // TÍTULO
    const titulo = document.createElement("h5");
    titulo.innerText = textos.titulo;
    titulo.classList.add("mb-3", "text-primary", "fw-bold");
    popup.appendChild(titulo);

    // CARITAS
    const contenedorCaritas = document.createElement("div");
    contenedorCaritas.className = "d-flex justify-content-between align-items-center px-4 flex-wrap gap-3";

    textos.opciones.forEach(carita => {
      const span = document.createElement("span");
      span.innerText = carita;
      span.dataset.value = carita;
      span.style.fontSize = "2.5rem";
      span.style.cursor = "pointer";
      span.classList.add("mx-2", "emoji-hover");

      span.addEventListener("click", () => {
        const tiempoTotal = Math.round((Date.now() - tiempoInicio) / 1000);
        popup.innerHTML = `<p class="text-primary fw-bold">${textos.agradecimiento}</p>`;

        fetch('guardar_encuesta.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            respuesta: span.dataset.value,
            tiempo: tiempoTotal,
            idioma: idioma
          })
        });

        setTimeout(() => {
          document.body.removeChild(popup);
          document.body.removeChild(backdrop);
        }, 3000);
      });

      contenedorCaritas.appendChild(span);
    });

    popup.appendChild(contenedorCaritas);
    document.body.appendChild(backdrop);
    document.body.appendChild(popup);
  }