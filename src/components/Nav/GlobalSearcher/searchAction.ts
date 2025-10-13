'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Search } from '@/payload-types'

export interface SearchResponse {
  docs: Search[]
  totalDocs: number
  hasMore: boolean
  limit: number
}

function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function createFlexiblePattern(text: string): string {
  const accentMap: Record<string, string> = {
    a: '[aáàäâã]',
    e: '[eéèëê]',
    i: '[iíìïî]',
    o: '[oóòöôõ]',
    u: '[uúùüû]',
    n: '[nñ]',
    c: '[cç]',
  }

  return text
    .toLowerCase()
    .split('')
    .map((char) => accentMap[char] || char)
    .join('')
}

export async function searchContent(query: string, limit: number = 10): Promise<SearchResponse> {
  if (!query.trim()) {
    return { docs: [], totalDocs: 0, hasMore: false, limit }
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const normalizedQuery = normalizeSearchText(query)
    const flexiblePattern = createFlexiblePattern(normalizedQuery)

    const searchResults = await payload.find({
      collection: 'search',
      depth: 1,
      limit,
      where: {
        or: [
          {
            title: {
              like: query,
            },
          },
          {
            title: {
              like: flexiblePattern,
            },
          },
          {
            'meta.description': {
              like: query,
            },
          },
          {
            'meta.description': {
              like: flexiblePattern,
            },
          },
          {
            'meta.title': {
              like: query,
            },
          },
          {
            'meta.title': {
              like: flexiblePattern,
            },
          },
          {
            slug: {
              like: flexiblePattern,
            },
          },
        ],
      },
      sort: '-priority,-createdAt',
    })

    return {
      docs: searchResults.docs,
      totalDocs: searchResults.totalDocs,
      hasMore: searchResults.hasNextPage,
      limit,
    }
  } catch (error) {
    return { docs: [], totalDocs: 0, hasMore: false, limit }
  }
}
