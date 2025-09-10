'use client'
import * as React from 'react'
import { Pie, PieChart } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { useDebouncedWindowSize } from '@/hooks/useDebounceWindowed'

import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface PieChartData {
  browser: string
  visitors: number
  fill: string
}

interface PieChartProps {
  data?: PieChartData[]
  title?: string
  subtitle?: string
  trendText?: string
  descriptionText?: string
}

const chartConfig = {
  visitors: {
    label: 'Visitantes',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

const OptimizedPieChart = React.memo<PieChartProps>(
  ({
    data = [],
    title = 'Distribución de Contenido',
    subtitle = 'Resumen del CMS - 2024',
    trendText = 'Crecimiento del 5.2% este mes',
    descriptionText = 'Mostrando distribución total de contenido',
  }) => {
    const windowSize = useDebouncedWindowSize(200)

    const chartSize = React.useMemo(() => {
      if (windowSize.width < 480) return { outer: 65, inner: 25 }
      if (windowSize.width < 640) return { outer: 90, inner: 35 }
      if (windowSize.width < 1024) return { outer: 100, inner: 40 }
      return { outer: 110, inner: 45 }
    }, [windowSize.width])

    const memoizedTooltip = React.useMemo(
      () => (
        <ChartTooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const dataPoint = payload[0].payload
              const total = data.reduce((sum: number, item: PieChartData) => sum + item.visitors, 0)
              const percentage = ((dataPoint.visitors / total) * 100).toFixed(1)

              return (
                <Card className="p-3 shadow-lg">
                  <CardHeader className="p-0 pb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: dataPoint.fill }}
                      />
                      <CardTitle className="text-sm font-medium">{dataPoint.browser}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cantidad:</span>
                      <span className="font-medium">{dataPoint.visitors.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Porcentaje:</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                  </CardContent>
                </Card>
              )
            }
            return null
          }}
        />
      ),
      [data],
    )

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full">
            <PieChart width={chartSize.outer * 2.5} height={chartSize.outer * 2.5}>
              {memoizedTooltip}
              <Pie
                data={data}
                dataKey="visitors"
                nameKey="browser"
                cx="50%"
                cy="50%"
                outerRadius={chartSize.outer}
                innerRadius={chartSize.inner}
                strokeWidth={2}
                paddingAngle={2}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {trendText} <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">{descriptionText}</div>
        </CardFooter>
      </Card>
    )
  },
)

OptimizedPieChart.displayName = 'OptimizedPieChart'

export default OptimizedPieChart
