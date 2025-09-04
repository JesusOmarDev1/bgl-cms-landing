# BGL BASCULAS INDUSTRIALES - Sistema de Gestión de Contenidos

Sistema de gestión de contenidos (CMS) corporativo desarrollado específicamente para **BGL BASCULAS INDUSTRIALES**, empresa líder en soluciones de pesaje industrial y básculas de alta precisión.

## Acerca del Proyecto

Este CMS está diseñado para gestionar el contenido digital de BGL BASCULAS INDUSTRIALES, permitiendo la administración eficiente de:

- **Catálogo de productos**: Básculas industriales, sistemas de pesaje, y equipos de medición
- **Contenido técnico**: Especificaciones, manuales, y documentación técnica
- **Noticias corporativas**: Actualizaciones de la empresa, lanzamientos de productos
- **Casos de éxito**: Proyectos implementados y testimonios de clientes
- **Información de servicios**: Mantenimiento, calibración, y soporte técnico

## Características Principales

Este sistema está optimizado para las necesidades específicas de una empresa industrial:

### Funcionalidades Técnicas

- **🔐 Autenticación y Control de Acceso**: Sistema seguro de usuarios con roles específicos
- **📝 Editor Avanzado**: Editor Lexical para contenido rico con soporte para bloques personalizados
- **🎨 Constructor de Layouts**: Creación de páginas dinámicas con bloques reutilizables
- **👀 Vista Previa en Vivo**: Previsualización de contenido antes de publicar
- **🔍 SEO Optimizado**: Herramientas integradas para optimización en motores de búsqueda
- **📱 Responsive Design**: Interfaz adaptable a todos los dispositivos
- **🌐 Multiidioma**: Soporte para contenido en múltiples idiomas
- **📊 Gestión de Medios**: Almacenamiento optimizado con Cloudflare R2
- **🔄 Revalidación Automática**: Actualización automática del contenido publicado
- **📈 Analytics Integrado**: Seguimiento de rendimiento y métricas

### Módulos Específicos para BGL

- **Catálogo de Básculas**: Gestión completa de productos con especificaciones técnicas
- **Centro de Documentación**: Manuales, certificaciones y documentos técnicos
- **Blog Corporativo**: Noticias, actualizaciones y contenido educativo
- **Galería de Proyectos**: Casos de éxito e instalaciones realizadas
- **Formularios de Contacto**: Solicitudes de cotización y soporte técnico

## Tecnologías Utilizadas

### Backend

- **Payload CMS**: Sistema de gestión de contenidos headless
- **Node.js**: Entorno de ejecución del servidor
- **TypeScript**: Lenguaje de programación tipado
- **PostgreSQL**: Base de datos relacional
- **Cloudflare R2**: Almacenamiento de archivos multimedia

### Frontend

- **Next.js 14**: Framework de React con App Router
- **React 18**: Biblioteca de interfaz de usuario
- **Tailwind CSS**: Framework de estilos utilitarios
- **shadcn/ui**: Componentes de interfaz de usuario
- **Lexical Editor**: Editor de texto enriquecido

### Infraestructura

- **Docker**: Contenedorización de la aplicación
- **Vercel**: Plataforma de despliegue (opcional)
- **Cloudflare**: CDN y hosting especializado (seguridad, velocidad, escalabilidad)
- **PostgreSQL**: Base de datos relacional
- **Cloudflare R2**: Almacenamiento de archivos multimedia
- **Payload CMS**: Sistema de gestión de contenidos headless

## Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- pnpm (recomendado) o npm
- PostgreSQL 14+
- Git

### Configuración Local

1. **Clonar el repositorio**

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd bgl-cms
   ```

2. **Instalar dependencias**

   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   ```

   Editar el archivo `.env` con las configuraciones específicas:

   ```env
   DATABASE_URI=postgresql://usuario:contraseña@localhost:5432/bgl_cms
   PAYLOAD_SECRET=tu_clave_secreta_aqui
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   S3_ENDPOINT=https://tu-cuenta.r2.cloudflarestorage.com
   S3_ACCESS_KEY_ID=tu_access_key
   S3_SECRET_ACCESS_KEY=tu_secret_key
   S3_BUCKET=bgl-cms-media
   ```

