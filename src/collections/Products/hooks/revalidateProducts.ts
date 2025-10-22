import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Product } from '../../../payload-types'

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  try {
    // Revalidar tags específicos
    revalidateTag(`product_${doc.slug}`)
    revalidateTag('products_list')
    revalidateTag('products-sitemap')

    // Si está publicado, revalidar la página del producto
    if (doc._status === 'published') {
      const path = `/products/${doc.slug}`
      revalidatePath(path)
      revalidatePath('/products') // Lista de productos

      payload.logger.info(`Revalidated published product: ${doc.title}`, {
        productId: doc.id,
        slug: doc.slug,
        path,
      })
    }

    // Si cambió de publicado a borrador, revalidar la página antigua
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/products/${previousDoc.slug}`
      revalidatePath(oldPath)

      payload.logger.info(`Revalidated unpublished product: ${previousDoc.title}`, {
        productId: doc.id,
        oldSlug: previousDoc.slug,
        oldPath,
      })
    }

    // Si cambió la categoría, revalidar páginas de categorías
    const oldCategories = previousDoc?.categories || []
    const newCategories = doc.categories || []

    if (JSON.stringify(oldCategories) !== JSON.stringify(newCategories)) {
      revalidateTag('categories_products')
      revalidatePath('/categories')

      payload.logger.info(`Revalidated categories for product: ${doc.title}`, {
        productId: doc.id,
        oldCategories: oldCategories.length,
        newCategories: newCategories.length,
      })
    }

    // Si cambió la marca, revalidar páginas de marcas
    if (previousDoc?.brand !== doc.brand) {
      revalidateTag('brands_products')
      revalidatePath('/brands')

      payload.logger.info(`Revalidated brand for product: ${doc.title}`, {
        productId: doc.id,
        brandChanged: true,
      })
    }
  } catch (error) {
    payload.logger.error('Error revalidating product', {
      error: error instanceof Error ? error.message : String(error),
      productId: doc.id,
      title: doc.title,
    })
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Product> = ({
  doc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  try {
    // Revalidar tags y paths relacionados
    revalidateTag(`product_${doc.slug}`)
    revalidateTag('products_list')
    revalidateTag('products-sitemap')
    revalidateTag('categories_products')
    revalidateTag('brands_products')

    const path = `/products/${doc.slug}`
    revalidatePath(path)
    revalidatePath('/products')
    revalidatePath('/categories')
    revalidatePath('/brands')

    payload.logger.info(`Revalidated deleted product: ${doc.title}`, {
      productId: doc.id,
      slug: doc.slug,
      path,
    })
  } catch (error) {
    payload.logger.error('Error revalidating deleted product', {
      error: error instanceof Error ? error.message : String(error),
      productId: doc.id,
      title: doc.title,
    })
  }

  return doc
}
