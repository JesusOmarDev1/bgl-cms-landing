import { cn } from '@/utilities/ui'
import React from 'react'
import { CardProductData, CardProducts } from '../Card/ProductCard'

export type Props = {
  products: CardProductData[]
}

export const ProductArchive: React.FC<Props> = (props) => {
  const { products } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {products?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <CardProducts doc={result} relationTo="products" showCategories />
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
