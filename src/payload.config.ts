import { sqliteAdapter } from '@payloadcms/db-sqlite'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/url/utils'
import { es } from '@payloadcms/translations/languages/es'
import { adminMetadata } from './utilities/meta/adminMetadata'
import { Products } from './collections/Products'
import { Brands } from './collections/Brands'
import { Models } from './collections/Models'
import { Suppliers } from './collections/Suppliers'
import { Clients } from './collections/Clients'
import { contentLexicalEditor } from './fields/contentLexical'
import { Chatbot } from './globals/Chatbot/config'
import { Coupons } from './globals/Coupons/config'
import { Announcements } from './globals/Announcements/config'
import { Services } from './collections/Services'
import { Manuals } from './collections/Manuals'
import { Forms } from './collections/Forms'
import { FormSubmissions } from './collections/FormsSubmission'
import { formSubmission } from './endpoints/formSubmission'
import { getEmailAdapter } from './utilities/config/email'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: getServerSideURL(),
  auth: {
    jwtOrder: ['JWT', 'Bearer', 'cookie'],
  },
  email: getEmailAdapter(),
  i18n: {
    supportedLanguages: { es },
    translations: {
      es: {
        ...es,
      },
    },
  },
  admin: {
    dateFormat: 'dd/MM/yyyy',
    suppressHydrationWarning: true,
    avatar: {
      Component: '@/components/Avatar',
    },
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Logo: '/graphics/Logo/index.tsx#Logo',
        Icon: '/graphics/Icon/index.tsx#Icon',
      },
      Nav: '@/components/Nav/index.tsx#Nav',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Celular',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Escritorio',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    meta: adminMetadata,
  },
  editor: contentLexicalEditor,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Products,
    Brands,
    Models,
    Suppliers,
    Clients,
    Services,
    Manuals,
    Forms,
    FormSubmissions,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  csrf: [getServerSideURL()].filter(Boolean),
  endpoints: [
    {
      path: '/form-submission',
      method: 'post',
      handler: formSubmission,
    },
  ],
  globals: [Header, Footer, Chatbot, Coupons, Announcements],
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
  telemetry: false,
})
