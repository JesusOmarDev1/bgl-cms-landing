import type { Block } from 'payload'

export const Stepper: Block = {
  slug: 'stepper',
  interfaceName: 'StepperBlock',
  labels: {
    singular: {
      en: 'Stepper',
      es: 'Proceso de Paso',
    },
    plural: {
      en: 'Steppers',
      es: 'Proceso de Pasos',
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
      admin: {
        description: {
          en: 'Optional title displayed above the stepper',
          es: 'Título opcional mostrado encima del stepper',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: {
        en: 'Description',
        es: 'Descripción',
      },
      admin: {
        description: {
          en: 'Optional description displayed below the title',
          es: 'Descripción opcional mostrada debajo del título',
        },
        rows: 3,
      },
    },
    {
      name: 'steps',
      type: 'array',
      label: {
        en: 'Steps',
        es: 'Pasos',
      },
      labels: {
        singular: {
          en: 'Step',
          es: 'Paso',
        },
        plural: {
          en: 'Steps',
          es: 'Pasos',
        },
      },
      minRows: 2,
      maxRows: 10,
      admin: {
        description: {
          en: 'Add the steps for your stepper process',
          es: 'Añade los pasos para tu proceso',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Stepper/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'stepTitle',
          type: 'text',
          label: {
            en: 'Step Title',
            es: 'Título del Paso',
          },
          required: true,
          admin: {
            description: {
              en: 'Title for this step',
              es: 'Título para este paso',
            },
          },
        },
        {
          name: 'stepContent',
          type: 'textarea',
          label: {
            en: 'Step Content',
            es: 'Contenido del Paso',
          },
          required: true,
          admin: {
            description: {
              en: 'Content displayed in this step',
              es: 'Contenido mostrado en este paso',
            },
            rows: 4,
          },
        },
        {
          name: 'stepMedia',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Step Image or Video',
            es: 'Imagen o Video del Paso',
          },
          admin: {
            description: {
              en: 'Optional image or video to display in this step',
              es: 'Imagen o video opcional para mostrar en este paso',
            },
          },
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: {
        en: 'Stepper Settings',
        es: 'Configuración del Stepper',
      },
      admin: {
        description: {
          en: 'Customize the behavior and appearance of the stepper',
          es: 'Personaliza el comportamiento y apariencia del stepper',
        },
      },
      fields: [
        {
          name: 'backButtonText',
          type: 'text',
          label: {
            en: 'Back Button Text',
            es: 'Texto del Botón Atrás',
          },
          defaultValue: 'Atrás',
          admin: {
            description: {
              en: 'Text displayed on the back button',
              es: 'Texto mostrado en el botón de atrás',
            },
          },
        },
        {
          name: 'nextButtonText',
          type: 'text',
          label: {
            en: 'Next Button Text',
            es: 'Texto del Botón Siguiente',
          },
          defaultValue: 'Continuar',
          admin: {
            description: {
              en: 'Text displayed on the next button',
              es: 'Texto mostrado en el botón siguiente',
            },
          },
        },
        {
          name: 'completeButtonText',
          type: 'text',
          label: {
            en: 'Complete Button Text',
            es: 'Texto del Botón Completar',
          },
          defaultValue: 'Completar',
          admin: {
            description: {
              en: 'Text displayed on the complete button (last step)',
              es: 'Texto mostrado en el botón completar (último paso)',
            },
          },
        },
        {
          name: 'disableStepIndicators',
          type: 'checkbox',
          label: {
            en: 'Disable Step Navigation',
            es: 'Deshabilitar Navegación de Pasos',
          },
          defaultValue: false,
          admin: {
            description: {
              en: 'Prevent users from clicking on step indicators to navigate',
              es: 'Evita que los usuarios hagan clic en los indicadores para navegar',
            },
          },
        },
      ],
    },
  ],
}
