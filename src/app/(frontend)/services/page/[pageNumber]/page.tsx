import type { Metadata } from 'next/types'

import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { ServicesRange } from '@/components/PageRange/ServicesRange'
import { ServiceArchive } from '@/components/CollectionArchive/ServiceArchive'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container flex flex-col justify-start gap-2.5 mb-16">
        <h1 className="text-3xl lg:text-6xl font-black">Publicaciones</h1>
        <p className="text-muted-foreground">
          Manténgase actualizado con nuestras últimas noticias, conocimientos e historias.
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
        {services?.page && services?.totalPages > 1 && (
          <Pagination page={services.page} totalPages={services.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `BGL BASCULAS INDUSTRIALES | ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'services',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
