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
      name: 'fields',
      type: 'blocks',
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
      blocks: [
        {
          slug: 'text',
          interfaceName: 'TextFormField',
          labels: {
            singular: 'Texto',
            plural: 'Textos',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre del campo',
              required: true,
              admin: {
                description: 'Identificador único (sin espacios)',
              },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta',
              required: true,
            },
            {
              name: 'width',
              type: 'number',
              label: 'Ancho (%)',
              defaultValue: 100,
              min: 25,
              max: 100,
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Campo obligatorio',
              defaultValue: false,
            },
            {
              name: 'defaultValue',
              type: 'text',
              label: 'Valor predeterminado',
            },
          ],
        },
        {
          slug: 'textarea',
          interfaceName: 'TextareaFormField',
          labels: {
            singular: 'Texto largo',
            plural: 'Textos largos',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre del campo',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta',
              required: true,
            },
            {
              name: 'width',
              type: 'number',
              label: 'Ancho (%)',
              defaultValue: 100,
              min: 25,
              max: 100,
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Campo obligatorio',
              defaultValue: false,
            },
            {
              name: 'defaultValue',
              type: 'text',
              label: 'Valor predeterminado',
            },
          ],
        },
        {
          slug: 'email',
          interfaceName: 'EmailFormField',
          labels: {
            singular: 'Email',
            plural: 'Emails',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre del campo',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta',
              required: true,
            },
            {
              name: 'width',
              type: 'number',
              label: 'Ancho (%)',
              defaultValue: 100,
              min: 25,
              max: 100,
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Campo obligatorio',
              defaultValue: false,
            },
          ],
        },
        {
          slug: 'number',
          interfaceName: 'NumberFormField',
          labels: {
            singular: 'Número',
            plural: 'Números',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre del campo',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta',
              required: true,
            },
            {
              name: 'width',
              type: 'number',
              label: 'Ancho (%)',
              defaultValue: 100,
              min: 25,
              max: 100,
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Campo obligatorio',
              defaultValue: false,
            },
            {
              name: 'defaultValue',
              type: 'number',
              label: 'Valor predeterminado',
            },
          ],
        },
        {
          slug: 'select',
          interfaceName: 'SelectFormField',
          labels: {
            singular: 'Selección',
            plural: 'Selecciones',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre del campo',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta',
              required: true,
            },
            {
              name: 'width',
              type: 'number',
              label: 'Ancho (%)',
              defaultValue: 100,
              min: 25,
              max: 100,
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Campo obligatorio',
              defaultValue: false,
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
                components: {
                  RowLabel: '@/collections/Forms/components/OptionsRowLabel#OptionsRowLabel',
                },
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Etiqueta',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Valor',
                  required: true,
                },
              ],
            },
            {
              name: 'defaultValue',
              type: 'text',
              label: 'Valor predeterminado',
            },
          ],
        },
        {
          slug: 'checkbox',
          interfaceName: 'CheckboxFormField',
          labels: {
            singular: 'Casilla de verificación',
            plural: 'Casillas de verificación',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre del campo',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta',
              required: true,
            },
            {
              name: 'width',
              type: 'number',
              label: 'Ancho (%)',
              defaultValue: 100,
              min: 25,
              max: 100,
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Campo obligatorio',
              defaultValue: false,
            },
            {
              name: 'defaultValue',
              type: 'checkbox',
              label: 'Valor predeterminado',
              defaultValue: false,
            },
          ],
        },
        {
          slug: 'country',
          interfaceName: 'CountryFormField',
          labels: {
            singular: 'País',
            plural: 'Países',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre del campo',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta',
              required: true,
            },
            {
              name: 'width',
              type: 'number',
              label: 'Ancho (%)',
              defaultValue: 100,
              min: 25,
              max: 100,
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Campo obligatorio',
              defaultValue: false,
            },
          ],
        },
        {
          slug: 'state',
          interfaceName: 'StateFormField',
          labels: {
            singular: 'Estado',
            plural: 'Estados',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre del campo',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta',
              required: true,
            },
            {
              name: 'width',
              type: 'number',
              label: 'Ancho (%)',
              defaultValue: 100,
              min: 25,
              max: 100,
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Campo obligatorio',
              defaultValue: false,
            },
          ],
        },
        {
          slug: 'message',
          interfaceName: 'MessageFormField',
          labels: {
            singular: 'Mensaje',
            plural: 'Mensajes',
          },
          fields: [
            {
              name: 'message',
              type: 'richText',
              label: 'Mensaje',
              editor: contentLexicalEditor,
              required: true,
            },
          ],
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
        components: {
          RowLabel:
            '@/collections/Forms/components/EmailNotificationsRowLabel#EmailNotificationsRowLabel',
        },
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
