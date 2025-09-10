'use client'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

// Pie Chart Skeleton
export const PieChartSkeleton: React.FC = () => (
  <Card className="w-full">
    <CardHeader>
      <Skeleton className="h-6 w-40 mb-2" />
      <Skeleton className="h-4 w-48" />
    </CardHeader>
    <CardContent>
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="w-32 h-32 border-8 border-gray-200 dark:border-gray-700 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-32 h-32 border-8 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-4 w-24 h-24 bg-white dark:bg-gray-900 rounded-full flex flex-col items-center justify-center">
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex-col items-start gap-2">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-56" />
    </CardFooter>
  </Card>
)

// Bar Chart Skeleton
export const BarChartSkeleton: React.FC = () => (
  <Card className="w-full">
    <CardHeader>
      <Skeleton className="h-6 w-44 mb-2" />
      <Skeleton className="h-4 w-52" />
    </CardHeader>
    <CardContent>
      <div className="h-64 flex items-end justify-between gap-2 px-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <div className="flex gap-1 items-end">
              <div className={`bg-blue-200 dark:bg-blue-800 rounded-t animate-pulse`} style={{ height: `${Math.random() * 100 + 50}px`, width: '12px' }}></div>
              <div className={`bg-green-200 dark:bg-green-800 rounded-t animate-pulse`} style={{ height: `${Math.random() * 80 + 40}px`, width: '12px' }}></div>
            </div>
            <Skeleton className="h-3 w-8" />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-200 dark:bg-blue-800 rounded"></div>
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-200 dark:bg-green-800 rounded"></div>
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex-col items-start gap-2">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-3 w-60" />
    </CardFooter>
  </Card>
)

// Area Chart Skeleton
export const AreaChartSkeleton: React.FC = () => (
  <Card className="w-full">
    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-0 pb-2">
      <div className="space-y-1">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex gap-2">
        {['7d', '30d', '90d'].map((range) => (
          <Skeleton key={range} className="h-8 w-16" />
        ))}
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-64 relative">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-transparent dark:from-blue-900 opacity-30 rounded animate-pulse"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded animate-pulse"></div>
          </div>
          <div className="flex justify-between mt-2">
            {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].map((month) => (
              <Skeleton key={month} className="h-3 w-6" />
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Generic Chart Skeleton (fallback)
export const GenericChartSkeleton: React.FC<{ height?: string }> = ({ height = '300px' }) => (
  <Card className="w-full" style={{ height }}>
    <CardContent className="flex flex-col items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <div className="text-center">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-24" />
      </div>
    </CardContent>
  </Card>
)
