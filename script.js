// ==========================================
// 1. INTERACCIÓN DEL MENÚ NAVEGACIÓN EN MÓVILES
// ==========================================

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

// ==========================================
// 2. FUNCIONALIDAD DEL SIMULADOR DE CITAS MÓVIL
// ==========================================

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