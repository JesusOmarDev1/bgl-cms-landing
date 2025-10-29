import type { Field } from 'payload'
import { isAdminFieldLevel } from '@/access/isAdmin'

export const securityFields: Field[] = [
  {
    name: 'roles',
    saveToJWT: true,
    type: 'select',
    hasMany: true,
    defaultValue: ['user'],
    label: {
      en: 'User Roles',
      es: 'Roles de Usuario',
    },
    admin: {
      description: 'Roles y permisos del usuario en el sistema',
    },
    options: [
      {
        label: 'Administrador',
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
]
