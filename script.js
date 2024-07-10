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