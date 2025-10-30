import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { sendEmail } from './hooks/sendEmail'
import { validateFormData } from './hooks/validateFormData'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  indexes: [
    // Index for querying submissions by form (most common query pattern)
    {
      fields: ['form'],
    },
    // Compound index for form submissions sorted by creation date (newest first)
    {
      fields: ['form', 'createdAt'],
    },
    // Index for sorting all submissions by creation date (admin interface)
    {
      fields: ['createdAt'],
    },
    // Index for filtering by email notification status
    {
      fields: ['skipEmailNotification'],
    },
    // Compound index for form submissions with email notification status
    {
      fields: ['form', 'skipEmailNotification'],
    },
    // Compound index for sorting by update date (useful for admin interface)
    {
      fields: ['updatedAt', 'form'],
    },
  ],
  labels: {
    singular: 'Envío de Formulario',
    plural: 'Envíos de Formularios',
  },
  defaultSort: 'createdAt',
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
      label: {
        en: 'Form',
        es: 'Formulario',
      },
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
      },
      defaultValue: false,
    },
    {
      name: 'submissionData',
      type: 'array',
      label: {
        en: 'Submissions Data',
        es: 'Datos del Formulario',
      },
      labels: {
        singular: {
          en: 'Submission Data',
          es: 'Dato del Formulario',
        },
        plural: {
          en: 'Submissions Data',
          es: 'Datos del Formulario',
        },
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
        },
      ],
    },
  ],
  timestamps: true,
}
