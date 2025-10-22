import type { Field } from 'payload'
import { contentLexicalEditor } from '@/fields/contentLexical'

export const generalFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    label: {
      en: 'Title',
      es: 'Título',
    },
    admin: {
      description: 'Nombre del producto que aparecerá en el sitio web',
    },
  },
  {
    name: 'brand',
    type: 'relationship',
    label: {
      en: 'Brand',
      es: 'Marca',
    },
    relationTo: 'brands',
    required: true,
    admin: {
      description: 'La marca es el fabricante del producto',
    },
  },
  {
    name: 'model',
    type: 'relationship',
    label: {
      en: 'Model',
      es: 'Modelo',
    },
    relationTo: 'models',
    required: true,
    filterOptions: ({ data }) => {
      const brandId = data?.brand?.id || data?.brand

      if (!brandId) {
        return true
      }

      return {
        brand: { equals: brandId },
      }
    },
    admin: {
      description: 'El modelo específico del producto',
    },
  },
  {
    name: 'supplier',
    type: 'relationship',
    label: {
      en: 'Supplier',
      es: 'Proveedor',
    },
    hasMany: true,
    relationTo: 'suppliers',
    admin: {
      description: 'Los proveedores son las empresas que suministran el producto',
    },
  },
  {
    name: 'warranty',
    type: 'text',
    label: {
      en: 'Warranty (Days)',
      es: 'Garantía (Días)',
    },
    admin: {
      description: 'La garantía es el periodo de tiempo que se ofrece por el producto',
    },
  },
  {
    name: 'type',
    type: 'select',
    label: {
      en: 'Type',
      es: 'Tipo',
    },
    defaultValue: 'general',
    options: [
      {
        label: 'General',
        value: 'general',
      },
      {
        label: 'Báscula',
        value: 'scale',
      },
      {
        label: 'Consumible',
        value: 'consumable',
      },
    ],
  },
  {
    name: 'categories',
    type: 'relationship',
    label: {
      en: 'Categories',
      es: 'Categorías',
    },
    admin: {
      description:
        'Puede ser una categoria general o por ejemplo "Basculas Comerciales", "Cargadores", etc.',
    },
    hasMany: true,
    relationTo: 'categories',
  },
  {
    name: 'heroImage',
    type: 'upload',
    relationTo: 'media',
    label: {
      en: 'Hero Image',
      es: 'Imagen de Portada',
    },
    required: true,
    admin: {
      description: 'Imagen principal que representa el producto',
    },
  },
  {
    name: 'content',
    type: 'richText',
    editor: contentLexicalEditor,
    label: {
      en: 'Content',
      es: 'Contenido',
    },
    required: true,
    admin: {
      description: 'Descripción detallada del producto',
    },
  },
]
