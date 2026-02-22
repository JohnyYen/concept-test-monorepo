# API Design First Approach - Proof of Concept

Este proyecto es una prueba de concepto que demuestra el enfoque **API Design First** para el desarrollo de aplicaciones full-stack. Utiliza especificaciones OpenAPI para generar automáticamente api-stubs, mock servers y clientes API tanto para Next.js como para Dart (Flutter), promoviendo consistencia, eficiencia y colaboración entre equipos de backend y frontend.


## 🚀 Quick Start

```shell
pnpm install
pnpm generate:api
pnpm generate:web
pnpm setup:workspace
pnpm mock:run
pnpm dev
```

## Conceptos Fundamentales del Enfoque API Design First

### API Design First
El enfoque **API Design First** prioriza el diseño de la API antes de la implementación del código. Utiliza especificaciones OpenAPI (anteriormente Swagger) para definir contratos de API que sirven como fuente única de verdad. Esto permite:

- **Colaboración temprana**: Equipos de frontend y backend pueden trabajar en paralelo
- **Consistencia**: Todas las implementaciones siguen el mismo contrato
- **Documentación automática**: La especificación genera documentación viva
- **Validación**: Herramientas pueden validar implementaciones contra el contrato

### API Stubs
Los **API Stubs** son implementaciones básicas de endpoints de API generadas automáticamente desde la especificación OpenAPI. En este proyecto, se generan para NestJS, proporcionando:

- Controladores base con rutas y métodos HTTP
- Modelos de datos TypeScript
- Validación automática de requests/responses
- Estructura modular lista para implementación

### Mock Server
Un **Mock Server** simula el comportamiento de la API real sin necesidad de implementación backend completa. Permite:

- Desarrollo frontend independiente del backend
- Pruebas de integración tempranas
- Demostraciones y prototipos rápidos
- Validación de contratos de API

### API Clients
Los **API Clients** son bibliotecas generadas automáticamente para consumir la API desde diferentes plataformas:

- **Next.js Client**: Cliente TypeScript con fetch para aplicaciones web
- **Dart Client**: Cliente Dart para aplicaciones Flutter móviles
- Ambos clientes incluyen:
  - Métodos tipados para todos los endpoints
  - Modelos de datos serializables
  - Manejo automático de autenticación y errores

## Arquitectura del Proyecto

```
fullstack-app-monorepo/
├── packages/
│   ├── api-contract/          # Especificación OpenAPI (fuente de verdad)
│   ├── api-stubs/            # Stubs NestJS generados
│   ├── mock-server/          # Configuración Mockoon generada
│   ├── nextjs-client/        # Cliente API para Next.js
│   └── dart-client/          # Cliente API para Flutter
├── apps/
│   ├── api/                  # Implementación NestJS real
│   └── web/                  # Aplicación Next.js
└── scripts/                  # Utilidades de generación
```

## Prerequisitos

- Node >= 18
- pnpm
- Java (requerido por openapi-generator)
- Flutter (solo mobile)

## Herramientas Utilizadas en el Flujo de Trabajo

### OpenAPI Generator CLI
**@openapitools/openapi-generator-cli** es la herramienta principal para generar código desde especificaciones OpenAPI.

**Características principales:**
- Soporte para más de 50 lenguajes y frameworks
- Generación de servidores, clientes y documentación
- Configuración flexible mediante plantillas personalizadas
- Validación automática de especificaciones

**Uso en este proyecto:**
- Genera stubs NestJS desde `packages/api-contract/openapi.yml`
- Crea cliente TypeScript para Next.js con fetch
- Produce cliente Dart para Flutter
- Mantiene consistencia tipada entre todas las implementaciones

### Mockoon CLI
**@mockoon/cli** permite crear y ejecutar servidores mock basados en especificaciones OpenAPI.

**Características principales:**
- Importación directa desde archivos OpenAPI
- Interfaz web para configuración visual
- Soporte para respuestas dinámicas y scripting
- Exportación/importación de configuraciones

**Uso en este proyecto:**
- Convierte la especificación OpenAPI en configuración Mockoon
- Ejecuta servidor mock en puerto 3500 para desarrollo
- Simula todos los endpoints definidos en el contrato

### Flujo de Trabajo Automatizado
1. **Diseño**: Editar `packages/api-contract/openapi.yml`
2. **Generación**: Ejecutar scripts para crear stubs, clientes y mock
3. **Desarrollo**: Usar mock server para frontend, stubs para backend
4. **Validación**: Verificar consistencia entre implementaciones

## Scripts de Package.json Relacionados con API Design

Los siguientes scripts en el `package.json` raíz automatizan el flujo de trabajo API Design First:

