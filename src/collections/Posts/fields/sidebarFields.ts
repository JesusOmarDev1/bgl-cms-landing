import type { Field } from 'payload'

export const sidebarFields: Field[] = [
  {
    name: 'publishedAt',
    label: {
      en: 'Published Date',
      es: 'Fecha de Publicación',
    },
    type: 'date',
    admin: {
      date: {
        pickerAppearance: 'dayAndTime',
      },
      position: 'sidebar',
    },
    hooks: {
      beforeChange: [
        ({ siblingData, value }) => {
          if (siblingData._status === 'published' && !value) {
            return new Date()
          }
          return value
        },
      ],
    },
  },
  {
    name: 'authors',
    label: {
      en: 'Authors',
      es: 'Autores',
    },
    type: 'relationship',
    admin: {
      position: 'sidebar',
    },
    hasMany: true,
    relationTo: 'users',
  },
  {
    name: 'populatedAuthors',
    type: 'array',
    access: {
      update: () => false,
    },
    admin: {
      disabled: true,
      readOnly: true,
    },
    fields: [
      {
        name: 'id',
        type: 'text',
      },
      {
        name: 'name',
        type: 'text',
      },
    ],
  },
]
