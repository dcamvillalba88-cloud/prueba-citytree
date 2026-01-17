// funciones de enlacess pantallas y Https
function irApantallaInicio() {
    window.location.href = "index.html"; // Navegar a la pagina principal
}

function irAMapaUbicacionEspecies() {
    window.location.href = "ubicacion-especies.html"; // Navegar a la pantalla de mapa de ubicacion de especies

}
function irAGoogleMaps() {
    window.open ("https://www.google.com/maps", "_blank"); // Navegar a Google Maps
}
function irAPantallaAdministrador() {
    window.location.href = "administrador.html"; // Navegar a la pantalla de administrador
}


                             // modal

function abrirModal(mensaje, accionSi) {
    document.getElementById("modalMensaje").innerHTML = mensaje;

    const btnSi = document.getElementById("btnSi");
    btnSi.onclick = accionSi;

    document.getElementById("modalConfirm").classList.remove("hidden");
}

function cerrarModal() {
    document.getElementById("modalConfirm").classList.add("hidden");
}                             

// Función para ver detalle del mantenimiento
function verDetalle(idBoton) {
    // Obtener el texto del botón clickeado
    const boton = document.getElementById(idBoton);
    const numero = boton.textContent.trim();
    
    // Guardar el número en localStorage para pasarlo a la otra página
    localStorage.setItem('numeroMantenimiento', numero);
    
    // Redirigir a la página de administración de mantenimientos
    window.location.href = 'adm mantenimientos.html';
}

// Al cargar la página de mantenimientos, mostrar el número guardado
document.addEventListener('DOMContentLoaded', function() {
    const numeroGuardado = localStorage.getItem('numeroMantenimiento');
    const elementoNumero = document.getElementById('numeroRegistro');
    
    if (numeroGuardado && elementoNumero) {
        elementoNumero.textContent = numeroGuardado;
    }
});
