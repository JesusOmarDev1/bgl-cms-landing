import { getCachedGlobal } from '@/utilities/payload'
import React from 'react'
import type { Coupon as CouponsType } from '@/payload-types'
import { CouponsClient } from './Component.client'

export async function Coupons() {
  const couponsData: CouponsType = await getCachedGlobal('coupons', 1)()

  // Si no está habilitado o no hay cupones, no renderizar nada
  if (!couponsData?.enabled || !couponsData?.coupons || couponsData.coupons.length === 0) {
    return null
  }

  // Filtrar solo cupones activos y no expirados
  const activeCoupons = couponsData.coupons.filter((coupon) => {
    if (!coupon.active) return false
    if (!coupon.expiryDate) return false

    const expiryDate = new Date(coupon.expiryDate)
    const now = new Date()

    return expiryDate > now
  })

  // Si no hay cupones activos válidos, no renderizar nada
  if (activeCoupons.length === 0) {
    return null
  }

  return (
    <CouponsClient
      title={couponsData.title || '¡Ofertas Especiales!'}
      subtitle={
        couponsData.subtitle || 'Aprovecha nuestros descuentos exclusivos antes de que se acaben'
      }
      coupons={activeCoupons}
    />
  )
}
