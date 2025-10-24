import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

/**
 * Get a global by slug
 * @param slug - The global slug
 * @param depth - The depth of population
 * @returns The global data
 */
export async function getGlobal<T extends Global>(
  slug: T,
  depth = 0,
): Promise<Config['globals'][T]> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global as Config['globals'][T]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 * @param slug - The global slug
 * @param depth - The depth of population
 * @returns Cached global getter function
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })

export { getGlobal as getGlobals }
