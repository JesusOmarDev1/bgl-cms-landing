import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Package, Scale, Settings } from 'lucide-react'
import { Product } from '@/payload-types'
import { getValueOrNA, getMaterialLabel, getPlatformTypeLabel } from '../../utils'

interface PhysicalSpecsTabProps {
  product: Product
}

export const PhysicalSpecsTab: React.FC<PhysicalSpecsTabProps> = ({ product }) => {
  const { type, generalSpecs, scaleSpecs, consumableSpecs } = product

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1">
        {/* Dimensiones y Peso */}
        <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
          <CardHeader className="p-6 pb-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Package className="size-5 text-primary" />
              Dimensiones y Peso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {/* General Specs - Always show for all types */}
                <TableRow>
                  <TableCell className="font-medium">Dimensiones Generales</TableCell>
                  <TableCell className="text-right">
                    {getValueOrNA(generalSpecs?.physicalSpecs?.dimensions)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Peso</TableCell>
                  <TableCell className="text-right">
                    {getValueOrNA(generalSpecs?.physicalSpecs?.weight)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Material</TableCell>
                  <TableCell className="text-right">
                    {getValueOrNA(generalSpecs?.physicalSpecs?.material)}
                  </TableCell>
                </TableRow>

                {/* Scale Specs */}
                {type === 'scale' && (
                  <TableRow>
                    <TableCell className="font-medium">Dimensiones Báscula</TableCell>
                    <TableCell className="text-right">
                      {getValueOrNA(scaleSpecs?.dimensions)}
                    </TableCell>
                  </TableRow>
                )}

                {/* Consumable Specs */}
                {type === 'consumable' && (
                  <>
                    <TableRow>
                      <TableCell className="font-medium">Dimensiones Consumible</TableCell>
                      <TableCell className="text-right">
                        {getValueOrNA(consumableSpecs?.physicalSpecs?.dimensions)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Peso Consumible</TableCell>
                      <TableCell className="text-right">
                        {getValueOrNA(consumableSpecs?.physicalSpecs?.weight)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Longitud del Cable</TableCell>
                      <TableCell className="text-right">
                        {getValueOrNA(consumableSpecs?.physicalSpecs?.cableLength)}
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Plataforma (Solo para básculas) */}
        {type === 'scale' && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Scale className="size-5 text-primary" />
                Plataforma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Dimensiones del Plato</TableCell>
                    <TableCell className="text-right">
                      {getValueOrNA(scaleSpecs?.platform?.dimensions)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Material del Plato</TableCell>
                    <TableCell className="text-right">
                      {scaleSpecs?.platform?.material
                        ? getMaterialLabel(scaleSpecs.platform.material)
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tipo de Plataforma</TableCell>
                    <TableCell className="text-right">
                      {scaleSpecs?.platform?.type
                        ? getPlatformTypeLabel(scaleSpecs.platform.type)
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Condiciones de Operación */}
        <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
          <CardHeader className="p-6 pb-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Settings className="size-5 text-primary" />
              Condiciones de Operación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Temperatura General</TableCell>
                  <TableCell className="text-right">
                    {getValueOrNA(generalSpecs?.operatingConditions?.temperature)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Humedad General</TableCell>
                  <TableCell className="text-right">
                    {getValueOrNA(generalSpecs?.operatingConditions?.humidity)}
                  </TableCell>
                </TableRow>
                {type === 'scale' && (
                  <TableRow>
                    <TableCell className="font-medium">
                      Temperatura de Operación (Solo aplica para basculas)
                    </TableCell>
                    <TableCell className="text-right">
                      {getValueOrNA(scaleSpecs?.operatingTemperature)}
                    </TableCell>
                  </TableRow>
                )}
                {type === 'consumable' && (
                  <>
                    <TableRow>
                      <TableCell className="font-medium">Temperatura (Consumible)</TableCell>
                      <TableCell className="text-right">
                        {getValueOrNA(consumableSpecs?.operatingConditions?.temperature)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Humedad (Consumible)</TableCell>
                      <TableCell className="text-right">
                        {getValueOrNA(consumableSpecs?.operatingConditions?.humidity)}
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
