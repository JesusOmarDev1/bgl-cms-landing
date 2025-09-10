'use client'
import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { useDebouncedWindowSize } from '@/hooks/useDebounceWindowed'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface BarChartData {
  month: string
  desktop: number
  mobile: number
}

interface BarChartProps {
  data?: BarChartData[]
  title?: string
  subtitle?: string
  trendText?: string
  descriptionText?: string
}

const chartConfig = {
  desktop: {
    label: 'Publicaciones',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Páginas',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const OptimizedBarChart = React.memo<BarChartProps>(
  ({
    data = [],
    title = 'Gráfico de Barras - Interactivo',
    subtitle = 'Enero - Junio 2024',
    trendText = 'Tendencia positiva del 5.2% este mes',
    descriptionText = 'Mostrando visitantes totales de los últimos 6 meses',
  }) => {
    const windowSize = useDebouncedWindowSize(200)

    const chartHeight = React.useMemo(() => {
      if (windowSize.width < 480) return 200
      if (windowSize.width < 640) return 240
      if (windowSize.width < 1024) return 280
      return 320
    }, [windowSize.width])

    const memoizedTooltip = React.useMemo(
      () => (
        <ChartTooltip
          cursor={false}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="p-3 shadow-lg">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-sm font-medium">{label}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-2">
                    {payload.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {entry.dataKey === 'desktop' ? 'Publicaciones' : 'Páginas'}
                          </span>
                        </div>
                        <span className="font-medium">{entry.value?.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Total</span>
                        <span className="font-semibold">
                          {payload
                            .reduce((sum, entry) => sum + (Number(entry.value) || 0), 0)
                            .toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            }
            return null
          }}
        />
      ),
      [],
    )

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="w-full"
            style={{ height: chartHeight }}
          >
            <BarChart data={data} width={400} height={chartHeight}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              {memoizedTooltip}
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
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

OptimizedBarChart.displayName = 'OptimizedBarChart'

export default OptimizedBarChart
