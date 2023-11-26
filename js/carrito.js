const contenedorTarjeta = document.getElementById("carrito-container");
const cuentaCarritoE = document.getElementById("cuenta-carrito");
const valor =document.querySelector(".precio")
const agregar = document.querySelector(".btn")
const vaciarCarrito = document.getElementById("vaciar")
const SumaTotal = document.getElementById("valor-final")
const cantidaCarreras = document.getElementById("cantidad")



/** TARJETAS AGREGADAS AL CARRITO */
function crearTarjetasCarrerasCarro() {
    
    const productos = JSON.parse(localStorage.getItem("carreras"));
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const nuevaCarrera = document.createElement("div");
            nuevaCarrera.classList = "tarjeta-carrito";
            nuevaCarrera.innerHTML = `
                <img src="./img/carreras/${producto.id}.jpg" alt="carrera 1">
                <h3>${producto.nombre}</h3>
                <h3>${producto.distancia}</h3>
                <p class="precio">${producto.precio}</p>
                <div>
                    <button class="bton"><i class="bi bi-trash3"></i> </button>
                </div>
            `;
            contenedorTarjeta.appendChild(nuevaCarrera);    
        });
    }
}
crearTarjetasCarrerasCarro();


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

            newstock[indiceProducto].cantidad++;
            cantidadFinal = newstock[indiceProducto].cantidad;
        }

        localStorage.setItem('carreras', JSON.stringify(newstock));
    }
    actualizarCarrito();
}

function almacenaNuevoProducto(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

function actualizarCarrito() {

    const stock = JSON.parse(localStorage.getItem('carreras')) || [];
    const cuenta = stock.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoE.innerText = cuenta;
}
actualizarCarrito();

