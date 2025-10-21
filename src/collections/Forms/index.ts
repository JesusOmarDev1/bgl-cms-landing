import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { contentLexicalEditor } from '@/fields/contentLexical'

export const Forms: CollectionConfig = {
  slug: 'forms',
  labels: {
    singular: 'Formulario',
    plural: 'Formularios',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Crea y gestiona formularios personalizados para tu sitio web.',
    group: 'Contenido',
    defaultColumns: ['title', 'type', 'updatedAt'],
  },
  access: {
    read: isAdminOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título del formulario',
      required: true,
      admin: {
        description: 'Nombre descriptivo del formulario',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Tipo de formulario',
      required: true,
      defaultValue: 'contacto',
      options: [
        { label: 'Contacto', value: 'contacto' },
        { label: 'Cotización', value: 'cotizacion' },
        { label: 'Soporte', value: 'soporte' },
        { label: 'Suscripción', value: 'suscripcion' },
        { label: 'Otro', value: 'otro' },
      ],
      admin: {
        description: 'Categoría del formulario',
      },
    },
    {
      name: 'fields',
      type: 'array',
      label: 'Campos del formulario',
      labels: {
        singular: 'Campo',
        plural: 'Campos',
      },
      minRows: 1,
      admin: {
        description: 'Define los campos que aparecerán en el formulario',
        initCollapsed: false,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre del campo',
              required: true,
              admin: {
                width: '50%',
                description: 'Identificador único (sin espacios ni caracteres especiales)',
              },
            },
            {
              name: 'etiqueta',
              type: 'text',
              label: 'Etiqueta visible',
              required: true,
              admin: {
                width: '50%',
                description: 'Texto que verá el usuario',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'fieldType',
              type: 'select',
              label: 'Tipo de campo',
              required: true,
              defaultValue: 'text',
              options: [
                { label: 'Texto corto', value: 'text' },
                { label: 'Texto largo', value: 'textarea' },
                { label: 'Email', value: 'email' },
                { label: 'Teléfono', value: 'tel' },
                { label: 'Número', value: 'number' },
                { label: 'Fecha', value: 'date' },
                { label: 'Selección única', value: 'select' },
                { label: 'Casilla de verificación', value: 'checkbox' },
                { label: 'Archivo', value: 'file' },
              ],
              admin: {
                width: '33%',
              },
            },
            {
              name: 'width',
              type: 'number',
              label: 'Ancho (%)',
              defaultValue: 100,
              min: 25,
              max: 100,
              admin: {
                width: '33%',
                description: '25, 50, 75 o 100%',
              },
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Campo obligatorio',
              defaultValue: false,
              admin: {
                width: '34%',
              },
            },
          ],
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Texto de ejemplo (placeholder)',
          admin: {
            description: 'Texto que aparece cuando el campo está vacío',
            condition: (data, siblingData) => {
              return ['text', 'textarea', 'email', 'tel', 'number'].includes(siblingData?.fieldType)
            },
          },
        },
        {
          name: 'options',
          type: 'array',
          label: 'Opciones',
          labels: {
            singular: 'Opción',
            plural: 'Opciones',
          },
          admin: {
            description: 'Define las opciones disponibles',
            condition: (data, siblingData) => {
              return siblingData?.fieldType === 'select'
            },
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Etiqueta',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Valor',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'defaultValue',
          type: 'text',
          label: 'Valor predeterminado',
          admin: {
            description: 'Valor inicial del campo',
          },
        },
      ],
    },
    {
      name: 'submitConfig',
      type: 'group',
      label: 'Configuración de envío',
      admin: {
        description: 'Configura qué sucede cuando se envía el formulario',
      },
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Texto del botón de envío',
          defaultValue: 'Enviar',
          required: true,
        },
        {
          name: 'confirmationType',
          type: 'radio',
          label: 'Tipo de confirmación',
          defaultValue: 'message',
          options: [
            { label: 'Mostrar mensaje', value: 'message' },
            { label: 'Redirigir a página', value: 'redirect' },
          ],
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'confirmationMessage',
          type: 'richText',
          label: 'Mensaje de confirmación',
          editor: contentLexicalEditor,
          admin: {
            description: 'Mensaje que se muestra después de enviar el formulario',
            condition: (data, siblingData) => {
              return siblingData?.confirmationType === 'message'
            },
          },
        },
        {
          name: 'redirectPage',
          type: 'relationship',
          label: 'Página de redirección',
          relationTo: 'pages',
          admin: {
            description: 'Página a la que se redirige después de enviar',
            condition: (data, siblingData) => {
              return siblingData?.confirmationType === 'redirect'
            },
          },
        },
      ],
    },
    {
      name: 'emailNotifications',
      type: 'array',
      label: 'Notificaciones por email',
      labels: {
        singular: 'Notificación',
        plural: 'Notificaciones',
      },
      admin: {
        description:
          'Configura los emails que se enviarán cuando alguien complete el formulario. Usa {{nombreCampo}} para insertar valores del formulario.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'emailTo',
              type: 'text',
              label: 'Enviar a',
              required: true,
              admin: {
                width: '50%',
                description: 'Direcciones separadas por comas',
              },
            },
            {
              name: 'emailFrom',
              type: 'text',
              label: 'Remitente',
              admin: {
                width: '50%',
                description: 'Email del remitente',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'cc',
              type: 'text',
              label: 'CC (Copia)',
              admin: {
                width: '33%',
                description: 'Copia visible',
              },
            },
            {
              name: 'bcc',
              type: 'text',
              label: 'CCO (Copia oculta)',
              admin: {
                width: '33%',
                description: 'Copia oculta',
              },
            },
            {
              name: 'replyTo',
              type: 'text',
              label: 'Responder a',
              admin: {
                width: '34%',
                description: 'Email para respuestas',
              },
            },
          ],
        },
        {
          name: 'subject',
          type: 'text',
          label: 'Asunto',
          required: true,
          admin: {
            description: 'Usa {{nombreCampo}} para valores dinámicos',
          },
        },
        {
          name: 'message',
          type: 'textarea',
          label: 'Mensaje',
          required: true,
          admin: {
            description:
              'Usa {{nombreCampo}} para valores dinámicos, {{*}} para todos los datos, o {{*:tabla}} para formato tabla HTML',
          },
        },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Formulario activo',
      defaultValue: true,
      admin: {
        description: 'Desactiva el formulario para dejar de recibir envíos',
      },
    },
  ],
  timestamps: true,
}
