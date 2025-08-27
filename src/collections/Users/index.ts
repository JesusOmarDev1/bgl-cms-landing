import { User } from '@/payload-types'
import type { CollectionConfig, FieldAccess } from 'payload'

const adminOnly: FieldAccess = ({ req: { user } }) => {
  return user?.customRole === 'admin'
}

const authenticated: FieldAccess<User> = ({ req: { user } }) => {
  return Boolean(user)
}

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: () => true,
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
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Name',
        es: 'Nombre',
      },
    },
  ],

  timestamps: true,
}

{
  /*

  {
      name: 'role',
      type: 'select',
      options: ['customer', 'editor', 'admin'],
      access: {
        create: adminOnly,
        read: authenticated,
        update: adminOnly,
      },
    },*/
}
