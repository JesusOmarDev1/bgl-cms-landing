import type { Block } from 'payload'

export const Heros: Block = {
  slug: 'heros',
  interfaceName: 'HerosBlock',
  labels: {
    singular: {
      en: 'Hero Section',
      es: 'Sección Hero',
    },
    plural: {
      en: 'Hero Sections',
      es: 'Secciones Hero',
    },
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: {
        en: 'Hero Type',
        es: 'Tipo de Hero',
      },
      defaultValue: 'high-impact',
      options: [
        {
          label: {
            en: 'High Impact - Full background image with overlay content',
            es: 'Alto Impacto - Imagen de fondo completa con contenido superpuesto',
          },
          value: 'high-impact',
        },
        {
          label: {
            en: 'Medium Impact - Split layout with content and media',
            es: 'Impacto Medio - Layout dividido con contenido y medios',
          },
          value: 'medium-impact',
        },
        {
          label: {
            en: 'Low Impact - Simple centered content',
            es: 'Bajo Impacto - Contenido centrado simple',
          },
          value: 'low-impact',
        },
        {
          label: {
            en: 'Custom - Fully customizable with rich text',
            es: 'Personalizado - Completamente personalizable con texto enriquecido',
          },
          value: 'custom',
        },
      ],
      required: true,
      admin: {
        description: {
          en: 'Choose the hero section style based on visual impact needed',
          es: 'Elige el estilo de sección hero basado en el impacto visual necesario',
        },
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: {
        en: 'Headline',
        es: 'Título Principal',
      },
      admin: {
        description: {
          en: 'Main headline text - will be displayed prominently',
          es: 'Texto del título principal - se mostrará de forma prominente',
        },
        condition: (data, siblingData) => siblingData?.variant !== 'custom',
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: {
        en: 'Subheadline',
        es: 'Subtítulo',
      },
      admin: {
        description: {
          en: 'Supporting text below the headline',
          es: 'Texto de apoyo debajo del título principal',
        },
        rows: 3,
        condition: (data, siblingData) => siblingData?.variant !== 'custom',
      },
    },
    {
      name: 'buttons',
      type: 'array',
      label: {
        en: 'Action Buttons',
        es: 'Botones de Acción',
      },
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
      maxRows: 2,
      admin: {
        condition: (data, siblingData) => siblingData?.variant !== 'custom',
        description: {
          en: 'Add up to 2 action buttons',
          es: 'Añade hasta 2 botones de acción',
        },
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: {
            en: 'Button Text',
            es: 'Texto del Botón',
          },
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: {
            en: 'Button URL',
            es: 'URL del Botón',
          },
        },
        {
          name: 'variant',
          type: 'select',
          label: {
            en: 'Button Style',
            es: 'Estilo del Botón',
          },
          defaultValue: 'default',
          options: [
            { label: { en: 'Primary', es: 'Primario' }, value: 'default' },
            { label: { en: 'Secondary', es: 'Secundario' }, value: 'outline' },
          ],
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Background Image',
        es: 'Imagen de Fondo',
      },
      admin: {
        condition: (data, siblingData) => siblingData?.variant === 'high-impact',
        description: {
          en: 'Full-screen background image for high impact hero',
          es: 'Imagen de fondo a pantalla completa para hero de alto impacto',
        },
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Media',
        es: 'Medio',
      },
      admin: {
        condition: (data, siblingData) => siblingData?.variant === 'medium-impact',
        description: {
          en: 'Image or video for the medium impact layout',
          es: 'Imagen o video para el layout de impacto medio',
        },
      },
    },
    {
      name: 'customContent',
      type: 'richText',
      label: {
        en: 'Custom Content',
        es: 'Contenido Personalizado',
      },
      admin: {
        condition: (data, siblingData) => siblingData?.variant === 'custom',
        description: {
          en: 'Fully customizable rich text content for maximum flexibility',
          es: 'Contenido de texto enriquecido completamente personalizable para máxima flexibilidad',
        },
      },
    },
  ],
}
