# 🎓 API de Gestión de Alumnos

API RESTful desarrollada con NestJS para gestionar registros de alumnos de una institución educativa.

## 🚀 Características

- ✅ CRUD completo de alumnos
- 🔐 Autenticación mediante API Key
- 📚 Consulta de alumnos por grado
- 🗄️ Persistencia en MongoDB
- 📝 Documentación con Swagger
- 🚦 Rate Limiting
- 🛡️ Validaciones avanzadas
- 📦 Cache integrado
- 🔍 Filtros y búsqueda
- 📊 Paginación de resultados

## 🛠️ Tecnologías

- NestJS
- MongoDB con Mongoose
- Swagger/OpenAPI
- TypeScript
- Cache Manager
- Class Validator
- Helmet

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repositorio>
cd back-end
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env
cp .env.example .env

# Variables requeridas
PORT=4000
MONGODB_URI=mongodb://localhost:27017/escuela
API_KEY=tu_api_key_secreta
FRONTEND_URL=http://localhost:3000
```

## 🚀 Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📡 Endpoints

### Documentación API
- **GET** `/api` - Documentación Swagger

### Alumnos
- **POST** `/alumnos/crear-alumno` - Crear nuevo alumno
- **GET** `/alumnos/consultar-por-grado/{grado}` - Consultar por grado
- **GET** `/alumnos/consultar-por-id/{id}` - Consultar por ID
- **PUT** `/alumnos/actualizar-alumno/{id}` - Actualizar alumno
- **DELETE** `/alumnos/eliminar-alumno/{id}` - Eliminar alumno

### Ejemplo de Creación
```json
{
    "nombreAlumno": "Juan Pérez",
    "fechaNacimiento": "2015-01-01",
    "nombrePadre": "Pedro Pérez",
    "nombreMadre": "María González",
    "grado": 1,
    "seccion": "A"
}
```

## 🔐 Autenticación

Todas las rutas requieren el header:
```
x-api-key: tu_api_key_secreta
```

## 🏗️ Estructura del Proyecto

```
src/
├── alumnos/              # Módulo de alumnos
│   ├── dto/             # Data Transfer Objects
│   ├── schemas/         # Esquemas MongoDB
│   ├── pipes/          # Pipes personalizados
│   ├── controller.ts   
│   ├── module.ts
│   └── service.ts
├── common/              # Código compartido
│   ├── decorators/     # Decoradores personalizados
│   ├── filters/        # Filtros de excepción
│   ├── interceptors/   # Interceptores
│   └── services/       # Servicios comunes
├── auth/               # Autenticación
│   └── api-key.guard.ts
└── app.module.ts       # Módulo principal
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

## 📝 Características Implementadas

- [x] Validación de datos con class-validator
- [x] Documentación con Swagger
- [x] Rate limiting
- [x] Caché
- [x] Logging
- [x] Manejo de errores personalizado
- [x] Headers de seguridad con Helmet
- [x] Validación de fechas personalizada
- [x] Transformación de respuestas

## 👥 Autor

- Alexander Arias

## 📄 Licencia

Este proyecto está bajo la Licencia MIT
