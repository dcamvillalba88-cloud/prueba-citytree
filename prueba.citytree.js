// Navegación básica
function irApantallaInicio() {
  window.location.href = "index.html";
}
function irAMapaUbicacionEspecies() {
  window.location.href = "ubicacion-especies.html";
}
function irAPantallaAdministrador() {
  window.location.href = "administrador.html";
}

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
  let temporizadorModalEspecimen = null;

  function mostrarModalEspecimen(titulo, mensaje, autoCerrarMs) {
    const modal = document.getElementById("modal");
    const tituloEl = document.getElementById("modal-title");
    const mensajeEl = document.getElementById("modal-message");

    if (!modal || !tituloEl || !mensajeEl) return;

    if (temporizadorModalEspecimen) {
      clearTimeout(temporizadorModalEspecimen);
      temporizadorModalEspecimen = null;
    }

    tituloEl.textContent = titulo;
    mensajeEl.textContent = mensaje;
    modal.classList.remove("hidden");

    if (autoCerrarMs && autoCerrarMs > 0) {
      temporizadorModalEspecimen = setTimeout(() => {
        modal.classList.add("hidden");
        temporizadorModalEspecimen = null;
      }, autoCerrarMs);
    }
  }

  function configurarReporteCiudadano() {
    const btnEnviarReporte = document.getElementById("btnEnviarReporte");
    const modalReporte = document.getElementById("modalReporte");
    const mensajeModalReporte = document.getElementById("modalReporteMensaje");
    const btnCerrarModalReporte = document.getElementById("btnCerrarModalReporte");
    const nombreInput = document.getElementById("reporteNombre");
    const emailInput = document.getElementById("reporteEmail");
    const ubicacionInput = document.getElementById("reporteUbicacion");
    const descripcionInput = document.getElementById("reporteDescripcion");

    if (
      !btnEnviarReporte ||
      !modalReporte ||
      !mensajeModalReporte ||
      !btnCerrarModalReporte ||
      !nombreInput ||
      !emailInput ||
      !ubicacionInput ||
      !descripcionInput
    ) {
      return;
    }

    let temporizadorCierreModal = null;

    function cerrarModalReporte() {
      modalReporte.classList.add("hidden");
      if (temporizadorCierreModal) {
        clearTimeout(temporizadorCierreModal);
        temporizadorCierreModal = null;
      }
    }

    function mostrarModalReporte(mensaje) {
      mensajeModalReporte.textContent = mensaje;
      modalReporte.classList.remove("hidden");
      temporizadorCierreModal = setTimeout(cerrarModalReporte, 1800);
    }

    btnCerrarModalReporte.addEventListener("click", cerrarModalReporte);

    btnEnviarReporte.addEventListener("click", function () {
      const nombre = nombreInput.value.trim();
      const email = emailInput.value.trim();
      const ubicacion = ubicacionInput.value.trim();
      const descripcion = descripcionInput.value.trim();

      if (!nombre || !email || !ubicacion || !descripcion) {
        mostrarModalReporte("Error: complete todos los campos del reporte ciudadano.");
        return;
      }

      mostrarModalReporte("Envio exitoso.");
      nombreInput.value = "";
      emailInput.value = "";
      ubicacionInput.value = "";
      descripcionInput.value = "";
    });
  }

  function asignarNumeroConsecutivoMantenimiento() {
    const inputConsecutivo = document.getElementById("numeroConsecutivoMantenimiento");
    if (!inputConsecutivo) return;

    const keyConsecutivo = "ultimoNumeroMantenimientoConsecutivo";
    const ultimo = parseInt(localStorage.getItem(keyConsecutivo) || "50000000", 10);
    const base = Number.isNaN(ultimo) ? 50000000 : ultimo;
    const siguiente = base + 1;

    inputConsecutivo.value = String(siguiente);
    localStorage.setItem(keyConsecutivo, String(siguiente));
  }

  function configurarSeleccionTrabajadorMantenimiento() {
    const botonesTrabajador = document.querySelectorAll(".btn-perMantenimiento");
    if (!botonesTrabajador.length) return;

    botonesTrabajador.forEach((boton) => {
      boton.addEventListener("click", function () {
        botonesTrabajador.forEach((otroBoton) => {
          otroBoton.classList.remove("btn-perMantenimiento--selected");
        });

        boton.classList.add("btn-perMantenimiento--selected");
      });
    });
  }

  function asignarFechaIngresoAutomatica() {
    const fechaIngresoInput = document.getElementById("fechaIngreso");
    if (!fechaIngresoInput) return;

    const hoy = new Date().toISOString().split("T")[0];
    fechaIngresoInput.value = hoy;
    fechaIngresoInput.setAttribute("readonly", "true");
    fechaIngresoInput.setAttribute("disabled", "true");
  }

  function asignarIngenieroCampoAutomatico() {
    const ingenieroInput = document.getElementById("ingenieroCampo");
    if (!ingenieroInput) return;

    const usuarioCampo = sessionStorage.getItem("usuario") || "No registrado";
    ingenieroInput.value = usuarioCampo;
    ingenieroInput.setAttribute("readonly", "true");
    ingenieroInput.setAttribute("disabled", "true");
  }

  // Rellenar número en página de mantenimientos si existe
  const numeroGuardado = localStorage.getItem("numeroMantenimiento");
  const elementoNumero = document.getElementById("numeroRegistro");
  if (numeroGuardado && elementoNumero) {
    elementoNumero.textContent = numeroGuardado;
  }

  asignarNumeroConsecutivoMantenimiento();
  configurarSeleccionTrabajadorMantenimiento();
  configurarReporteCiudadano();

  // Inicializar número de registro único en Ingeniero de Campo si el input existe
  const registroInput = document.getElementById("registroUnico");
  if (registroInput) {
    const ultimoStr =
      localStorage.getItem("ultimoNumeroRegistro") || "10000000";
    const ultimoNum = parseInt(ultimoStr, 10) || 10000000;
    registroInput.value = ultimoNum;
  }

  // Fecha de ingreso automática y no editable
  asignarFechaIngresoAutomatica();
  asignarIngenieroCampoAutomatico();

  // Manejo de submit en Ingeniero de Campo
  const submitBtn = document.getElementById("submit");
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Tomar valores
      const numeroRegistro = (
        document.getElementById("registroUnico")?.value || ""
      ).trim();
      const fechaIngreso = (
        document.getElementById("fechaIngreso")?.value || ""
      ).trim();
      const especie = (document.getElementById("especie")?.value || "").trim();
      const emplazamiento = (
        document.getElementById("emplazamiento")?.value || ""
      ).trim();
      const circunferencia = (
        document.getElementById("circunferencia")?.value || ""
      ).trim();
      const estado = (document.getElementById("estado")?.value || "").trim();
      const altura = (document.getElementById("altura")?.value || "").trim();
      const latitud = (document.getElementById("latitud")?.value || "").trim();
      const longitud = (
        document.getElementById("longitud")?.value || ""
      ).trim();
      const mantenimiento = !!document.getElementById("mantenimiento")?.checked;
      const ingenieroCampo = (
        document.getElementById("ingenieroCampo")?.value ||
        sessionStorage.getItem("usuario") ||
        "No registrado"
      ).trim();
      const comentarios = (
        document.getElementById("comentarios")?.value || ""
      ).trim();

      const faltanCamposObligatorios =
        !numeroRegistro ||
        !fechaIngreso ||
        !especie ||
        !emplazamiento ||
        !circunferencia ||
        !estado ||
        !altura ||
        !latitud ||
        !longitud;

      const comentariosRequeridos = mantenimiento && !comentarios;

      // Validación básica
      if (faltanCamposObligatorios || comentariosRequeridos) {
        mostrarModalEspecimen(
          "Campos incompletos",
          "Complete todos los campos obligatorios. Comentarios solo es obligatorio cuando selecciona mantenimiento.",
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
        ingenieroCampo,
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
      mostrarModalEspecimen(
        "¡Carga exitosa!",
        `Especimen guardado con número ${numeroRegistro}. Próximo número asignado: ${siguiente}.`,
        1500,
      );

      // Limpiar y preparar siguiente
      setTimeout(() => {
        asignarFechaIngresoAutomatica();
        asignarIngenieroCampoAutomatico();
        if (document.getElementById("especie"))
          document.getElementById("especie").selectedIndex = 0;
        if (document.getElementById("emplazamiento"))
          document.getElementById("emplazamiento").selectedIndex = 0;
        if (document.getElementById("circunferencia"))
          document.getElementById("circunferencia").value = "";
        if (document.getElementById("estado"))
          document.getElementById("estado").selectedIndex = 0;
        if (document.getElementById("altura"))
          document.getElementById("altura").value = "";
        if (document.getElementById("latitud"))
          document.getElementById("latitud").value = "";
        if (document.getElementById("longitud"))
          document.getElementById("longitud").value = "";
        if (document.getElementById("mantenimiento"))
          document.getElementById("mantenimiento").checked = false;
        if (document.getElementById("comentarios"))
          document.getElementById("comentarios").value = "";
        if (document.getElementById("registroUnico"))
          document.getElementById("registroUnico").value = String(siguiente);
      }, 1500);
    });
  }
});

