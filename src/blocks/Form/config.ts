import type { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',

  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: {
        en: 'Form',
        es: 'Formulario',
      },
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: {
        en: 'Enable Intro Content',
        es: 'Habilitar Contenido de Introducción',
      },
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      label: {
        en: 'Intro Content',
        es: 'Contenido de Introducción',
      },
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: {
      en: 'Form Blocks',
      es: 'Bloques de Formulario',
    },
    singular: {
      en: 'Form Block',
      es: 'Bloque de Formulario',
    },
  },
}
