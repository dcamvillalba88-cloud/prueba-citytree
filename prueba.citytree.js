// Navegación básica
function irApantallaInicio() { window.location.href = "index.html"; }
function irAMapaUbicacionEspecies() { window.location.href = "ubicacion-especies.html"; }
function irAGoogleMaps() { window.open("https://www.google.com/maps", "_blank"); }
function irAPantallaAdministrador() { window.location.href = "administrador.html"; }

// Modal de confirmación (usado en páginas de administración)
function abrirModal(mensaje, accionSi) {
    const mensajeEl = document.getElementById("modalMensaje");
    const btnSi = document.getElementById("btnSi");
    const modalConfirm = document.getElementById("modalConfirm");
    if (mensajeEl && btnSi && modalConfirm) {
        mensajeEl.innerHTML = mensaje;
        btnSi.onclick = accionSi;
        modalConfirm.classList.remove("hidden");
    }
}

// Cerrar cualquier modal conocido
function cerrarModal() {
    const modalConfirm = document.getElementById("modalConfirm");
    if (modalConfirm) modalConfirm.classList.add("hidden");
    const modal = document.getElementById("modal");
    if (modal) modal.classList.add("hidden");
}

// Mostrar modal informativo (Ingeniero de campo)
function mostrarModal(titulo, mensaje) {
    const modal = document.getElementById("modal");
    const tituloEl = document.getElementById("modal-title");
    const mensajeEl = document.getElementById("modal-message");
    if (modal && tituloEl && mensajeEl) {
        tituloEl.textContent = titulo;
        mensajeEl.textContent = mensaje;
        modal.classList.remove("hidden");
    }
}

// Ver detalle en administrador → pasa número vía localStorage
function verDetalle(idBoton) {
    const boton = document.getElementById(idBoton);
    if (!boton) return;
    const numero = boton.textContent.trim();
    localStorage.setItem("numeroMantenimiento", numero);
    window.location.href = "adm mantenimientos.html";
}

document.addEventListener("DOMContentLoaded", function () {
    // Rellenar número en página de mantenimientos si existe
    const numeroGuardado = localStorage.getItem("numeroMantenimiento");
    const elementoNumero = document.getElementById("numeroRegistro");
    if (numeroGuardado && elementoNumero) {
        elementoNumero.textContent = numeroGuardado;
    }

    // Inicializar número de registro único en Ingeniero de Campo si el input existe
    const registroInput = document.getElementById("registroUnico");
    if (registroInput) {
        const ultimoStr = localStorage.getItem("ultimoNumeroRegistro") || "10000000";
        const ultimoNum = parseInt(ultimoStr, 10) || 10000000;
        registroInput.value = ultimoNum;
    }

    // Manejo de submit en Ingeniero de Campo
    const submitBtn = document.getElementById("submit");
    if (submitBtn) {
        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();

            // Tomar valores
            const numeroRegistro = (document.getElementById("registroUnico")?.value || "").trim();
            const fechaIngreso = (document.getElementById("fechaIngreso")?.value || "").trim();
            const especie = (document.getElementById("especie")?.value || "").trim();
            const emplazamiento = (document.getElementById("emplazamiento")?.value || "").trim();
            const circunferencia = (document.getElementById("circunferencia")?.value || "").trim();
            const estado = (document.getElementById("estado")?.value || "").trim();
            const altura = (document.getElementById("altura")?.value || "").trim();
            const latitud = (document.getElementById("latitud")?.value || "").trim();
            const longitud = (document.getElementById("longitud")?.value || "").trim();
            const mantenimiento = !!(document.getElementById("mantenimiento")?.checked);
            const comentarios = (document.getElementById("comentarios")?.value || "").trim();

            // Validación básica
            if (!fechaIngreso || !especie || !emplazamiento || !estado || !latitud || !longitud) {
                mostrarModal(
                    "Campos incompletos",
                    "Por favor complete los campos requeridos: Fecha, Especie, Emplazamiento y Estado."
                );
                return;
            }

            // Construir objeto
            const datosEspecimen = {
                numeroRegistro,
                fechaIngreso,
                especie,
                emplazamiento,
                circunferencia,
                estado,
                altura,
                ubicacion: { latitud, longitud },
                mantenimiento,
                comentarios,
                fechaRegistro: new Date().toISOString(),
            };

            // Persistir lista
            const listaStr = localStorage.getItem("especimenes");
            const lista = listaStr ? JSON.parse(listaStr) : [];
            lista.push(datosEspecimen);
            localStorage.setItem("especimenes", JSON.stringify(lista));

            // Incrementar número para el próximo
            const actualNum = parseInt(numeroRegistro || "10000000", 10) || 10000000;
            const siguiente = actualNum + 1;
            localStorage.setItem("ultimoNumeroRegistro", String(siguiente));

            // Éxito
            mostrarModal(
                "¡Registro exitoso!",
                `Especimen guardado con número ${numeroRegistro}. Próximo número asignado: ${siguiente}.`
            );

            // Limpiar y preparar siguiente
            setTimeout(() => {
                if (document.getElementById("fechaIngreso")) document.getElementById("fechaIngreso").value = "";
                if (document.getElementById("especie")) document.getElementById("especie").selectedIndex = 0;
                if (document.getElementById("emplazamiento")) document.getElementById("emplazamiento").selectedIndex = 0;
                if (document.getElementById("circunferencia")) document.getElementById("circunferencia").value = "";
                if (document.getElementById("estado")) document.getElementById("estado").selectedIndex = 0;
                if (document.getElementById("altura")) document.getElementById("altura").value = "";
                if (document.getElementById("latitud")) document.getElementById("latitud").value = "";
                if (document.getElementById("longitud")) document.getElementById("longitud").value = "";
                if (document.getElementById("mantenimiento")) document.getElementById("mantenimiento").checked = false;
                if (document.getElementById("comentarios")) document.getElementById("comentarios").value = "comentarios";
                if (document.getElementById("registroUnico")) document.getElementById("registroUnico").value = String(siguiente);
            }, 400);
        });
    }
});

                       // login usuarios por roles

