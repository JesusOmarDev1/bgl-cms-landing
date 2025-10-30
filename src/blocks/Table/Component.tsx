import React from 'react'
import { cn } from '@/utilities/ui/cn'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table'

import type { TableBlock as TableBlockProps } from '@/payload-types'

type Props = {
  className?: string
} & TableBlockProps

const getAlignmentClass = (align?: string | null) => {
  switch (align) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    default:
      return 'text-left'
  }
}

export const TableBlock: React.FC<Props> = ({
  className,
  caption,
  headers,
  rows,
  variant = 'default',
  responsive = true,
}) => {
  if (!headers || headers.length === 0 || !rows || rows.length === 0) {
    return (
      <div className="p-4 border border-dashed border-muted-foreground/25 rounded-lg text-center text-muted-foreground">
        <p className="text-sm">Tabla vacía - Configura encabezados y filas en el editor</p>
      </div>
    )
  }

  // Ensure all rows have the same number of cells as headers
  const normalizedRows =
    rows?.map((row) => {
      const cells = [...(row.cells || [])]
      // Pad with empty cells if needed
      while (cells.length < headers.length) {
        cells.push({ content: '', align: 'left', isHeader: false })
      }
      // Trim excess cells
      return { ...row, cells: cells.slice(0, headers.length) }
    }) || []

  const tableVariantClass = {
    default: '',
    striped: '[&_tbody_tr:nth-child(odd)]:bg-muted/25',
    compact: '[&_th]:py-1 [&_td]:py-1 [&_th]:px-1 [&_td]:px-1',
    specs:
      'border-collapse [&_th]:bg-muted/50 [&_th]:font-semibold [&_tbody_tr:nth-child(odd)]:bg-muted/10',
  }[variant || 'default']

  return (
    <div className={cn('my-4', className)}>
      <div className={cn(!responsive && 'overflow-visible')}>
        <Table className={cn(tableVariantClass)}>
          {caption && <TableCaption>{caption}</TableCaption>}

          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className={cn(getAlignmentClass(header.align))}>
                  {header.text}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {normalizedRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.cells.map((cell, cellIndex) => {
                  const CellComponent = cell.isHeader ? TableHead : TableCell
                  return (
                    <CellComponent
                      key={cellIndex}
                      className={cn(
                        getAlignmentClass(cell.align),
                        cell.isHeader && 'font-semibold bg-muted/25',
                      )}
                    >
                      {cell.content}
                    </CellComponent>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