4. **Inicializar la base de datos**

   ```bash
   pnpm payload migrate
   ```

5. **Iniciar el servidor de desarrollo**

   ```bash
   pnpm dev
   ```

6. **Acceder a la aplicación**
   - Frontend: `http://localhost:3000`
   - Panel de administración: `http://localhost:3000/admin`

### Primer Usuario Administrador

Al acceder por primera vez al panel de administración, se te solicitará crear el primer usuario administrador para BGL BASCULAS INDUSTRIALES.

## Arquitectura del Sistema

El CMS está configurado específicamente para las necesidades de BGL BASCULAS INDUSTRIALES con las siguientes colecciones:

### Colecciones Principales

#### 👥 Usuarios (Autenticación)

- **Administradores**: Acceso completo al sistema
- **Editores**: Gestión de contenido y productos
- **Colaboradores**: Creación de contenido con revisión
- Control de acceso basado en roles específicos para la empresa

#### 📄 Páginas Institucionales

- Páginas estáticas con constructor de layouts dinámico
- Información corporativa de BGL BASCULAS INDUSTRIALES
- Páginas de servicios y soporte técnico
- Sistema de borradores y previsualización

#### 📝 Artículos y Noticias

- Blog corporativo con noticias de la industria
- Actualizaciones de productos y servicios
- Casos de éxito y testimonios de clientes
- Contenido educativo sobre pesaje industrial

#### 🏭 Catálogo de Productos

- **Básculas Industriales**: Especificaciones técnicas completas
- **Sistemas de Pesaje**: Soluciones integradas
- **Equipos de Medición**: Instrumentos de precisión
- **Accesorios**: Componentes y repuestos
- Fichas técnicas, manuales y certificaciones

#### 📊 Proyectos y Casos de Éxito

- Galería de instalaciones realizadas
- Testimonios de clientes industriales
- Especificaciones de proyectos implementados
- Imágenes y documentación técnica

#### 📁 Gestión de Medios

- Almacenamiento optimizado con Cloudflare R2
- Imágenes de productos con múltiples tamaños
- Documentos técnicos y manuales
- Videos demostrativos y tutoriales
- Certificaciones y documentos legales

#### 🏷️ Categorías y Taxonomías

- **Tipos de Básculas**: Camioneras, de piso, colgantes, etc.
- **Industrias**: Alimentaria, química, logística, etc.
- **Servicios**: Instalación, mantenimiento, calibración
- **Regiones**: Cobertura geográfica de servicios

### Configuraciones Globales

#### 🔝 Header Corporativo

- Logo de BGL BASCULAS INDUSTRIALES
- Menú de navegación principal
- Información de contacto
- Enlaces a redes sociales corporativas

#### 🔻 Footer Empresarial

- Información de contacto completa
- Direcciones de sucursales
- Certificaciones y acreditaciones
- Enlaces legales y políticas de privacidad

## Control de Acceso y Seguridad

El sistema implementa un control de acceso robusto diseñado para las necesidades corporativas de BGL BASCULAS INDUSTRIALES:

### Roles de Usuario

- **👑 Super Administrador**: Acceso completo al sistema, gestión de usuarios y configuraciones
- **🔧 Administrador Técnico**: Gestión de productos, especificaciones y documentación técnica
- **✏️ Editor de Contenido**: Creación y edición de artículos, noticias y páginas informativas
- **👀 Revisor**: Revisión y aprobación de contenido antes de publicación
- **📊 Analista**: Acceso de solo lectura para reportes y métricas

### Permisos por Colección

