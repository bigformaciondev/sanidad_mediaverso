document.addEventListener("DOMContentLoaded", function () {
    const language = localStorage.getItem("language") || "es";
    changeLanguage(language);
});

function changeLanguage(lang) {
    fetch("local/lang.json")
        .then(response => response.json())
        .then(data => {
            if (!data[lang]) {
                console.error("Idioma no encontrado en el JSON:", lang);
                return;
            }

            // Traducir cada elemento con atributo "data-translate"
            document.querySelectorAll("[data-translate]").forEach(element => {
                const key = element.getAttribute("data-translate");
                element.innerText = data[lang][key] || element.innerText;
            });

            localStorage.setItem("language", lang);
        })
        .catch(error => console.error("Error al cargar el archivo de idioma", error));
}
