import { cn } from '@/utilities/ui/cn'
import React from 'react'

import { CardManual, CardManualData } from '@/components/Card/ManualCard'

export type Props = {
  manuals: CardManualData[]
}

export const ManualArchive: React.FC<Props> = (props) => {
  const { manuals } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 place-items-center justify-items-center md:place-items-start md:justify-items-start">
          {manuals?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <CardManual className="h-full" doc={result} relationTo="manuals" />
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
