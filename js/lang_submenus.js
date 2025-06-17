let currentLanguage = localStorage.getItem("language") || "gl";
let currentTranslations = {};

document.addEventListener("DOMContentLoaded", function () {
  changeLanguage(currentLanguage);
});

function changeLanguage(lang) {
  fetch("../../local/lang.json")
    .then((response) => response.json())
    .then((data) => {
      if (!data[lang]) {
        console.error("Idioma no encontrado en el JSON:", lang);
        return;
      }

      currentLanguage = lang;
      currentTranslations = data[lang];
      localStorage.setItem("language", lang);

      applyTranslations(); // aplica a toda la página como antes
      loadMealPlanData();
    })
    .catch((error) =>
      console.error("Error al cargar el archivo de idioma", error)
    );
}

function applyTranslations() {
  if (!currentTranslations || Object.keys(currentTranslations).length === 0) return;

  // Textos
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (currentTranslations[key]) {
      element.innerText = currentTranslations[key];
    }
  });

  // Iframes
  document.querySelectorAll("iframe[data-src-es]").forEach((iframe) => {
    const newSrc = currentLanguage === "gl"
      ? iframe.getAttribute("data-src-gl")
      : iframe.getAttribute("data-src-es");
    if (newSrc) iframe.src = newSrc;
  });

  // Imágenes
  document.querySelectorAll("img[data-src-es]").forEach((img) => {
    const newSrc = currentLanguage === "gl"
      ? img.getAttribute("data-src-gl")
      : img.getAttribute("data-src-es");
    if (newSrc) img.src = newSrc;
  });
}
