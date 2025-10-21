import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { anyone } from '@/access/anyone'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Envío de Formulario',
    plural: 'Envíos de Formularios',
  },
  admin: {
    useAsTitle: 'id',
    description:
      'Registro de todos los envíos de formularios recibidos. Los datos se guardan automáticamente cuando un usuario completa un formulario.',
    group: 'Contenido',
    defaultColumns: ['form', 'createdAt'],
  },
  access: {
    read: isAdminOrEditor,
    create: anyone, // Permitir que cualquiera pueda crear envíos (desde el frontend)
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      label: 'Formulario',
      relationTo: 'forms',
      required: true,
      admin: {
        description: 'El formulario del cual proviene este envío',
      },
    },
    {
      name: 'submissionData',
      type: 'json',
      label: 'Datos del envío',
      required: true,
      admin: {
        description: 'Datos enviados por el usuario en formato JSON',
        readOnly: true,
      },
    },
    {
      name: 'userIp',
      type: 'text',
      label: 'IP del usuario',
      admin: {
        description: 'Dirección IP desde donde se realizó el envío',
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'Navegador',
      admin: {
        description: 'Información del navegador del usuario',
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      defaultValue: 'new',
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'En proceso', value: 'in-progress' },
        { label: 'Completado', value: 'completed' },
        { label: 'Archivado', value: 'archived' },
      ],
      admin: {
        description: 'Estado actual del envío',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notas internas',
      admin: {
        description: 'Notas para uso interno del equipo',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ req, data, operation }) => {
        // Capturar IP y User Agent en la creación
        if (operation === 'create' && req) {
          data.userIp = req.headers.get('x-forwarded-for') || 'unknown'
          data.userAgent = req.headers.get('user-agent') || 'unknown'
        }
        return data
      },
    ],
  },
}
