# Web App Monorepo

Monorepo profesional con arquitectura full-stack que combina NestJS (backend) y Next.js 16 (frontend), utilizando componentes UI compartidos con shadcn/ui y Tailwind CSS v4.

## Estructura del Proyecto

```
web-app-monorepo/
├── apps/
│   ├── api/          # Backend NestJS con Prisma ORM
│   └── web/          # Frontend Next.js 16 + Tailwind CSS v4
└── packages/
    ├── ui/           # Componentes UI compartidos (shadcn/ui)
    ├── eslint-config # Configuración ESLint compartida
    └── typescript-config/ # Configuración TypeScript compartida
```

## Tecnologías

### Backend (apps/api)

- **Framework**: NestJS 11
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT + Passport
- **Validación**: class-validator + class-transformer
- **API Docs**: Swagger/OpenAPI
- **Testing**: Jest + Supertest

### Frontend (apps/web)

- **Framework**: Next.js 16 (App Router)
- **UI Library**: shadcn/ui + Tailwind CSS v4
- **Estilos**: CSS Modules + Tailwind
- ** Íconos**: Lucide React
- **Tema**: Dark/Light mode con next-themes

### Paquetes Compartidos

- **@workspace/ui**: Biblioteca de componentes UI reutilizables
- **@workspace/eslint-config**: Configuración ESLint unificada
- **@workspace/typescript-config**: Configuración TypeScript estricta

## Requisitos

- Node.js >= 20
- pnpm >= 10
- PostgreSQL (para desarrollo local del API)

## Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp apps/api/.env.example apps/api/.env
```

## Scripts Disponibles

```bash
# Desarrollo (corre todos los apps en modo watch)
pnpm dev

# Build de todos los packages
pnpm build

# Linting de todo el monorepo
pnpm lint

# Formateo con Prettier
pnpm format
```

### Scripts Individuales

```bash
# API (NestJS)
cd apps/api
pnpm dev          # Desarrollo con hot-reload
pnpm build        # Build de producción
pnpm start:prod   # Ejecutar producción
pnpm test         # Tests unitarios
pnpm test:e2e     # Tests end-to-end
pnpm migrate      # Migraciones de base de datos

# Web (Next.js)
cd apps/web
pnpm dev          # Desarrollo con Turbopack
pnpm build        # Build de producción
pnpm start        # Ejecutar producción
pnpm lint         # Linting
```

## Agregar Componentes UI

Para agregar nuevos componentes shadcn/ui al packages/ui:

```bash
cd apps/web
pnpm dlx shadcn@latest add button -c apps/web
```

Esto añadirá el componente a `packages/ui/src/components`.

## Uso de Componentes

```tsx
import { Button } from "@workspace/ui/components/button";
```

## API Documentation

Accede a la documentación Swagger en: `http://localhost:3001/api`

## Contribuir

1. Haz fork del repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

MIT
