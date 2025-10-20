import type {
  Post,
  Media,
  User,
  Product,
  Page,
  Brand,
  Model,
  Category,
  Service,
  Manual,
} from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

export const PostSchema = (props: Post) => {
  if (!props) return null

  const authors = props.authors as User[]
  const url: string = getServerSideURL()
  const image: Media = props.meta?.image as Media

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    datePublished: new Date(props.createdAt).toISOString(),
    dateModified: new Date(props.updatedAt).toISOString(),
    image: [`${process.env.S3_ENDPOINT}/${image?.filename}`],
    author:
      authors?.map((author: User) => ({
        '@type': 'Person',
        name: author.name,
      })) || [],
    publisher: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/posts/${props.slug}`,
    },
  }
}

export const MediaSchema = (props: Media) => {
  if (!props) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: props.url ? `${process.env.S3_ENDPOINT}/${props.filename}` : undefined,
    width: props.width,
    height: props.height,
    caption: props.alt,
    name: props.alt || props.filename,
    encodingFormat: props.mimeType,
    contentSize: props.filesize,
  }
}

export const ProductSchema = (props: Product) => {
  if (!props) return null

  const url: string = getServerSideURL()
  const brand = props.brand as Brand
  const model = props.model as Model
  const heroImage = props.heroImage as Media
  const categories = props.categories as Category[]
  const metaImage = props.meta?.image as Media

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.title,
    description: props.meta?.description || `${props.title} de la marca ${brand?.title}`,
    brand: {
      '@type': 'Brand',
      name: brand?.title,
    },
    model: model?.title,
    category: categories
      ?.map((cat) => (typeof cat === 'object' ? cat.title : undefined))
      .filter(Boolean)
      .join(', '),
    image:
      `${process.env.S3_ENDPOINT}/${heroImage.filename}` ||
      `${process.env.S3_ENDPOINT}/${metaImage.filename}`,
    url: `${url}/products/${props.slug}`,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Garantía',
        value: `${props.warranty} días`,
      },
    ].filter(Boolean),
    manufacturer: {
      '@type': 'Organization',
      name: brand?.title || 'BGL Básculas Industriales',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/products/${props.slug}`,
    },
  }
}

export const PageSchema = (props: Page) => {
  if (!props) return null

  const url: string = getServerSideURL()
  const metaImage = props.meta?.image as Media

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: props.title,
    description: props.meta?.description,
    url: `${url}/${props.slug}`,
    image: metaImage?.url ? `${process.env.S3_ENDPOINT}/${metaImage.filename}` : undefined,
    datePublished: props.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      url: url,
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      description: 'Empresa líder en básculas industriales y equipos de pesaje de alta precisión',
      url: url,
    },
  }
}

export const ServiceSchema = (props: Service) => {
  if (!props) return null

  const url: string = getServerSideURL()
  const metaImage = props.meta?.image as Media

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: props.title,
    description: props.meta?.description,
    url: `${url}/${props.slug}`,
    image: metaImage?.url ? `${process.env.S3_ENDPOINT}/${metaImage.filename}` : undefined,
    datePublished: props.createdAt,
    dateModified: props.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      url: url,
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      description: 'Empresa líder en básculas industriales y equipos de pesaje de alta precisión',
      url: url,
    },
  }
}

export const ManualSchema = (props: Manual) => {
  if (!props) return null

  const url: string = getServerSideURL()
  const metaImage = props.meta?.image as Media

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: props.title,
    description: props.meta?.description,
    url: `${url}/${props.slug}`,
    image: metaImage?.url ? `${process.env.S3_ENDPOINT}/${metaImage.filename}` : undefined,
    datePublished: props.createdAt,
    dateModified: props.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      url: url,
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      description: 'Empresa líder en básculas industriales y equipos de pesaje de alta precisión',
      url: url,
    },
  }
}
