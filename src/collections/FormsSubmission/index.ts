import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { sendEmail } from './hooks/sendEmail'
import { validateFormData } from './hooks/validateFormData'
import { anyone } from '@/access/anyone'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Envío de Formulario',
    plural: 'Envíos de Formularios',
  },
  access: {
    // Permitir que cualquiera pueda crear envíos (desde el frontend)
    create: anyone,
    // No permitir actualizaciones (solo lectura después de crear)
    update: isAdmin,
    // Solo usuarios autenticados pueden leer
    read: isAdminOrEditor,
    // Solo admins pueden eliminar
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'id',
    description:
      'Registro de todos los envíos de formularios recibidos. Los datos se guardan automáticamente cuando un usuario completa un formulario.',
    group: 'Contenido',
    defaultColumns: ['form', 'createdAt'],
    enableRichTextRelationship: false,
  },
  hooks: {
    beforeValidate: [validateFormData],
    beforeChange: [sendEmail],
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'submissionData',
      type: 'array',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'field',
          type: 'text',
          required: true,
          label: 'Campo',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Valor',
          validate: (value: unknown) => {
            if (typeof value !== 'undefined') {
              return true
            }

            return 'El campo es obligatorio.'
          },
        },
      ],
    },
  ],
  timestamps: true,
}
