import type { Metadata } from 'next/types'

import { SearchArchive } from '@/components/CollectionArchive/SearchArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { SearchResultData } from '@/components/Card/SearchCard'
import generalMetadata from '@/utilities/generalMetadata'
import NoSearchResults from '@/components/States/no-search-results'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const searchResults = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="mt-36">
      <PageClient />
      <div className="flex flex-col items-center justify-center w-full gap-2.5">
        <div className="prose dark:prose-invert text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
            ¿No encontraste lo que buscabas?
          </h1>
          <p className="text-zinc-500 mx-4 md:mx-auto">
            ¡No te preocupes! Estamos aquí para ayudarte. Cuéntanos qué necesitas y haremos lo
            posible por asistirte.
          </p>
          <Search />
        </div>
      </div>

      {searchResults.totalDocs > 0 ? (
        <SearchArchive results={searchResults.docs as SearchResultData[]} />
      ) : (
        <NoSearchResults />
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    ...generalMetadata({ title: 'Buscador global' }),
  }
}
