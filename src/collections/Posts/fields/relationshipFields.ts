import type { Field } from 'payload'

export const relationshipFields: Field[] = [
  {
    name: 'relatedPosts',
    type: 'relationship',
    label: {
      en: 'Related Posts',
      es: 'Publicaciones Relacionadas',
    },
    admin: {
      position: 'sidebar',
    },
    filterOptions: ({ id }) => {
      return {
        id: {
          not_in: [id],
        },
      }
    },
    hasMany: true,
    relationTo: 'posts',
  },
  {
    name: 'categories',
    type: 'relationship',
    label: {
      en: 'Categories',
      es: 'Categorías',
    },
    admin: {
      position: 'sidebar',
    },
    hasMany: true,
    relationTo: 'categories',
  },
]
