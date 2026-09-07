# Blog Personal API — Trabajo Práctico Integrador I

API REST para un sistema de gestión de blog personal, con autenticación, autorización por roles y relaciones entre entidades. Construida con Node.js, Express y Sequelize sobre MySQL.

## Stack tecnológico

- Node.js (ES Modules)
- Express 5
- Sequelize 6 + MySQL2
- JWT (jsonwebtoken) para autenticación
- bcrypt para hashing de contraseñas
- express-validator para validaciones
- cookie-parser para manejo de cookies HTTP-only
- cors

## Funcionalidades

- Registro, login y logout de usuarios con cookies HTTP-only.
- Autorización por roles (`user` / `admin`).
- CRUD de usuarios (solo admin).
- CRUD de artículos con control de dueño (el usuario solo edita/borra lo suyo, el admin puede sobre cualquiera).
- CRUD de etiquetas (tags), solo admin puede crear/editar/borrar.
- Relación muchos a muchos entre artículos y etiquetas.
- Eliminación lógica (soft delete) en `User` y `Article`.
- Eliminación en cascada de las relaciones artículo-etiqueta cuando se borra un artículo.

## Modelo de datos

| Entidad | Relación |
|---|---|
| User ↔ Profile | 1:1 |
| User ↔ Article | 1:N |
| Article ↔ Tag | N:M (a través de ArticleTag) |

## Estructura del proyecto

```
trabajo-practico-integrador-1/
├── app.js
├── package.json
├── .env.example
├── .gitignore
└── src/
    ├── config/
    │   └── database.js
    ├── models/
    │   ├── user.model.js
    │   ├── profile.model.js
    │   ├── tag.model.js
    │   ├── article.model.js
    │   └── articleTag.model.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── user.controller.js
    │   ├── tag.controller.js
    │   ├── article.controller.js
    │   └── articleTag.controller.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── user.routes.js
    │   ├── tag.routes.js
    │   ├── article.routes.js
    │   └── articleTag.routes.js
    ├── middlewares/
    │   ├── validate.js
    │   ├── auth.middleware.js
    │   ├── admin.middleware.js
    │   ├── owner.middleware.js
    │   └── validations/
    │       ├── auth.validation.js
    │       ├── user.validation.js
    │       ├── tag.validation.js
    │       ├── article.validation.js
    │       └── articleTag.validation.js
    └── helpers/
        ├── jwt.helper.js
        └── bcrypt.helper.js
```

## Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/trabajo-practico-integrador-1.git
   cd trabajo-practico-integrador-1
   ```
2. Instalá las dependencias:
   ```bash
   npm install
   ```
3. Creá la base de datos en MySQL (el nombre que definas en `DB_NAME`):
   ```sql
   CREATE DATABASE blog_db;
   ```
4. Copiá el archivo de ejemplo de variables de entorno y completalo con tus datos:
   ```bash
   cp .env.example .env
   ```
5. Levantá el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | *(vacío o la tuya)* |
| `DB_NAME` | Nombre de la base de datos | `blog_db` |
| `JWT_SECRET` | Secreto para firmar los tokens JWT | *(una cadena larga y aleatoria)* |
| `PORT` | Puerto del servidor | `3000` |

## Flujo de trabajo con Git

El proyecto usa 3 ramas:

| Rama | Rol |
|---|---|
| `main` | Rama final y estable |
| `develop` | Rama de integración |
| `proyecto-integrador` | Rama de desarrollo activo (todos los commits) |

Todo el desarrollo se realizó en `proyecto-integrador`, y al finalizar se integró a `develop` y luego a `main` mediante merges `--no-ff`.

## Endpoints

Todas las rutas están montadas bajo el prefijo `/api`.

### Auth (`/api/auth`)

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/register` | Registra un usuario nuevo y su perfil | No |
| POST | `/auth/login` | Inicia sesión, setea cookie `token` | No |
| GET | `/auth/profile` | Devuelve el usuario logueado y su perfil | Sí |
| PUT | `/auth/profile` | Actualiza el perfil propio | Sí |
| POST | `/auth/logout` | Cierra sesión, limpia la cookie | Sí |

### Users — Admin (`/api/users`)

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/users` | Lista todos los usuarios | Admin |
| GET | `/users/:id` | Obtiene un usuario por id | Admin |
| POST | `/users` | Crea un usuario | Admin |
| PUT | `/users/:id` | Actualiza un usuario | Admin |
| DELETE | `/users/:id` | Elimina (soft delete) un usuario | Admin |

### Tags (`/api/tags`)

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/tags` | Crea una etiqueta | Admin |
| GET | `/tags` | Lista todas las etiquetas | Usuario autenticado |
| GET | `/tags/:id` | Obtiene una etiqueta con sus artículos | Admin |
| PUT | `/tags/:id` | Actualiza una etiqueta | Admin |
| DELETE | `/tags/:id` | Elimina una etiqueta | Admin |

### Articles (`/api/articles`)

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/articles` | Crea un artículo | Usuario autenticado |
| GET | `/articles` | Lista artículos publicados | Usuario autenticado |
| GET | `/articles/user` | Lista los artículos propios | Usuario autenticado |
| GET | `/articles/user/:id` | Obtiene un artículo propio por id | Usuario autenticado |
| GET | `/articles/:id` | Obtiene un artículo por id | Usuario autenticado |
| PUT | `/articles/:id` | Actualiza un artículo | Dueño o admin |
| DELETE | `/articles/:id` | Elimina (soft delete) un artículo | Dueño o admin |

### Article-Tags (`/api/articles-tags`)

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/articles-tags` | Asocia una etiqueta a un artículo | Dueño del artículo o admin |
| DELETE | `/articles-tags/:articleTagId` | Quita una etiqueta de un artículo | Dueño del artículo |

## Pruebas con Postman

La colección **"Blog Personal API - Trabajo Integrador I"** contiene los 5 módulos de arriba, organizados en carpetas, con bodies de ejemplo y descripciones de qué esperar en cada request. Usa el environment **"Blog Personal - Local"**, que define la variable `base_url` apuntando a `http://localhost:3000/api`.

Para crear un usuario administrador (no hay endpoint público para esto), registrá un usuario normal y luego ejecutá en la base de datos:
```sql
UPDATE Users SET role = 'admin' WHERE email = 'tu_email@test.com';
```

## Autor

Maximiliano Soria Instituto Politécnico Formosa — Tecnicatura Superior en Desarrollo de Software Multiplataforma GitHub: @MaxiSoriaGit
