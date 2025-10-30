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
    access: {
      create: isAdminFieldLevel,
      update: isAdminFieldLevel,
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
        label: 'Tecnico',
        value: 'technician',
      },
      {
        label: 'Usuario',
        value: 'user',
      },
    ],
  },
]
