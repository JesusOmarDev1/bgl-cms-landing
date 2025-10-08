import { cn } from '@/utilities/ui'
import React from 'react'

import { CardServiceData, CardServices } from '@/components/Card/ServiceCard'

export type Props = {
  services: CardServiceData[]
}

export const ServiceArchive: React.FC<Props> = (props) => {
  const { services } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 place-items-center justify-items-center md:place-items-start md:justify-items-start">
          {services?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <CardServices className="h-full" doc={result} relationTo="services" />
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