- **Productos**: Solo administradores técnicos pueden modificar especificaciones
- **Artículos**: Editores pueden crear, revisores aprueban, administradores publican
- **Páginas**: Requieren aprobación de administrador para cambios estructurales
- **Medios**: Control de subida basado en tipo de archivo y tamaño
- **Usuarios**: Solo super administradores pueden gestionar cuentas de usuario

### Seguridad Adicional

- **Autenticación de dos factores** para cuentas administrativas
- **Registro de auditoría** de todas las acciones realizadas
- **Backup automático** de contenido crítico
- **Validación de contenido** antes de publicación

## Constructor de Layouts

Sistema de construcción de páginas dinámicas optimizado para el contenido industrial de BGL BASCULAS INDUSTRIALES:

### Bloques Disponibles

#### 🎯 Hero Corporativo

- Banners principales con información de productos
- Llamadas a la acción para cotizaciones
- Imágenes de alta calidad de básculas industriales

#### 📄 Contenido Técnico

- Especificaciones detalladas de productos
- Tablas de capacidades y precisiones
- Documentación técnica estructurada

#### 🖼️ Galería de Medios

- Imágenes de productos en funcionamiento
- Videos demostrativos de instalaciones
- Documentos descargables (manuales, certificados)

#### 📞 Llamadas a la Acción

- Formularios de cotización personalizados
- Contacto directo con especialistas
- Solicitudes de servicio técnico

#### 📚 Archivo de Contenido

- Listados de productos por categoría
- Casos de éxito organizados por industria
- Centro de recursos y documentación

#### 🏭 Bloques Especializados para BGL

- **Comparador de Productos**: Tabla comparativa de especificaciones
- **Calculadora de Capacidad**: Herramienta para selección de básculas
- **Mapa de Cobertura**: Ubicaciones de servicio técnico
- **Testimonios Industriales**: Casos de éxito por sector

## Editor de Contenido Avanzado

### Editor Lexical Personalizado

Editor de texto enriquecido optimizado para contenido técnico e industrial:

- **📝 Edición WYSIWYG**: Interfaz intuitiva para creación de contenido
- **🔗 Enlaces Inteligentes**: Vinculación automática entre productos relacionados
- **📊 Tablas Técnicas**: Creación de especificaciones y comparativas
- **🖼️ Inserción de Medios**: Integración directa con la galería de imágenes
- **📋 Bloques Personalizados**: Elementos específicos para contenido industrial
- **✅ Validación de Contenido**: Verificación automática de información técnica

## Flujo de Trabajo Editorial

### Sistema de Borradores y Publicación

Proceso de revisión diseñado para garantizar la calidad del contenido técnico:

#### 📝 Creación de Contenido

- Los editores crean borradores de artículos y páginas
- Autoguardado automático para prevenir pérdida de información
- Historial de versiones para seguimiento de cambios

#### 👀 Revisión Técnica

- Los administradores técnicos revisan especificaciones de productos
- Validación de información técnica y certificaciones
- Aprobación de contenido antes de publicación

#### 🌐 Previsualización

- Vista previa exacta del contenido antes de publicar
- Pruebas de responsive design en diferentes dispositivos
- Verificación de enlaces y recursos multimedia

#### 🚀 Publicación Programada

- Programación de publicaciones para lanzamientos de productos
- Coordinación con campañas de marketing
- Revalidación automática del contenido en el sitio web

## Optimización y Rendimiento

### SEO Corporativo

- **Meta tags automáticos** para productos y servicios
- **Schema markup** para básculas industriales
- **Sitemap dinámico** con productos y categorías
- **URLs amigables** optimizadas para búsquedas industriales
- **Open Graph** para redes sociales corporativas

### Búsqueda Avanzada

- **Búsqueda por especificaciones** técnicas
- **Filtros por capacidad** y precisión
- **Búsqueda por industria** de aplicación
- **Autocompletado inteligente** de productos
- **Resultados ponderados** por relevancia comercial

### Rendimiento Web

