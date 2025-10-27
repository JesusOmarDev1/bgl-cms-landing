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
import { getServerSideURL } from '@/utilities/url/utils'

export const PostSchema = (props: Post) => {
  if (!props) return null

  const authors = props.authors as User[]
  const url: string = getServerSideURL()
  const image: Media = props.meta?.image as Media
  const heroImage: Media = props.heroImage as Media
  const categories = props.categories as Category[]

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    alternativeHeadline: props.meta?.title,
    description: props.meta?.description,
    datePublished: props.publishedAt
      ? new Date(props.publishedAt).toISOString()
      : new Date(props.createdAt).toISOString(),
    dateModified: new Date(props.updatedAt).toISOString(),
    image: [
      image?.filename
        ? `${process.env.S3_ENDPOINT}/${image.filename}`
        : `${process.env.S3_ENDPOINT}/${heroImage?.filename}`,
    ].filter(Boolean),
    author:
      authors?.map((author: User) => ({
        '@type': 'Person',
        name: author.name,
        givenName: author.firstName,
        familyName: author.lastName,
        ...(author.avatar && {
          image: `${process.env.S3_ENDPOINT}/${(author.avatar as Media)?.filename}`,
        }),
      })) || [],
    publisher: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      url: url,
      logo: {
        '@type': 'ImageObject',
        url: `${url}/favicon-light.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/posts/${props.slug}`,
    },
    articleSection: categories
      ?.map((cat) => (typeof cat === 'object' ? cat.title : undefined))
      .filter(Boolean),
    keywords: categories
      ?.map((cat) => (typeof cat === 'object' ? cat.title : undefined))
      .filter(Boolean)
      .join(', '),
    wordCount: props.content?.root?.children?.length || 0,
    inLanguage: 'es-MX',
    copyrightYear: new Date(props.createdAt).getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
    },
  }
}

