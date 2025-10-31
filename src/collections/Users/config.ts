import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import { isAdminOrSelf } from '@/access/isAdminOrSelf'
import { personalFields } from './fields/personalFields'
import { securityFields } from './fields/securityFields'
import { validateUser } from './hooks/validateUser'
import { isProd } from '@/utilities/payload/isProd'

export const Users: CollectionConfig = {
  slug: 'users',
  trash: true,

  // 🚀 Performance: Indexes estratégicos optimizados
  indexes: [
    // Índice único para email (requerido por auth)
    {
      fields: ['email'],
      unique: true,
    },

    // Índices para búsquedas comunes
    {
      fields: ['name', 'email'], // Para búsquedas de usuarios
    },
    {
      fields: ['createdAt'], // Para ordenamiento por fecha de creación
    },
  ],

  defaultSort: 'createdAt',

  // 🔐 Access Control
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },

  // 🚀 Performance: DefaultPopulate optimizado
  defaultPopulate: {
    name: true,
    email: true,
    avatar: true,
    roles: true,
  },

  // 🎯 Labels multiidioma
  labels: {
    singular: {
      en: 'User',
      es: 'Usuario',
    },
    plural: {
      en: 'Users',
      es: 'Usuarios',
    },
  },

  // 🎨 Admin UI
  admin: {
    defaultColumns: ['avatar', 'name', 'email', 'roles', 'status', 'lastLogin'],
    pagination: {
      defaultLimit: 25,
      limits: [10, 25, 50, 100],
    },
    useAsTitle: 'name',
    description: 'Administra los usuarios del sitio: crea, edita y elimina usuarios',
    group: 'Control Interno',
  },

  // 🔐 Authentication configuration
  auth: {
    maxLoginAttempts: 5,
    lockTime: 24 * 60 * 60 * 1000, // 24 hours
    useAPIKey: false,
    depth: 2,
    cookies: {
      secure: isProd,
      sameSite: 'Lax',
    },
  },

  // 📊 Fields organizados en tabs
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Personal Information',
            es: 'Información Personal',
          },
          fields: personalFields,
        },
        {
          label: {
            en: 'Security & Permissions',
            es: 'Seguridad y Permisos',
          },
          fields: securityFields,
        },
      ],
    },
  ],

  // 🔄 Hooks
  hooks: {
    beforeValidate: [validateUser],
  },

  // ⏰ Timestamps
  timestamps: true,

  // 🔄 Versioning deshabilitado para usuarios (no necesario)
  versions: false,
}
