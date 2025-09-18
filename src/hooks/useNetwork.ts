import { useEffect, useState } from 'react'

const useNetwork = () => {
  const [isOnline, setNetwork] = useState(
    typeof window !== 'undefined' ? window.navigator.onLine : true,
  )

  useEffect(() => {
    const updateNetwork = () => {
      setNetwork(window.navigator.onLine)
    }

    window.addEventListener('offline', updateNetwork)
    window.addEventListener('online', updateNetwork)

    return () => {
      window.removeEventListener('offline', updateNetwork)
      window.removeEventListener('online', updateNetwork)
    }
  }, [])

  return isOnline
}

export default useNetwork
