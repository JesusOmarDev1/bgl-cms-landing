import type { Field } from 'payload'

export const personalFields: Field[] = [
  {
    name: 'name',
    type: 'text',
    label: {
      en: 'Names',
      es: 'Nombres',
    },
    required: true,
    admin: {
      description: 'Nombre(s) completo(s) del usuario',
    },
  },
  {
    name: 'firstName',
    type: 'text',
    label: {
      en: 'First name',
      es: 'Apellido paterno',
    },
    required: true,
    admin: {
      description: 'Apellido paterno del usuario',
    },
  },
  {
    name: 'lastName',
    type: 'text',
    label: {
      en: 'Last name',
      es: 'Apellido materno',
    },
    admin: {
      description: 'Apellido materno del usuario (opcional)',
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
    admin: {
      description: 'Imagen de perfil del usuario',
    },
  },
]
