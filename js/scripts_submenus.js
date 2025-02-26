function irASeccion(id) {
    // Busca el elemento en la página actual
    const targetElement = document.getElementById(id);
    if (targetElement) {
      // Si lo encuentra, realiza un scroll suave
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // Si no se encuentra (por ejemplo, no estamos en la página index), redirige a la página principal con el hash
      window.location.href = "../../index.html#" + id;
    }
  }