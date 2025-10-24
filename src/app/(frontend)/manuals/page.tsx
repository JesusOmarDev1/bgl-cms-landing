import type { Metadata } from 'next/types'

import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { generalMetadata } from '@/utilities/meta'
import { ManualsRange } from '@/components/PageRange/ManualsRange'
import { ManualArchive } from '@/components/CollectionArchive/ManualArchive'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const manuals = await payload.find({
    collection: 'manuals',
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
        {manuals.totalPages > 1 && manuals.page && (
          <Pagination page={manuals.page} totalPages={manuals.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    ...generalMetadata({ title: 'Manuales' }),
  }
}
