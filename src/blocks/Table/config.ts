import type { Block } from 'payload'

export const Table: Block = {
  slug: 'table',
  interfaceName: 'TableBlock',
  labels: {
    singular: {
      en: 'Table',
      es: 'Tabla',
    },
    plural: {
      en: 'Tables',
      es: 'Tablas',
    },
  },
  fields: [
    {
      name: 'caption',
      type: 'text',
      label: {
        en: 'Table Caption',
        es: 'Título de la Tabla',
      },
      admin: {
        description: {
          en: 'Optional caption/title for the table',
          es: 'Título opcional para la tabla',
        },
      },
    },
    {
      name: 'headers',
      type: 'array',
      label: {
        en: 'Table Headers',
        es: 'Encabezados de la Tabla',
      },
      labels: {
        singular: {
          en: 'Header',
          es: 'Encabezado',
        },
        plural: {
          en: 'Headers',
          es: 'Encabezados',
        },
      },
      admin: {
        description: {
          en: 'Define the column headers for your table',
          es: 'Define los encabezados de columna para tu tabla',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Table/RowLabel#HeaderRowLabel',
        },
      },
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: {
            en: 'Header Text',
            es: 'Texto del Encabezado',
          },
          required: true,
        },
        {
          name: 'align',
          type: 'select',
          label: {
            en: 'Text Alignment',
            es: 'Alineación del Texto',
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
          ],
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: {
        en: 'Table Rows',
        es: 'Filas de la Tabla',
      },
      labels: {
        singular: {
          en: 'Row',
          es: 'Fila',
        },
        plural: {
          en: 'Rows',
          es: 'Filas',
        },
      },
      admin: {
        description: {
          en: 'Add data rows to your table',
          es: 'Añade filas de datos a tu tabla',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Table/RowLabel#DataRowLabel',
        },
      },
      minRows: 1,
      maxRows: 50,
      fields: [
        {
          name: 'cells',
          type: 'array',
          label: {
            en: 'Row Cells',
            es: 'Celdas de la Fila',
          },
          labels: {
            singular: {
              en: 'Cell',
              es: 'Celda',
            },
            plural: {
              en: 'Cells',
              es: 'Celdas',
            },
          },
          admin: {
            description: {
              en: 'Enter the data for each cell in this row',
              es: 'Ingresa los datos para cada celda en esta fila',
            },
            initCollapsed: true,
            components: {
              RowLabel: '@/blocks/Table/RowLabel#CellRowLabel',
            },
          },
          minRows: 1,
          maxRows: 10,
          fields: [
            {
              name: 'content',
              type: 'text',
              label: {
                en: 'Cell Content',
                es: 'Contenido de la Celda',
              },
              required: true,
            },
            {
              name: 'align',
              type: 'select',
              label: {
                en: 'Text Alignment',
                es: 'Alineación del Texto',
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
              ],
            },
            {
              name: 'isHeader',
              type: 'checkbox',
              label: {
                en: 'Is Header Cell',
                es: 'Es Celda de Encabezado',
              },
              defaultValue: false,
              admin: {
                description: {
                  en: 'Mark this cell as a row header (will be bold)',
                  es: 'Marcar esta celda como encabezado de fila (será negrita)',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'variant',
      type: 'select',
      label: {
        en: 'Table Style',
        es: 'Estilo de Tabla',
      },
      defaultValue: 'default',
      options: [
        {
          label: {
            en: 'Default',
            es: 'Por Defecto',
          },
          value: 'default',
        },
        {
          label: {
            en: 'Striped Rows',
            es: 'Filas Rayadas',
          },
          value: 'striped',
        },
        {
          label: {
            en: 'Compact',
            es: 'Compacta',
          },
          value: 'compact',
        },
        {
          label: {
            en: 'Specifications Table',
            es: 'Tabla de Especificaciones',
          },
          value: 'specs',
        },
      ],
      admin: {
        description: {
          en: 'Choose the visual style for your table',
          es: 'Elige el estilo visual para tu tabla',
        },
      },
    },
    {
      name: 'responsive',
      type: 'checkbox',
      label: {
        en: 'Responsive (Horizontal Scroll)',
        es: 'Responsiva (Scroll Horizontal)',
      },
      defaultValue: true,
      admin: {
        description: {
          en: 'Enable horizontal scrolling on small screens',
          es: 'Habilitar scroll horizontal en pantallas pequeñas',
        },
      },
    },
  ],
}
