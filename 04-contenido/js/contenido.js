document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todas las tarjetas
  const tarjetas = document.querySelectorAll(".tarjeta");

  if (!tarjetas || tarjetas.length === 0) return;

  tarjetas.forEach((tarjeta) => {
    const inner = tarjeta.querySelector(".tarjeta-inner");
    const footer = tarjeta.querySelector(".tarjeta-footer");
    if (!inner || !footer) return;

    // Clic solo en el pie "Más información"
    footer.addEventListener("click", (event) => {
      event.stopPropagation(); // evita que se propague a otros listeners
      inner.classList.toggle("is-flipped");
    });

    // Clic en cualquier parte de la cara trasera para volver
    const trasera = tarjeta.querySelector(".tarjeta-trasera");
    if (trasera) {
      trasera.addEventListener("click", (event) => {
        event.stopPropagation();
        inner.classList.remove("is-flipped"); // quita la clase para volver al frente
      });
    }
  });
});
