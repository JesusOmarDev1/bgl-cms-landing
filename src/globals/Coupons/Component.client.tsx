'use client'

import React, { useEffect, useState } from 'react'
import { CountdownDisplay } from '@/utilities/hooks/useCountdown'
import { useCopyToClipboard } from '@/utilities/hooks/useCopyToClipboard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Copy, Check, Truck, TicketCheck, CircleDollarSign, Ticket } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { cn } from '@/utilities/ui/cn'
import Share from '@/components/ui/share'
import { Separator } from '@/components/ui/separator'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

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
  const [isExpired, setIsExpired] = useState(() => {
    // Check if coupon is already expired on mount
    const now = new Date().getTime()
    const expiryTime = new Date(coupon.expiryDate).getTime()
    return expiryTime <= now
  })
  const bgColor = coupon.backgroundColor || 'red'

  const handleCopy = () => {
    if (!isExpired) {
      copyToClipboard(coupon.code)
    }
  }

  const handleExpire = () => {
    setIsExpired(true)
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
    <div className={cn('relative rounded-2xl p-1 overflow-hidden h-full w-full')}>
      <Card
        className={cn(
          'relative rounded-xl p-6 md:p-8 h-full transition-all duration-300 flex flex-col',
          isExpired && 'opacity-75 grayscale',
        )}
      >
        {/* Código en la esquina */}
        <div className="absolute top-4 right-4">
          <Badge
            variant="outline"
            className={cn(
              'border-2 border-dashed px-4 py-2 text-sm font-mono',
              isExpired ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-400',
            )}
          >
            Código: {coupon.code}
          </Badge>
        </div>

        {/* Badge de expirado */}
        {isExpired && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-red-600 text-white font-bold px-3 py-1">EXPIRADO</Badge>
          </div>
        )}

        {/* Contenido principal */}
        <div className="space-y-4 flex-grow flex flex-col">
          {coupon.title && (
            <h2 className="text-2xl md:text-3xl font-bold mt-12 lg:mt-10">{coupon.title}</h2>
          )}

          {/* Descuento */}
          <div className="flex items-baseline gap-3">
            <div className={textColors[bgColor]}>{getDiscountDisplay()}</div>
            <span className={(cn('text-2xl font-bold'), textColors[bgColor])}>
              {getDiscountLabel()}
            </span>
          </div>

          {/* Descripción */}
          {coupon.description && (
            <p className="text-base md:text-lg leading-relaxed">{coupon.description}</p>
          )}

          {/* Detalles adicionales */}
          <div className="space-y-2 text-sm">
            {coupon.minPurchase && (
              <div className="flex items-center gap-2">
                <CircleDollarSign className="size-4" />
                <span>Compra mínima: ${coupon.minPurchase}</span>
              </div>
            )}
            {coupon.maxUses && (
              <div className="flex items-center gap-2">
                <TicketCheck className="size-4" />
                <span>Usos limitados: {coupon.maxUses} disponibles</span>
              </div>
            )}
          </div>

          {/* Sección flexible que crece */}
          <div className="flex-grow">
            {/* Countdown */}
            <div className={cn('rounded-lg p-4 border-2 border-dashed mb-4')}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className={cn('w-5 h-5', isExpired ? 'text-red-600' : 'text-zinc-400')} />
                <span
                  className={cn(
                    'text-sm font-semibold uppercase',
                    isExpired ? 'text-red-600' : 'text-zinc-400',
                  )}
                >
                  {isExpired ? 'Cupón Expirado' : 'Termina en:'}
                </span>
              </div>
              {isExpired ? (
                <div className="text-center">
                  <span className="text-lg font-bold text-red-600">
                    Este cupón ya no está disponible
                  </span>
                </div>
              ) : (
                <CountdownDisplay
                  key={`countdown-${coupon.code}-${coupon.expiryDate}`}
                  targetDate={coupon.expiryDate}
                  onExpire={handleExpire}
                  className="text-primary"
                />
              )}
            </div>
          </div>

          {/* Botones de acción - siempre al final */}
          <div className="mt-auto space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Share className="flex-1" text={coupon.code} disabled={isExpired} />

                {coupon.ctaLink && (
                  <Button
                    variant={'secondary'}
                    asChild={!isExpired}
                    disabled={isExpired}
                    className={cn('flex-1')}
                  >
                    {isExpired ? (
                      <span>No Disponible</span>
                    ) : (
                      <Link href={coupon.ctaLink}>{coupon.ctaText || 'Usar Cupón'}</Link>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <Separator className="my-2" />

            {/* Instrucciones */}
            <div className="text-xs">
              <p className="font-semibold mb-1">Instrucciones:</p>
              <p className="leading-tight">
                Para hacer válida esta promoción envía el código de este cupón por correo, teléfono,
                WhatsApp o nuestros formularios de contacto y menciona que lo viste en nuestra
                página web. No válido con otras promociones, aplica sobre precio de lista, un cupón
                por usuario. Solo aplica en mano de obra. No incluye refacciones, ni gastos de
                traslado. Aplican restricciones.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export const CouponsClient = ({ title, subtitle, coupons }: CouponsClientProps) => {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Force re-render when coupons data changes
  useEffect(() => {
    // Clear any potential localStorage cache related to countdown
    const keys = Object.keys(localStorage).filter((key) => key.includes('countdown'))
    keys.forEach((key) => localStorage.removeItem(key))

    // Store current coupons data hash for change detection
    const couponsHash = JSON.stringify(
      coupons.map((c) => ({
        code: c.code,
        expiryDate: c.expiryDate,
        active: c.active,
      })),
    )
    localStorage.setItem('coupons-hash', couponsHash)
  }, [coupons])

  return (
    <>
      {/* Header */}
      <section className="w-full">
        <div className="container px-4 md:px-8 mb-10 md:mb-12 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3">{title}</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">{subtitle}</p>
          </div>
        </div>
      </section>

      {/* Carousel de cupones - Verdadero ancho completo */}
      <section className="relative w-full m-0 animate-in fade-in-50 duration-700">
        {/* Indicador de cantidad de cupones */}
        {coupons.length > 1 && (
          <div className="flex justify-center mb-6 px-4">
            <Badge className="px-4 py-2">
              <Ticket className="size-4" />
              {coupons.length} cupones disponibles
            </Badge>
          </div>
        )}
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: coupons.length > 1,
            skipSnaps: false,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="ml-0 pl-4 pr-4">
            {coupons.map((coupon, index) => (
              <CarouselItem key={coupon.id || index}>
                <div className="px-1 sm:px-2 md:px-3 size-full">
                  <CouponCard coupon={coupon} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controles de navegación */}
          {coupons.length > 1 && (
            <>
              <CarouselPrevious className="hidden md:flex left-2 h-12 w-12 z-10 bg-white/90 hover:bg-white shadow-lg" />
              <CarouselNext className="hidden md:flex right-2 h-12 w-12 z-10 bg-white/90 hover:bg-white shadow-lg" />
            </>
          )}
        </Carousel>

        {/* Indicadores de progreso */}
        {coupons.length > 1 && (
          <div className="flex flex-col items-center mt-6 space-y-2 px-4">
            <div className="flex space-x-2">
              {Array.from({ length: count }, (_, index) => (
                <button
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    current === index + 1 ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400',
                  )}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 md:hidden">
              Desliza para ver más cupones ({current} de {coupons.length})
            </p>
          </div>
        )}
      </section>
    </>
  )
}