// USUARIOS SIMULADOS
// ============= SISTEMA DE LOGIN Y CONTROL DE ACCESO =============

const usuarios = [
  // ADMINISTRADORES
  { user: "admin1", pass: "admin123", rol: "admin" },
  { user: "admin2", pass: "admin456", rol: "admin" },

  // MANTENIMIENTO
  { user: "mant1", pass: "mant123", rol: "mantenimiento" },
  { user: "mant2", pass: "mant456", rol: "mantenimiento" },

  // INGENIERO DE CAMPO
  { user: "campo1", pass: "campo123", rol: "campo" },
  { user: "campo2", pass: "campo456", rol: "campo" }
];

function login() {
  const usuario = document.getElementById("usuario")?.value || "";
  const password = document.getElementById("password")?.value || "";
  const mensaje = document.getElementById("mensaje");

  if (!mensaje) return;

  // Reset visual
  mensaje.textContent = "";
  mensaje.style.color = "red";

  // Validación de campos vacíos
  if (usuario === "" || password === "") {
    mensaje.textContent = "Debe ingresar usuario y contraseña";
    return;
  }

  // Validación de credenciales
  const encontrado = usuarios.find(
    u => u.user === usuario && u.pass === password
  );

  if (!encontrado) {
    mensaje.textContent = "Usuario o contraseña incorrectos";
    return;
  }

  // Login correcto
  sessionStorage.setItem("rol", encontrado.rol);
  sessionStorage.setItem("usuario", encontrado.user);

  mensaje.style.color = "green";
  mensaje.textContent = "Acceso correcto, redirigiendo...";

  setTimeout(() => {
    if (encontrado.rol === "admin") {
      location.href = "administrador.html";
    } else if (encontrado.rol === "mantenimiento") {
      location.href = "Mantenimiento.html";
    } else if (encontrado.rol === "campo") {
      location.href = "ingenieroCampo.html";
    }
  }, 800);
}

// Protección de páginas por rol
function protegerPagina(rolesPermitidos) {
  const rolActual = sessionStorage.getItem("rol");
  const usuario = sessionStorage.getItem("usuario");

  if (!rolActual || !usuario) {
    alert("❌ ACCESO DENEGADO\n\nDebe iniciar sesión primero.");
    window.location.href = "index.html";
    return false;
  }

  if (!rolesPermitidos.includes(rolActual)) {
    alert(`❌ ACCESO DENEGADO\n\nUsuario: ${usuario}\nRol: ${rolActual}\n\nNo tiene permisos para acceder a esta página.`);
    window.location.href = "index.html";
    return false;
  }

  return true;
}

// Cerrar sesión
function cerrarSesion() {
  sessionStorage.clear();
  alert("Sesión cerrada exitosamente");
  window.location.href = "index.html";
}