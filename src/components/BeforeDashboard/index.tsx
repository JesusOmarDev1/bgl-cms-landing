import React, { Suspense } from 'react'
import { PieChartSkeleton, BarChartSkeleton, AreaChartSkeleton } from '../Charts/ChartSkeletons'
import OptimizedDashboard from './OptimizedDashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <Suspense
        fallback={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                height: '60px',
                background: '#f3f4f6',
                borderRadius: '8px',
                animation: 'pulse 2s infinite',
              }}
            />
            <div
              className="chartsGrid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '1rem',
              }}
            >
              <PieChartSkeleton />
              <BarChartSkeleton />
            </div>
            <AreaChartSkeleton />
          </div>
        }
      >
        <OptimizedDashboard />
      </Suspense>
    </div>
  )
}

export default BeforeDashboard
