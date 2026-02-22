````markdown
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

* **Colaboración temprana**: Equipos de frontend y backend pueden trabajar en paralelo
* **Consistencia**: Todas las implementaciones siguen el mismo contrato
* **Documentación automática**: La especificación genera documentación viva
* **Validación**: Herramientas pueden validar implementaciones contra el contrato

### API Stubs

Los **API Stubs** son implementaciones básicas de endpoints de API generadas automáticamente desde la especificación OpenAPI. En este proyecto, se generan para NestJS, proporcionando:

* Controladores base con rutas y métodos HTTP
* Modelos de datos TypeScript
* Validación automática de requests/responses
* Estructura modular lista para implementación

### Mock Server

Un **Mock Server** simula el comportamiento de la API real sin necesidad de implementación backend completa. Permite:

* Desarrollo frontend independiente del backend
* Pruebas de integración tempranas
* Demostraciones y prototipos rápidos
* Validación de contratos de API

### API Clients

Los **API Clients** son bibliotecas generadas automáticamente para consumir la API desde diferentes plataformas:

* **Next.js Client**: Cliente TypeScript con fetch para aplicaciones web
* **Dart Client**: Cliente Dart para aplicaciones Flutter móviles
* Ambos clientes incluyen:

  * Métodos tipados para todos los endpoints
  * Modelos de datos serializables
  * Manejo automático de autenticación y errores

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

* Node >= 18
* pnpm
* Java (requerido por openapi-generator)
* Flutter (solo mobile)

## Herramientas Utilizadas en el Flujo de Trabajo

### OpenAPI Generator CLI

**@openapitools/openapi-generator-cli** es la herramienta principal para generar código desde especificaciones OpenAPI.

**Uso en este proyecto:**

* Genera stubs NestJS desde `packages/api-contract/openapi.yml`
* Crea cliente TypeScript para Next.js con fetch
* Produce cliente Dart para Flutter

### Mockoon CLI

**@mockoon/cli** permite crear y ejecutar servidores mock basados en especificaciones OpenAPI.

**Uso en este proyecto:**

* Convierte la especificación OpenAPI en configuración Mockoon
* Ejecuta servidor mock en puerto 3500 para desarrollo
* Simula todos los endpoints definidos en el contrato

### Flujo de Trabajo Automatizado

1. **Diseño**: Editar `packages/api-contract/openapi.yml`
2. **Generación**: Ejecutar scripts para crear stubs, clientes y mock
3. **Desarrollo**: Usar mock server para frontend, stubs para backend
4. **Validación**: Verificar consistencia entre implementaciones

## Scripts de Package.json Relacionados con API Design

* `generate:api`: Genera stubs completos para NestJS desde la especificación OpenAPI
* `generate:web`: Crea cliente API TypeScript para Next.js
* `generate:mobile`: Genera cliente Dart para Flutter
* `mock:import`: Importa especificación OpenAPI a formato Mockoon
* `mock:run`: Inicia servidor mock en puerto 3500

> Todos los pasos de creación de package.json o modificaciones de archivos `.ts` se automatizan ahora con `pnpm setup:workspace`.

## Tutorial

* Ejecutar `pnpm install` para instalar todas las dependencias del proyecto
* Ejecutar `pnpm generate:api` para generar los API stubs
* Ejecutar `pnpm generate:web` para generar el cliente web
* Ejecutar `pnpm generate:mobile` para generar el cliente Dart
* Ejecutar `pnpm setup:workspace` para configurar package.json y exports automáticamente
* Ejecutar `pnpm mock:import` para crear los datos de prueba del mock server
* Ejecutar `pnpm mock:run` para levantar el mock server en localhost:3500
* Ejecutar `pnpm dev` para levantar todo el monorepo

---

## Web Frontend

* Crear una rama `feature/web`
* Crear una nueva pantalla utilizando el API client generado
* Subir la rama y hacer un PR

---

## Mobile Onboarding

Hacer una prueba de concepto con Flutter para probar la integración con el monorepo. Esta sección **no ha sido probada exhaustivamente** y depende de la experiencia del desarrollador con Flutter, pero se recomiendan estas opciones para usar el paquete `dart-client`:

### Opción 1: Dependency local (recomendado en desarrollo)

Agregar en `apps/mobile/pubspec.yaml`:

```yaml
dependencies:
  dart_client:
    path: ../../packages/dart-client
```

Luego importar en tu código Dart:

```dart
import 'package:dart_client/dart_client.dart';
```

### Opción 2: Publicación git (para equipo o CI/CD)

Si se desea compartir el paquete entre proyectos, se puede referenciar directamente desde un repositorio git:

```yaml
dependencies:
  dart_client:
    git:
      url: https://github.com/tu-org/dart-client.git
```

---

### Pasos prácticos para mobile

1. Crear una rama `feature/mobile`
2. Crear la app Flutter en `apps/mobile`
3. Ejecutar `pnpm dev --filter=mobile` para levantar solo la app Flutter (asegúrate de que el mock server esté corriendo)
4. Crear una pantalla sencilla y hacer una solicitud a un endpoint usando `dart-client`
5. Subir la rama y hacer un PR

> Recuerda: el uso de `dart-client` está sujeto a la experiencia con Flutter y la resolución de paths en `pubspec.yaml`.

---

## Troubleshooting

**Problemas comunes y soluciones rápidas**

* **Dependencias no instaladas**

  ```bash
  pnpm install
  ```
* **Build falla en un workspace**

  ```bash
  pnpm turbo run build --filter=<app>
  ```
* **Cambios no reflejados**

  ```bash
  pnpm turbo run dev --force
  ```
* **Error de caché de Turborepo**

  ```bash
  rm -rf .turbo node_modules
  pnpm install
  ```
* **Script no reconocido**
  Verifica que exista en el `package.json` correspondiente

Si el problema persiste, ejecutar con logs detallados:

```bash
pnpm turbo run dev --verbose
```