// login usuarios por roles

// USUARIOS SIMULADOS
// ============= SISTEMA DE LOGIN Y CONTROL DE ACCESO =============

function normalizarRolAcceso(rol) {
  const rolNormalizado = (rol || "").toLowerCase();
  if (rolNormalizado.includes("admin")) return "admin";
  if (rolNormalizado.includes("mantenimiento")) return "mantenimiento";
  if (rolNormalizado.includes("ingeniero") || rolNormalizado.includes("campo")) return "campo";
  return "";
}

function obtenerUsuariosLogin() {
  const usuariosGestion = cargarUsuariosPersistidos();

  return usuariosGestion.map((u) => ({
    user: (u.user || "").trim(),
    pass: (u.pass || "").trim(),
    rol: normalizarRolAcceso(u.rol),
    estado: (u.estado || "inactivo").toLowerCase(),
  }));
}

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
  const usuariosLogin = obtenerUsuariosLogin();
  const encontrado = usuariosLogin.find(
    (u) => u.user === usuario && u.pass === password,
  );

  if (!encontrado) {
    mensaje.textContent = "Usuario o contraseña incorrectos";
    return;
  }

  if (encontrado.estado !== "activo") {
    mensaje.textContent = "Usuario inactivo. Contacte al administrador.";
    return;
  }

  if (!encontrado.rol) {
    mensaje.textContent = "El usuario no tiene un rol válido asignado.";
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
    alert(
      `❌ ACCESO DENEGADO\n\nUsuario: ${usuario}\nRol: ${rolActual}\n\nNo tiene permisos para acceder a esta página.`,
    );
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

// Lógica de asignación de mantenimientos revertida a comportamiento estático.

// Inicializacion de mapa Leaflet y sincronizacion con panel de detalle.
const mapContainer = document.getElementById("map-ubicamap");

if (mapContainer && typeof L !== "undefined") {
  const map = L.map("map-ubicamap").setView([4.711, -74.0721], 13); // Centrado en Bogotá
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const arbolesPin = [
    {
      id: "10000005",
      especie: "Caucho sabanero",
      estado: "vivo",
      latitud: 4.7115,
      longitud: -74.07,
      altura: "No disponible",
      nombreCientifico: "No disponible",
    },
    {
      id: "10000006",
      especie: "Eucalipto",
      estado: "vivo",
      latitud: 4.709,
      longitud: -74.0755,
      altura: "No disponible",
      nombreCientifico: "No disponible",
    },
    {
      id: "10000007",
      especie: "Sangregado",
      estado: "muerto",
      latitud: 4.713,
      longitud: -74.068,
      altura: "No disponible",
      nombreCientifico: "No disponible",
    },
  ];

  function crearContenidoDetalle(arbol) {
    return {
      id: arbol.id,
      especie: arbol.especie,
      estado: arbol.estado,
      altura: arbol.altura || "No disponible",
      nombreCientifico: arbol.nombreCientifico || "No disponible",
      ubicacion: `${arbol.latitud}, ${arbol.longitud}`,
    };
  }

  function popupDesdeDetalle(detalle) {
    return `<b>ID:</b> ${detalle.id}<br><b>Especie:</b> ${detalle.especie}<br><b>Estado:</b> ${detalle.estado}<br><b>Ubicación:</b> ${detalle.ubicacion}`;
  }

  function pintarModuloDetalle(detalle) {
    const idEl = document.getElementById("detalle-id");
    const especieEl = document.getElementById("detalle-especie");
    const estadoEl = document.getElementById("detalle-estado");
    const alturaEl = document.getElementById("detalle-altura");
    const nombreCientificoEl = document.getElementById("detalle-nombre-cientifico");
    const ubicacionEl = document.getElementById("detalle-ubicacion");

    if (!idEl || !especieEl || !estadoEl || !alturaEl || !nombreCientificoEl || !ubicacionEl) {
      return;
    }

    idEl.textContent = detalle.id;
    especieEl.textContent = detalle.especie;
    estadoEl.textContent = detalle.estado;
    alturaEl.textContent = detalle.altura;
    nombreCientificoEl.textContent = detalle.nombreCientifico;
    ubicacionEl.textContent = detalle.ubicacion;
  }

  arbolesPin.forEach((arbol) => {
    const detalle = crearContenidoDetalle(arbol);
    const marker = L.marker([arbol.latitud, arbol.longitud]).addTo(map);

    marker.bindPopup(popupDesdeDetalle(detalle));
    marker.on("click", () => {
      pintarModuloDetalle(detalle);
    });
  });

  if (arbolesPin.length > 0) {
    pintarModuloDetalle(crearContenidoDetalle(arbolesPin[0]));
  }
}

// conexion xon base de datos simulada, futuro con API/BD real

/* function buscarArbol(id) {
  const arbol = arboles.find(a => a.id === id);

  if (arbol) {
    map.setView([arbol.lat, arbol.lng], 17);

    L.popup()
      .setLatLng([arbol.lat, arbol.lng])
      .setContent(<b>${arbol.especie}</b>)
      .openOn(map);
  } else {
    alert("Árbol no encontrado");
  }
} */

  // usuarios simulados y probablemente futuros+

  const USUARIOS_STORAGE_KEY = "citytree_usuarios";

  const usuariosIniciales = [
    { id: 1, nombre: "Juana", apellido: "Gomez", rol: "administrador", correo: "juana_gomez01@gmail.com", user: "admin1", pass: "admin123", estado: "activo"},
    { id: 2, nombre: "Camilo", apellido: "Malaver", rol: "administrador", correo: "camilo_malaver01@gmail.com", user: "admin2", pass: "admin456", estado: "activo"},
    { id: 3, nombre: "Sofia", apellido: "Lopez", rol: "mantenimiento", correo: "sofia_lopez01@gmail.com", user: "mant1", pass: "mant123", estado: "activo"},
    { id: 4, nombre: "Andres", apellido: "Perez", rol: "mantenimiento", correo: "andres_perez01@gmail.com", user: "mant2", pass: "mant456", estado: "activo"},
    { id: 5, nombre: "Maria", apellido: "Rodriguez", rol: "ingeniero de campo", correo: "maria_rodriguez01@gmail.com", user: "campo1", pass: "campo123", estado: "activo"},
    { id: 6, nombre: "Carlos", apellido: "Garcia", rol: "ingeniero de campo", correo: "carlos_garcia01@gmail.com", user: "campo2", pass: "campo456", estado: "activo"},
  ];

  function cargarUsuariosPersistidos() {
    try {
      const usuariosGuardados = localStorage.getItem(USUARIOS_STORAGE_KEY);
      if (!usuariosGuardados) return [...usuariosIniciales];

      const usuariosParseados = JSON.parse(usuariosGuardados);
      if (!Array.isArray(usuariosParseados) || usuariosParseados.length === 0) {
        return [...usuariosIniciales];
      }

      return usuariosParseados;
    } catch (error) {
      return [...usuariosIniciales];
    }
  }

  function guardarUsuariosPersistidos() {
    try {
      localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(usuariosNuevo));
    } catch (error) {
      // Si el navegador bloquea almacenamiento, la app sigue operativa en memoria.
    }
  }

  let usuariosNuevo = cargarUsuariosPersistidos();

  function pintarTabla() {
    const tbody = document.getElementById("tablaUsuarios");
    if (!tbody) return;

    tbody.innerHTML = "";

    usuariosNuevo.forEach(usuario => {
      tbody.innerHTML +=
        `<tr>
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.apellido}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.rol}</td>
          <td>${usuario.estado}</td>
          <td>
            <button onclick="abrirModalEditar(${usuario.id})">Editar</button>
            <button onclick="cambiarEstado(${usuario.id})">${usuario.estado === "activo" ? "Inactivar" : "Activar"}</button>
          </td>
        </tr>`;
    });
  }
  pintarTabla();

  // nuevo usuario
