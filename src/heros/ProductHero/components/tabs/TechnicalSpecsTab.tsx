import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Scale, Monitor, Package, Zap, Settings } from 'lucide-react'
import { Product } from '@/payload-types'
import {
  getValueOrNA,
  getCapacityTypeLabel,
  getDisplayTypeLabel,
  getConsumableTypeLabel,
  getPowerSupplyLabel,
} from '../../utils'

interface TechnicalSpecsTabProps {
  product: Product
}

export const TechnicalSpecsTab: React.FC<TechnicalSpecsTabProps> = ({ product }) => {
  const { type, generalSpecs, scaleSpecs, consumableSpecs } = product

  // Función para verificar si hay datos de alimentación
  const hasPowerSupplyData = () => {
    return !!(
      generalSpecs?.powerSupply?.type ||
      generalSpecs?.powerSupply?.specifications ||
      generalSpecs?.powerSupply?.batteryLife ||
      (type === 'scale' && scaleSpecs?.powerSupply)
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1">
        {/* Capacidad (Solo para básculas) */}
        {type === 'scale' && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Scale className="size-5 text-primary" />
                Capacidad y Precisión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Capacidad Máxima</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {getValueOrNA(scaleSpecs?.capacity?.maximum)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">División Mínima</TableCell>
                    <TableCell className="text-right">
                      {getValueOrNA(scaleSpecs?.capacity?.minimumDivision)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tipo de Capacidad</TableCell>
                    <TableCell className="text-right">
                      {scaleSpecs?.capacity?.type
                        ? getCapacityTypeLabel(scaleSpecs.capacity.type)
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                  {scaleSpecs?.capacity?.ranges && scaleSpecs.capacity.ranges.length > 0 && (
                    <TableRow>
                      <TableCell className="font-medium">Rangos</TableCell>
                      <TableCell className="text-right">
                        <div className="space-y-1">
                          {scaleSpecs.capacity.ranges.map((range, index) => (
                            <div key={range.id || index} className="text-xs">
                              {getValueOrNA(range.range)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Pantalla y Display */}
        {type === 'scale' && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Monitor className="size-5 text-primary" />
                Pantalla e Interfaz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Tipo de Display</TableCell>
                    <TableCell className="text-right">
                      {scaleSpecs?.display?.type
                        ? getDisplayTypeLabel(scaleSpecs.display.type)
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Descripción</TableCell>
                    <TableCell className="text-right">
                      {getValueOrNA(scaleSpecs?.display?.description)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Unidades</TableCell>
                    <TableCell className="text-right">
                      {scaleSpecs?.units && scaleSpecs.units.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-end">
                          {scaleSpecs.units.map((unit, index) => (
                            <Badge key={unit.id || index} variant="outline" className="text-xs">
                              {unit.unit}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Tipo de Consumible */}
        {type === 'consumable' && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Package className="size-5 text-primary" />
                Tipo de Consumible
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-lg bg-muted/30">
                <Badge variant="secondary" className="text-sm">
                  {consumableSpecs?.consumableType
                    ? getConsumableTypeLabel(consumableSpecs.consumableType)
                    : 'N/A'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Especificaciones Eléctricas (Para consumibles) */}
        {type === 'consumable' && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="size-5 text-primary" />
                Especificaciones Eléctricas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Voltaje de Entrada</TableCell>
                    <TableCell className="text-right">
                      {getValueOrNA(consumableSpecs?.electricalSpecs?.inputVoltage)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Voltaje de Salida</TableCell>
                    <TableCell className="text-right">
                      {getValueOrNA(consumableSpecs?.electricalSpecs?.outputVoltage)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Potencia</TableCell>
                    <TableCell className="text-right">
                      {getValueOrNA(consumableSpecs?.electricalSpecs?.power)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Frecuencia</TableCell>
                    <TableCell className="text-right">
                      {getValueOrNA(consumableSpecs?.electricalSpecs?.frequency)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Alimentación (Solo si hay datos de alimentación) */}
        {hasPowerSupplyData() && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="size-5 text-primary" />
                Alimentación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {/* Especificaciones Generales de Alimentación */}
                  {generalSpecs?.powerSupply?.type && (
                    <TableRow>
                      <TableCell className="font-medium">Tipo de Alimentación</TableCell>
                      <TableCell className="text-right">
                        {getPowerSupplyLabel(generalSpecs.powerSupply.type)}
                      </TableCell>
                    </TableRow>
                  )}

                  {generalSpecs?.powerSupply?.specifications && (
                    <TableRow>
                      <TableCell className="font-medium">Especificaciones Eléctricas</TableCell>
                      <TableCell className="text-right">
                        {generalSpecs.powerSupply.specifications}
                      </TableCell>
                    </TableRow>
                  )}

                  {generalSpecs?.powerSupply?.batteryLife && (
                    <TableRow>
                      <TableCell className="font-medium">Duración de Batería</TableCell>
                      <TableCell className="text-right">
                        {generalSpecs.powerSupply.batteryLife}
                      </TableCell>
                    </TableRow>
                  )}

                  {/* Especificaciones específicas de la báscula */}
                  {type === 'scale' && scaleSpecs?.powerSupply && (
                    <>
                      {scaleSpecs.powerSupply.type && (
                        <TableRow>
                          <TableCell className="font-medium">Alimentación de la Báscula</TableCell>
                          <TableCell className="text-right">
                            {getPowerSupplyLabel(scaleSpecs.powerSupply.type)}
                          </TableCell>
                        </TableRow>
                      )}

                      {scaleSpecs.powerSupply.specifications && (
                        <TableRow>
                          <TableCell className="font-medium">
                            Especificaciones de la Báscula
                          </TableCell>
                          <TableCell className="text-right">
                            {scaleSpecs.powerSupply.specifications}
                          </TableCell>
                        </TableRow>
                      )}

                      {scaleSpecs.powerSupply.batteryDetails && (
                        <TableRow>
                          <TableCell className="font-medium">Detalles de Batería</TableCell>
                          <TableCell className="text-right">
                            {scaleSpecs.powerSupply.batteryDetails}
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Teclado (Solo para básculas) */}
        {type === 'scale' && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Settings className="size-5 text-primary" />
                Teclado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Número de Teclas</TableCell>
                    <TableCell className="text-right">
                      {scaleSpecs?.keyboard?.keys || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Descripción</TableCell>
                    <TableCell className="text-right">
                      {getValueOrNA(scaleSpecs?.keyboard?.description)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Especificaciones Generales (Para productos que no son básculas ni consumibles) */}
        {type !== 'scale' && type !== 'consumable' && generalSpecs && !generalSpecs.powerSupply && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Settings className="size-5 text-primary" />
                Especificaciones Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    No hay especificaciones técnicas adicionales disponibles para este producto.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
