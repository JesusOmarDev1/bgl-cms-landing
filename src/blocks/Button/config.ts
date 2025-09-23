import type { Block } from 'payload'

export const Button: Block = {
  slug: 'button',
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
  fields: [
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
      name: 'align',
      type: 'select',
      label: {
        en: 'Alignment',
        es: 'Alineacion',
      },
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
            en: 'center',
            es: 'centro',
          },
          value: 'center',
        },
        {
          label: {
            en: 'right',
            es: 'derecha',
          },
          value: 'right',
        },
        {
          label: {
            en: 'full',
            es: 'full',
          },
          value: 'full',
        },
      ],
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
      required: true,
    },
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
  ],
  interfaceName: 'ButtonBlock',
}