function abrirModalCrear() { usuarioEditando = null; 
  const numeroDocumento = document.getElementById("numeroDocumento");
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const direccion = document.getElementById("direccion");
  const telefono = document.getElementById("telefono");
  const correo = document.getElementById("correo");
  const usuarioCredencial = document.getElementById("usuarioCredencial");
  const passwordCredencial = document.getElementById("passwordCredencial");
  const rol = document.getElementById("rol");
  const errorEl = document.getElementById("errorFormulario");

  if (numeroDocumento) numeroDocumento.value = "";
  if (nombre) nombre.value = "";
  if (apellido) apellido.value = "";
  if (direccion) direccion.value = "";
  if (telefono) telefono.value = "";
  if (correo) correo.value = "";
  if (usuarioCredencial) usuarioCredencial.value = "";
  if (passwordCredencial) passwordCredencial.value = "";
  if (rol) rol.selectedIndex = 0;
  if (errorEl) {
    errorEl.innerText = "";
    errorEl.style.display = "none";
  }

  mostrarModal("Nuevo Usuario");
}

//editar usuario
let usuarioEditando = null;
function abrirModalEditar(id) {
  usuarioEditando = usuariosNuevo.find(u => u.id === id);
  if (usuarioEditando) {
    const numeroDocumento = document.getElementById("numeroDocumento");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const direccion = document.getElementById("direccion");
    const telefono = document.getElementById("telefono");
    const correo = document.getElementById("correo");
    const usuarioCredencial = document.getElementById("usuarioCredencial");
    const passwordCredencial = document.getElementById("passwordCredencial");
    const rol = document.getElementById("rol");
    const errorEl = document.getElementById("errorFormulario");

    if (numeroDocumento) numeroDocumento.value = usuarioEditando.numeroDocumento || "";
    if (nombre) nombre.value = usuarioEditando.nombre || "";
    if (apellido) apellido.value = usuarioEditando.apellido || "";
    if (direccion) direccion.value = usuarioEditando.direccion || "";
    if (telefono) telefono.value = usuarioEditando.telefono || "";
    if (correo) correo.value = usuarioEditando.correo || "";
    if (usuarioCredencial) usuarioCredencial.value = usuarioEditando.user || "";
    if (passwordCredencial) passwordCredencial.value = usuarioEditando.pass || "";
    if (rol) rol.value = usuarioEditando.rol || rol.value;
    if (errorEl) {
      errorEl.innerText = "";
      errorEl.style.display = "none";
    }
  }
  mostrarModal("Editar usuario", usuarioEditando);
}
 //activar / inactivar usuario

