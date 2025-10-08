import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin'
import { isAdminOrSelf } from '@/access/isAdminOrSelf'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  trash: true,
  indexes: [
    {
      fields: ['name', 'email'],
    },
  ],
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  defaultPopulate: {
    name: true,
    email: true,
    avatar: true,
  },
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
  admin: {
    defaultColumns: ['avatar', 'name', 'email', 'roles'],
    useAsTitle: 'name',
    description: 'Administra los usuarios del sitio: crea, edita y elimina usuarios',
    group: 'Control Interno',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 24 * 60 * 60 * 1000, // 24 hours
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Names',
        es: 'Nombres',
      },
      required: true,
    },
    {
      name: 'firstName',
      type: 'text',
      label: {
        en: 'First name',
        es: 'Apellido paterno',
      },
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      label: {
        en: 'Last name',
        es: 'Apellido materno',
      },
    },
    {
      name: 'avatar',
      label: {
        en: 'Profile picture',
        es: 'Foto de perfil',
      },
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'roles',
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
  ],
  timestamps: true,
}
