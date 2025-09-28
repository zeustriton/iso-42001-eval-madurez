# 🚀 Despliegue Rápido en Vercel

## Pasos Esenciales

### 1. Preparar Base de Datos
```bash
# Opción A: Vercel Postgres (Recomendado)
# 1. Ve a Vercel Dashboard → Storage → Create Database
# 2. Elige Postgres
# 3. Copia la cadena de conexión

# Opción B: PlanetScale
# 1. Crea cuenta en PlanetScale
# 2. Crea nueva base de datos
# 3. Copia la cadena de conexión
```

### 2. Instalar Dependencias
```bash
# Para Vercel Postgres
npm install pg

# Para PlanetScale
npm install @prisma/adapter-planetscale mysql2
```

### 3. Actualizar Prisma Schema
```prisma
// Para Vercel Postgres
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 4. Configurar Variables de Entorno en Vercel
```
DATABASE_URL = tu_cadena_de_conexion
NEXTAUTH_SECRET = string_aleatorio_largo
NEXTAUTH_URL = https://tu-app.vercel.app
```

### 5. Probar Build Localmente
```bash
npm run db:generate
npm run build
```

### 6. Subir a GitHub y Desplegar
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

Luego en Vercel:
1. Importa tu repositorio
2. Configura las variables de entorno
3. Haz clic en Deploy

### 7. Post-Despliegue
```bash
# Ejecutar migraciones en producción
npx prisma db push
```

## ✅ Checklist

- [ ] Base de datos de producción configurada
- [ ] Dependencias de base de datos instaladas
- [ ] Schema de Prisma actualizado
- [ ] Variables de entorno configuradas en Vercel
- [ ] Build local exitoso
- [ ] Código subido a GitHub
- [ ] Despliegue completado en Vercel
- [ ] Migraciones ejecutadas

## 🔧 Solución de Problemas

### Build falla
```bash
rm -rf .next
npm run build
```

### Problemas de base de datos
- Verifica la cadena de conexión
- Ejecuta `npx prisma db push` manualmente

### Socket.IO no funciona
- Considera removerlo temporalmente si no es crítico
- O usa alternativas como Server-Sent Events

¡Listo! Tu aplicación debería estar funcionando en Vercel.