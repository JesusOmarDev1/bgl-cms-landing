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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {results?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <SearchCard className="h-full" doc={result} showCategories />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
