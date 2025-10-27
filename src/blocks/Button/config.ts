import type { Block } from 'payload'

export const Button: Block = {
  slug: 'button',
  interfaceName: 'ButtonBlock',
  labels: {
    singular: {
      en: 'Button Group',
      es: 'Grupo de Botones',
    },
    plural: {
      en: 'Button Groups',
      es: 'Grupos de Botones',
    },
  },
  fields: [
    {
      name: 'align',
      type: 'select',
      label: {
        en: 'Alignment',
        es: 'Alineación',
      },
      defaultValue: 'left',
      options: [
        {
          label: {
            en: 'Left',
            es: 'Izquierda',
          },
          value: 'left',
        },
        {
          label: {
            en: 'Center',
            es: 'Centro',
          },
          value: 'center',
        },
        {
          label: {
            en: 'Right',
            es: 'Derecha',
          },
          value: 'right',
        },
        {
          label: {
            en: 'Full',
            es: 'Completo',
          },
          value: 'full',
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: {
        en: 'Buttons',
        es: 'Botones',
      },
      minRows: 1,
      maxRows: 5,
      labels: {
        singular: {
          en: 'Button',
          es: 'Botón',
        },
        plural: {
          en: 'Buttons',
          es: 'Botones',
        },
      },
      admin: {
        components: {
          RowLabel: '@/blocks/Button/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: {
            en: 'Title',
            es: 'Título',
          },
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: {
            en: 'URL',
            es: 'URL',
          },
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          label: {
            en: 'Style',
            es: 'Estilo',
          },
          defaultValue: 'default',
          options: [
            {
              label: {
                en: 'Default',
                es: 'Por defecto',
              },
              value: 'default',
            },
            {
              label: {
                en: 'Outline',
                es: 'Con borde',
              },
              value: 'outline',
            },
            {
              label: {
                en: 'Secondary',
                es: 'Secundario',
              },
              value: 'secondary',
            },
            {
              label: {
                en: 'Link',
                es: 'Enlace',
              },
              value: 'link',
            },
            {
              label: {
                en: 'Destructive',
                es: 'Destructivo',
              },
              value: 'destructive',
            },
            {
              label: {
                en: 'Ghost',
                es: 'Invisible',
              },
              value: 'ghost',
            },
          ],
          required: true,
        },
        {
          name: 'effect',
          type: 'select',
          label: {
            en: 'Effect',
            es: 'Efecto',
          },
          options: [
            {
              label: {
                en: 'None',
                es: 'Ninguno',
              },
              value: 'none',
            },
            {
              label: {
                en: 'Gooey Right',
                es: 'Gooey Derecha',
              },
              value: 'gooeyRight',
            },
            {
              label: {
                en: 'Gooey Left',
                es: 'Gooey Izquierda',
              },
              value: 'gooeyLeft',
            },
            {
              label: {
                en: 'Ring Hover',
                es: 'Rueda Hover',
              },
              value: 'ringHover',
            },
            {
              label: {
                en: 'Shine',
                es: 'Brillo',
              },
              value: 'shine',
            },
            {
              label: {
                en: 'Shine Hover',
                es: 'Brillo al presionar',
              },
              value: 'shineHover',
            },
          ],
        },
      ],
    },
  ],
}
