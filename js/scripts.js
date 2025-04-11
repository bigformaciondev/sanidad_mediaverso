
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
  // Busca el elemento en la página actual
  const targetElement = document.getElementById(id);
  if (targetElement) {
    // Si lo encuentra, realiza un scroll suave
    targetElement.scrollIntoView({ behavior: "smooth" });
  } else {
    // Si no se encuentra (por ejemplo, no estamos en la página index), redirige a la página principal con el hash
    window.location.href = "index.html#" + id;
  }
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("../local/menu.json")
      .then(response => response.json())
      .then(menus => renderNav(menus))
      .catch(error => console.error("Error al cargar el nav:", error));
  });
  
  function renderNav(menus) {
    const navUl = document.getElementById("nav-menu");
    navUl.innerHTML = "";
  
   
  
    // Agrega las demás pestañas basadas en el JSON
    menus.forEach(menu => {
      const li = document.createElement("li");
      li.className = "nav-item menu-item";
  
      const img = document.createElement("img");
      img.id = "circulo";
      img.src = menu.imagen;
      img.width = 80;
      img.height = 71;
      // Agregar evento para que al hacer click en la imagen se active el enlace
      img.addEventListener("click", () => {
        a.click();
      });
      li.appendChild(img);
  
      const a = document.createElement("a");
      a.className = "nav-link text-light"; // Solo "Todos" tiene "active show" por defecto
      a.setAttribute("data-translate", menu.key);
      a.setAttribute("data-bs-toggle", "tab");
      a.setAttribute("data-bs-target", `#${menu.tabId}`);
      a.innerText = menu.nombre; // Se puede actualizar mediante traducción
      li.appendChild(a);
      navUl.appendChild(li);
    });
     // Agrega la pestaña "Todos"
     const liTodos = document.createElement("li");
     liTodos.className = "nav-item";
     const aTodos = document.createElement("a");
     // Se le asignan las clases activas para que "Todos" sea la pestaña por defecto
     aTodos.className = "nav-link active show text-light";
     aTodos.setAttribute("data-bs-toggle", "tab");
     aTodos.setAttribute("data-bs-target", "#todos-filter");
     /*aTodos.innerText = "Todos"; // Puedes traducirlo si lo deseas*/
     
     liTodos.appendChild(aTodos);
     navUl.appendChild(liTodos);
  }
  
  function renderPaginationControls(totalItems, itemsPerPage, currentPage, container, onPageClick) {
    container.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return; // No es necesario paginar
  
    const ul = document.createElement('ul');
    ul.className = "pagination justify-content-center";
  
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = "page-item" + (i === currentPage ? " active" : "");
      const a = document.createElement('a');
      a.className = "page-link";
      a.href = "#";
      a.innerText = i;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        onPageClick(i);
      });
      li.appendChild(a);
      ul.appendChild(li);
    }
    container.appendChild(ul);
  }
  
  function renderCards(items, container, currentPage = 1, itemsPerPage = 8) {
    // Limpia el contenedor
    container.innerHTML = '';
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = items.slice(startIndex, endIndex);
  
    pageItems.forEach(item => {
      const col = createCard(item);
      container.appendChild(col);
    });
  
    // Contenedor para los controles de paginación
    if (items.length > itemsPerPage) {
      const paginationContainer = document.createElement('div');
      paginationContainer.className = "d-flex justify-content-center mt-3";
      renderPaginationControls(items.length, itemsPerPage, currentPage, paginationContainer, function(page) {
        // Al hacer click se vuelve a renderizar esta misma sección con la página indicada
        renderCards(items, container, page, itemsPerPage);
      });
      container.appendChild(paginationContainer);
    }
  }
  
  function loadMenusAndSubmenus() {
    Promise.all([
      fetch("../local/menu.json").then(res => res.json()),
      fetch("../local/submenu.json").then(res => res.json())
    ])
    .then(([menus, submenus]) => {
      const selectedCategory = localStorage.getItem("selectedCategory");
  
      menus.forEach(menu => {
        const tabPane = document.getElementById(menu.tabId);
        if (tabPane) {
          let row = tabPane.querySelector('.row');
          if (!row) {
            row = document.createElement("div");
            row.className = "row gy-5 m-2";
            tabPane.appendChild(row);
          }
          row.innerHTML = "";
  
          const submenuItems = submenus.filter(item => item.menu_id === menu.id);
          if (submenuItems.length > 8) {
            renderCards(submenuItems, row, 1, 8);
          } else {
            submenuItems.forEach(item => {
              const col = createCard(item);
              row.appendChild(col);
            });
          }
        }
      });
  
      // Pestaña "Todos": muestra todos los submenús sin filtrar
      const todosPane = document.getElementById("todos-filter");
      if (todosPane) {
        let row = todosPane.querySelector('.row');
        if (!row) {
          row = document.createElement("div");
          row.className = "row gy-5 m-2";
          todosPane.appendChild(row);
        }
        row.innerHTML = "";
        if (submenus.length > 8) {
          renderCards(submenus, row, 1, 8);
        } else {
          submenus.forEach(item => {
            const col = createCard(item);
            row.appendChild(col);
          });
        }
      }
  
      // Aplicar filtro si hay una categoría almacenada en localStorage
      if (selectedCategory) {
        filterCategory(selectedCategory);
        localStorage.removeItem("selectedCategory"); // Eliminar después de aplicarlo
      }
    })
    .catch(error => {
      console.error("Error al cargar los menús y submenús:", error);
    });
  }
  function filterCategory(category) {
    const tabs = document.querySelectorAll(".nav-link[data-bs-target]");
    
    tabs.forEach(tab => {
      if (tab.getAttribute("data-bs-target") === category) {
        tab.click(); // Simula el clic en la pestaña correspondiente
      }
    });
  }
  
  function createCard(item) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4 col-xl-3 p-3";
  
    const card = document.createElement("div");
    card.className = "card rounded-4 shadow text-center hover-scale";
  
    const img = document.createElement("img");
    img.className = "card-img-top rounded-top";
    img.src = item.imagen;
    img.alt = item.nombre;
    img.style.width = "100%";
    img.style.height = "250px";
    img.style.objectFit = "cover";
  
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.style.height = "180px";
    const badge = document.createElement("span");
    badge.className = "badge bg-secondary mb-2";
    badge.innerText = item.badge;
    badge.setAttribute("data-translate", item.badge);
    
  
    const title = document.createElement("h5");
    title.className = "card-title mt-2";
    title.innerText = item.nombre;
    // Si deseas que el título sea traducible, asigna data-translate
    title.setAttribute("data-translate", item.key);
  
    const btn = document.createElement("button");
    btn.className = "btn btn-primary mt-3";
    btn.setAttribute("data-translate", "accede");
    btn.innerText = "Accede";
    btn.addEventListener("click", function () {
      window.location.href = item.ruta;
    });
  
    cardBody.appendChild(badge);
    cardBody.appendChild(title);
    cardBody.appendChild(btn);
  
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
  
    return col;
  }
  