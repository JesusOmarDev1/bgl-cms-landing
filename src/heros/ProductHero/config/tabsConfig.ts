import { Package, MonitorCog, Cable, FileText } from 'lucide-react'
import { Product } from '@/payload-types'
import { TabConfig } from '../types'

export const tabsConfig: TabConfig[] = [
  {
    id: 'physical',
    label: 'Detalles Físicos',
    icon: Package,
  },
  {
    id: 'technical',
    label: 'Detalles Técnicos',
    icon: MonitorCog,
    condition: (product: Product) => {
      const { type, scaleSpecs, consumableSpecs, generalSpecs } = product

      // Para básculas: mostrar si tiene especificaciones de báscula
      if (type === 'scale') {
        return !!(
          scaleSpecs?.capacity ||
          scaleSpecs?.display ||
          scaleSpecs?.powerSupply ||
          scaleSpecs?.keyboard
        )
      }

      // Para consumibles: mostrar si tiene especificaciones de consumible
      if (type === 'consumable') {
        return !!(consumableSpecs?.consumableType || consumableSpecs?.electricalSpecs)
      }

      // Para otros tipos: mostrar si tiene especificaciones generales (excluyendo solo powerSupply)
      return !!(
        generalSpecs &&
        (generalSpecs.powerSupply?.type ||
          generalSpecs.powerSupply?.specifications ||
          generalSpecs.powerSupply?.batteryLife)
      )
    },
  },
  {
    id: 'connectivity',
    label: 'Comunicaciones',
    icon: Cable,
  },
  {
    id: 'additional',
    label: 'Información Adicional',
    icon: FileText,
  },
]
