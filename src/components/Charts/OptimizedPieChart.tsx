'use client'
import * as React from 'react'
import { Pie, PieChart } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { useDebouncedWindowSize } from '@/hooks/useDebounceWindowed'

import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart'

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
                <div className="chartTooltip">
                  <div className="tooltipHeader">
                    <div className="tooltipItemLeft">
                      <div
                        className="tooltipColorIndicator"
                        style={{ backgroundColor: dataPoint.fill }}
                      />
                      <h4 className="tooltipTitle">{dataPoint.browser}</h4>
                    </div>
                  </div>
                  <div className="tooltipContent">
                    <div className="tooltipItem">
                      <span className="tooltipLabel">Cantidad:</span>
                      <span className="tooltipValue">{dataPoint.visitors.toLocaleString()}</span>
                    </div>
                    <div className="tooltipItem">
                      <span className="tooltipLabel">Porcentaje:</span>
                      <span className="tooltipValue">{percentage}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
      ),
      [data],
    )

    return (
      <div className="pieChartContainer">
        <div className="pieChartHeader">
          <h3 className="pieChartTitle">{title}</h3>
          <p className="pieChartSubtitle">{subtitle}</p>
        </div>

        <div className="pieChartContent">
          <ChartContainer config={chartConfig} className="pieChartWrapper">
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
        </div>

        <div className="pieChartFooter">
          <div className="trendingText">
            {trendText} <TrendingUp className="icon" />
          </div>
          <div className="descriptionText">{descriptionText}</div>
        </div>
      </div>
    )
  },
)

OptimizedPieChart.displayName = 'OptimizedPieChart'

export default OptimizedPieChart
