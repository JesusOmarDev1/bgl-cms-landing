import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'

export const Chatbot: GlobalConfig = {
  slug: 'chatbot',
  access: {
    read: anyone,
    update: isAdminOrEditor,
  },
  label: {
    en: 'Chatbot',
    es: 'Chatbot',
  },
  admin: {
    description: {
      en: 'Configure the chatbot welcome message, default response, and all questions',
      es: 'Configura el mensaje de bienvenida, respuesta por defecto y todas las preguntas del chatbot',
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Welcome Message',
            es: 'Mensaje de Bienvenida',
          },
          fields: [
            {
              name: 'welcomeMessage',
              type: 'group',
              label: {
                en: 'Welcome Message',
                es: 'Mensaje de Bienvenida',
              },
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    '¡Hola! 👋 Soy el asistente virtual de BGL. ¿En qué puedo ayudarte hoy?',
                  label: {
                    en: 'Welcome Text',
                    es: 'Texto de Bienvenida',
                  },
                  admin: {
                    description: {
                      en: 'The first message users see when opening the chatbot',
                      es: 'El primer mensaje que los usuarios ven al abrir el chatbot',
                    },
                  },
                },
                {
                  name: 'quickOptions',
                  type: 'array',
                  label: {
                    en: 'Quick Options',
                    es: 'Opciones Rápidas',
                  },
                  admin: {
                    description: {
                      en: 'Quick action buttons shown in the welcome message. Use URL for links (blue) or leave empty to send as message (red)',
                      es: 'Botones de acción rápida mostrados en el mensaje de bienvenida. Usa URL para enlaces (azul) o déjalo vacío para enviar como mensaje (rojo)',
                    },
                  },
                  fields: [
                    {
                      name: 'question',
                      type: 'text',
                      required: true,
                      label: {
                        en: 'Button Text',
                        es: 'Texto del Botón',
                      },
                    },
                    {
                      name: 'typeMessage',
                      type: 'checkbox',
                      defaultValue: false,
                      label: {
                        en: '🔗 Open as Link (Blue Button)',
                        es: '🔗 Abrir como Enlace (Botón Azul)',
                      },
                      admin: {
                        description: {
                          en: 'Check to open a URL. Uncheck to send as message (Red Button)',
                          es: 'Marca para abrir una URL. Desmarca para enviar como mensaje (Botón Rojo)',
                        },
                      },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: {
                        en: 'URL',
                        es: 'URL',
                      },
                      required: true,
                      admin: {
                        condition: (data, siblingData) => siblingData?.typeMessage === true,
                        description: {
                          en: 'Enter the URL to open. Examples: /productos, https://example.com',
                          es: 'Ingresa la URL a abrir. Ejemplos: /productos, https://ejemplo.com',
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'Default Response',
            es: 'Respuesta por Defecto',
          },
          fields: [
            {
              name: 'defaultResponse',
              type: 'group',
              label: {
                en: 'Default Response',
                es: 'Respuesta por Defecto',
              },
              admin: {
                description: {
                  en: 'This response is shown when no matching question is found',
                  es: 'Esta respuesta se muestra cuando no se encuentra una pregunta coincidente',
                },
              },
              fields: [
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'Lo siento, no tengo información específica sobre eso. ¿Puedo ayudarte con algo más?',
                  label: {
                    en: 'Default Answer',
                    es: 'Respuesta por Defecto',
                  },
                },
                {
                  name: 'followUpQuestions',
                  type: 'array',
                  label: {
                    en: 'Follow-up Suggestions',
                    es: 'Sugerencias de Seguimiento',
                  },
                  admin: {
                    description: {
                      en: 'Buttons shown after the default response. With URL = link (blue), without URL = sends message (red)',
                      es: 'Botones mostrados después de la respuesta por defecto. Con URL = enlace (azul), sin URL = envía mensaje (rojo)',
                    },
                  },
                  fields: [
                    {
                      name: 'question',
                      type: 'text',
                      required: true,
                      label: {
                        en: 'Suggestion Text',
                        es: 'Texto de Sugerencia',
                      },
                    },
                    {
                      name: 'typeMessage',
                      type: 'checkbox',
                      defaultValue: false,
                      label: {
                        en: '🔗 Open as Link (Blue Button)',
                        es: '🔗 Abrir como Enlace (Botón Azul)',
                      },
                      admin: {
                        description: {
                          en: 'Check to open a URL. Uncheck to send as message (Red Button)',
                          es: 'Marca para abrir una URL. Desmarca para enviar como mensaje (Botón Rojo)',
                        },
                      },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: {
                        en: 'URL',
                        es: 'URL',
                      },
                      required: true,
                      admin: {
                        condition: (data, siblingData) => siblingData?.typeMessage === true,
                        description: {
                          en: 'Enter the URL to open. Examples: /productos, https://example.com',
                          es: 'Ingresa la URL a abrir. Ejemplos: /productos, https://ejemplo.com',
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'Questions & Answers',
            es: 'Preguntas y Respuestas',
          },
          fields: [
            {
              name: 'questions',
              type: 'array',
              label: {
                en: 'Questions',
                es: 'Preguntas',
              },
              admin: {
                description: {
                  en: 'All chatbot questions and their answers',
                  es: 'Todas las preguntas del chatbot y sus respuestas',
                },
              },
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                  label: {
                    en: 'Question',
                    es: 'Pregunta',
                  },
                  admin: {
                    description: {
                      en: 'The main question users might ask',
                      es: 'La pregunta principal que los usuarios podrían hacer',
                    },
                  },
                },
                {
                  name: 'keywords',
                  type: 'array',
                  label: {
                    en: 'Keywords',
                    es: 'Palabras Clave',
                  },
                  admin: {
                    description: {
                      en: 'Keywords that trigger this response',
                      es: 'Palabras clave que disparan esta respuesta',
                    },
                  },
                  fields: [
                    {
                      name: 'keyword',
                      type: 'text',
                      required: true,
                      label: {
                        en: 'Keyword',
                        es: 'Palabra Clave',
                      },
                    },
                  ],
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  label: {
                    en: 'Answer',
                    es: 'Respuesta',
                  },
                  admin: {
                    description: {
                      en: 'The chatbot response. Use \\n for line breaks',
                      es: 'La respuesta del chatbot. Usa \\n para saltos de línea',
                    },
                  },
                },
                {
                  name: 'followUpQuestions',
                  type: 'array',
                  label: {
                    en: 'Follow-up Questions',
                    es: 'Preguntas de Seguimiento',
                  },
                  admin: {
                    description: {
                      en: 'Suggested buttons shown after this answer. With URL = opens link (blue), without URL = sends message automatically (red)',
                      es: 'Botones sugeridos mostrados después de esta respuesta. Con URL = abre enlace (azul), sin URL = envía mensaje automáticamente (rojo)',
                    },
                  },
                  fields: [
                    {
                      name: 'question',
                      type: 'text',
                      required: true,
                      label: {
                        en: 'Question',
                        es: 'Pregunta',
                      },
                    },
                    {
                      name: 'typeMessage',
                      type: 'checkbox',
                      defaultValue: false,
                      label: {
                        en: '🔗 Open as Link (Blue Button)',
                        es: '🔗 Abrir como Enlace (Botón Azul)',
                      },
                      admin: {
                        description: {
                          en: 'Check to open a URL. Uncheck to send as message (Red Button)',
                          es: 'Marca para abrir una URL. Desmarca para enviar como mensaje (Botón Rojo)',
                        },
                      },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: {
                        en: 'URL',
                        es: 'URL',
                      },
                      required: true,
                      admin: {
                        condition: (data, siblingData) => siblingData?.typeMessage === true,
                        description: {
                          en: 'Enter the URL to open. Examples: /productos, https://example.com',
                          es: 'Ingresa la URL a abrir. Ejemplos: /productos, https://ejemplo.com',
                        },
                      },
                    },
                  ],
                },
                {
                  name: 'category',
                  type: 'relationship',
                  label: {
                    en: 'Category',
                    es: 'Categoría',
                  },
                  relationTo: 'categories',
                  admin: {
                    description: {
                      en: 'Category for organizing questions',
                      es: 'Categoría para organizar preguntas',
                    },
                  },
                },
                {
                  name: 'priority',
                  type: 'number',
                  label: {
                    en: 'Priority',
                    es: 'Prioridad',
                  },
                  defaultValue: 0,
                  min: 0,
                  max: 100,
                  admin: {
                    description: {
                      en: 'Higher number = higher priority. Used when multiple questions match',
                      es: 'Mayor número = mayor prioridad. Usado cuando varias preguntas coinciden',
                    },
                  },
                },
                {
                  name: 'active',
                  type: 'checkbox',
                  label: {
                    en: 'Active',
                    es: 'Activo',
                  },
                  defaultValue: true,
                  admin: {
                    description: {
                      en: 'Disable temporarily without deleting',
                      es: 'Desactiva temporalmente sin eliminar',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'Configuration',
            es: 'Configuración',
          },
          fields: [
            {
              name: 'disabled',
              type: 'checkbox',
              defaultValue: true,
              label: {
                en: 'Disable Chatbot',
                es: 'Deshabilitar Chatbot',
              },
              admin: {
                description:
                  'Con esta opción se deshabilitara el chatbot en la página web para que no se muestre temporalmente o indefinidamente.',
              },
            },
          ],
        },
      ],
    },
  ],
}
