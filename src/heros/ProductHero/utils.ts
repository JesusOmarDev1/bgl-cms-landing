import { LABELS } from './constants'

export const getLabel = (category: keyof typeof LABELS, key: string): string => {
  return LABELS[category][key as keyof (typeof LABELS)[typeof category]] || key
}

export const getPowerSupplyLabel = (type: string): string => {
  return getLabel('powerSupply', type)
}

export const getMaterialLabel = (material: string): string => {
  return getLabel('material', material)
}

export const getDisplayTypeLabel = (type: string): string => {
  return getLabel('displayType', type)
}

export const getPlatformTypeLabel = (type: string): string => {
  return getLabel('platformType', type)
}

export const getCapacityTypeLabel = (type: string): string => {
  return getLabel('capacityType', type)
}

export const getConsumableTypeLabel = (type: string): string => {
  return getLabel('consumableType', type)
}

export const getProductTypeLabel = (type: string): string => {
  return getLabel('productType', type)
}

export const getValueOrNA = (value: string | null | undefined): string => {
  return value && value.trim() !== '' ? value : 'N/A'
}

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
