'use client'

import { useState, useEffect } from 'react'

export interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

interface UseCountdownProps {
  targetDate: string | Date
  onExpire?: () => void
}

export const useCountdown = ({ targetDate, onExpire }: UseCountdownProps) => {
  const calculateTimeRemaining = (): TimeRemaining => {
    const target = new Date(targetDate).getTime()
    const now = new Date().getTime()
    const difference = target - now

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      total: difference,
    }
  }

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTimeRemaining())

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeRemaining()
      setTimeRemaining(newTime)

      if (newTime.total <= 0 && onExpire) {
        onExpire()
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate, onExpire])

  return timeRemaining
}

// Componente de visualización del countdown
interface CountdownDisplayProps {
  targetDate: string | Date
  onExpire?: () => void
  className?: string
}

export const CountdownDisplay = ({ targetDate, onExpire, className }: CountdownDisplayProps) => {
  const timeRemaining = useCountdown({ targetDate, onExpire })

  if (timeRemaining.total <= 0) {
    return null
  }

  return (
    <div className={className}>
      <div className="flex gap-2 items-center justify-center">
        {timeRemaining.days > 0 && (
          <>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{String(timeRemaining.days).padStart(2, '0')}</span>
              <span className="text-xs uppercase">Días</span>
            </div>
            <span className="text-2xl font-bold">:</span>
          </>
        )}
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{String(timeRemaining.hours).padStart(2, '0')}</span>
          <span className="text-xs uppercase">Hrs</span>
        </div>
        <span className="text-2xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{String(timeRemaining.minutes).padStart(2, '0')}</span>
          <span className="text-xs uppercase">Min</span>
        </div>
        <span className="text-2xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{String(timeRemaining.seconds).padStart(2, '0')}</span>
          <span className="text-xs uppercase">Seg</span>
        </div>
      </div>
    </div>
  )
}
