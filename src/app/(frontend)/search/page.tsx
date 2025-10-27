import type { Metadata } from 'next/types'

import { SearchArchive } from '@/components/CollectionArchive/SearchArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { SearchResultData } from '@/components/Card/SearchCard'
import { generalMetadata } from '@/utilities/meta/generalMetadata'
import NoSearchResults from '@/components/States/no-search-results'
import { Search } from '@/search/Component'

type Args = {
  searchParams: Promise<{
    q: string
    type?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, type: typeFilter } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  // Build search conditions
  const searchConditions = []

  if (query) {
    searchConditions.push({
      or: [
        { title: { like: query } },
        { 'meta.description': { like: query } },
        { 'meta.title': { like: query } },
        { slug: { like: query } },
      ],
    })
  }

  // Add type filter if specified
  if (typeFilter && typeFilter !== 'all') {
    const types = typeFilter.split(',')
    if (types.length === 1) {
      searchConditions.push({
        'doc.relationTo': { equals: types[0] },
      })
    } else {
      searchConditions.push({
        'doc.relationTo': { in: types },
      })
    }
  }

  const searchResults = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 10,
    overrideAccess: false,
    pagination: false,
    ...(searchConditions.length > 0 && {
      where: {
        and: searchConditions,
      },
    }),
  })

  const hasQuery = Boolean(query)
  const hasResults = searchResults.totalDocs > 0

  return (
    <div className="min-h-dvh">
      <PageClient />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-background via-background to-muted/20 mt-40">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative container">
          <div className="flex flex-col items-center justify-center w-full gap-6 text-center max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {hasQuery ? 'Resultados de búsqueda' : 'Encuentra lo que necesitas'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {hasQuery
                  ? `Mostrando resultados para tu búsqueda. Usa los filtros para refinar los resultados.`
                  : 'Busca en nuestro catálogo de productos, manuales, servicios y más. Estamos aquí para ayudarte.'}
              </p>
            </div>

            <Search />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div>
        {hasResults ? (
          <SearchArchive results={searchResults.docs as SearchResultData[]} />
        ) : hasQuery ? (
          <NoSearchResults />
        ) : (
          <div className="container">
            <div className="text-center py-12 space-y-6">
              <p className="text-muted-foreground text-lg">
                Ingresa un término de búsqueda para comenzar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  return searchParams.then(({ q }) => ({
    ...generalMetadata({
      title: q ? `Resultados para "${q}"` : 'Buscador global',
    }),
    description: q
      ? `Resultados de búsqueda para "${q}" en BGL Básculas Industriales`
      : 'Encuentra productos, manuales, servicios y más en BGL Básculas Industriales',
  }))
}
