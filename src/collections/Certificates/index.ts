import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'
import { contentLexicalEditor } from '@/fields/contentLexical'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  trash: true,
  indexes: [
    {
      fields: ['title'],
    },
  ],
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  labels: {
    singular: {
      en: 'Certificado',
      es: 'Certificado',
    },
    plural: {
      en: 'Certificados',
      es: 'Certificados',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'content', 'createdAt'],
    description: 'Administra los certificados del sitio: crea, edita y elimina certificados',
    group: 'Control Interno',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        es: 'Título',
      },
      required: true,
    },
    {
      name: 'certificate',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'suppliers',
      type: 'relationship',
      relationTo: 'suppliers',
      hasMany: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: {
        en: 'Content',
        es: 'Contenido',
      },
      editor: contentLexicalEditor,
    },
  ],
}