### `generate:api`
```bash
openapi-generator-cli generate -i ./packages/api-contract/openapi.yml -g typescript-nestjs-server -o ./packages/api-stubs/ && node scripts/fix-imports.js
```
- Genera stubs completos para NestJS desde la especificación OpenAPI
- Crea controladores, servicios, módulos y modelos TypeScript
- Aplica correcciones automáticas de imports con script personalizado

### `generate:web`
```bash
openapi-generator-cli generate -i ./packages/api-contract/openapi.yml -g typescript-fetch -o ./packages/nextjs-client/
```
- Crea cliente API TypeScript para Next.js
- Utiliza fetch nativo para requests HTTP
- Incluye tipos para requests, responses y errores

### `generate:mobile`
```bash
openapi-generator-cli generate -i ./packages/api-contract/openapi.yml -g dart -o ./packages/dart-client/
```
- Genera cliente Dart para aplicaciones Flutter
- Compatible con el ecosistema Dart/Flutter
- Maneja serialización JSON automática

### `mock:import`
```bash
mkdir -p ./packages/mock-server/ && mockoon-cli import -i ./packages/api-contract/openapi.yml -o ./packages/mock-server/data.json --prettify
```
- Importa especificación OpenAPI a formato Mockoon
- Crea configuración de servidor mock con todos los endpoints
- Formatea el JSON resultante para legibilidad

### `mock:run`
```bash
mockoon-cli start --data ./packages/mock-server/data.json --port 3500
```
- Inicia servidor mock en puerto 3500
- Simula API completa para desarrollo frontend
- Soporta hot-reload de configuración

## Tutorial

- Ejecutar pnpm install para instalar todas las dependencias del proyecto

- Generar el api stub para nestjs, ejecutar el siguiente comando

```shell
pnpm generate:api
```
- Despues crear un package.json en la carpeta packages/api-stubs, con este contenido:

```json
{
  "name": "@workspace/api-stubs",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    "@nestjs/common": "^10",
    "rxjs": "^7"
  },
  "devDependencies": {
    "@nestjs/common": "^11.1.14",
    "rxjs": "^7.8.2",
    "typescript": "^5"
  }
}
```
- Agregar las siguientes 3 lineas al final del index.ts en el root de api-stubs:

```ts
export * from './api'
export * from './controllers'
export * from './models'
```

**Con esto tenemos el backend listo**

- Ejecutar el siguiente comando para generar el api client para la app web:

```shell
pnpm generate:web
```

- Crear un package.json en la carpeta next-client generada:

```json
{
  "name": "@workspace/next-client",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {
    "web": "^0.0.2"
  }
}
```

**Con esto tiene el API Client del frontend listo**

- Ejecutar el siguiente comando para crear datos de prueba del servidor:

```shell
pnpm mock:import
```

- Ejecutar el siguiente comando para levantar el mock server en localhost:3500:

```shell
pnpm mock:run
```

- Ir a la ruta `http://localhost:3500/api/v1/products` para probar si se levanto correctamente el mock server y esta devolviendo correctamente una respuesta generada.

- Ejecutar `pnpm dev` para levantar todo el monorepo (8000:backend) y (3000:nextjs)

- Revisar en los logs del navegador si se ejecuto correctamente la peticion al server


## Web Frontend

- Haber cumplido por completo el tutorial

- Crear una nueva rama llamada `feature/web`

- Crear una nueva pantalla utilizando el api client generado

- Subir la rama a github y hacer un PR

## Mobile

Hacer una prueba de concepto con una app en flutter para probar su integracion con el monorepo (Guiarse fundamentalmente por el tutorial y por la seccion de web frontend a la hora de errores cuando se importa `packages/dart-client` en `apps/mobile`)

- Crear una nueva rama llamada `feature/mobile`

- Crear una flutter app dentro de apps/ llamada *mobile*

- Crear un package.json con el siguiente contenido:

```json
{
  "name": "mobile",
  "private": true,
  "scripts": {
    "dev": "flutter run",
    "build": "flutter build apk",
    "build:ios": "flutter build ios",
    "analyze": "flutter analyze",
    "test": "flutter test",
    "clean": "flutter clean",
    "format": "dart format ."
  }
}
```
Los scripts en este package.json deben de coincidir con el resto de package.json del resto del monorepo y los comandos de los scripts deben de adecuarse a como funciona flutter (por ejemplo `"dev": "flutter run"` para levantar la app)

- Ejecutar el siguiente comando para generar el api client para dart:

```shell
pnpm generate:mobile
```

Con esto ya tienes el API Client listo para ser importado (Como importarlo en tu proyecto es a expensas de ti)

- Levantar solamente la app mobile (Para este paso ya debes tener generado y levantado el mock server):

```shell
pnpm dev --filter=mobile
```

- Crear una pantalla sencilla, y hacer una solicitud a algun endpoint utilizando el api client generado

- Subir la rama y hacer un PR


