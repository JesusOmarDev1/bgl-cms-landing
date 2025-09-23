import React, { Suspense } from 'react'
import { ClockFace } from '../ui/clock'
import { Skeleton } from '../ui/skeleton'

const BeforeDashboard: React.FC = () => {
  return (
    <div className="before-dashboard w-full h-40 p-0">
      <Suspense
        fallback={
          <Skeleton className="w-80 sm:w-96 md:w-7/12 lg:w-8/12 xl:w-8/12 h-40 md:h-48 lg:h-52" />
        }
      >
        <ClockFace />
      </Suspense>
    </div>
  )
}

export default BeforeDashboard
