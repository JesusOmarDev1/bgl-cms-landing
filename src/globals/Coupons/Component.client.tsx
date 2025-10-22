'use client'

import React from 'react'
import { CountdownDisplay } from '@/hooks/countdown'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Copy, Check, Tag, TrendingDown, Truck } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { cn } from '@/utilities/ui'

interface Coupon {
  id?: string | null
  active?: boolean | null
  code: string
  title: string
  description?: string | null
  discountType: 'percentage' | 'fixed' | 'shipping'
  discountValue?: number | null
  expiryDate: string
  minPurchase?: number | null
  maxUses?: number | null
  backgroundColor?: ('red' | 'blue' | 'green' | 'orange' | 'purple' | 'pink') | null
  ctaText?: string | null
  ctaLink?: string | null
}

interface CouponsClientProps {
  title: string
  subtitle: string
  coupons: Coupon[]
}

const bgPatterns = {
  red: 'bg-gradient-to-br from-red-600 via-red-500 to-red-600',
  blue: 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600',
  green: 'bg-gradient-to-br from-green-600 via-green-500 to-green-600',
  orange: 'bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600',
  purple: 'bg-gradient-to-br from-purple-600 via-purple-500 to-purple-600',
  pink: 'bg-gradient-to-br from-pink-600 via-pink-500 to-pink-600',
}

const textColors = {
  red: 'text-red-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
  orange: 'text-orange-600',
  purple: 'text-purple-600',
  pink: 'text-pink-600',
}

const CouponCard = ({ coupon }: { coupon: Coupon }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const bgColor = coupon.backgroundColor || 'red'

  const handleCopy = () => {
    copyToClipboard(coupon.code)
  }

  const getDiscountDisplay = () => {
    if (coupon.discountType === 'shipping') {
      return (
        <div className="flex items-center gap-2">
          <Truck className="w-8 h-8" />
          <span className="text-5xl font-black">ENVÍO</span>
        </div>
      )
    }

    if (coupon.discountType === 'percentage') {
      return <span className="text-6xl md:text-7xl font-black">{coupon.discountValue}%</span>
    }

    return <span className="text-5xl md:text-6xl font-black">${coupon.discountValue}</span>
  }

  const getDiscountLabel = () => {
    if (coupon.discountType === 'shipping') return 'GRATIS'
    if (coupon.discountType === 'percentage') return 'de descuento'
    return 'de descuento'
  }

  return (
    <div
      className={cn('relative rounded-2xl p-1 shadow-2xl overflow-hidden', bgPatterns[bgColor])}
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
      }}
    >
      <Card className="relative bg-white rounded-xl p-6 md:p-8 h-full">
        {/* Código en la esquina */}
        <div className="absolute top-4 right-4">
          <Badge
            variant="outline"
            className="border-2 border-dashed border-gray-400 px-4 py-2 text-sm font-mono"
          >
            Código: {coupon.code}
          </Badge>
        </div>

        {/* Contenido principal */}
        <div className="space-y-4">
          {/* Título */}
          <div>
            <h3 className={cn('text-2xl md:text-3xl font-black uppercase', textColors[bgColor])}>
              {coupon.title}
            </h3>
          </div>

          {/* Descuento */}
          <div className="flex items-baseline gap-3">
            <div className={textColors[bgColor]}>{getDiscountDisplay()}</div>
            <span className="text-2xl md:text-3xl font-bold text-gray-900">
              {getDiscountLabel()}
            </span>
          </div>

          {/* Descripción */}
          {coupon.description && (
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {coupon.description}
            </p>
          )}

          {/* Detalles adicionales */}
          <div className="space-y-2 text-sm text-gray-600">
            {coupon.minPurchase && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>Compra mínima: ${coupon.minPurchase}</span>
              </div>
            )}
            {coupon.maxUses && (
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                <span>Usos limitados: {coupon.maxUses} disponibles</span>
              </div>
            )}
          </div>

          {/* Countdown */}
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-600 uppercase">Termina en:</span>
            </div>
            <CountdownDisplay targetDate={coupon.expiryDate} className="text-gray-900" />
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex-1 h-12 text-base font-semibold"
            >
              {isCopied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copiar Código
                </>
              )}
            </Button>

            {coupon.ctaLink && (
              <Button
                asChild
                className={cn('flex-1 h-12 text-base font-semibold', bgPatterns[bgColor])}
              >
                <Link href={coupon.ctaLink}>{coupon.ctaText || 'Usar Cupón'}</Link>
              </Button>
            )}
          </div>

          {/* Instrucciones */}
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
            <p className="font-semibold mb-1">Instrucciones:</p>
            <p>
              Para hacer válida esta promoción envía el código de este cupón por correo, teléfono,
              WhatsApp o nuestros formularios de contacto y menciona que lo viste en nuestra página
              web. No válido con otras promociones, aplica sobre precio de lista, un cupón por
              usuario. Solo aplica en mano de obra. No incluye refacciones, ni gastos de traslado.
              Aplican restricciones.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export const CouponsClient = ({ title, subtitle, coupons }: CouponsClientProps) => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
      <div className="container px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Grid de cupones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coupons.map((coupon, index) => (
            <CouponCard key={coupon.id || index} coupon={coupon} />
          ))}
        </div>
      </div>
    </section>
  )
}
