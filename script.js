
// 1. INTERACCIÓN DEL MENÚ NAVEGACIÓN EN MÓVILES


// Seleccionamos los elementos del HTML usando sus ID
const btnMenu = document.getElementById('btn-menu');
const menuNavegacion = document.getElementById('menu-navegacion');

// Escuchamos el clic en el botón hamburguesa
if (btnMenu && menuNavegacion) {
    btnMenu.addEventListener('click', () => {
        // Alterna la clase 'activo' en el menú para mostrarlo u ocultarlo
        menuNavegacion.classList.toggle('activo');
    });
}


// 2. FUNCIONALIDAD DEL SIMULADOR DE CITAS MÓVIL

function agendarSimulacion(e) {
    // Evita que la página web se recargue al enviar el formulario
    e.preventDefault();
    
    // Obtener los valores de los campos
    const nombreInput = document.getElementById('sim-nombre');
    const toast = document.getElementById('sim-toast');
    
    if (nombreInput && toast) {
        const nombre = nombreInput.value.trim();
        
        // Mostrar la notificación flotante (Toast simulado de Android)
        toast.textContent = `¡Cita agendada para ${nombre}!`;
        toast.className = 'toast-visible';
        
        // Limpiar todos los campos del formulario
        document.getElementById('sim-form').reset();
        
        // Ocultar la notificación automáticamente después de 3 segundos
        setTimeout(() => {
            toast.className = 'toast-hidden';
        }, 3000);
    }
}

// 3. LÓGICA DEL MENÚ DIGITAL & CARRITO
let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarBarraCarrito();
}

// Quita un solo producto usando su posición en la lista
function quitarDelCarrito(indice) {
    if (indice < 0 || indice >= carrito.length) return;
    total -= carrito[indice].precio;
    carrito.splice(indice, 1);
    actualizarBarraCarrito();
}

// Borra todos los productos seleccionados
function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarBarraCarrito();
}

function actualizarBarraCarrito() {
    const cantElem = document.getElementById('cant-items');
    const totalElem = document.getElementById('total-precio');
    const listaElem = document.getElementById('lista-carrito');
    
    if (cantElem && totalElem) {
        cantElem.textContent = `${carrito.length} producto(s) seleccionado(s)`;
        totalElem.textContent = `$${total.toLocaleString('es-CO')}`;
    }

    // Dibuja la lista con un botón ✕ para quitar cada producto
    if (listaElem) {
        listaElem.innerHTML = '';
        carrito.forEach((item, indice) => {
            const fila = document.createElement('div');
            fila.className = 'item-carrito';

            const texto = document.createElement('span');
            texto.textContent = `${item.nombre} - $${item.precio.toLocaleString('es-CO')}`;

            const btnQuitar = document.createElement('button');
            btnQuitar.type = 'button';
            btnQuitar.className = 'btn-quitar';
            btnQuitar.textContent = '✕';
            btnQuitar.setAttribute('aria-label', `Quitar ${item.nombre}`);
            btnQuitar.addEventListener('click', () => quitarDelCarrito(indice));

            fila.appendChild(texto);
            fila.appendChild(btnQuitar);
            listaElem.appendChild(fila);
        });
    }
}

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Por favor selecciona al menos un producto haciendo clic en '+ Agregar'.");
        return;
    }

    // Número de WhatsApp receptor (puedes poner tu número con código de país, ej: 573001234567)
    const numeroTelefono = "573000000000"; 

    // Construir mensaje dinámico
    let mensaje = "¡Hola! Quisiera hacer el siguiente pedido desde el menú web:%0A%0A";
    
    carrito.forEach((item) => {
        mensaje += `• ${item.nombre} - $${item.precio.toLocaleString('es-CO')}%0A`;
    });

    mensaje += `%0A*Total a Pagar:* $${total.toLocaleString('es-CO')}`;

    // Abrir WhatsApp
    const url = `https://wa.me/${}?text=${3205924007}`;
    window.open(url, '_blank');
}