function cambiarEstado(id) {
  const usuario = usuariosNuevo.find(u => u.id === id);

  if (!usuario) return;

  if (confirm(`¿Desea ${usuario.estado === "activo" ? "inactivar" : "activar"} al usuario ${usuario.nombre} ${usuario.apellido}?`)) {
    usuario.estado = usuario.estado === "activo" ? "inactivo" : "activo";
    guardarUsuariosPersistidos();
    pintarTabla();
  } 
}

// Modal genérico para crear/editar usuario (simplificado)
function mostrarModal(titulo) {
  document.getElementById("tituloModal").innerText = titulo;
  document.getElementById("modalUsuario").classList.remove("hidden");
}

function cerrarModal() {
  document.getElementById("modalUsuario").classList.add("hidden");
}

//guardar usuarios con validacion

function guardarUsuario() {
  const numeroDocumento = document.getElementById("numeroDocumento").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const user = document.getElementById("usuarioCredencial").value.trim();
  const pass = document.getElementById("passwordCredencial").value.trim();
  const rol = document.getElementById("rol").value;

  const errorEl = document.getElementById("errorFormulario");

  // validacon basica
  if (!nombre || !apellido || !correo || !user || !pass) {
    errorEl.innerText = "Faltan campos por diligenciar";
    errorEl.style.display = "block";
    return;   
  }
  if (!correo.includes("@")) {
    errorEl.innerText = "Correo no es válido";
    errorEl.style.display = "block";
    return;   
  }

  const userNormalizado = user.toLowerCase();
  const userDuplicado = usuariosNuevo.some((u) => {
    if (!u.user) return false;
    const esMismoRegistro = usuarioEditando && u.id === usuarioEditando.id;
    return !esMismoRegistro && u.user.toLowerCase() === userNormalizado;
  });

  if (userDuplicado) {
    errorEl.innerText = "El usuario ya existe. Ingrese uno diferente";
    errorEl.style.display = "block";
    return;
  }

  errorEl.innerText = "";
  errorEl.style.display = "none";

  //vaLIDACION FINAL, SI TODO ESTA BIEN SE GUARDA EL USUARIO
  if (usuarioEditando) {
    usuarioEditando.numeroDocumento = numeroDocumento;
    usuarioEditando.nombre = nombre;
    usuarioEditando.apellido = apellido;
    usuarioEditando.direccion = direccion;
    usuarioEditando.telefono = telefono;
    usuarioEditando.correo = correo;
    usuarioEditando.user = user;
    usuarioEditando.pass = pass;
    usuarioEditando.rol = rol;
  } else {
    const nuevoUsuario = {
      id: Date.now(),
      numeroDocumento,
      nombre,
      apellido,
      direccion,
      telefono,
      correo,
      user,
      pass,
      rol,
      estado: "activo",
    };
    usuariosNuevo.push(nuevoUsuario);
  }
  guardarUsuariosPersistidos();
  cerrarModal();
  pintarTabla();
}

function finalizarMantenimiento() {
  const mensajeEl = document.getElementById("modalMensaje");
  const modalConfirm = document.getElementById("modalConfirm");

  if (mensajeEl && modalConfirm) {
    mensajeEl.innerHTML = "Mantenimiento realizado";
    modalConfirm.classList.remove("hidden");
  }

  setTimeout(() => {
    window.location.href = "administrador.html";
  }, 1200);
}