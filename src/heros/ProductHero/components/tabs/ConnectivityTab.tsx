import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Monitor, Settings, Package, Award } from 'lucide-react'
import { Product } from '@/payload-types'
import { getLabel, getValueOrNA } from '../../utils'

interface ConnectivityTabProps {
  product: Product
}

export const ConnectivityTab: React.FC<ConnectivityTabProps> = ({ product }) => {
  const { type, generalSpecs, scaleSpecs, consumableSpecs } = product

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1">
        {/* Conectividad General */}
        <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
          <CardHeader className="p-6 pb-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Monitor className="size-5 text-primary" />
              Conectividad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {generalSpecs?.connectivity && generalSpecs.connectivity.length > 0 ? (
                  generalSpecs.connectivity.map((conn, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {getLabel('connectivity', conn.type)}
                      </TableCell>
                      <TableCell className="text-right">{getValueOrNA(conn.description)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="font-medium">Conectividad General</TableCell>
                    <TableCell className="text-right">N/A</TableCell>
                  </TableRow>
                )}
                {type === 'scale' &&
                scaleSpecs?.communication &&
                scaleSpecs.communication.length > 0 ? (
                  scaleSpecs.communication.map((comm, index) => (
                    <TableRow key={`scale-${comm.id || index}`}>
                      <TableCell className="font-medium">
                        {getLabel('connectivity', comm.type)} (Báscula)
                      </TableCell>
                      <TableCell className="text-right">{getValueOrNA(comm.description)}</TableCell>
                    </TableRow>
                  ))
                ) : type === 'scale' ? (
                  <TableRow>
                    <TableCell className="font-medium">Comunicación Báscula</TableCell>
                    <TableCell className="text-right">N/A</TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Funciones (Solo para básculas) */}
        {type === 'scale' && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Settings className="size-5 text-primary" />
                Funciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scaleSpecs?.functions && scaleSpecs.functions.length > 0 ? (
                <div className="space-y-3">
                  {scaleSpecs.functions.map((func, index) => (
                    <div key={func.id || index} className="p-3 rounded-lg bg-muted/30">
                      <h5 className="font-medium mb-1">{func.function}</h5>
                      {func.description && (
                        <p className="text-sm text-muted-foreground">{func.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">N/A</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Compatibilidad (Para consumibles) */}
        {type === 'consumable' && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Package className="size-5 text-primary" />
                Compatibilidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              {consumableSpecs?.compatibility && consumableSpecs.compatibility.length > 0 ? (
                <div className="space-y-2">
                  {consumableSpecs.compatibility.map((comp, index) => (
                    <div key={comp.id || index} className="p-2 rounded-lg bg-muted/30">
                      <span className="text-sm font-medium">{comp.model}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">N/A</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Certificaciones (Para consumibles) */}
        {type === 'consumable' && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Award className="size-5 text-primary" />
                Certificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              {consumableSpecs?.certifications && consumableSpecs.certifications.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {consumableSpecs.certifications.map((cert, index) => (
                    <Badge key={cert.id || index} variant="outline" className="text-xs">
                      {cert.certification.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">N/A</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
