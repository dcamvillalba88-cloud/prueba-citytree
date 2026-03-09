CityTree – Plataforma Web para Gestión Arbórea Urbana

Descripción

CityTree es una plataforma web orientada a la gestión del arbolado urbano, diseñada como parte del desarrollo de servicios web. El sistema busca facilitar el registro, monitoreo y administración de árboles en entornos urbanos, permitiendo la participación tanto de ciudadanos como de personal técnico encargado del mantenimiento y supervisión.

El proyecto se compone de dos componentes principales:

- Frontend (Mockup funcional): interfaz de usuario desarrollada para representar la experiencia del sistema.
- Backend (CityTree API): servicio web REST encargado de gestionar usuarios y registros de árboles mediante conexión a base de datos.

---

Componentes del proyecto

1. Frontend (Mockup funcional)

El frontend presenta una simulación funcional del sistema con diferentes interfaces según el rol del usuario.

Incluye:

- Pantalla de inicio (dashboard)
- Formulario de inicio de sesión
- Panel de reporte ciudadano
- Interfaces diferenciadas por rol de usuario
- Diseño responsive básico
- Interacción mediante JavaScript

El login funciona como simulación para mostrar diferentes vistas según el rol.

Credenciales de prueba (login simulado)

Rol| Usuario| Contraseña
Administrador| admin1| admin123
Ingeniero de campo| campo1| campo123
Personal de mantenimiento| mant1| mant123

Dependiendo del rol autenticado, el usuario es redirigido a diferentes interfaces dentro del sistema.

---

2. Backend – CityTree API

El backend corresponde a una API REST desarrollada para gestionar la información del sistema.

Actualmente incluye:

Gestión de usuarios

- Creación de usuarios
- Consulta de usuarios
- Actualización de usuarios
- Eliminación lógica (soft delete)

Las contraseñas se almacenan de forma segura mediante hash utilizando bcrypt.

Gestión de árboles

- Registro de árboles urbanos
- Consulta de árboles registrados
- Actualización de información del árbol

Cada árbol queda asociado al ingeniero que realiza el registro, mediante una relación con la tabla de usuarios.

---

Tecnologías utilizadas

Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)

Backend

- Node.js
- Express.js
- PostgreSQL
- bcrypt (hash seguro de contraseñas)

Herramientas de desarrollo

- Visual Studio Code
- Postman (pruebas de API)
- pgAdmin (gestión de base de datos)
- Terminal Bash

---

Arquitectura general del backend

citytree.api
│
├── controllers
│   ├── usuarios.controller.js
│   └── arboles.controller.js
│
├── routes
│   ├── usuarios.routes.js
│   └── arboles.routes.js
│
├── db
│   └── connection.js
│
├── index.js
├── package.json
└── README.md

Descripción de la estructura

- controllers/
  Contiene la lógica de negocio y operaciones CRUD.

- routes/
  Define los endpoints de la API.

- db/
  Configuración de la conexión con PostgreSQL.

- index.js
  Archivo principal que inicializa el servidor Express.

---

Endpoints principales

Usuarios

GET     /api/usuarios
POST    /api/usuarios
PUT     /api/usuarios/:id
DELETE  /api/usuarios/:id

---

Estado actual del proyecto

El sistema se encuentra en fase de desarrollo académico e incluye:

- Mockup funcional del frontend
- API REST básica en Node.js
- Conexión a base de datos PostgreSQL
- Gestión de usuarios con seguridad en contraseñas

---

Uso de Inteligencia Artificial

Durante el desarrollo se utilizó Inteligencia Artificial como herramienta de apoyo para:

- Resolución de dudas técnicas
- Apoyo en estructura de código
- Optimización de consultas y arquitectura del backend
- Asistencia conceptual en diseño del sistema

La implementación final, integración y pruebas fueron realizadas y adaptadas por el autor.

---

Autor

Camilo Villalba