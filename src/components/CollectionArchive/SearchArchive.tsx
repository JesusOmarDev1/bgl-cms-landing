import { cn } from '@/utilities/ui'
import React from 'react'

import { SearchCard, SearchResultData } from '@/components/Card/SearchCard'

export type Props = {
  results: SearchResultData[]
  className?: string
}

export const SearchArchive: React.FC<Props> = (props) => {
  const { results, className } = props

  return (
    <div className={cn('container', className)}>
      <div>
        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 place-items-center justify-items-center md:place-items-start md:justify-items-start">
          {results?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return <SearchCard key={index} className="h-full" doc={result} />
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
