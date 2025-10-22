'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import type { Product } from '@/payload-types'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<Product>()

  // Indicadores visuales
  const getStockIndicator = (stock?: number) => {
    if (!stock || stock === 0) return '❌'
    if (stock < 5) return '⚠️'
    return '✅'
  }

  const getStatusIndicator = (status?: 'draft' | 'published' | null) => {
    return status === 'published' ? '🟢' : '🟡'
  }

  // Formatear precio
  const formatPrice = (price?: number) => {
    if (!price) return 'Sin precio'
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price)
  }

  const title = data?.title || 'Sin título'
  const stockIndicator = getStockIndicator(data?.stock)
  const statusIndicator = getStatusIndicator(data?._status)
  const price = formatPrice(data?.total || data?.price)
  const brand = typeof data?.brand === 'object' && data.brand?.title ? ` - ${data.brand.title}` : ''
  const rowNum = rowNumber !== undefined ? `${rowNumber + 1}. ` : ''

  return (
    <div className="flex items-center gap-2">
      <span>{rowNum}</span>
      <span>{statusIndicator}</span>
      <span>{stockIndicator}</span>
      <span className="font-medium">{title}</span>
      <span className="text-sm text-gray-600">{brand}</span>
      <span className="text-sm font-mono">{price}</span>
    </div>
  )
}
