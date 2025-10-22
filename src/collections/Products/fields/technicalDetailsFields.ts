import colorPickerField from '@/fields/colorPicker'
import type { Field } from 'payload'

export const technicalDetailsFields: Field[] = [
  {
    type: 'tabs',
    admin: {
      condition: (data) => {
        // Solo mostrar si hay un tipo seleccionado
        return data?.type
      },
    },
    tabs: [
      // Tab General - Siempre visible
      {
        label: {
          en: 'General Specifications',
          es: 'Especificaciones Generales',
        },
        fields: [
          {
            name: 'generalSpecs',
            type: 'group',
            label: {
              en: 'General Specifications',
              es: 'Especificaciones Generales',
            },
            fields: [
              {
                name: 'dimensions',
                type: 'group',
                label: {
                  en: 'Dimensions',
                  es: 'Dimensiones',
                },
                fields: [
                  {
                    name: 'length',
                    type: 'number',
                    label: {
                      en: 'Length (cm)',
                      es: 'Largo (cm)',
                    },
                    admin: {
                      step: 0.1,
                    },
                  },
                  {
                    name: 'width',
                    type: 'number',
                    label: {
                      en: 'Width (cm)',
                      es: 'Ancho (cm)',
                    },
                    admin: {
                      step: 0.1,
                    },
                  },
                  {
                    name: 'height',
                    type: 'number',
                    label: {
                      en: 'Height (cm)',
                      es: 'Alto (cm)',
                    },
                    admin: {
                      step: 0.1,
                    },
                  },
                  {
                    name: 'weight',
                    type: 'number',
                    label: {
                      en: 'Weight (kg)',
                      es: 'Peso (kg)',
                    },
                    admin: {
                      step: 0.1,
                    },
                  },
                ],
              },
              colorPickerField({
                name: 'color',
                label: {
                  en: 'Color',
                  es: 'Color',
                },
                admin: {
                  description: 'Selecciona un color para describir al producto',
                },
              }),
              {
                name: 'material',
                type: 'text',
                label: {
                  en: 'Material',
                  es: 'Material',
                },
              },
              {
                name: 'operatingTemperature',
                type: 'group',
                label: {
                  en: 'Operating Temperature',
                  es: 'Temperatura de Operación',
                },
                fields: [
                  {
                    name: 'min',
                    type: 'number',
                    label: {
                      en: 'Min (°C)',
                      es: 'Mín (°C)',
                    },
                  },
                  {
                    name: 'max',
                    type: 'number',
                    label: {
                      en: 'Max (°C)',
                      es: 'Máx (°C)',
                    },
                  },
                ],
              },
              {
                name: 'certifications',
                type: 'array',
                label: {
                  en: 'Certifications',
                  es: 'Certificaciones',
                },
                fields: [
                  {
                    name: 'name',
                    type: 'text',
                    label: {
                      en: 'Certification Name',
                      es: 'Nombre de Certificación',
                    },
                    required: true,
                  },
                  {
                    name: 'number',
                    type: 'text',
                    label: {
                      en: 'Certificate Number',
                      es: 'Número de Certificado',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      // Tab Báscula - Solo visible cuando type = 'scale'
      {
        label: {
          en: 'Scale Specifications',
          es: 'Especificaciones de Báscula',
        },
        admin: {
          condition: (data) => data?.type === 'scale',
        },
        fields: [
          {
            name: 'scaleSpecs',
            type: 'group',
            label: {
              en: 'Scale Specifications',
              es: 'Especificaciones de Báscula',
            },
            admin: {
              condition: (data) => data?.type === 'scale',
            },
            fields: [
              {
                name: 'capacity',
                type: 'group',
                label: {
                  en: 'Capacity',
                  es: 'Capacidad',
                },
                fields: [
                  {
                    name: 'maximum',
                    type: 'number',
                    label: {
                      en: 'Maximum Capacity (kg)',
                      es: 'Capacidad Máxima (kg)',
                    },
                    required: true,
                    admin: {
                      step: 0.001,
                    },
                  },
                  {
                    name: 'minimum',
                    type: 'number',
                    label: {
                      en: 'Minimum Capacity (kg)',
                      es: 'Capacidad Mínima (kg)',
                    },
                    admin: {
                      step: 0.001,
                    },
                  },
                ],
              },
              {
                name: 'readability',
                type: 'group',
                label: {
                  en: 'Readability',
                  es: 'Legibilidad',
                },
                fields: [
                  {
                    name: 'division',
                    type: 'number',
                    label: {
                      en: 'Minimum Division (g)',
                      es: 'División Mínima (g)',
                    },
                    required: true,
                    admin: {
                      step: 0.001,
                    },
                  },
                  {
                    name: 'verificationDivision',
                    type: 'number',
                    label: {
                      en: 'Verification Division (e)',
                      es: 'División de Verificación (e)',
                    },
                    admin: {
                      step: 0.001,
                    },
                  },
                ],
              },
              {
                name: 'platform',
                type: 'group',
                label: {
                  en: 'Platform Specifications',
                  es: 'Especificaciones de Plataforma',
                },
                fields: [
                  {
                    name: 'dimensions',
                    type: 'group',
                    label: {
                      en: 'Platform Dimensions',
                      es: 'Dimensiones del Plato',
                    },
                    fields: [
                      {
                        name: 'length',
                        type: 'number',
                        label: {
                          en: 'Length (cm)',
                          es: 'Largo (cm)',
                        },
                        admin: {
                          step: 0.1,
                        },
                      },
                      {
                        name: 'width',
                        type: 'number',
                        label: {
                          en: 'Width (cm)',
                          es: 'Ancho (cm)',
                        },
                        admin: {
                          step: 0.1,
                        },
                      },
                    ],
                  },
                  {
                    name: 'material',
                    type: 'select',
                    label: {
                      en: 'Platform Material',
                      es: 'Material del Plato',
                    },
                    options: [
                      {
                        label: 'Stainless Steel',
                        value: 'stainless_steel',
                      },
                      {
                        label: 'Aluminum',
                        value: 'aluminum',
                      },
                      {
                        label: 'Steel',
                        value: 'steel',
                      },
                      {
                        label: 'Plastic',
                        value: 'plastic',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'display',
                type: 'group',
                label: {
                  en: 'Display',
                  es: 'Pantalla',
                },
                fields: [
                  {
                    name: 'type',
                    type: 'select',
                    label: {
                      en: 'Display Type',
                      es: 'Tipo de Pantalla',
                    },
                    options: [
                      {
                        label: 'LCD',
                        value: 'lcd',
                      },
                      {
                        label: 'LED',
                        value: 'led',
                      },
                      {
                        label: 'Digital',
                        value: 'digital',
                      },
                    ],
                  },
                  {
                    name: 'size',
                    type: 'text',
                    label: {
                      en: 'Display Size',
                      es: 'Tamaño de Pantalla',
                    },
                  },
                  {
                    name: 'backlight',
                    type: 'checkbox',
                    label: {
                      en: 'Backlight',
                      es: 'Retroiluminación',
                    },
                  },
                ],
              },
              {
                name: 'accuracy',
                type: 'select',
                label: {
                  en: 'Accuracy Class',
                  es: 'Clase de Precisión',
                },
                options: [
                  {
                    label: 'Class I',
                    value: 'class_1',
                  },
                  {
                    label: 'Class II',
                    value: 'class_2',
                  },
                  {
                    label: 'Class III',
                    value: 'class_3',
                  },
                  {
                    label: 'Class IIII',
                    value: 'class_4',
                  },
                ],
              },
            ],
          },
        ],
      },
      // Tab Consumible - Solo visible cuando type = 'consumable'
      {
        label: {
          en: 'Consumable Specifications',
          es: 'Especificaciones de Consumible',
        },
        admin: {
          condition: (data) => data?.type === 'consumable',
        },
        fields: [
          {
            name: 'consumSpecs',
            type: 'group',
            label: {
              en: 'Consumable Specifications',
              es: 'Especificaciones de Consumible',
            },
            admin: {
              condition: (data) => data?.type === 'consumable',
            },
            fields: [
              {
                name: 'electrical',
                type: 'group',
                label: {
                  en: 'Electrical Specifications',
                  es: 'Especificaciones Eléctricas',
                },
                fields: [
                  {
                    name: 'voltage',
                    type: 'text',
                    label: {
                      en: 'Voltage (V)',
                      es: 'Voltaje (V)',
                    },
                    admin: {
                      placeholder: 'e.g., 110-240V AC',
                    },
                  },
                  {
                    name: 'current',
                    type: 'text',
                    label: {
                      en: 'Current (A)',
                      es: 'Corriente (A)',
                    },
                  },
                  {
                    name: 'power',
                    type: 'text',
                    label: {
                      en: 'Power (W)',
                      es: 'Potencia (W)',
                    },
                  },
                  {
                    name: 'frequency',
                    type: 'text',
                    label: {
                      en: 'Frequency (Hz)',
                      es: 'Frecuencia (Hz)',
                    },
                    admin: {
                      placeholder: 'e.g., 50/60 Hz',
                    },
                  },
                ],
              },
              {
                name: 'connectivity',
                type: 'group',
                label: {
                  en: 'Connectivity',
                  es: 'Conectividad',
                },
                fields: [
                  {
                    name: 'interfaces',
                    type: 'array',
                    dbName: 'intfs',
                    label: {
                      en: 'Interfaces',
                      es: 'Interfaces',
                    },
                    fields: [
                      {
                        name: 'type',
                        type: 'select',
                        dbName: 'intf_type',
                        label: {
                          en: 'Interface Type',
                          es: 'Tipo de Interface',
                        },
                        options: [
                          {
                            label: 'USB',
                            value: 'usb',
                          },
                          {
                            label: 'RS-232',
                            value: 'rs232',
                          },
                          {
                            label: 'RS-485',
                            value: 'rs485',
                          },
                          {
                            label: 'Mini-DIN',
                            value: 'minidin',
                          },
                          {
                            label: 'Ethernet',
                            value: 'ethernet',
                          },
                          {
                            label: 'Wi-Fi',
                            value: 'wifi',
                          },
                          {
                            label: 'Bluetooth',
                            value: 'bluetooth',
                          },
                        ],
                        required: true,
                      },
                      {
                        name: 'description',
                        type: 'text',
                        label: {
                          en: 'Description',
                          es: 'Descripción',
                        },
                      },
                    ],
                  },
                  {
                    name: 'cables',
                    type: 'array',
                    dbName: 'cab',
                    label: {
                      en: 'Included Cables',
                      es: 'Cables Incluidos',
                    },
                    fields: [
                      {
                        name: 'type',
                        type: 'text',
                        label: {
                          en: 'Cable Type',
                          es: 'Tipo de Cable',
                        },
                        required: true,
                      },
                      {
                        name: 'length',
                        type: 'text',
                        label: {
                          en: 'Length',
                          es: 'Longitud',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                name: 'compatibility',
                type: 'group',
                label: {
                  en: 'Compatibility',
                  es: 'Compatibilidad',
                },
                fields: [
                  {
                    name: 'operatingSystems',
                    type: 'array',
                    dbName: 'os_compat',
                    label: {
                      en: 'Operating Systems',
                      es: 'Sistemas Operativos',
                    },
                    fields: [
                      {
                        name: 'name',
                        type: 'select',
                        dbName: 'os_name',
                        label: {
                          en: 'OS Name',
                          es: 'Nombre del SO',
                        },
                        options: [
                          {
                            label: 'Windows',
                            value: 'windows',
                          },
                          {
                            label: 'macOS',
                            value: 'macos',
                          },
                          {
                            label: 'Linux',
                            value: 'linux',
                          },
                          {
                            label: 'Android',
                            value: 'android',
                          },
                          {
                            label: 'iOS',
                            value: 'ios',
                          },
                        ],
                        required: true,
                      },
                      {
                        name: 'version',
                        type: 'text',
                        label: {
                          en: 'Version',
                          es: 'Versión',
                        },
                      },
                    ],
                  },
                  {
                    name: 'software',
                    type: 'array',
                    label: {
                      en: 'Compatible Software',
                      es: 'Software Compatible',
                    },
                    fields: [
                      {
                        name: 'name',
                        type: 'text',
                        label: {
                          en: 'Software Name',
                          es: 'Nombre del Software',
                        },
                        required: true,
                      },
                      {
                        name: 'version',
                        type: 'text',
                        label: {
                          en: 'Version',
                          es: 'Versión',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                name: 'lifespan',
                type: 'group',
                label: {
                  en: 'Lifespan & Usage',
                  es: 'Vida Útil y Uso',
                },
                fields: [
                  {
                    name: 'expectedLife',
                    type: 'text',
                    label: {
                      en: 'Expected Lifespan',
                      es: 'Vida Útil Esperada',
                    },
                    admin: {
                      placeholder: 'e.g., 2 years, 10,000 cycles',
                    },
                  },
                  {
                    name: 'usageConditions',
                    type: 'textarea',
                    label: {
                      en: 'Usage Conditions',
                      es: 'Condiciones de Uso',
                    },
                  },
                  {
                    name: 'storageConditions',
                    type: 'textarea',
                    label: {
                      en: 'Storage Conditions',
                      es: 'Condiciones de Almacenamiento',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
