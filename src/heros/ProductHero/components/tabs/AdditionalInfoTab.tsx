import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, List, Hammer } from 'lucide-react'
import { Product } from '@/payload-types'
import { getValueOrNA, getProductTypeLabel } from '../../utils'

interface AdditionalInfoTabProps {
  product: Product
}

export const AdditionalInfoTab: React.FC<AdditionalInfoTabProps> = ({ product }) => {
  const { brand, model, features, applications } = product

  const brandTitle = typeof brand === 'object' ? brand.title : null
  const modelTitle = typeof model === 'object' ? model.title : null

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1">
        {/* Información del Producto */}
        <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
          <CardHeader className="p-6 pb-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShoppingCart className="size-6 text-primary" />
              Información del Producto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">SKU / Código</TableCell>
                  <TableCell className="text-right">{getValueOrNA(product.productCode)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Marca</TableCell>
                  <TableCell className="text-right">{getValueOrNA(brandTitle)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Modelo</TableCell>
                  <TableCell className="text-right">{getValueOrNA(modelTitle)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tipo</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {product.type ? getProductTypeLabel(product.type) : 'N/A'}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Estado</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        product.status === 'active'
                          ? 'default'
                          : product.status === 'discontinued'
                            ? 'destructive'
                            : product.status === 'coming_soon'
                              ? 'secondary'
                              : 'outline'
                      }
                      className="text-xs"
                    >
                      {product.status === 'active' && 'Activo'}
                      {product.status === 'discontinued' && 'Descontinuado'}
                      {product.status === 'coming_soon' && 'Próximamente'}
                      {product.status === 'out_of_stock' && 'Agotado'}
                      {!product.status && 'N/A'}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Características */}
        {features && features.length > 0 && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <List className="size-5 text-primary" />
                Características
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={feature.id || index} className="p-3 rounded-lg bg-muted/30">
                    <h5 className="font-medium mb-1">{feature.feature}</h5>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Aplicaciones */}
        {applications && applications.length > 0 && (
          <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <CardHeader className="p-6 pb-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Hammer className="size-5 text-primary" />
                Aplicaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applications.map((application, index) => (
                  <div key={application.id || index} className="p-3 rounded-lg bg-muted/30">
                    <h5 className="font-medium mb-1 text-muted-foreground">
                      {application.application}
                    </h5>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
