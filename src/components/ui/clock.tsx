'use client'

import { useEffect, useState } from 'react'

export function ClockFace() {
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const [amPm, setAmPm] = useState('AM')

  useEffect(() => {
    const updateClock = () => {
      const currentTime = new Date()
      let hrs = currentTime.getHours()
      const mins = currentTime.getMinutes()
      const secs = currentTime.getSeconds()

      setHours(`${hrs < 10 ? '0' : ''}${hrs > 12 ? hrs - 12 : hrs}`)
      setMinutes(`${mins < 10 ? '0' : ''}${mins}`)
      setSeconds(`${secs < 10 ? '0' : ''}${secs}`)
      setAmPm(hrs < 12 ? 'AM' : 'PM')
    }

    updateClock() // initial call to set clock immediately
    const interval = setInterval(updateClock, 1000) // update every second

    return () => clearInterval(interval) // cleanup on component unmount
  }, [])

  return (
    <div className="flex justify-center items-center">
      <div className="w-80 sm:w-96 md:w-7/12 lg:w-8/12 xl:w-8/12 h-40 md:h-48 lg:h-52 py-2.5 rounded-3xl flex justify-center items-center">
        <span className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center">
          {hours}
          <span className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono">
            :
          </span>
        </span>
        <span className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center">
          {minutes}
          <span className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono">
            :
          </span>
        </span>
        <span className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center">
          {seconds}
        </span>
        <span className="font-bold ml-3 mt-5 sm:mt-7 md:mt-4 lg:mt-11 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-sans">
          {amPm}
        </span>
      </div>
    </div>
  )
}
