'use client'
import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { useDebouncedWindowSize } from '@/hooks/useDebounceWindowed'

import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AreaChartData {
  date: string
  desktop: number
  mobile: number
}

interface AreaChartProps {
  data?: AreaChartData[]
  title?: string
  subtitle?: string
  showTimeRange?: boolean
}

export const description = 'An interactive area chart'

const chartConfig = {
  visitors: {
    label: 'Visitantes',
  },
  desktop: {
    label: 'Actividad Principal',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Actividad Secundaria',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const OptimizedAreaChart = React.memo<AreaChartProps>(
  ({
    data = [],
    title = 'Gráfico de Área - Interactivo',
    subtitle = 'Mostrando visitantes totales de los últimos 3 meses',
    showTimeRange = true,
  }) => {
    const [timeRange, setTimeRange] = React.useState('90d')
    const windowSize = useDebouncedWindowSize(200)

    const filteredData = React.useMemo(() => {
      return data.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date('2024-06-30')
        let daysToSubtract = 90
        if (timeRange === '30d') {
          daysToSubtract = 30
        } else if (timeRange === '7d') {
          daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
      })
    }, [data, timeRange])

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
              const date = new Date(label).toLocaleDateString('es-MX', {
                month: 'short',
                day: 'numeric',
              })

              return (
                <div className="chartTooltip">
                  <div className="tooltipHeader">
                    <h4 className="tooltipTitle">{date}</h4>
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
                            {entry.dataKey === 'desktop' ? 'Actividad Principal' : 'Actividad Secundaria'}
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
      <div className="areaChartContainer">
        <div className="areaChartHeader">
          <div className="areaChartHeaderContent">
            <h3 className="areaChartTitle">{title}</h3>
            <p className="areaChartSubtitle">{subtitle}</p>
          </div>
          {showTimeRange && (
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="areaChartSelect areaSelectTrigger"
                aria-label="Seleccionar período"
              >
                <SelectValue placeholder="Últimos 3 meses" />
              </SelectTrigger>
              <SelectContent className="areaSelectContent">
                <SelectItem value="90d" className="areaSelectItem">
                  Últimos 3 meses
                </SelectItem>
                <SelectItem value="30d" className="areaSelectItem">
                  Últimos 30 días
                </SelectItem>
                <SelectItem value="7d" className="areaSelectItem">
                  Últimos 7 días
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="areaChartContent">
          <ChartContainer
            config={chartConfig}
            className="areaChartWrapper"
            style={{ height: chartHeight }}
          >
            <AreaChart data={filteredData} width={800} height={chartHeight}>
              <defs>
                <linearGradient id="area-chart-01-fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.9} />
                  <stop offset="50%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="area-chart-01-fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.9} />
                  <stop offset="50%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              />
              {memoizedTooltip}
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#area-chart-01-fillMobile)"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#area-chart-01-fillDesktop)"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    )
  },
)

OptimizedAreaChart.displayName = 'OptimizedAreaChart'

export default OptimizedAreaChart
