# Sistema de Gestión Escolar - Monorepo

Sistema completo de gestión escolar que incluye backend (NestJS) y frontend (Next.js).

## 🌟 Características

- Backend RESTful API con NestJS y MongoDB
- Frontend moderno con Next.js y Tailwind CSS
- Docker Compose para desarrollo
- Validación de datos
- Sistema de autenticación con API Key

## 🛠️ Estructura del Proyecto

```
alexander-monorepo/
├── back-end/          # API NestJS
├── front-end/         # Aplicación Next.js
├── docker-compose.yml # Configuración de Docker
└── README.md         
```

## 📋 Requisitos Previos

- Node.js 18 o superior
- Docker y Docker Compose
- npm o yarn

## 🚀 Inicio Rápido

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd alexander-monorepo
```

2. **Configurar variables de entorno**

Backend (.env):
```bash
cd back-end
cp .env.example .env
```

Frontend (.env.local):
```bash
cd front-end
cp .env.example .env.local
```

3. **Iniciar MongoDB con Docker**

```bash
docker-compose up mongodb -d
```

4. **Instalar dependencias y ejecutar en desarrollo**

Backend:
```bash
cd back-end
npm install
npm run start:dev
```

Frontend:
```bash
cd front-end
npm install
npm run dev
```

## 🌐 Puertos por defecto

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- MongoDB: localhost:27017

## 📦 Desarrollo con Docker

El proyecto incluye configuración Docker para desarrollo:

```bash
# Iniciar todos los servicios
docker-compose up -d

# Detener todos los servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Reiniciar un servicio específico
docker-compose restart api
```

## 🔧 Scripts Útiles

```bash
# Limpiar volúmenes de Docker
docker-compose down -v

# Reconstruir imágenes
docker-compose build --no-cache

# Verificar estado de los contenedores
docker-compose ps
```

## 📝 Documentación API

La documentación de la API está disponible en:
- Swagger UI: http://localhost:4000/api
- OpenAPI JSON: http://localhost:4000/api-json

## 🧪 Testing

Backend:
```bash
cd back-end
npm run test        # Unit tests
npm run test:e2e    # E2E tests
```

Frontend:
```bash
cd front-end
npm run test        # Run tests
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- Christian Arias - Desarrollo inicial

## 🙏 Agradecimientos

- NestJS Team
- Next.js Team
- MongoDB Team
