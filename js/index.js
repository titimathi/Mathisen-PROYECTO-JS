const contenedorTarjetas = document.getElementById("productos-container");

/* TARJETAS DE CADA CARRERA */
function crearTarjetasCarreras(productos) {
    const productos = JSON.parse(localStorage.getItem("carreras"));
    productos.forEach(producto => {
        const nuevaCarrera = document.createElement("div");
        nuevaCarrera.classList = "tarjeta-producto";
        nuevaCarrera.innerHTML = `
            <img src="./img/carreras/${producto.id}.jpg" alt="carrera 1">
            <h3>${producto.nombre}</h3>
            <h3>${producto.distancia}</h3>
            <p class="precio">$${producto.precio}</p>
            <button class="bton">Agregar al carrito</button>`;
        contenedorTarjetas.appendChild(nuevaCarrera);

        const button = nuevaCarrera.querySelector(".bton");
        button.addEventListener("click", () => {
            agregarAlCarrito(producto);
            Swal.fire({
                title: 'Agregaste una carrera',
                text: '¡a gastar suela!',
                icon: 'question',
                confirmButtonText: 'Continuar',
                iconHtml: '<i class="bi bi-emoji-heart-eyes"></i>'
            });
        });
    });
}
crearTarjetasCarreras(carreras); 

