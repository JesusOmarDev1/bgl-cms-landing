import type { Block } from 'payload'

import { contentLexicalEditor } from '@/fields/contentLexical'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',

  fields: [
    {
      name: 'variant',
      type: 'select',
      label: {
        en: 'Variant',
        es: 'Variante',
      },
      defaultValue: 'default',
      options: [
        {
          label: {
            en: 'Default (Simple)',
            es: 'Por Defecto (Simple)',
          },
          value: 'default',
        },
        {
          label: {
            en: 'CTA Section 3 (Image Left)',
            es: 'Sección CTA 3 (Imagen Izquierda)',
          },
          value: 'section-3',
        },
        {
          label: {
            en: 'CTA Section 5 (Image Right)',
            es: 'Sección CTA 5 (Imagen Derecha)',
          },
          value: 'section-5',
        },
        {
          label: {
            en: 'CTA Section 6 (Two Buttons)',
            es: 'Sección CTA 6 (Dos Botones)',
          },
          value: 'section-6',
        },
        {
          label: {
            en: 'CTA Section 7 (Centered)',
            es: 'Sección CTA 7 (Centrado)',
          },
          value: 'section-7',
        },
      ],
      required: true,
      admin: {
        description: {
          en: 'Select the style variant for the CTA section',
          es: 'Selecciona la variante de estilo para la sección CTA',
        },
      },
    },
    {
      name: 'label',
      type: 'text',
      label: {
        en: 'Label',
        es: 'Etiqueta',
      },
      admin: {
        description: {
          en: 'Small text above the headline (e.g., "CTA Section")',
          es: 'Texto pequeño sobre el título (ej., "Sección CTA")',
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
      required: true,
      admin: {
        description: {
          en: 'Main headline text (will be displayed large)',
          es: 'Texto del título principal (se mostrará grande)',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: {
        en: 'Content',
        es: 'Contenido',
      },
      editor: contentLexicalEditor,
      admin: {
        description: {
          en: 'Additional content below the headline',
          es: 'Contenido adicional debajo del título',
        },
        condition: (data, siblingData) =>
          siblingData?.variant === 'section-3' ||
          siblingData?.variant === 'section-5' ||
          siblingData?.variant === 'section-6',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Image',
        es: 'Imagen',
      },
      required: false,
      admin: {
        description: {
          en: 'Image displayed alongside the CTA content',
          es: 'Imagen mostrada junto al contenido del CTA',
        },
        condition: (data, siblingData) =>
          siblingData?.variant === 'section-3' || siblingData?.variant === 'section-5',
      },
    },
  ],
  labels: {
    plural: {
      en: 'Call to Actions',
      es: 'Llamadas a la Acción',
    },
    singular: {
      en: 'Call to Action',
      es: 'Llamada a la Acción',
    },
  },
}
