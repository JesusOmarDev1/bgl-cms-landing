import { Product } from '@/payload-types'

export interface ProductHeroProps {
  product: Product
}

export interface SpecificationItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

export interface TabConfig {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  condition?: (product: Product) => boolean
}
