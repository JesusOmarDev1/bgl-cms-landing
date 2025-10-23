import type { Field } from 'payload'
import { contentLexicalEditor } from '@/fields/contentLexical'
import { iconPickerField } from '@/fields/iconPicker'

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
    name: 'excerpt',
    type: 'textarea',
    label: {
      en: 'Excerpt',
      es: 'Extracto',
    },
    admin: {
      description: 'Breve descripción del producto que aparecerá como introducción',
      rows: 3,
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
    required: true,
    label: {
      en: 'Product Type',
      es: 'Tipo de Producto',
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
    admin: {
      description:
        'Selecciona el tipo de producto para mostrar campos específicos en la pestaña de detalles técnicos',
    },
  },
  {
    name: 'productCode',
    type: 'text',
    label: {
      en: 'Product Code',
      es: 'Código de Producto',
    },
    admin: {
      description: 'Código interno del producto (SKU)',
      placeholder: 'ej: FT-01-K, FT-02-T',
    },
  },
  {
    name: 'status',
    type: 'select',
    label: {
      en: 'Product Status',
      es: 'Estado del Producto',
    },
    defaultValue: 'active',
    options: [
      {
        label: 'Activo',
        value: 'active',
      },
      {
        label: 'Descontinuado',
        value: 'discontinued',
      },
      {
        label: 'Próximamente',
        value: 'coming_soon',
      },
      {
        label: 'Agotado',
        value: 'out_of_stock',
      },
    ],
    admin: {
      description: 'Estado actual del producto en el catálogo',
    },
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
    name: 'gallery',
    type: 'array',
    label: {
      en: 'Product Gallery',
      es: 'Galería del Producto',
    },
    labels: {
      singular: {
        en: 'Gallery Image',
        es: 'Imagen de Galería',
      },
      plural: {
        en: 'Gallery Images',
        es: 'Imágenes de Galería',
      },
    },
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: true,
        label: {
          en: 'Image',
          es: 'Imagen',
        },
      },
      {
        name: 'alt',
        type: 'text',
        label: {
          en: 'Alt Text',
          es: 'Texto Alternativo',
        },
        admin: {
          placeholder: 'Descripción de la imagen para accesibilidad',
        },
      },
      {
        name: 'caption',
        type: 'text',
        label: {
          en: 'Caption',
          es: 'Leyenda',
        },
        admin: {
          placeholder: 'Leyenda opcional para la imagen',
        },
      },
    ],
    admin: {
      description: 'Imágenes adicionales del producto',
      components: {
        RowLabel: '@/collections/Products/components/GalleryRowLabel#GalleryRowLabel',
      },
    },
  },
  {
    name: 'features',
    type: 'array',
    label: {
      en: 'Key Features',
      es: 'Características Principales',
    },
    labels: {
      singular: {
        en: 'Feature',
        es: 'Característica',
      },
      plural: {
        en: 'Features',
        es: 'Características',
      },
    },
    fields: [
      {
        name: 'feature',
        type: 'text',
        required: true,
        label: {
          en: 'Feature',
          es: 'Característica',
        },
        admin: {
          placeholder: 'ej: Capacidad multirango, Display LED de alta visibilidad',
        },
      },
      iconPickerField({
        name: 'icon',
        label: {
          en: 'Icon',
          es: 'Icono',
        },
      }),
    ],
    admin: {
      description: 'Características destacadas que aparecerán en la ficha técnica',
      components: {
        RowLabel: '@/collections/Products/components/FeaturesRowLabel#FeaturesRowLabel',
      },
    },
  },
  {
    name: 'applications',
    type: 'array',
    label: {
      en: 'Applications',
      es: 'Aplicaciones',
    },
    labels: {
      singular: {
        en: 'Application',
        es: 'Aplicación',
      },
      plural: {
        en: 'Applications',
        es: 'Aplicaciones',
      },
    },
    admin: {
      description: 'Aplicaciones y usos recomendados para el producto',
      components: {
        RowLabel: '@/collections/Products/components/ApplicationsRowLabel#ApplicationsRowLabel',
      },
    },
    fields: [
      {
        name: 'application',
        type: 'text',
        label: {
          en: 'Application',
          es: 'Aplicación',
        },
        required: true,
        admin: {
          placeholder: 'ej: Retail/Comercio, Abarrotes, Mercados rodantes, Punto de venta, etc.',
        },
      },
    ],
  },
  {
    name: 'content',
    type: 'richText',
    editor: contentLexicalEditor,
    label: {
      en: 'Detailed Description',
      es: 'Descripción Detallada',
    },
    admin: {
      description: 'Descripción completa del producto con detalles adicionales',
    },
  },
]
