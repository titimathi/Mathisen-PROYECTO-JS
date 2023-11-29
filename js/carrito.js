const contenedorTarjeta = document.getElementById("carrito-container");
const cuentaCarritoE = document.getElementById("cuenta-carrito");
const vaciarCarritoBtn = document.getElementById("vaciar");
const SumaTotal = document.getElementById("valor-final");
const cantidaCarreras = document.getElementById("unidades");
const carroVacioE = document.getElementById("carro-vacio");
const totalesElem = document.getElementById("compra-final")
const pagoTotal = document.getElementById("finalizar-compra")



/** TARJETAS AGREGADAS AL CARRITO */
function crearTarjetasCarrerasCarro() {
    contenedorTarjeta.innerHTML = "";
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
            nuevaCarrera
            .getElementsByTagName("button")[0]
            .addEventListener("click", (e) =>{
                eliminarDelCarro(producto);
               
                actualizarCarrito();
                crearTarjetasCarrerasCarro();
                totalesActualizados();
              });
        });
    }
}

crearTarjetasCarrerasCarro();
messageVacio()
actualizarCarrito();
totalesActualizados();



/** Agrega al carrito */

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
    
  
}
actualizarCarrito();

/** Almacena nueva carrera */
function almacenaNuevoProducto(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}
actualizarCarrito();

/** Actualizar carro */
function actualizarCarrito() {
    const stock = JSON.parse(localStorage.getItem('carreras')) || [];
    if (stock && stock.length>0){
        const cuenta = stock.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCarritoE.innerText = cuenta;
    } else{
        cuentaCarritoE.innerText = 0;
    }
}
actualizarCarrito();

/** Eliminar del carro */
function eliminarDelCarro(producto){
    let stock = JSON.parse(localStorage.getItem('carreras'));
    const indiceProducto = stock.findIndex(item => item.id === producto.id);
    if(stock[indiceProducto].cantidad === 1){
        stock.splice(indiceProducto,1);
    } else{
        stock[indiceProducto].cantidad--;
    }
    localStorage.setItem("carreras",JSON.stringify(stock));
    
  
    

    /** eliminar */
    const tarjetaAEliminar = contenedorTarjeta.querySelector(`.bton[data-producto-id="${producto.id}"]`);
    if (tarjetaAEliminar) {
        tarjetaAEliminar.closest('.carrito-container').remove();
    }
   
    return stock.reduce((acum, current) => acum + current.cantidad, 0);
    
}

actualizarCarrito();


function totalesActualizados(){
    const productos = JSON.parse(localStorage.getItem("carreras"));
    let unidades = 0;
    let precio = 0;
     if(productos && productos.length>0){
        productos.forEach(producto =>{
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        })
        cantidaCarreras.innerText = unidades;
        SumaTotal.innerText = precio;
        
    }
   
}

actualizarCarrito();



function messageVacio(){
    const productos = JSON.parse(localStorage.getItem("carreras"));
    carroVacioE.classList.toggle("carrito-vacio", productos);
    totalesElem.classList.toggle("carrito-vacio", !productos);
   
}
messageVacio();


vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    localStorage.removeItem("carreras");
    
    messageVacio(); 
    crearTarjetasCarrerasCarro();
    actualizarCarrito();
    totalesActualizados();
}

// const pagoTotal = document.getElementById("finalizar-compra")
pagoTotal.addEventListener("click", (e)=>{
    Swal.fire({
        title: "Gracias por tu compra!!",
        width: 600,
        padding: "3em",
        color: "#dc3545",
        background: "rgba(245, 245, 220, 0.208)",
        backdrop: `
    rgba(0, 0,0, 0.308)
    
    left top
    no-repeat
  `
    });
})

