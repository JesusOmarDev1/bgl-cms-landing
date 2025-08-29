import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles'
import user from '@/access/user'
import admin from '@/access/admin'

export const Users: CollectionConfig = {
  access: {
    create: admin,
    update: admin,
    read: user,
    delete: admin,
  },
  slug: 'users',
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
    defaultColumns: ['name', 'email', 'role'],
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
      name: 'role',
      type: 'select',
      label: {
        en: 'Role',
        es: 'Rol',
      },
      saveToJWT: true,
      hasMany: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      hooks: {
        beforeChange: [protectRoles],
      },
    },
  ],

  timestamps: true,
}
