import type { Block } from 'payload'

export const ClientsLoop: Block = {
  slug: 'clientsLoop',
  interfaceName: 'ClientsLoopBlock',
  labels: {
    singular: {
      en: 'Clients Loop',
      es: 'Carrusel de Clientes',
    },
    plural: {
      en: 'Clients Loops',
      es: 'Carruseles de Clientes',
    },
  },

  fields: [
    {
      name: 'clients',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
      label: {
        en: 'Clients',
        es: 'Clientes',
      },
      required: true,
      admin: {
        description: {
          en: 'Select the clients to display in the loop. Only clients with hero images will be shown.',
          es: 'Selecciona los clientes a mostrar en el carrusel. Solo se mostrarán clientes con imagen de portada.',
        },
      },
    },
    {
      name: 'speed',
      type: 'number',
      label: {
        en: 'Animation Speed',
        es: 'Velocidad de Animación',
      },
      defaultValue: 120,
      min: 0,
      max: 500,
      admin: {
        description: {
          en: 'Speed of the animation in pixels per second. Higher values = faster movement.',
          es: 'Velocidad de la animación en píxeles por segundo. Valores más altos = movimiento más rápido.',
        },
        step: 10,
      },
    },
    {
      name: 'direction',
      type: 'select',
      label: {
        en: 'Direction',
        es: 'Dirección',
      },
      defaultValue: 'left',
      options: [
        {
          label: {
            en: 'Left (→)',
            es: 'Izquierda (→)',
          },
          value: 'left',
        },
        {
          label: {
            en: 'Right (←)',
            es: 'Derecha (←)',
          },
          value: 'right',
        },
      ],
      admin: {
        description: {
          en: 'Direction of the animation movement',
          es: 'Dirección del movimiento de la animación',
        },
      },
    },
    {
      name: 'logoHeight',
      type: 'number',
      label: {
        en: 'Logo Height',
        es: 'Altura del Logo',
      },
      defaultValue: 60,
      min: 20,
      max: 200,
      admin: {
        description: {
          en: 'Height of the client logos in pixels',
          es: 'Altura de los logos de clientes en píxeles',
        },
        step: 5,
      },
    },
    {
      name: 'gap',
      type: 'number',
      label: {
        en: 'Gap Between Logos',
        es: 'Espacio Entre Logos',
      },
      defaultValue: 48,
      min: 10,
      max: 100,
      admin: {
        description: {
          en: 'Space between logos in pixels',
          es: 'Espacio entre logos en píxeles',
        },
        step: 4,
      },
    },
    {
      name: 'pauseOnHover',
      type: 'checkbox',
      label: {
        en: 'Pause on Hover',
        es: 'Pausar al Pasar el Mouse',
      },
      defaultValue: true,
      admin: {
        description: {
          en: 'Pause the animation when hovering over the component',
          es: 'Pausar la animación al pasar el mouse sobre el componente',
        },
      },
    },
    {
      name: 'fadeOut',
      type: 'checkbox',
      label: {
        en: 'Fade Out Edges',
        es: 'Desvanecer Bordes',
      },
      defaultValue: true,
      admin: {
        description: {
          en: 'Add fade out effect at the edges for a smoother look',
          es: 'Agregar efecto de desvanecimiento en los bordes para una apariencia más suave',
        },
      },
    },
    {
      name: 'scaleOnHover',
      type: 'checkbox',
      label: {
        en: 'Scale on Hover',
        es: 'Escalar al Pasar el Mouse',
      },
      defaultValue: true,
      admin: {
        description: {
          en: 'Scale up logos slightly when hovering over them',
          es: 'Escalar ligeramente los logos al pasar el mouse sobre ellos',
        },
      },
    },
  ],
}
