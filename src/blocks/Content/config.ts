import type { Block, Field } from 'payload'

const columnFields: Field[] = [
  {
    name: 'richText',
    type: 'richText',
    label: {
      en: 'Content',
      es: 'Contenido',
    },
  },
]

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: {
      en: 'Multi-Column Layout',
      es: 'Layout Multi-Columna',
    },
    plural: {
      en: 'Multi-Column Layouts',
      es: 'Layouts Multi-Columna',
    },
  },
  interfaceName: 'ContentBlock',

  fields: [
    {
      name: 'layoutType',
      type: 'select',
      label: {
        en: 'Layout Type',
        es: 'Tipo de Layout',
      },
      admin: {
        description: {
          en: 'Choose how to divide the content space',
          es: 'Elige cómo dividir el espacio del contenido',
        },
        width: '50%',
      },
      defaultValue: 'single',
      options: [
        {
          label: {
            en: 'Single Column',
            es: 'Una Columna',
          },
          value: 'single',
        },
        {
          label: {
            en: 'Two Equal (50% | 50%)',
            es: 'Dos Iguales (50% | 50%)',
          },
          value: 'two-equal',
        },
        {
          label: {
            en: 'Main + Sidebar (75% | 25%)',
            es: 'Principal + Sidebar (75% | 25%)',
          },
          value: 'main-sidebar',
        },
        {
          label: {
            en: 'Sidebar + Main (25% | 75%)',
            es: 'Sidebar + Principal (25% | 75%)',
          },
          value: 'sidebar-main',
        },
        {
          label: {
            en: 'Content + Aside (60% | 40%)',
            es: 'Contenido + Aside (60% | 40%)',
          },
          value: 'content-aside',
        },
        {
          label: {
            en: 'Aside + Content (40% | 60%)',
            es: 'Aside + Contenido (40% | 60%)',
          },
          value: 'aside-content',
        },
      ],
    },
    {
      name: 'columns',
      label: {
        en: 'Content Columns',
        es: 'Columnas de Contenido',
      },
      type: 'array',
      labels: {
        singular: {
          en: 'Column',
          es: 'Columna',
        },
        plural: {
          en: 'Columns',
          es: 'Columnas',
        },
      },
      admin: {
        description: {
          en: 'Add content to each column based on the layout type selected above',
          es: 'Añade contenido a cada columna según el tipo de layout seleccionado arriba',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Content/RowLabel#ColumnRowLabel',
        },
      },
      minRows: 1,
      maxRows: 2,
      fields: columnFields,
    },
  ],
}
