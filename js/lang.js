document.addEventListener("DOMContentLoaded", function () {
  const language = localStorage.getItem("language") || "es";
  changeLanguage(language);
});

function changeLanguage(lang) {
  fetch("local/lang.json")
      .then(response => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.json();
      })
      .then(data => {
          if (!data[lang]) {
              console.warn(`Idioma "${lang}" no encontrado. Usando español por defecto.`);
              lang = "es";
          }

          // Selecciona todos los elementos con `data-i18n`
          document.querySelectorAll("[data-i18n]").forEach(el => {
              const key = el.getAttribute("data-i18n");
              el.innerText = data[lang][key] || `(${key} no encontrado)`;
          });

          localStorage.setItem("language", lang);
      })
      .catch(error => {
          console.error("Error al cargar el archivo de idioma:", error);
      });
}