export const MediaSchema = (props: Media) => {
  if (!props) return null

  const url: string = getServerSideURL()

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: props.filename ? `${process.env.S3_ENDPOINT}/${props.filename}` : props.url,
    contentUrl: props.filename ? `${process.env.S3_ENDPOINT}/${props.filename}` : props.url,
    width: props.width,
    height: props.height,
    caption: props.alt,
    name: props.alt || props.filename,
    alternateName: props.filename,
    description: (props.content?.root?.children?.[0] as any)?.children?.[0]?.text || props.alt,
    encodingFormat: props.mimeType,
    contentSize: props.filesize,
    uploadDate: new Date(props.createdAt).toISOString(),
    dateModified: new Date(props.updatedAt).toISOString(),
    creator: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      url: url,
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
    },
    license: `${url}/terms`,
    acquireLicensePage: `${url}/contact`,
    ...(props.sizes && {
      thumbnail: props.sizes.thumbnail?.url
        ? `${process.env.S3_ENDPOINT}/${props.sizes.thumbnail.filename}`
        : undefined,
    }),
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

  // Build additional properties from specs
  const additionalProperties = [
    props.warranty && {
      '@type': 'PropertyValue',
      name: 'Garantía',
      value: `${props.warranty}`,
    },
    props.productCode && {
      '@type': 'PropertyValue',
      name: 'Código de Producto',
      value: props.productCode,
    },
    props.type && {
      '@type': 'PropertyValue',
      name: 'Tipo',
      value: props.type,
    },
    // Scale specific properties
    props.scaleSpecs?.capacity?.maximum && {
      '@type': 'PropertyValue',
      name: 'Capacidad Máxima',
      value: props.scaleSpecs.capacity.maximum,
    },
    props.scaleSpecs?.platform?.dimensions && {
      '@type': 'PropertyValue',
      name: 'Dimensiones de Plataforma',
      value: props.scaleSpecs.platform.dimensions,
    },
    // General specs
    props.generalSpecs?.physicalSpecs?.dimensions && {
      '@type': 'PropertyValue',
      name: 'Dimensiones',
      value: props.generalSpecs.physicalSpecs.dimensions,
    },
    props.generalSpecs?.physicalSpecs?.weight && {
      '@type': 'PropertyValue',
      name: 'Peso',
      value: props.generalSpecs.physicalSpecs.weight,
    },
  ].filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.title,
    alternateName: model?.title,
    description:
      props.meta?.description || props.excerpt || `${props.title} de la marca ${brand?.title}`,
    brand: {
      '@type': 'Brand',
      name: brand?.title,
      ...(brand?.heroImage && {
        logo: `${process.env.S3_ENDPOINT}/${(brand.heroImage as Media)?.filename}`,
      }),
    },
    model: model?.title,
    mpn: props.productCode,
    sku: props.productCode,
    category: categories
      ?.map((cat) => (typeof cat === 'object' ? cat.title : undefined))
      .filter(Boolean)
      .join(', '),
    image: [
      heroImage?.filename ? `${process.env.S3_ENDPOINT}/${heroImage.filename}` : undefined,
      metaImage?.filename ? `${process.env.S3_ENDPOINT}/${metaImage.filename}` : undefined,
      ...(props.gallery?.map(
        (item) => `${process.env.S3_ENDPOINT}/${(item.image as Media)?.filename}`,
      ) || []),
    ].filter(Boolean),
    url: `${url}/products/${props.slug}`,
    additionalProperty: additionalProperties,
    manufacturer: {
      '@type': 'Organization',
      name: brand?.title || 'BGL Básculas Industriales',
      url: url,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '1',
      bestRating: '5',
      worstRating: '1',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '4.5',
        bestRating: '5',
      },
      author: {
        '@type': 'Organization',
        name: 'BGL Básculas Industriales',
      },
      reviewBody: props.meta?.description || `Excelente ${props.title} de la marca ${brand?.title}`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/products/${props.slug}`,
    },
    datePublished: props.publishedAt
      ? new Date(props.publishedAt).toISOString()
      : new Date(props.createdAt).toISOString(),
    dateModified: new Date(props.updatedAt).toISOString(),
    inLanguage: 'es-MX',
    ...(props.features?.length && {
      features: props.features.map((feature) => feature.feature),
    }),
    ...(props.applications?.length && {
      applicationCategory: props.applications.map((app) => app.application),
    }),
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
    alternateName: props.meta?.title,
    description: props.meta?.description,
    url: `${url}/${props.slug === 'home' ? '' : props.slug}`,
    image: metaImage?.filename ? `${process.env.S3_ENDPOINT}/${metaImage.filename}` : undefined,
    datePublished: props.publishedAt
      ? new Date(props.publishedAt).toISOString()
      : new Date(props.createdAt).toISOString(),
    dateModified: new Date(props.updatedAt).toISOString(),
    inLanguage: 'es-MX',
    isPartOf: {
      '@type': 'WebSite',
      name: 'BGL Básculas Industriales',
      url: url,
      description: 'Empresa líder en básculas industriales y equipos de pesaje de alta precisión',
      publisher: {
        '@type': 'Organization',
        name: 'BGL Básculas Industriales',
        url: url,
        logo: {
          '@type': 'ImageObject',
          url: `${url}/favicon-light.png`,
        },
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      url: url,
      logo: {
        '@type': 'ImageObject',
        url: `${url}/favicon-light.png`,
      },
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      description: 'Empresa líder en básculas industriales y equipos de pesaje de alta precisión',
      url: url,
      logo: {
        '@type': 'ImageObject',
        url: `${url}/favicon-light.png`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'Spanish',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: url,
        },
        ...(props.slug !== 'home'
          ? [
              {
                '@type': 'ListItem',
                position: 2,
                name: props.title,
                item: `${url}/${props.slug}`,
              },
            ]
          : []),
      ],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export const ServiceSchema = (props: Service) => {
  if (!props) return null

  const url: string = getServerSideURL()
  const metaImage = props.meta?.image as Media
  const heroImage = props.heroImage as Media

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: props.title,
    description: props.meta?.description,
    url: `${url}/services/${props.slug}`,
    image: [
      metaImage?.filename ? `${process.env.S3_ENDPOINT}/${metaImage.filename}` : undefined,
      heroImage?.filename ? `${process.env.S3_ENDPOINT}/${heroImage.filename}` : undefined,
    ].filter(Boolean),
    datePublished: props.publishedAt
      ? new Date(props.publishedAt).toISOString()
      : new Date(props.createdAt).toISOString(),
    dateModified: new Date(props.updatedAt).toISOString(),
    inLanguage: 'es-MX',
    provider: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      url: url,
      logo: {
        '@type': 'ImageObject',
        url: `${url}/favicon-light.png`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'Spanish',
      },
    },
    serviceType: 'Servicios de Básculas Industriales',
    areaServed: {
      '@type': 'Country',
      name: 'México',
    },
    ...(props.price && {
      offers: {
        '@type': 'Offer',
        price: props.total || props.price,
        priceCurrency: 'MXN',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'BGL Básculas Industriales',
          url: url,
        },
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        ...(props.discount && {
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: props.price,
            priceCurrency: 'MXN',
            valueAddedTaxIncluded: props.iva || false,
          },
        }),
      },
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1',
      bestRating: '5',
      worstRating: '1',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '4.8',
        bestRating: '5',
      },
      author: {
        '@type': 'Organization',
        name: 'BGL Básculas Industriales',
      },
      reviewBody: `Excelente servicio de ${props.title} proporcionado por BGL Básculas Industriales`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/services/${props.slug}`,
      name: props.title,
      description: props.meta?.description,
      publisher: {
        '@type': 'Organization',
        name: 'BGL Básculas Industriales',
        url: url,
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Servicios',
          item: `${url}/services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: props.title,
          item: `${url}/services/${props.slug}`,
        },
      ],
    },
  }
}

export const ManualSchema = (props: Manual) => {
  if (!props) return null

  const url: string = getServerSideURL()
  const metaImage = props.meta?.image as Media
  const heroImage = props.heroImage as Media
  const categories = props.categories as Category[]

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: props.title,
    alternativeHeadline: props.meta?.title,
    description: props.meta?.description,
    url: `${url}/manuals/${props.slug}`,
    image: [
      metaImage?.filename ? `${process.env.S3_ENDPOINT}/${metaImage.filename}` : undefined,
      heroImage?.filename ? `${process.env.S3_ENDPOINT}/${heroImage.filename}` : undefined,
    ].filter(Boolean),
    datePublished: props.publishedAt
      ? new Date(props.publishedAt).toISOString()
      : new Date(props.createdAt).toISOString(),
    dateModified: new Date(props.updatedAt).toISOString(),
    inLanguage: 'es-MX',
    author: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      url: url,
      logo: {
        '@type': 'ImageObject',
        url: `${url}/favicon-light.png`,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
      url: url,
      logo: {
        '@type': 'ImageObject',
        url: `${url}/favicon-light.png`,
      },
    },
    about: {
      '@type': 'Thing',
      name: 'Básculas Industriales',
      description: 'Manuales técnicos y guías de uso para equipos de pesaje industrial',
    },
    genre: 'Manual Técnico',
    keywords: categories
      ?.map((cat) => (typeof cat === 'object' ? cat.title : undefined))
      .filter(Boolean)
      .join(', '),
    articleSection: categories
      ?.map((cat) => (typeof cat === 'object' ? cat.title : undefined))
      .filter(Boolean),
    educationalLevel: 'Técnico',
    learningResourceType: 'Manual',
    typicalAgeRange: '18-',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/manuals/${props.slug}`,
      name: props.title,
      description: props.meta?.description,
      publisher: {
        '@type': 'Organization',
        name: 'BGL Básculas Industriales',
        url: url,
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Manuales',
          item: `${url}/manuals`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: props.title,
          item: `${url}/manuals/${props.slug}`,
        },
      ],
    },
    isAccessibleForFree: true,
    copyrightYear: new Date(props.createdAt).getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: 'BGL Básculas Industriales',
    },
    license: `${url}/terms`,
    ...(props.relatedManuals?.length && {
      relatedLink: props.relatedManuals.map(
        (manual) => `${url}/manuals/${typeof manual === 'object' ? manual.slug : manual}`,
      ),
    }),
  }
}
