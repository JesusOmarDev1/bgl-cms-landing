import { iconPickerField } from '@/fields/iconPicker'
import type { Field } from 'payload'

export const technicalDetailsFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      // Tab General - Solo visible para productos generales
      {
        label: {
          en: 'General Specifications',
          es: 'Especificaciones Generales',
        },
        admin: {
          condition: (data) => data?.type !== 'scale' && data?.type !== 'consumable',
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
              // Dimensiones y peso
              {
                name: 'physicalSpecs',
                type: 'group',
                label: {
                  en: 'Physical Specifications',
                  es: 'Especificaciones Físicas',
                },
                fields: [
                  {
                    name: 'dimensions',
                    type: 'text',
                    label: {
                      en: 'Dimensions',
                      es: 'Dimensiones',
                    },
                    admin: {
                      placeholder: 'ej: 33cm x 32cm x 11cm',
                    },
                  },
                  {
                    name: 'weight',
                    type: 'text',
                    label: {
                      en: 'Weight',
                      es: 'Peso',
                    },
                    admin: {
                      placeholder: 'ej: 2.5 kg',
                    },
                  },
                  {
                    name: 'material',
                    type: 'text',
                    label: {
                      en: 'Material',
                      es: 'Material',
                    },
                    admin: {
                      placeholder: 'ej: Acero inoxidable, Plástico ABS',
                    },
                  },
                ],
              },
              // Alimentación
              {
                name: 'powerSupply',
                type: 'group',
                label: {
                  en: 'Power Supply',
                  es: 'Alimentación',
                },
                fields: [
                  {
                    name: 'type',
                    type: 'select',
                    label: {
                      en: 'Power Type',
                      es: 'Tipo de Alimentación',
                    },
                    options: [
                      {
                        label: 'Eléctrica AC',
                        value: 'ac_electric',
                      },
                      {
                        label: 'Batería Recargable',
                        value: 'rechargeable_battery',
                      },
                      {
                        label: 'Batería Interna',
                        value: 'internal_battery',
                      },
                      {
                        label: 'USB',
                        value: 'usb',
                      },
                      {
                        label: 'Eliminador',
                        value: 'eliminator',
                      },
                      {
                        label: 'No requiere',
                        value: 'none',
                      },
                    ],
                  },
                  {
                    name: 'specifications',
                    type: 'text',
                    label: {
                      en: 'Power Specifications',
                      es: 'Especificaciones de Alimentación',
                    },
                    admin: {
                      placeholder: 'ej: 100-240Vca, 60Hz, Consumo 96W',
                    },
                  },
                  {
                    name: 'batteryLife',
                    type: 'text',
                    label: {
                      en: 'Battery Life',
                      es: 'Duración de Batería',
                    },
                    admin: {
                      condition: (data, siblingData) =>
                        siblingData?.type === 'rechargeable_battery' ||
                        siblingData?.type === 'internal_battery',
                      placeholder: 'ej: 30 horas de uso continuo',
                    },
                  },
                ],
              },
              // Conectividad
              {
                name: 'connectivity',
                type: 'array',
                label: {
                  en: 'Connectivity',
                  es: 'Conectividad',
                },
                labels: {
                  singular: {
                    en: 'Connection',
                    es: 'Conexión',
                  },
                  plural: {
                    en: 'Connections',
                    es: 'Conexiones',
                  },
                },
                admin: {
                  components: {
                    RowLabel:
                      '@/collections/Products/components/ConnectivityRowLabel#ConnectivityRowLabel',
                  },
                },
                fields: [
                  {
                    name: 'type',
                    type: 'select',
                    label: {
                      en: 'Connection Type',
                      es: 'Tipo de Conexión',
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
                        label: 'WiFi',
                        value: 'wifi',
                      },
                      {
                        label: 'Bluetooth',
                        value: 'bluetooth',
                      },
                      {
                        label: 'Ethernet',
                        value: 'ethernet',
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
                    admin: {
                      placeholder: 'ej: Para comunicación a PC y visor remoto',
                    },
                  },
                ],
              },
              // Temperatura de operación
              {
                name: 'operatingConditions',
                type: 'group',
                label: {
                  en: 'Operating Conditions',
                  es: 'Condiciones de Operación',
                },
                fields: [
                  {
                    name: 'temperature',
                    type: 'text',
                    label: {
                      en: 'Operating Temperature',
                      es: 'Temperatura de Operación',
                    },
                    admin: {
                      placeholder: 'ej: -10°C - 40°C',
                    },
                  },
                  {
                    name: 'humidity',
                    type: 'text',
                    label: {
                      en: 'Humidity',
                      es: 'Humedad',
                    },
                    admin: {
                      placeholder: 'ej: 85% RH máximo',
                    },
                  },
                ],
              },
              // Incluye (accesorios)
              {
                name: 'includes',
                type: 'array',
                label: {
                  en: 'Includes',
                  es: 'Incluye',
                },
                labels: {
                  singular: {
                    en: 'Included Item',
                    es: 'Artículo Incluido',
                  },
                  plural: {
                    en: 'Included Items',
                    es: 'Artículos Incluidos',
                  },
                },
                admin: {
                  components: {
                    RowLabel: '@/collections/Products/components/IncludesRowLabel#IncludesRowLabel',
                  },
                },
                fields: [
                  {
                    name: 'item',
                    type: 'text',
                    label: {
                      en: 'Item',
                      es: 'Artículo',
                    },
                    required: true,
                    admin: {
                      placeholder: 'ej: Plataforma y pedestal',
                    },
                  },
                  {
                    name: 'icon',
                    type: 'text',
                    label: {
                      en: 'Icon',
                      es: 'Icono',
                    },
                    required: false,
                    admin: {
                      description: 'Nombre del icono de Lucide (ej: package, zap, scale)',
                      placeholder: 'ej: package',
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
              en: 'Scale Technical Details',
              es: 'Detalles Técnicos de Báscula',
            },
            fields: [
              // Capacidad
              {
                name: 'capacity',
                type: 'group',
                label: {
                  en: 'Capacity',
                  es: 'Capacidad',
                },
                fields: [
                  {
                    name: 'type',
                    type: 'select',
                    label: {
                      en: 'Capacity Type',
                      es: 'Tipo de Capacidad',
                    },
                    options: [
                      {
                        label: 'Multirango',
                        value: 'multirange',
                      },
                      {
                        label: 'Rango Simple',
                        value: 'single_range',
                      },
                      {
                        label: 'Configurable',
                        value: 'configurable',
                      },
                    ],
                    defaultValue: 'single_range',
                  },
                  {
                    name: 'maximum',
                    type: 'text',
                    label: {
                      en: 'Maximum Capacity',
                      es: 'Capacidad Máxima',
                    },
                    required: true,
                    admin: {
                      placeholder: 'ej: 40 kg x 0.01 kg o Desde 15 kg a 30 kg',
                    },
                  },
                  {
                    name: 'minimumDivision',
                    type: 'text',
                    label: {
                      en: 'Minimum Division',
                      es: 'División Mínima',
                    },
                    admin: {
                      placeholder: 'ej: 0.01 kg, 0.02 kg',
                    },
                  },
                  {
                    name: 'ranges',
                    type: 'array',
                    label: {
                      en: 'Multiple Ranges',
                      es: 'Rangos Múltiples',
                    },
                    labels: {
                      singular: {
                        en: 'Range',
                        es: 'Rango',
                      },
                      plural: {
                        en: 'Ranges',
                        es: 'Rangos',
                      },
                    },
                    admin: {
                      condition: (data, siblingData) => siblingData?.type === 'multirange',
                      components: {
                        RowLabel: '@/collections/Products/components/RangesRowLabel#RangesRowLabel',
                      },
                    },
                    fields: [
                      {
                        name: 'range',
                        type: 'text',
                        label: {
                          en: 'Range',
                          es: 'Rango',
                        },
                        required: true,
                        admin: {
                          placeholder: 'ej: 6 kg x 0.001 kg',
                        },
                      },
                    ],
                  },
                ],
              },
              // Display
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
                        label: 'LCD con retroiluminación',
                        value: 'lcd_backlit',
                      },
                      {
                        label: 'LED de alta visibilidad',
                        value: 'led_high_visibility',
                      },
                      {
                        label: 'LCD verde',
                        value: 'lcd_green',
                      },
                      {
                        label: 'Doble RED Rojo',
                        value: 'double_red',
                      },
                      {
                        label: 'LED rojo con torreta',
                        value: 'led_red_tower',
                      },
                      {
                        label: 'Pantalla LED 6 dígitos',
                        value: 'led_6_digits',
                      },
                    ],
                  },
                  {
                    name: 'description',
                    type: 'text',
                    label: {
                      en: 'Display Description',
                      es: 'Descripción de Pantalla',
                    },
                    admin: {
                      placeholder: 'ej: Pantalla LED de 6 dígitos luminosos',
                    },
                  },
                ],
              },
              // Plataforma/Plato
              {
                name: 'platform',
                type: 'group',
                label: {
                  en: 'Platform',
                  es: 'Plataforma/Plato',
                },
                fields: [
                  {
                    name: 'dimensions',
                    type: 'text',
                    label: {
                      en: 'Platform Dimensions',
                      es: 'Dimensiones del Plato',
                    },
                    required: true,
                    admin: {
                      placeholder: 'ej: 30cm x 30cm, 22cm x 33cm, ADAPTABLE',
                    },
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
                        label: 'Acero Inoxidable',
                        value: 'stainless_steel',
                      },
                      {
                        label: 'Plástico',
                        value: 'plastic',
                      },
                      {
                        label: 'Recubrimiento de acero inoxidable',
                        value: 'stainless_steel_coating',
                      },
                    ],
                  },
                  {
                    name: 'type',
                    type: 'select',
                    label: {
                      en: 'Platform Type',
                      es: 'Tipo de Plataforma',
                    },
                    options: [
                      {
                        label: 'Plato estándar',
                        value: 'standard_plate',
                      },
                      {
                        label: 'Plataforma con ruedas Heavy Duty',
                        value: 'heavy_duty_wheels',
                      },
                      {
                        label: 'Plataforma y pedestal',
                        value: 'platform_pedestal',
                      },
                    ],
                  },
                ],
              },
              // Funciones
              {
                name: 'functions',
                type: 'array',
                label: {
                  en: 'Functions',
                  es: 'Funciones',
                },
                labels: {
                  singular: {
                    en: 'Function',
                    es: 'Función',
                  },
                  plural: {
                    en: 'Functions',
                    es: 'Funciones',
                  },
                },
                admin: {
                  components: {
                    RowLabel:
                      '@/collections/Products/components/ScaleFunctionsRowLabel#ScaleFunctionsRowLabel',
                  },
                },
                fields: [
                  {
                    name: 'function',
                    type: 'text',
                    label: {
                      en: 'Function',
                      es: 'Función',
                    },
                    required: true,
                    admin: {
                      placeholder:
                        'ej: Función de acumulación de pesos y precios, Impresión QR, Caja registradora, etc.',
                    },
                  },
                  {
                    name: 'description',
                    type: 'text',
                    label: {
                      en: 'Function Description',
                      es: 'Descripción de la Función',
                    },
                    admin: {
                      placeholder: 'ej: 100 memorias PLU y 8 accesos directos a productos',
                    },
                  },
                ],
              },
              // Unidades
              {
                name: 'units',
                type: 'array',
                label: {
                  en: 'Units',
                  es: 'Unidades',
                },
                labels: {
                  singular: {
                    en: 'Unit',
                    es: 'Unidad',
                  },
                  plural: {
                    en: 'Units',
                    es: 'Unidades',
                  },
                },
                admin: {
                  components: {
                    RowLabel: '@/collections/Products/components/UnitsRowLabel#UnitsRowLabel',
                  },
                },
                fields: [
                  {
                    name: 'unit',
                    type: 'select',
                    label: {
                      en: 'Unit',
                      es: 'Unidad',
                    },
                    options: [
                      {
                        label: 'Kilogramos',
                        value: 'kg',
                      },
                      {
                        label: 'Gramos',
                        value: 'g',
                      },
                      {
                        label: 'Miligramos',
                        value: 'mg',
                      },
                      {
                        label: 'Microgramos',
                        value: 'mc',
                      },
                      {
                        label: 'Libras',
                        value: 'lb',
                      },
                      {
                        label: 'Onzas',
                        value: 'oz',
                      },
                      {
                        label: 'Toneladas',
                        value: 't',
                      },
                    ],
                    required: true,
                  },
                ],
              },
              // Alimentación
              {
                name: 'powerSupply',
                type: 'group',
                label: {
                  en: 'Power Supply',
                  es: 'Alimentación',
                },
                fields: [
                  {
                    name: 'type',
                    type: 'select',
                    label: {
                      en: 'Power Type',
                      es: 'Tipo de Alimentación',
                    },
                    options: [
                      {
                        label: 'Eléctrica AC',
                        value: 'ac_electric',
                      },
                      {
                        label: 'Batería Recargable',
                        value: 'rechargeable_battery',
                      },
                      {
                        label: 'Eliminador',
                        value: 'eliminator',
                      },
                    ],
                  },
                  {
                    name: 'specifications',
                    type: 'text',
                    label: {
                      en: 'Power Specifications',
                      es: 'Especificaciones de Alimentación',
                    },
                    admin: {
                      placeholder: 'ej: 100-240Vca, 60Hz, 6V / 500mA',
                    },
                  },
                  {
                    name: 'batteryDetails',
                    type: 'text',
                    label: {
                      en: 'Battery Details',
                      es: 'Detalles de Batería',
                    },
                    admin: {
                      condition: (data, siblingData) =>
                        siblingData?.type === 'rechargeable_battery',
                      placeholder: 'ej: Batería Recargable 4Vcc 5Ah con 160h de uso y 8h de carga',
                    },
                  },
                ],
              },
              // Comunicación
              {
                name: 'communication',
                type: 'array',
                label: {
                  en: 'Communication',
                  es: 'Comunicación',
                },
                labels: {
                  singular: {
                    en: 'Communication Port',
                    es: 'Puerto de Comunicación',
                  },
                  plural: {
                    en: 'Communication Ports',
                    es: 'Puertos de Comunicación',
                  },
                },
                admin: {
                  components: {
                    RowLabel:
                      '@/collections/Products/components/CommunicationRowLabel#CommunicationRowLabel',
                  },
                },
                fields: [
                  {
                    name: 'type',
                    type: 'select',
                    label: {
                      en: 'Communication Type',
                      es: 'Tipo de Comunicación',
                    },
                    options: [
                      {
                        label: 'Puerto Serial RS-232',
                        value: 'rs232',
                      },
                      {
                        label: 'USB',
                        value: 'usb',
                      },
                      {
                        label: 'WiFi',
                        value: 'wifi',
                      },
                      {
                        label: 'Ethernet',
                        value: 'ethernet',
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
                      en: 'Communication Description',
                      es: 'Descripción de Comunicación',
                    },
                    admin: {
                      placeholder: 'ej: para programación de PLUs',
                    },
                  },
                ],
              },
              // Teclado
              {
                name: 'keyboard',
                type: 'group',
                label: {
                  en: 'Keyboard',
                  es: 'Teclado',
                },
                fields: [
                  {
                    name: 'keys',
                    type: 'number',
                    label: {
                      en: 'Number of Keys',
                      es: 'Número de Teclas',
                    },
                    admin: {
                      placeholder: 'ej: 78, 26, 12',
                    },
                  },
                  {
                    name: 'description',
                    type: 'text',
                    label: {
                      en: 'Keyboard Description',
                      es: 'Descripción del Teclado',
                    },
                    admin: {
                      placeholder: 'ej: 5 Teclas, 40 Teclas',
                    },
                  },
                ],
              },
              // Temperatura de operación
              {
                name: 'operatingTemperature',
                type: 'text',
                label: {
                  en: 'Operating Temperature',
                  es: 'Temperatura de Operación',
                },
                admin: {
                  placeholder: 'ej: 0°C - 40°C, 5°C - 40°C',
                },
              },
              // Dimensiones generales
              {
                name: 'dimensions',
                type: 'text',
                label: {
                  en: 'Overall Dimensions',
                  es: 'Medidas Generales',
                },
                admin: {
                  placeholder: 'ej: 33cm x 32cm x 11cm, 84cm x 100cm',
                },
              },
              // Incluye (accesorios específicos de báscula)
              {
                name: 'includes',
                type: 'array',
                label: {
                  en: 'Includes',
                  es: 'Incluye',
                },
                labels: {
                  singular: {
                    en: 'Included Item',
                    es: 'Artículo Incluido',
                  },
                  plural: {
                    en: 'Included Items',
                    es: 'Artículos Incluidos',
                  },
                },
                admin: {
                  components: {
                    RowLabel: '@/collections/Products/components/IncludesRowLabel#IncludesRowLabel',
                  },
                },
                fields: [
                  {
                    name: 'item',
                    type: 'text',
                    label: {
                      en: 'Item',
                      es: 'Artículo',
                    },
                    required: true,
                    admin: {
                      placeholder: 'ej: Software iTegra, 5000 memorias PLU expandibles',
                    },
                  },
                  iconPickerField({
                    name: 'icon',
                    label: {
                      en: 'Item Icon',
                      es: 'Ícono',
                    },
                  }),
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
            name: 'consumableSpecs',
            type: 'group',
            label: {
              en: 'Consumable Technical Details',
              es: 'Detalles Técnicos del Consumible',
            },
            fields: [
              // Tipo de consumible
              {
                name: 'consumableType',
                type: 'select',
                label: {
                  en: 'Consumable Type',
                  es: 'Tipo de Consumible',
                },
                options: [
                  {
                    label: 'Cargador/Eliminador',
                    value: 'charger_eliminator',
                  },
                  {
                    label: 'Batería',
                    value: 'battery',
                  },
                  {
                    label: 'Cable',
                    value: 'cable',
                  },
                  {
                    label: 'Accesorio',
                    value: 'accessory',
                  },
                  {
                    label: 'Repuesto',
                    value: 'spare_part',
                  },
                ],
                required: true,
              },
              // Especificaciones eléctricas
              {
                name: 'electricalSpecs',
                type: 'group',
                label: {
                  en: 'Electrical Specifications',
                  es: 'Especificaciones Eléctricas',
                },
                fields: [
                  {
                    name: 'inputVoltage',
                    type: 'text',
                    label: {
                      en: 'Input Voltage',
                      es: 'Voltaje de Entrada',
                    },
                    admin: {
                      placeholder: 'ej: 110-240V AC, 127Vca 60Hz',
                    },
                  },
                  {
                    name: 'outputVoltage',
                    type: 'text',
                    label: {
                      en: 'Output Voltage',
                      es: 'Voltaje de Salida',
                    },
                    admin: {
                      placeholder: 'ej: 11,4W 2.5A, 6V / 500mA',
                    },
                  },
                  {
                    name: 'power',
                    type: 'text',
                    label: {
                      en: 'Power',
                      es: 'Potencia',
                    },
                    admin: {
                      placeholder: 'ej: 50W, 96W',
                    },
                  },
                  {
                    name: 'frequency',
                    type: 'text',
                    label: {
                      en: 'Frequency',
                      es: 'Frecuencia',
                    },
                    admin: {
                      placeholder: 'ej: 50-60Hz',
                    },
                  },
                ],
              },
              // Compatibilidad
              {
                name: 'compatibility',
                type: 'array',
                label: {
                  en: 'Compatible Models',
                  es: 'Modelos Compatibles',
                },
                labels: {
                  singular: {
                    en: 'Compatible Model',
                    es: 'Modelo Compatible',
                  },
                  plural: {
                    en: 'Compatible Models',
                    es: 'Modelos Compatibles',
                  },
                },
                admin: {
                  components: {
                    RowLabel:
                      '@/collections/Products/components/CompatibilityRowLabel#CompatibilityRowLabel',
                  },
                },
                fields: [
                  {
                    name: 'model',
                    type: 'text',
                    label: {
                      en: 'Compatible Model',
                      es: 'Modelo Compatible',
                    },
                    required: true,
                    admin: {
                      placeholder: 'ej: Kretz Report LTP, Torrey LPCR-40',
                    },
                  },
                ],
              },
              // Dimensiones físicas
              {
                name: 'physicalSpecs',
                type: 'group',
                label: {
                  en: 'Physical Specifications',
                  es: 'Especificaciones Físicas',
                },
                fields: [
                  {
                    name: 'dimensions',
                    type: 'text',
                    label: {
                      en: 'Dimensions',
                      es: 'Dimensiones',
                    },
                    admin: {
                      placeholder: 'ej: 15cm x 8cm x 4cm',
                    },
                  },
                  {
                    name: 'weight',
                    type: 'text',
                    label: {
                      en: 'Weight',
                      es: 'Peso',
                    },
                    admin: {
                      placeholder: 'ej: 0.5 kg',
                    },
                  },
                  {
                    name: 'cableLength',
                    type: 'text',
                    label: {
                      en: 'Cable Length',
                      es: 'Longitud del Cable',
                    },
                    admin: {
                      condition: (data) =>
                        data?.consumableType === 'cable' ||
                        data?.consumableType === 'charger_eliminator',
                      placeholder: 'ej: 1.5 metros',
                    },
                  },
                ],
              },
              // Vida útil y garantía
              {
                name: 'lifespan',
                type: 'group',
                label: {
                  en: 'Lifespan & Warranty',
                  es: 'Vida Útil y Garantía',
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
                      placeholder: 'ej: 2 años, 1000 ciclos de carga',
                    },
                  },
                  {
                    name: 'warrantyPeriod',
                    type: 'text',
                    label: {
                      en: 'Warranty Period',
                      es: 'Período de Garantía',
                    },
                    admin: {
                      placeholder: 'ej: 12 meses',
                    },
                  },
                ],
              },
              // Certificaciones
              {
                name: 'certifications',
                type: 'array',
                label: {
                  en: 'Certifications',
                  es: 'Certificaciones',
                },
                labels: {
                  singular: {
                    en: 'Certification',
                    es: 'Certificación',
                  },
                  plural: {
                    en: 'Certifications',
                    es: 'Certificaciones',
                  },
                },
                admin: {
                  components: {
                    RowLabel:
                      '@/collections/Products/components/CertificationsRowLabel#CertificationsRowLabel',
                  },
                },
                fields: [
                  {
                    name: 'certification',
                    type: 'select',
                    label: {
                      en: 'Certification',
                      es: 'Certificación',
                    },
                    dbName: 'cert_type', // Shortened database name to avoid 63-char limit
                    options: [
                      {
                        label: 'CE',
                        value: 'ce',
                      },
                      {
                        label: 'FCC',
                        value: 'fcc',
                      },
                      {
                        label: 'UL',
                        value: 'ul',
                      },
                      {
                        label: 'RoHS',
                        value: 'rohs',
                      },
                    ],
                    required: true,
                  },
                ],
              },
              // Condiciones de operación
              {
                name: 'operatingConditions',
                type: 'group',
                label: {
                  en: 'Operating Conditions',
                  es: 'Condiciones de Operación',
                },
                fields: [
                  {
                    name: 'temperature',
                    type: 'text',
                    label: {
                      en: 'Operating Temperature',
                      es: 'Temperatura de Operación',
                    },
                    admin: {
                      placeholder: 'ej: 0°C - 40°C',
                    },
                  },
                  {
                    name: 'humidity',
                    type: 'text',
                    label: {
                      en: 'Humidity',
                      es: 'Humedad',
                    },
                    admin: {
                      placeholder: 'ej: 85% RH máximo',
                    },
                  },
                ],
              },
              // Incluye (accesorios del consumible)
              {
                name: 'includes',
                type: 'array',
                label: {
                  en: 'Includes',
                  es: 'Incluye',
                },
                labels: {
                  singular: {
                    en: 'Included Item',
                    es: 'Artículo Incluido',
                  },
                  plural: {
                    en: 'Included Items',
                    es: 'Artículos Incluidos',
                  },
                },
                admin: {
                  components: {
                    RowLabel: '@/collections/Products/components/IncludesRowLabel#IncludesRowLabel',
                  },
                },
                fields: [
                  {
                    name: 'item',
                    type: 'text',
                    label: {
                      en: 'Item',
                      es: 'Artículo',
                    },
                    required: true,
                    admin: {
                      placeholder: 'ej: Cable de corriente de uso rude de 110Vca',
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
