import React, { Suspense } from 'react'
import { AreaChartSkeleton, BarChartSkeleton, PieChartSkeleton } from '../Charts/ChartSkeletons'
import OptimizedDashboard from './OptimizedDashboard'

const BeforeDashboard: React.FC = () => {
  return <></>
}

export default BeforeDashboard

{
  /*
   <Suspense
        fallback={
          <div className="flex flex-col gap-2">
            <div className="h-[60px] bg-[#f3f4f6] rounded-[8px] animate-pulse" />
            <div className="chartsGrid">
              <PieChartSkeleton />
              <BarChartSkeleton />
            </div>
            <AreaChartSkeleton />
          </div>
        }
      >
        <OptimizedDashboard />
      </Suspense>
  */
}
