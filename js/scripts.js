
window.addEventListener('DOMContentLoaded', event => {

  // Activate Bootstrap scrollspy on the main nav element
  const sideNav = document.body.querySelector('#sideNav');
  if (sideNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#sideNav',
          rootMargin: '0px 0px -40%',
      });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
          if (window.getComputedStyle(navbarToggler).display !== 'none') {
              navbarToggler.click();
          }
      });
  });
});
document.addEventListener("DOMContentLoaded", function () {
    loadMenusAndSubmenus();
  });
function irASeccion(id) {
    window.location.href="#" + id;
}
document.addEventListener("DOMContentLoaded", function () {
    fetch("../local/menu.json")
      .then(response => response.json())
      .then(menus => renderNav(menus))
      .catch(error => console.error("Error al cargar el nav:", error));
  });
  
  function renderNav(menus) {
    const navUl = document.getElementById("nav-menu");
    navUl.innerHTML = ""; // Limpiar contenido previo
  
    menus.forEach(menu => {
      // Crear elemento <li>
      const li = document.createElement("li");
      li.className = "nav-item d-flex flex-row";
  
      // Crear imagen
      const img = document.createElement("img");
      img.id = "circulo";
      img.className = "d-block m-auto p-2";
      img.src = menu.imagen;
      img.width = 80;
      img.height = 71;
      
  
      // Crear enlace
      const a = document.createElement("a");
      a.className = "nav-link text-light d-block";
      a.setAttribute("data-translate", menu.key);
      a.setAttribute("data-bs-toggle", "tab");
      a.setAttribute("data-bs-target", `#${menu.tabId}`);
      // Opcional: Agregar texto o dejarlo vacío para que se traduzca dinámicamente
      a.innerText = menu.nombre; // Se puede reemplazar por un valor vacío si la traducción se hace después
      a.appendChild(img);
      li.appendChild(a);
      navUl.appendChild(li);
    });
  }
function loadMenusAndSubmenus() {
    Promise.all([
      fetch("../local/menu.json").then(res => res.json()),
      fetch("../local/submenu.json").then(res => res.json())
    ])
      .then(([menus, submenus]) => {
        // Recorremos cada menú (categoría principal)
        menus.forEach(menu => {
          // Buscamos el contenedor (tab-pane) asociado a la categoría usando su propiedad "tabId"
          console.log(menu.nombre);
          let tabPane = document.getElementById(menu.tabId);
          if (tabPane) {
            // Buscamos (o creamos) el contenedor de tarjetas, que en este ejemplo es un div con clase "row"
            let row = tabPane.querySelector('.row');
            if (!row) {
              row = document.createElement("div");
              row.className = "row gy-5 m-2";
              tabPane.appendChild(row);
            }
            // Limpiamos el contenido previo (si existiera)
            row.innerHTML = "";
  
            // Filtramos los submenús que correspondan a la categoría actual (menu_id coincide con menu.id)
            let submenuItems = submenus.filter(item => item.menu_id === menu.id);
            // Para cada submenú, creamos una tarjeta con la información del JSON
            submenuItems.forEach(item => {
               
              let col = document.createElement("div");
              col.className = "col-12 col-md-6 col-lg-4 col-xl-3 p-3";
              
              let card = document.createElement("div");
              card.className = "card text-center";
  
              let img = document.createElement("img");
              img.className = "card-img-top";
              img.src = item.imagen;
              img.alt = item.nombre;
              img.style.width = "100%";
              img.style.height = "200px";
              img.style.objectFit = "cover";
  
              // Cuerpo de la tarjeta
              let cardBody = document.createElement("div");
              cardBody.className = "card-body";
  
              // Badge (etiqueta de categoría)
              let badge = document.createElement("span");
              badge.className = "badge bg-secondary mb-2";
              badge.innerText = item.badge;
  
              // Título de la tarjeta
              let title = document.createElement("h5");
              title.className = "card-title mt-2";
              title.innerText = item.nombre;
  
              // Botón de acción
              let btn = document.createElement("button");
              btn.className = "btn btn-primary mt-3";
              btn.innerText = "Accede"; // Puedes reemplazarlo por una clave traducible si lo deseas
              btn.addEventListener("click", function () {
                window.location.href = item.ruta;
              });
  
              // Armamos la tarjeta
              cardBody.appendChild(badge);
              cardBody.appendChild(title);
              cardBody.appendChild(btn);
  
              card.appendChild(img);
              card.appendChild(cardBody);
  
              col.appendChild(card);
              row.appendChild(col);
            });
          }
        });
      
      })
      .catch(error => {
        console.error("Error al cargar los menús y submenús:", error);
      });
  }

  