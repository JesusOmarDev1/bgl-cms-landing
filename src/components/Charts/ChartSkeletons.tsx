'use client'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// Pie Chart Skeleton
export const PieChartSkeleton: React.FC = () => (
  <div className="chart-skeleton pie-chart-skeleton">
    <div className="chart-skeleton-header">
      <Skeleton className="h-6 w-40 mb-2" />
      <Skeleton className="h-4 w-48" />
    </div>

    <div className="chart-skeleton-content">
      <div className="pie-chart-wrapper">
        {/* Animated donut chart */}
        <div className="pie-chart-circle">
          <div className="pie-chart-ring-outer"></div>
          <div className="pie-chart-ring-spinning"></div>
          <div className="pie-chart-ring-inner"></div>

          {/* Center content */}
          <div className="pie-chart-center">
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    </div>

    <div className="chart-skeleton-footer">
      <Skeleton className="h-4 w-40 mb-2" />
      <Skeleton className="h-3 w-56" />
    </div>
  </div>
)

// Bar Chart Skeleton
export const BarChartSkeleton: React.FC = () => (
  <div className="chart-skeleton bar-chart-skeleton">
    <div className="chart-skeleton-header">
      <Skeleton className="h-6 w-44 mb-2" />
      <Skeleton className="h-4 w-52" />
    </div>

    <div className="chart-skeleton-content">
      <div className="bar-chart-wrapper">
        {/* Animated bars */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bar-chart-group">
            <div className="bar-chart-bars">
              <div className={`bar-chart-bar bar-chart-bar-primary bar-${i + 1}`}></div>
              <div className={`bar-chart-bar bar-chart-bar-secondary bar-${i + 1}`}></div>
            </div>
            <Skeleton className="h-3 w-8 mt-2" />
          </div>
        ))}
      </div>

      {/* Legend skeleton */}
      <div className="bar-chart-legend">
        <div className="bar-chart-legend-item">
          <div className="bar-chart-legend-color bar-chart-legend-primary"></div>
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="bar-chart-legend-item">
          <div className="bar-chart-legend-color bar-chart-legend-secondary"></div>
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>

    <div className="chart-skeleton-footer">
      <Skeleton className="h-4 w-48 mb-2" />
      <Skeleton className="h-3 w-60" />
    </div>
  </div>
)

// Area Chart Skeleton
export const AreaChartSkeleton: React.FC = () => (
  <div className="chart-skeleton area-chart-skeleton">
    <div className="chart-skeleton-header">
      <Skeleton className="h-6 w-48 mb-2" />
      <Skeleton className="h-4 w-64" />
    </div>

    <div className="chart-skeleton-content">
      {/* Time range selector skeleton */}
      <div className="area-chart-time-selector">
        <div className="area-chart-time-buttons">
          {['7d', '30d', '90d'].map((range) => (
            <Skeleton key={range} className="h-8 w-10" />
          ))}
        </div>
      </div>

      <div className="area-chart-wrapper">
        {/* Y-axis labels */}
        <div className="area-chart-y-axis">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-3 w-8" />
          ))}
        </div>

        {/* Chart area with animated path */}
        <div className="area-chart-content">
          <div className="area-chart-grid">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="area-chart-grid-line"></div>
            ))}
          </div>

          <div className="area-chart-path">
            <div className="area-chart-area"></div>
            <div className="area-chart-line"></div>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="area-chart-x-axis">
          {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].map((month) => (
            <Skeleton key={month} className="h-3 w-6" />
          ))}
        </div>
      </div>
    </div>

    <div className="chart-skeleton-footer">
      <Skeleton className="h-4 w-36 mb-2" />
      <Skeleton className="h-3 w-48" />
    </div>
  </div>
)

// Generic Chart Skeleton (fallback)
export const GenericChartSkeleton: React.FC<{ height?: string }> = ({ height = '300px' }) => (
  <div className="chart-skeleton generic-chart-skeleton" style={{ height }}>
    <div className="generic-chart-content">
      <div className="generic-chart-spinner"></div>
      <div className="generic-chart-text">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  </div>
)
