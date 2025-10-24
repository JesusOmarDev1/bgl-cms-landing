import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { sendEmail } from './hooks/sendEmail'
import { validateFormData } from './hooks/validateFormData'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Envío de Formulario',
    plural: 'Envíos de Formularios',
  },
  access: {
    // Permitir que cualquiera pueda crear envíos (desde el frontend) y admins/editores desde el panel
    create: ({ req }) => {
      // Si es una request desde el admin panel, permitir a admins y editores
      if (req.user) {
        return isAdminOrEditor({ req })
      }
      // Si no hay usuario (frontend), permitir a cualquiera
      return true
    },
    // Permitir actualizaciones solo a admins
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
      name: 'skipEmailNotification',
      type: 'checkbox',
      label: 'No enviar notificaciones por email',
      admin: {
        description: 'Marcar para evitar el envío de emails de notificación (útil para testing)',
        condition: (data, siblingData, { user }) => !!user, // Solo mostrar en admin
      },
      defaultValue: false,
    },
    {
      name: 'submissionData',
      type: 'array',
      labels: {
        singular: 'Dato del Formulario',
        plural: 'Datos del Formulario',
      },
      admin: {
        readOnly: false,
        components: {
          RowLabel:
            '@/collections/FormsSubmission/components/SubmissionDataRowLabel#SubmissionDataRowLabel',
        },
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
