const contenedorTarjetas = document.getElementById("productos-container");
const cuentaCarritoE = document.getElementById("cuenta-carrito");

/* TARJETAS DE CADA CARRERA */
function crearTarjetasCarreras(productos) {
    
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


function agregarAlCarrito(producto) {
    let stock = localStorage.getItem('carreras');
    let cantidadFinal;

    if (!stock || stock.length === 0) {
        const nuevoProducto = almacenaNuevoProducto(producto);
        localStorage.setItem('carreras', JSON.stringify([nuevoProducto]));
        actualizarCarrito();
        cantidadFinal = 1;
    } else {
        stock = JSON.parse(stock);

        const indiceProducto = stock.findIndex(item => item.id === producto.id);
        const newstock = stock;

        if (indiceProducto === -1) {
            const nuevoProducto = almacenaNuevoProducto(producto)
            newstock.push(nuevoProducto);
            cantidadFinal = 1;

        } else {

            !newstock[indiceProducto].cantidad++;
            cantidadFinal = newstock[indiceProducto].cantidad;
        }

        localStorage.setItem('carreras', JSON.stringify(newstock));
    }
    actualizarCarrito();

    function almacenaNuevoProducto(producto) {
        const nuevoProducto = producto;
        nuevoProducto.cantidad = 1;
        return nuevoProducto;
    }

}


function actualizarCarrito() {

    const stock = JSON.parse(localStorage.getItem('carreras')) || [];
    const cuenta = stock.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoE.innerText = cuenta;
}
actualizarCarrito();

