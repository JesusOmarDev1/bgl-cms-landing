'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Función de diagnóstico para verificar qué campos están disponibles en cada colección
 */
export async function diagnoseCollectionFields() {
  try {
    const payload = await getPayload({ config: configPromise })

    const collections = [
      'posts',
      'products',
      'manuals',
      'services',
      'clients',
      'suppliers',
      'forms',
    ]
    const results: Record<string, any> = {}

    for (const collection of collections) {
      try {
        // Intentar obtener un documento de muestra para ver la estructura
        const sample = await payload.find({
          collection: collection as any,
          limit: 1,
          depth: 0,
        })

        if (sample.docs.length > 0) {
          results[collection] = {
            availableFields: Object.keys(sample.docs[0]),
            sampleDoc: sample.docs[0],
          }
        } else {
          results[collection] = {
            availableFields: [],
            sampleDoc: null,
            note: 'No documents found in collection',
          }
        }
      } catch (error) {
        results[collection] = {
          error: error instanceof Error ? error.message : 'Unknown error',
          availableFields: [],
        }
      }
    }

    return results
  } catch (error) {
    console.error('Error in diagnoseCollectionFields:', error)
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Función para probar búsquedas simples en cada colección
 */
export async function testSimpleSearches() {
  try {
    const payload = await getPayload({ config: configPromise })

    const collections = [
      'posts',
      'products',
      'manuals',
      'services',
      'clients',
      'suppliers',
      'forms',
    ]
    const results: Record<string, any> = {}

    for (const collection of collections) {
      try {
        // Probar búsqueda simple solo por título
        const searchResult = await payload.find({
          collection: collection as any,
          where: {
            title: { like: 'test' },
          },
          limit: 1,
          depth: 0,
        })

        results[collection] = {
          success: true,
          totalDocs: searchResult.totalDocs,
          message: 'Simple title search works',
        }
      } catch (error) {
        results[collection] = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    }

    return results
  } catch (error) {
    console.error('Error in testSimpleSearches:', error)
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
