# 🎓 API de Gestión de Alumnos

API RESTful desarrollada con NestJS para gestionar registros de alumnos de una institución educativa.

## 🚀 Características

- ✅ CRUD completo de alumnos
- 🔐 Autenticación mediante API Key
- 📚 Consulta de alumnos por grado
- 🗄️ Persistencia en MongoDB
- 🐳 Dockerizado

## 🛠️ Tecnologías

- NestJS
- MongoDB
- Docker & Docker Compose
- TypeScript

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- Docker y Docker Compose
- MongoDB (si no usas Docker)

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/tu-repo.git
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

# Editar las variables según tu entorno
MONGODB_URI=mongodb://localhost:27017/escuela
API_KEY=tu_api_key_secreta
```

## 🚀 Ejecución

**Con Docker:**
```bash
docker-compose up
```

**Sin Docker:**
```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod
```

## 📡 Endpoints

### Crear Alumno
- **POST** `/crear-alumno`
```json
{
    "nombreAlumno": "Juan Pérez",
    "fechaNacimiento": "2010-05-15",
    "nombrePadre": "Pedro Pérez",
    "nombreMadre": "María López",
    "grado": 1,
    "seccion": "A"
}
```

### Consultar Alumnos por Grado
- **GET** `/consultar-alumno/{idGrado}`

### Actualizar Alumno
- **PUT** `/actualizar-alumno/{id}`

### Eliminar Alumno
- **DELETE** `/eliminar-alumno/{id}`

## 🔐 Autenticación

Todas las rutas requieren el header:
```
x-api-key: tu_api_key_secreta
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e
```

## 📝 Estructura del Proyecto

```
src/
├── alumnos/
│   ├── dto/
│   ├── entities/
│   ├── alumnos.controller.ts
│   ├── alumnos.module.ts
│   └── alumnos.service.ts
├── auth/
│   └── api-key.guard.ts
└── app.module.ts
```

## 👥 Autor

- Alexander Arias

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles
