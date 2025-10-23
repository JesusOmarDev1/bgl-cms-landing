import type { Metadata } from 'next/types'

import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import generalMetadata from '@/utilities/generalMetadata'
import { ProductsRange } from '@/components/PageRange/ProductsRange'
import { ProductArchive } from '@/components/CollectionArchive/ProductArchive'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      image: true,
      price: true,
      discount: true,
      discountPrice: true,
      stock: true,
      categories: true,
      applications: true,
      consumableSpecs: true,
      createdAt: true,
      updatedAt: true,
      excerpt: true,
      content: true,
      features: true,
      gallery: true,
      generalSpecs: true,
      meta: true,
      model: true,
      brand: true,
      heroImage: true,
      productCode: true,
      scaleSpecs: true,
      publishedAt: true,
      status: true,
      type: true,
      warranty: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container flex flex-col justify-start gap-2.5 mb-16">
        <h1 className="text-3xl lg:text-6xl font-black">Productos</h1>
        <p className="text-muted-foreground">
          Manténgase actualizado con nuestras ultimas ofertas, descuentos y novedades.
        </p>
      </div>

      <div className="container mb-8">
        <ProductsRange
          collection="products"
          currentPage={products.page}
          limit={12}
          totalDocs={products.totalDocs}
        />
      </div>

      <ProductArchive products={products.docs} />

      <div className="container">
        {products.totalPages > 1 && products.page && (
          <Pagination page={products.page} totalPages={products.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    ...generalMetadata({ title: 'Productos' }),
  }
}