- **Revalidación automática** de contenido actualizado
- **Caché optimizado** para imágenes de productos
- **Lazy loading** de recursos multimedia
- **Compresión automática** de imágenes técnicas
- **CDN global** con Cloudflare

## Despliegue y Producción

### Entornos Recomendados

#### 🚀 Payload Cloud (Recomendado)

- Hosting especializado para aplicaciones Payload CMS
- Escalabilidad automática según demanda
- Backups automáticos y recuperación de desastres
- Soporte técnico especializado

#### ⚡ Vercel

- Despliegue automático desde repositorio Git
- Edge functions para mejor rendimiento global
- Integración con bases de datos PostgreSQL
- CDN global incluido

#### 🐳 Docker Self-Hosting

- Control total sobre la infraestructura
- Ideal para empresas con políticas de datos estrictas
- Escalabilidad horizontal personalizada
- Integración con sistemas internos de BGL

### Configuración de Producción

```bash
# Construcción para producción
pnpm build

# Ejecución en producción
pnpm start
```

### Variables de Entorno de Producción

```env
NODE_ENV=production
DATABASE_URI=postgresql://usuario:contraseña@servidor:5432/bgl_cms_prod
PAYLOAD_SECRET=clave_secreta_produccion_muy_segura
NEXT_PUBLIC_SERVER_URL=https://cms.bglbasculas.com
S3_ENDPOINT=https://cuenta-prod.r2.cloudflarestorage.com
S3_BUCKET=bgl-cms-production
```

## Mantenimiento y Soporte

### Actualizaciones del Sistema

- **Actualizaciones automáticas** de seguridad
- **Versionado semántico** para control de cambios
- **Testing automatizado** antes de despliegues
- **Rollback rápido** en caso de problemas

### Monitoreo y Analytics

- **Métricas de rendimiento** del sitio web
- **Análisis de contenido** más visitado
- **Reportes de búsquedas** de productos
- **Estadísticas de conversión** de formularios

### Soporte Técnico

- **Documentación completa** para usuarios
- **Videos tutoriales** para administradores
- **Soporte por email** para issues técnicos
- **Capacitación** para el equipo de BGL

## Migración y Redirects

Sistema de redirecciones para migración desde sitios web existentes:

- **Mapeo automático** de URLs antiguas
- **Códigos de estado HTTP** correctos para SEO
- **Preservación del ranking** en motores de búsqueda
- **Análisis de tráfico** durante la migración

## Automatización y Tareas Programadas

### Publicación Programada

- **Lanzamientos coordinados** de productos
- **Campañas de marketing** automatizadas
- **Actualizaciones de precios** programadas
- **Contenido estacional** automático

### Tareas de Mantenimiento

- **Backup automático** de base de datos
- **Limpieza de archivos** temporales
- **Optimización de imágenes** batch
- **Reportes periódicos** de sistema

## Sitio Web Corporativo

Sitio web corporativo diseñado específicamente para **BGL BASCULAS INDUSTRIALES**, integrado completamente con el sistema CMS:

### Características del Frontend

#### 🎨 Diseño Corporativo

- **Identidad visual** de BGL BASCULAS INDUSTRIALES
- **Colores corporativos** y tipografía oficial
- **Responsive design** optimizado para dispositivos industriales
- **Modo oscuro/claro** para diferentes entornos de trabajo

#### 🏭 Secciones Especializadas

- **Catálogo interactivo** de básculas industriales
- **Calculadora de capacidades** para selección de productos
- **Centro de descargas** con manuales y certificaciones
- **Formularios de cotización** personalizados por industria
- **Mapa de servicios** con cobertura geográfica

#### ⚡ Tecnologías Frontend

- **Next.js 14** con App Router para máximo rendimiento
- **TypeScript** para código robusto y mantenible
- **Tailwind CSS** para estilos consistentes y responsive
- **shadcn/ui** para componentes de interfaz profesionales
- **React Hook Form** para formularios optimizados
- **Framer Motion** para animaciones suaves

