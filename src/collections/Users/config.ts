import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin'
import { isAdminOrSelf } from '@/access/isAdminOrSelf'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
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
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
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
      name: 'roles',
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
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
          label: 'Usuario',
          value: 'user',
        },
      ],
    },
  ],

  timestamps: true,
}
