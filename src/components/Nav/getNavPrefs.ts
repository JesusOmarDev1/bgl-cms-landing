import type { NavPreferences, Payload } from 'payload'

import { cache } from 'react'

// Accept a minimal user shape to avoid strict type incompatibilities
// with Payload's UntypedUser (sessions type differences, etc.).
type MinimalUser = {
  id: string | number
  collection: string
}

export const getNavPrefs = cache(
  async ({
    payload,
    user,
  }: {
    payload: Payload
    user?: MinimalUser
  }): Promise<NavPreferences | null> =>
    user
      ? await payload
          .find({
            collection: 'payload-preferences',
            depth: 0,
            limit: 1,
            // Pass only the minimal user fields expected by Payload to avoid TS conflicts
            user: { id: user.id, collection: user.collection } as any,
            where: {
              and: [
                {
                  key: {
                    equals: 'nav',
                  },
                },
                {
                  'user.relationTo': {
                    equals: user?.collection,
                  },
                },
                {
                  'user.value': {
                    equals: user?.id,
                  },
                },
              ],
            },
          })
          ?.then((res) => res?.docs?.[0]?.value as NavPreferences)
      : null,
)
