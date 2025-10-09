import type { Metadata } from 'next/types'

import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { ServicesRange } from '@/components/PageRange/ServicesRange'
import { ServiceArchive } from '@/components/CollectionArchive/ServiceArchive'
import { ManualsRange } from '@/components/PageRange/ManualsRange'
import { ManualArchive } from '@/components/CollectionArchive/ManualArchive'

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

  const manuals = await payload.find({
    collection: 'manuals',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container flex flex-col justify-start gap-2.5 mb-16">
        <h1 className="text-3xl lg:text-6xl font-black">Manuales</h1>
        <p className="text-muted-foreground">
          Manténgase actualizado con nuestros últimos manuales y guias técnicas.
        </p>
      </div>

      <div className="container mb-8">
        <ManualsRange
          collection="manuals"
          currentPage={manuals.page}
          limit={12}
          totalDocs={manuals.totalDocs}
        />
      </div>

      <ManualArchive manuals={manuals.docs} />

      <div className="container">
        {manuals?.page && manuals?.totalPages > 1 && (
          <Pagination page={manuals.page} totalPages={manuals.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Manuales | BGL BASCULAS INDUSTRIALES | ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'manuals',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
