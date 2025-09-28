# Guía de Despliegue en Vercel - Herramienta de Cumplimiento de Regulaciones de IA Perú

## 📋 Resumen del Proyecto
Esta es una aplicación Next.js 15 para evaluación de cumplimiento de regulaciones de IA en Perú, según la norma NTP-ISO/IEC 42001:2025 y el DS 115-2025-PCM.

## 🚀 Pasos para Despliegue en Vercel

### Paso 1: Configurar Base de Datos para Producción

#### Opción A: Vercel Postgres (Recomendado)
1. En tu dashboard de Vercel, ve a "Storage"
2. Crea una nueva base de datos Postgres
3. Copia la cadena de conexión

#### Opción B: PlanetScale (MySQL)
1. Crea una cuenta en PlanetScale
2. Crea una nueva base de datos
3. Copia la cadena de conexión

### Paso 2: Actualizar Configuración de Prisma

```bash
# Instalar el driver de Postgres (si elegiste Vercel Postgres)
npm install pg

# O para PlanetScale (MySQL)
npm install @prisma/adapter-planetscale mysql2
```

#### Actualizar `prisma/schema.prisma`:

```prisma
// Para Vercel Postgres
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Para PlanetScale
// datasource db {
//   provider = "mysql"
//   url      = env("DATABASE_URL")
//   relationMode = "prisma"
// }
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env.production`:

```env
# Base de Datos
DATABASE_URL="tu_cadena_de_conexion_aqui"

# NextAuth
NEXTAUTH_SECRET="tu_secreto_aqui"
NEXTAUTH_URL="https://tu-app.vercel.app"

# Z-AI SDK (si lo usas)
Z_AI_API_KEY="tu_api_key_aqui"

# Socket.IO (si lo necesitas en producción)
```

### Paso 4: Adaptar Socket.IO para Vercel

Vercel no soporta servidores personalizados directamente. Tenemos dos opciones:

#### Opción A: Usar Vercel Edge Functions para Socket.IO (Recomendado)

1. Instalar las dependencias necesarias:
```bash
npm install @vercel/node socket.io
```

2. Crear archivo `api/socketio/route.ts`:
```typescript
// src/app/api/socketio/route.ts
import { Server } from 'socket.io'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (res.socket.server.io) {
    console.log('Socket ya está corriendo')
  } else {
    console.log('Socket está inicializando')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    
    // Configurar eventos de socket aquí
    io.on('connection', (socket) => {
      console.log('Cliente conectado:', socket.id)
      
      socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id)
      })
    })
  }
  res.end()
}
```

#### Opción B: Remover Socket.IO (Si no es crítico)

Si Socket.IO no es esencial para tu aplicación, puedes desactivarlo para producción.

### Paso 5: Actualizar Scripts de Package.json

Modifica tu `package.json` para usar los comandos estándar de Next.js:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:reset": "prisma migrate reset",
    "db:studio": "prisma studio"
  }
}
```

### Paso 6: Crear Archivo `vercel.json`

Crea este archivo en la raíz del proyecto:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "DATABASE_URL": "@vercel_postgres_connection_string"
  },
  "crons": []
}
```

### Paso 7: Actualizar Next.config.ts para Producción

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para producción
  typescript: {
    ignoreBuildErrors: false, // Cambiar a false para producción
  },
  reactStrictMode: true, // Habilitar para producción
  eslint: {
    ignoreDuringBuilds: false, // Cambiar a false para producción
  },
  // Optimización de imágenes
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // Configuración para funciones serverless
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
```

### Paso 8: Preparar para el Build

Ejecuta estos comandos localmente:

```bash
# Generar cliente Prisma
npm run db:generate

# Probar build localmente
npm run build
```

### Paso 9: Subir a GitHub

1. Crea un repositorio en GitHub
2. Sube tu código:
```bash
git init
git add .
git commit -m "Initial commit - IA Compliance Tool Peru"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

### Paso 10: Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Selecciona tu repositorio
5. Configura las variables de entorno:
   - `DATABASE_URL`: Tu cadena de conexión a la base de datos
   - `NEXTAUTH_SECRET`: Un string aleatorio largo
   - `NEXTAUTH_URL`: `https://tu-app.vercel.app`
6. Haz clic en "Deploy"

### Paso 11: Post-Despliegue

1. **Ejecutar migraciones de base de datos**:
   - Conéctate a tu base de datos de producción
   - Ejecuta `npx prisma db push` o `npx prisma migrate deploy`

2. **Verificar la aplicación**:
   - Visita tu URL de Vercel
   - Prueba todas las funcionalidades
   - Verifica que las evaluaciones funcionen correctamente

3. **Configurar dominio personalizado** (opcional):
   - En tu dashboard de Vercel, ve a "Settings"
   - Configura tu dominio personalizado

## 🔧 Solución de Problemas Comunes

### Problema: Build falla por TypeScript
```bash
# Limpiar build
rm -rf .next
npm run build
```

### Problema: Conexión a base de datos
- Verifica que la URL de la base de datos sea correcta
- Asegúrate de que la base de datos sea accesible desde Vercel

### Problema: Socket.IO no funciona
- Considera usar alternativas como Server-Sent Events o WebSockets nativos
- O usa un servicio externo como Pusher o Ably

## 📊 Monitoreo y Mantenimiento

1. **Configurar analytics** en Vercel
2. **Monitorear errores** con Vercel Logs
3. **Configurar alertas** para problemas de rendimiento
4. **Backup de base de datos** regular

## 🎯 Checklist Final

- [ ] Base de datos configurada para producción
- [ ] Variables de entorno configuradas
- [ ] Socket.IO adaptado o removido
- [ ] Scripts de package.json actualizados
- [ ] Archivo vercel.json creado
- [ ] Build local exitoso
- [ ] Código subido a GitHub
- [ ] Proyecto conectado a Vercel
- [ ] Despliegue completado
- [ ] Migraciones de base de datos ejecutadas
- [ ] Funcionalidades verificadas

¡Felicidades! Tu aplicación de evaluación de cumplimiento de regulaciones de IA para Perú debería estar ahora funcionando en Vercel.