import { FC } from 'react'
import { Payload } from 'payload'
import { SearchDialog } from './SearchDialog'

interface GlobalSearcherProps {
  payload: Payload
}

export const GlobalSearcher: FC<GlobalSearcherProps> = async ({ payload }) => {
  // Obtener resultados iniciales (los más recientes o prioritarios)
  const initialResults = await payload.find({
    collection: 'search',
    limit: 10,
    sort: '-priority,-createdAt',
    depth: 1,
  })

  return <SearchDialog initialResults={initialResults.docs} />
}

export default GlobalSearcher
