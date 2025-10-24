import React from 'react'
import { ProductImageCarousel } from './components/ProductImageCarousel'
import { ProductInfo } from './components/ProductInfo'
import { SpecificationTabs } from './components/SpecificationTabs'
import { useKeySpecs } from './hooks/useKeySpecs'
import { ProductHeroProps } from './types'

export const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
  const { heroImage, gallery, slug } = product
  const href = `/${'products'}/${slug}`
  const keySpecs = useKeySpecs(product)

  return (
    <section className="py-8">
      <div className="container">
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 lg:gap-8 xl:gap-12">
          {/* Left Column - Images */}
          <ProductImageCarousel heroImage={heroImage} gallery={gallery} />

          {/* Right Column - Product Info */}
          <ProductInfo product={product} keySpecs={keySpecs} href={href} />
        </div>

        {/* Technical Specifications Tabs */}
        <SpecificationTabs product={product} />
      </div>
    </section>
  )
}
