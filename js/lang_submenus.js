document.addEventListener("DOMContentLoaded", function () {
  const language = localStorage.getItem("language") || "es";
  changeLanguage(language);
});

function changeLanguage(lang) {
  fetch("../../local/lang.json")
    .then((response) => response.json())
    .then((data) => {
      if (!data[lang]) {
        console.error("Idioma no encontrado en el JSON:", lang);
        return;
      }

      // Traducir cada elemento con atributo "data-translate"
      document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.getAttribute("data-translate");
        element.innerText = data[lang][key] || element.innerText;
      });
      // 2. Reasignar src de los iframes según el idioma
      // Reasignar src de los iframes según el idioma usando el atributo correcto "data-src-es"
      document.querySelectorAll("iframe[data-src-es]").forEach((iframe) => {
        let newSrc = null;
        if (lang === "gl") {
          newSrc = iframe.getAttribute("data-src-gl");
        } else {
          newSrc = iframe.getAttribute("data-src-es");
        }
        if (newSrc) {
          iframe.src = newSrc;
        }
      });
      // 2. Reasignar src de los images según el idioma
      // Reasignar src de los images según el idioma usando el atributo correcto "data-src-es"
      document.querySelectorAll("img[data-src-es]").forEach((iframe) => {
        let newSrc = null;
        if (lang === "gl") {
          newSrc = iframe.getAttribute("data-src-gl");
        } else {
          newSrc = iframe.getAttribute("data-src-es");
        }
        if (newSrc) {
          iframe.src = newSrc;
        }
      });
      localStorage.setItem("language", lang);
    })
    .catch((error) =>
      console.error("Error al cargar el archivo de idioma", error)
    );
}
