import type { Metadata } from 'next/types'

import { ServiceArchive } from '@/components/CollectionArchive/ServiceArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import generalMetadata from '@/lib/generalMetadata'
import { ServicesRange } from '@/components/PageRange/ServicesRange'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      content: true,
      slug: true,
      title: true,
      heroImage: true,
      publishedAt: true,
      updatedAt: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />

      <div className="container flex flex-col justify-start gap-2.5 mb-16">
        <h1 className="text-3xl lg:text-6xl font-black">Servicios</h1>
        <p className="text-muted-foreground">
          Manténgase actualizado con nuestros últimos servicios, conocimientos e historias.
        </p>
      </div>

      <div className="container mb-8">
        <ServicesRange
          collection="services"
          currentPage={services.page}
          limit={12}
          totalDocs={services.totalDocs}
        />
      </div>

      <ServiceArchive services={services.docs} />

      <div className="container">
        {services.totalPages > 1 && services.page && (
          <Pagination page={services.page} totalPages={services.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    ...generalMetadata({ title: 'Servicios' }),
  }
}
