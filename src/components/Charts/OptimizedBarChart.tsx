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
                <div className="chartTooltip">
                  <div className="tooltipHeader">
                    <h4 className="tooltipTitle">{label}</h4>
                  </div>
                  <div className="tooltipContent">
                    {payload.map((entry, index) => (
                      <div key={index} className="tooltipItem">
                        <div className="tooltipItemLeft">
                          <div
                            className="tooltipColorIndicator"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="tooltipLabel">
                            {entry.dataKey === 'desktop' ? 'Publicaciones' : 'Páginas'}
                          </span>
                        </div>
                        <span className="tooltipValue">{entry.value?.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="tooltipTotal">
                      <div className="tooltipTotalContent">
                        <span className="tooltipTotalLabel">Total</span>
                        <span className="tooltipTotalValue">
                          {payload
                            .reduce((sum, entry) => sum + (Number(entry.value) || 0), 0)
                            .toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
      ),
      [],
    )

    return (
      <div className="barChartContainer">
        <div className="barChartHeader">
          <h3 className="barChartTitle">{title}</h3>
          <p className="barChartSubtitle">{subtitle}</p>
        </div>

        <div className="barChartContent">
          <ChartContainer
            config={chartConfig}
            className="barChartWrapper"
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
        </div>

        <div className="barChartFooter">
          <div className="trendingText">
            {trendText} <TrendingUp className="icon" />
          </div>
          <div className="descriptionText">{descriptionText}</div>
        </div>
      </div>
    )
  },
)

OptimizedBarChart.displayName = 'OptimizedBarChart'

export default OptimizedBarChart
