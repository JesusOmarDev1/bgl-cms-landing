import type { Metadata } from 'next/types'

import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import generalMetadata from '@/lib/generalMetadata'
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
      name: true,
      slug: true,
      categories: true,
      meta: true,
      content: true,
      publishedAt: true,
      updatedAt: true,
      heroImage: true,
      brand: true,
      model: true,
      stock: true,
      total: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-6xl font-black">Productos</h1>
        </div>
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
