import { useMemo } from 'react'
import { Package, Zap, Scale } from 'lucide-react'
import { Product } from '@/payload-types'
import { SpecificationItem } from '../types'
import { getPowerSupplyLabel } from '../utils'

export const useKeySpecs = (product: Product): SpecificationItem[] => {
  return useMemo(() => {
    const { type, generalSpecs, scaleSpecs } = product
    const specs: SpecificationItem[] = []

    // General specifications
    if (generalSpecs?.physicalSpecs?.dimensions) {
      specs.push({
        icon: Package,
        label: 'Dimensiones',
        value: generalSpecs.physicalSpecs.dimensions,
      })
    }

    if (generalSpecs?.physicalSpecs?.weight) {
      specs.push({
        icon: Package,
        label: 'Peso',
        value: generalSpecs.physicalSpecs.weight,
      })
    }

    if (generalSpecs?.powerSupply?.type && generalSpecs.powerSupply.type !== 'none') {
      const powerLabel = getPowerSupplyLabel(generalSpecs.powerSupply.type)
      specs.push({
        icon: Zap,
        label: 'Alimentación',
        value: powerLabel,
      })
    }

    // Scale specific specs
    if (type === 'scale' && scaleSpecs?.capacity?.maximum) {
      specs.push({
        icon: Scale,
        label: 'Capacidad Máx.',
        value: scaleSpecs.capacity.maximum,
      })
    }

    if (type === 'scale' && scaleSpecs?.capacity?.minimumDivision) {
      specs.push({
        icon: Scale,
        label: 'División Mín.',
        value: scaleSpecs.capacity.minimumDivision,
      })
    }

    if (type === 'scale' && scaleSpecs?.capacity?.type) {
      specs.push({
        icon: Scale,
        label: 'Tipo de Capacidad',
        value: scaleSpecs.capacity.type,
      })
    }

    return specs.slice(0, 6) // Limit to 6 key specs
  }, [product])
}