#### 🔧 Funcionalidades Avanzadas

- **Búsqueda inteligente** de productos por especificaciones
- **Comparador de básculas** lado a lado
- **Sistema de favoritos** para productos de interés
- **Calculadoras técnicas** integradas
- **Chat en vivo** para soporte técnico inmediato

### Cache

Although Next.js includes a robust set of caching strategies out of the box, Payload Cloud proxies and caches all files through Cloudflare using the [Official Cloud Plugin](https://www.npmjs.com/package/@payloadcms/payload-cloud). This means that Next.js caching is not needed and is disabled by default. If you are hosting your app outside of Payload Cloud, you can easily reenable the Next.js caching mechanisms by removing the `no-store` directive from all fetch requests in `./src/app/_api` and then removing all instances of `export const dynamic = 'force-dynamic'` from pages files, such as `./src/app/(pages)/[slug]/page.tsx`. For more details, see the official [Next.js Caching Docs](https://nextjs.org/docs/app/building-your-application/caching).

## Development

To spin up this example locally, follow the [Quick Start](#quick-start). Then [Seed](#seed) the database with a few pages, posts, and projects.

### Working with Postgres

Postgres and other SQL-based databases follow a strict schema for managing your data. In comparison to our MongoDB adapter, this means that there's a few extra steps to working with Postgres.

Note that often times when making big schema changes you can run the risk of losing data if you're not manually migrating it.

#### Local development

Ideally we recommend running a local copy of your database so that schema updates are as fast as possible. By default the Postgres adapter has `push: true` for development environments. This will let you add, modify and remove fields and collections without needing to run any data migrations.

If your database is pointed to production you will want to set `push: false` otherwise you will risk losing data or having your migrations out of sync.

#### Migrations

[Migrations](https://payloadcms.com/docs/database/migrations) are essentially SQL code versions that keeps track of your schema. When deploy with Postgres you will need to make sure you create and then run your migrations.

Locally create a migration

```bash
pnpm payload migrate:create
```

This creates the migration files you will need to push alongside with your new configuration.

On the server after building and before running `pnpm start` you will want to run your migrations

```bash
pnpm payload migrate
```

This command will check for any migrations that have not yet been run and try to run them and it will keep a record of migrations that have been run in the database.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

### Seed

To seed the database with a few pages, posts, and projects you can click the 'seed database' link from the admin panel.

The seed script will also create a demo user for demonstration purposes only:

- Demo Author
  - Email: `demo-author@payloadcms.com`
  - Password: `password`

> NOTICE: seeding the database is destructive because it drops your current database to populate a fresh one from the seed template. Only run this command if you are starting a new project or can afford to lose your current data.

## Production

To run Payload in production, you need to build and start the Admin panel. To do so, follow these steps:

1. Invoke the `next build` script by running `pnpm build` or `npm run build` in your project root. This creates a `.next` directory with a production-ready admin bundle.
1. Finally run `pnpm start` or `npm run start` to run Node in production and serve Payload from the `.build` directory.
1. When you're ready to go live, see Deployment below for more details.

### Deploying to Payload Cloud

The easiest way to deploy your project is to use [Payload Cloud](https://payloadcms.com/new/import), a one-click hosting solution to deploy production-ready instances of your Payload apps directly from your GitHub repo.

### Deploying to Vercel

This template can also be deployed to Vercel for free. You can get started by choosing the Vercel DB adapter during the setup of the template or by manually installing and configuring it:

```bash
pnpm add @payloadcms/db-vercel-postgres
```

```ts
// payload.config.ts
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export default buildConfig({
  // ...
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  // ...
```

We also support Vercel's blob storage:

```bash
pnpm add @payloadcms/storage-vercel-blob
```

```ts
// payload.config.ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  // ...
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  // ...
```

There is also a simplified [one click deploy](https://github.com/payloadcms/payload/tree/templates/with-vercel-postgres) to Vercel should you need it.

### Self-hosting

Before deploying your app, you need to:

1. Ensure your app builds and serves in production. See [Production](#production) for more details.
2. You can then deploy Payload as you would any other Node.js or Next.js application either directly on a VPS, DigitalOcean's Apps Platform, via Coolify or more. More guides coming soon.

You can also deploy your app manually, check out the [deployment documentation](https://payloadcms.com/docs/production/deployment) for full details.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).

---

## Términos de Servicio

**Última Modificación:** 4 de Septiembre de 2025

Estos Términos de Servicio ("Acuerdo") constituyen un contrato vinculante entre usted ("Usuario," "usted," o "su") y BGL Básculas Industriales ("BGL," "nosotros," "nos," o "nuestro"). Este Acuerdo rige su acceso y uso de la plataforma BGL CMS y servicios relacionados (colectivamente, los "Servicios").

### 1. Aceptación del Acuerdo

**AL ACCEDER O USAR LOS SERVICIOS, USTED ACEPTA ESTAR SUJETO A ESTOS TÉRMINOS.** Si no está de acuerdo con estos términos, no acceda ni use los Servicios.

Este acuerdo se aplica a todos los usuarios de la plataforma BGL CMS, incluyendo:
- Visitantes que consultan contenido público
- Administradores y editores del sistema de gestión de contenidos
- Personal técnico y de soporte

### 2. Definiciones Detalladas

#### 2.1 Términos Generales
- **Servicios:** La plataforma BGL CMS, incluyendo el sitio web público, el panel de administración, APIs, y todas las funcionalidades relacionadas
- **Contenido:** Toda información, datos, texto, imágenes, videos, documentos técnicos, especificaciones de productos, y otros materiales disponibles a través de los Servicios
- **Cuenta:** Su registro en BGL CMS que permite acceso a funcionalidades específicas según su rol de usuario

#### 2.2 Roles de Usuario
- **Editor:** Usuario autorizado para crear y modificar contenido
- **Administrador:** Usuario con acceso completo al sistema de gestión

### 3. Acceso y Uso de los Servicios

#### 3.1 Para Visitantes y Usuarios de Contenido

**Navegación del Sitio Web**
- Puede navegar libremente por las secciones públicas del sitio
- El contenido está disponible para consulta e información sobre productos industriales
- Puede descargar catálogos y documentación técnica marcada como pública
- Debe respetar los derechos de autor y propiedad intelectual del contenido

**Uso Permitido del Contenido**
- **Consulta Personal:** Puede revisar especificaciones técnicas para evaluación de productos
- **Uso Comercial Limitado:** Puede usar información técnica para cotizaciones y evaluaciones comerciales
- **Compartir Información:** Puede compartir enlaces a páginas específicas, pero no redistribuir contenido completo

**Restricciones para Visitantes**
- No puede copiar, reproducir o distribuir contenido protegido por derechos de autor
- No puede usar información técnica para desarrollar productos competidores
- No puede acceder a áreas restringidas sin autorización
- No puede intentar vulnerar la seguridad del sistema

#### 3.2 Para Administradores y Editores del CMS

**Responsabilidades de Gestión de Contenido**
- **Precisión:** Debe asegurar que toda información técnica sea precisa y actualizada
- **Calidad:** Debe mantener estándares de calidad en redacción, imágenes y documentación
- **Consistencia:** Debe seguir las guías de estilo y formato establecidas
- **Revisión:** Debe revisar y aprobar contenido antes de su publicación

**Funcionalidades del Panel de Administración**
- **Gestión de Productos:** Crear, editar y organizar fichas técnicas de básculas industriales
- **Biblioteca de Medios:** Subir y organizar imágenes, videos y documentos técnicos
- **Gestión de Usuarios:** Administrar cuentas y permisos de acceso
- **Configuración del Sistema:** Ajustar parámetros de funcionamiento de la plataforma
- **Análisis y Reportes:** Acceder a estadísticas de uso y rendimiento

**Políticas de Seguridad para Administradores**
- Debe usar contraseñas seguras y cambiarlas regularmente
- Debe cerrar sesión al terminar de trabajar, especialmente en equipos compartidos
- No debe compartir credenciales de acceso con terceros
- Debe reportar inmediatamente cualquier actividad sospechosa
- Debe realizar copias de seguridad antes de cambios importantes

### 4. Políticas de Contenido y Propiedad Intelectual

#### 4.1 Contenido Técnico y Comercial
- **Especificaciones de Productos:** Toda información técnica debe ser verificada y actualizada
- **Imágenes y Videos:** Deben ser de alta calidad y representar fielmente los productos
- **Documentación:** Manuales, catálogos y guías deben estar actualizados y ser precisos
- **Precios y Disponibilidad:** Información comercial debe mantenerse actualizada

#### 4.2 Derechos de Propiedad
- **Contenido Original:** BGL retiene todos los derechos sobre contenido creado internamente
- **Contenido de Terceros:** Debe tener licencias apropiadas para uso comercial
- **Marcas Registradas:** Logos y marcas de BGL están protegidos por derechos de autor
- **Patentes:** Información sobre tecnologías patentadas debe manejarse con cuidado

#### 4.3 Licencias de Uso
- **Para Usuarios:** Licencia limitada para consulta y uso comercial legítimo
- **Para Distribuidores:** Licencia extendida para materiales de marketing autorizados
- **Para Competidores:** Prohibido el uso de información técnica para desarrollo de productos similares

### 5. Registro de Cuenta y Seguridad

#### 5.1 Proceso de Registro
- Debe proporcionar información precisa y completa al crear una cuenta
- Debe verificar su dirección de correo electrónico
- Puede requerir aprobación manual para cuentas con acceso administrativo
- Debe aceptar políticas adicionales según el nivel de acceso solicitado

#### 5.2 Seguridad de Cuentas
- **Contraseñas:** Deben tener al menos 8 caracteres con combinación de letras, números y símbolos
- **Autenticación de Dos Factores:** Requerida para cuentas administrativas
- **Sesiones:** Se cerrarán automáticamente después de períodos de inactividad
- **Monitoreo:** Actividad sospechosa será monitoreada y puede resultar en suspensión temporal

#### 5.3 Responsabilidades del Usuario
- Mantener la confidencialidad de credenciales de acceso
- Notificar inmediatamente cualquier uso no autorizado de su cuenta
- Actualizar información de contacto cuando sea necesario
- Cumplir con políticas de seguridad establecidas por BGL

### 6. Términos de Pago

#### 6.1 Planes de Servicio
- **Acceso Básico:** Gratuito para consulta de contenido público

### 7. Privacidad y Protección de Datos

#### 7.1 Recopilación de Información
- **Datos de Navegación:** Páginas visitadas, tiempo de permanencia, dispositivo usado
- **Información de Contacto:** Nombre, email, teléfono, empresa (para usuarios registrados)
- **Datos Técnicos:** Dirección IP, navegador, sistema operativo
- **Preferencias:** Configuraciones personalizadas y historial de búsquedas

#### 7.2 Uso de la Información
- Mejorar la experiencia del usuario y personalizar contenido
- Proporcionar soporte técnico y atención al cliente
- Enviar comunicaciones relevantes sobre productos y servicios
- Generar estadísticas agregadas para análisis de rendimiento

#### 7.3 Protección y Seguridad
- Implementamos medidas de seguridad técnicas y organizacionales
- Los datos se almacenan en servidores seguros con cifrado
- El acceso a información personal está restringido al personal autorizado
- Cumplimos con regulaciones aplicables de protección de datos

### 8. Disponibilidad del Servicio y Soporte Técnico

#### 8.1 Disponibilidad
- Nos esforzamos por mantener el servicio disponible 24/7
- Puede haber interrupciones programadas para mantenimiento
- Se notificarán interrupciones planificadas con anticipación
- Tiempo de actividad objetivo del 99.5% mensual

#### 8.2 Soporte Técnico
- **Usuarios Básicos:** Soporte por email durante horario comercial
- **Usuarios Premium:** Soporte prioritario con tiempo de respuesta garantizado
- **Administradores:** Soporte técnico especializado y capacitación
- **Emergencias:** Línea de soporte para problemas críticos del sistema

#### 8.3 Mantenimiento y Actualizaciones
- Actualizaciones regulares de seguridad y funcionalidad
- Nuevas características se implementan según roadmap del producto
- Los usuarios serán notificados de cambios importantes
- Documentación y capacitación para nuevas funcionalidades

### 9. Terminación y Suspensión

#### 9.1 Suspensión por BGL
- Podemos suspender cuentas por violación de términos
- Se proporcionará notificación y oportunidad de corrección cuando sea posible
- Suspensión inmediata en casos de actividad maliciosa o ilegal
- Los datos se conservan durante el período de suspensión

#### 9.3 Efectos de la Terminación
- Cesa el derecho a usar los Servicios
- Se eliminan credenciales de acceso
- Los datos pueden conservarse según políticas de retención
- Las obligaciones de confidencialidad continúan vigentes

### 10. Limitaciones de Responsabilidad y Garantías

#### 10.1 Descargo de Responsabilidad
- Los Servicios se proporcionan "tal como están"
- No garantizamos disponibilidad ininterrumpida
- La información técnica se proporciona con fines informativos
- Los usuarios deben verificar especificaciones antes de decisiones de compra

#### 10.2 Limitación de Responsabilidad
- BGL no será responsable por daños indirectos o consecuenciales
- La responsabilidad total está limitada al monto pagado por los Servicios
- No somos responsables por decisiones basadas en información del sitio
- Los usuarios asumen riesgo por el uso de información técnica

#### 10.3 Indemnización
- Los usuarios acuerdan indemnizar a BGL por uso indebido de los Servicios
- Esto incluye violaciones de derechos de autor o uso no autorizado
- BGL se reserva el derecho de defensa en reclamaciones relacionadas

### 11. Ley Aplicable y Resolución de Disputas

#### 11.1 Jurisdicción
- Estos términos se rigen por las leyes de México
- Se aplicarán leyes locales de protección al consumidor cuando corresponda

#### 11.2 Resolución de Conflictos
- Preferimos resolver disputas de manera amigable
- Mediación disponible antes de procedimientos legales
- Arbitraje vinculante para disputas comerciales según acuerdo
- Los usuarios conservan derechos bajo leyes de protección al consumidor

### 12. Modificaciones y Actualizaciones

#### 12.1 Cambios a los Términos
- Podemos modificar estos términos con aviso previo
- Los cambios importantes se notificarán por email y en el sitio
- El uso continuado constituye aceptación de términos modificados
- Los usuarios pueden cancelar si no aceptan cambios

#### 12.2 Actualizaciones del Servicio
- Mejoras continuas en funcionalidad y seguridad
- Nuevas características pueden requerir términos adicionales
- Los usuarios serán informados de cambios significativos
- Capacitación disponible para nuevas funcionalidades

### 13. Información de Contacto

#### 13.1 Soporte General
- **Email:** soporte@bglbasculas.com
- **Teléfono:** 3325062280
- **Horario:** Lunes a Viernes, 8:00 AM - 6:00 PM

#### 13.2 Asuntos Legales o de Facturación
- **Email Legal:** facturacion@bglbasculas.com
- **Dirección:** Av. Federalistas #815 int. 23A
- **Representante Legal:** BGL BASCULAS INDUSTRIALES

---

**Nota Importante:** Este documento constituye el acuerdo completo entre las partes. Si tiene preguntas sobre estos términos, por favor contáctenos antes de usar los Servicios. Su uso de los Servicios indica su aceptación de estos términos en su totalidad.
