const productos = [
    { id: 1, nombre: "Camiseta Vintage", precio: 29.99, descripcion: "Camiseta de algodón 100% con diseño retro", imagen: "camiseta.jpg" },
    { id: 2, nombre: "Jeans Clásicos", precio: 59.99, descripcion: "Jeans de corte recto, perfectos para cualquier ocasión", imagen: "jeans.jpg" },
    { id: 3, nombre: "Zapatillas Urbanas", precio: 79.99, descripcion: "Zapatillas cómodas para el día a día en la ciudad", imagen: "zapatillas.jpg" },
    { id: 4, nombre: "Chaqueta de Cuero", precio: 129.99, descripcion: "Chaqueta de cuero genuino con forro interior", imagen: "chaqueta.jpg" },
    { id: 5, nombre: "Vestido Elegante", precio: 89.99, descripcion: "Vestido para ocasiones especiales", imagen: "vestido.jpg" },
    { id: 6, nombre: "Reloj Deportivo", precio: 99.99, descripcion: "Reloj resistente al agua con funciones deportivas", imagen: "reloj.jpg" }
];

const productosContainer = document.getElementById('productos');
const listaPedido = document.getElementById('lista-pedido');
const totalPedido = document.getElementById('total-pedido');
const enviarPedidoBtn = document.getElementById('enviar-pedido');
const envioCheckbox = document.getElementById('envio-domicilio');
const direccionInput = document.getElementById('direccion-envio');

let pedido = [];
const COSTO_ENVIO = 5.99;

function renderizarProductos() {
    productosContainer.innerHTML = '';
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlPedido(${producto.id})">Agregar al pedido</button>
        `;
        productosContainer.appendChild(productoElement);
    });
}

function agregarAlPedido(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnPedido = pedido.find(item => item.id === producto.id);
    if (itemEnPedido) {
        itemEnPedido.cantidad++;
    } else {
        pedido.push({ ...producto, cantidad: 1 });
    }
    actualizarListaPedido();
}

function eliminarDelPedido(id) {
    pedido = pedido.filter(item => item.id !== id);
    actualizarListaPedido();
}

function actualizarListaPedido() {
    listaPedido.innerHTML = '';
    pedido.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item-pedido');
        itemElement.innerHTML = `
            <span>${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</span>
            <button class="eliminar-item" onclick="eliminarDelPedido(${item.id})">Eliminar</button>
        `;
        listaPedido.appendChild(itemElement);
    });
    actualizarTotal();
}

function actualizarTotal() {
    let total = pedido.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    if (envioCheckbox.checked) {
        total += COSTO_ENVIO;
    }
    totalPedido.textContent = `Total: $${total.toFixed(2)}`;
}

envioCheckbox.addEventListener('change', function() {
    direccionInput.style.display = this.checked ? 'block' : 'none';
    actualizarTotal();
});

enviarPedidoBtn.addEventListener('click', enviarPedido);


function enviarPedido() {
    if (pedido.length === 0) {
        alert('Agrega productos a tu pedido antes de enviarlo.');
        return;
    }

    let mensaje = 'Hola, me gustaría hacer el siguiente pedido:\n\n';
    pedido.forEach(item => {
        mensaje += `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
    
    let total = pedido.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    
    if (envioCheckbox.checked) {
        mensaje += `\nEnvío a domicilio: $${COSTO_ENVIO.toFixed(2)}`;
        total += COSTO_ENVIO;
        mensaje += `\nDirección de envío: ${direccionInput.value}`;
    }
}

renderizarProductos();

const botonProcesarCompra = document.getElementById("enviar-pedido");
const mensajeAgradecimiento = document.getElementById("enviar-pedido");

botonProcesarCompra.addEventListener("click", () => {
    mensajeAgradecimiento.style.display = "block";

    limpiarCampos();
});

function limpiarCampos() {
    document.getElementById("correo").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("nombre").value = "";
}

fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error al cargar el JSON:', error);
  });

