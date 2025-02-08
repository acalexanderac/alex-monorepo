# Sistema de Gestión Escolar - Frontend

Sistema web para la gestión de alumnos de una escuela, desarrollado con Next.js 14 y TypeScript.

## Características

- ✨ Listado de alumnos con paginación
- ✅ Crear nuevos alumnos
- 📝 Editar información de alumnos
- 🗑️ Eliminar alumnos
- 🎨 Interfaz moderna y responsive
- 🔍 Validación de formularios

## Tecnologías

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hook Form
- React Icons

## Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- API Backend ejecutándose en puerto 4000

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd front-end
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```
Editar `.env.local` con las variables necesarias:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_API_KEY=tu-api-key
```

## Desarrollo

Iniciar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
front-end/
├── src/
│   ├── app/                 # Páginas y rutas
│   ├── components/          # Componentes reutilizables
│   ├── services/           # Servicios y llamadas a la API
│   ├── config/             # Configuraciones
│   └── types/              # Tipos de TypeScript
├── public/                 # Archivos estáticos
└── ...
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción
- `npm run lint`: Ejecuta el linter

## Despliegue

La aplicación está lista para ser desplegada en Vercel:

```bash
npm run build
npm run start
```

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
