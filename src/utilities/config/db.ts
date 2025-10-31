import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { isProd } from '@/utilities/payload/isProd'

/**
 * Get db adapter configuration
 * @returns SQLite in Dev Mode or PostgreSQL in Prod Mode
 */

export default function getDBAdapter() {
  if (!isProd) {
    if (!process.env.SQLITE_URI) {
      throw new Error('Las claves de la base de datos para desarrollo no estan definidas')
    }

    return sqliteAdapter({
      client: {
        url: process.env.SQLITE_URI || '',
      },
      idType: 'uuid',
      blocksAsJSON: true,
      logger: true,
    })
  } else {
    if (!process.env.PG_URI) {
      throw new Error('Las claves de la base de datos para produccion no estan definidas')
    }

    return postgresAdapter({
      pool: {
        connectionString: process.env.PG_URI || '',
      },
      push: false,
      idType: 'uuid',
      blocksAsJSON: true,
    })
  }
}
