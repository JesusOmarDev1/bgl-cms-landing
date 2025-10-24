'use client'

import { useState, useEffect } from 'react'

export function useDelayedMount(delay: number = 0): boolean {
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldMount(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return shouldMount
}

export default useDelayedMount
