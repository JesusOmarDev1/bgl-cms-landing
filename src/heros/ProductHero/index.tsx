import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import Categories from '@/components/ui/categories'
import { LucideIcon } from '@/components/ui/LucideIcon'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Calendar,
  Package,
  Zap,
  Award,
  Info,
  Scale,
  Monitor,
  Settings,
  FileText,
  Star,
} from 'lucide-react'
import { Product } from '@/payload-types'

// Centralized label mapping utilities
const LABELS = {
  powerSupply: {
    ac_electric: 'Eléctrica AC',
    battery: 'Batería',
    rechargeable_battery: 'Batería Recargable',
    mixed: 'Mixta',
    usb: 'USB',
  },
  connectivity: {
    usb: 'USB',
    rs232: 'RS-232',
    wifi: 'WiFi',
    ethernet: 'Ethernet',
    bluetooth: 'Bluetooth',
    data_cable: 'Cable de Datos',
  },
  material: {
    stainless_steel: 'Acero Inoxidable',
    aluminum: 'Aluminio',
    steel: 'Acero',
    plastic: 'Plástico',
    adaptable: 'Adaptable',
  },
  os: {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    android: 'Android',
    ios: 'iOS',
  },
} as const

const getLabel = (category: keyof typeof LABELS, key: string): string => {
  return LABELS[category][key as keyof (typeof LABELS)[typeof category]] || key
}

// Utility functions
const getPowerSupplyLabel = (type: string): string => {
  return getLabel('powerSupply', type)
}

const getMaterialLabel = (material: string): string => {
  return getLabel('material', material)
}

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    categories,
    heroImage,
    publishedAt,
    title,
    meta,
    brand,
    model,
    warranty,
    type,
    generalSpecs,
    scaleSpecs,
    consumableSpecs,
    excerpt,
    features,
    applications,
    gallery,
  } = product

  // Simple brand and model titles
  const brandTitle = typeof brand === 'object' ? brand.title : null
  const brandHeroImage = typeof brand === 'object' ? brand.heroImage : null
  const modelTitle = typeof model === 'object' ? model.title : null

  const description = excerpt || meta?.description || ''

  // Get key specifications for quick overview
  const getKeySpecs = () => {
    const specs = []

    // General specifications
    if (generalSpecs?.physicalSpecs?.dimensions) {
      specs.push({
        icon: Package,
        label: 'Dimensiones',
        value: generalSpecs.physicalSpecs.dimensions,
      })
    }

    if (generalSpecs?.physicalSpecs?.weight) {
      specs.push({ icon: Package, label: 'Peso', value: generalSpecs.physicalSpecs.weight })
    }

    if (generalSpecs?.powerSupply?.type && generalSpecs.powerSupply.type !== 'none') {
      const powerLabel = getPowerSupplyLabel(generalSpecs.powerSupply.type)
      specs.push({ icon: Zap, label: 'Alimentación', value: powerLabel })
    }

    // Scale specific specs
    if (type === 'scale' && scaleSpecs?.capacity?.maximum) {
      specs.push({ icon: Scale, label: 'Capacidad Máx.', value: scaleSpecs.capacity.maximum })
    }

    if (type === 'scale' && scaleSpecs?.platform?.dimensions) {
      specs.push({ icon: Package, label: 'Plato', value: scaleSpecs.platform.dimensions })
    }

    return specs.slice(0, 6) // Limit to 6 key specs
  }

  const keySpecs = getKeySpecs()

  return (
    <section className="py-8">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Image Carousel */}
            <div className="relative">
              <Carousel className="w-full" opts={{ align: 'start', loop: true }}>
                <CarouselContent>
                  {/* Hero Image */}
                  {heroImage && typeof heroImage !== 'string' && (
                    <CarouselItem>
                      <div className="relative overflow-hidden rounded-lg border bg-muted">
                        <AspectRatio ratio={4 / 3}>
                          <Media
                            priority
                            resource={heroImage}
                            className="object-contain w-full h-full p-8"
                          />
                        </AspectRatio>
                      </div>
                    </CarouselItem>
                  )}

                  {/* Gallery Images */}
                  {gallery &&
                    gallery.length > 0 &&
                    gallery.map(
                      (item, index) =>
                        item.image &&
                        typeof item.image !== 'string' && (
                          <CarouselItem key={item.id || index}>
                            <div className="relative overflow-hidden rounded-lg border bg-muted">
                              <AspectRatio ratio={4 / 3}>
                                <Media
                                  resource={item.image}
                                  className="object-contain w-full h-full p-8"
                                  alt={item.alt || `Imagen ${index + 1} del producto`}
                                />
                              </AspectRatio>
                              {/* Caption overlay */}
                              {item.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm rounded-b-lg">
                                  {item.caption}
                                </div>
                              )}
                            </div>
                          </CarouselItem>
                        ),
                    )}
                </CarouselContent>

                {/* Navigation buttons - only show if there are multiple images */}
                {(heroImage && typeof heroImage !== 'string' ? 1 : 0) + (gallery?.length || 0) >
                  1 && (
                  <>
                    <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
                    <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
                  </>
                )}
              </Carousel>

              {/* Image counter */}
              {(heroImage && typeof heroImage !== 'string' ? 1 : 0) + (gallery?.length || 0) >
                1 && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                  {(heroImage && typeof heroImage !== 'string' ? 1 : 0) + (gallery?.length || 0)}{' '}
                  imágenes
                </div>
              )}
            </div>

            {/* Thumbnail navigation - only show if there are multiple images */}
            {(heroImage && typeof heroImage !== 'string' ? 1 : 0) + (gallery?.length || 0) > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {/* Hero Image Thumbnail */}
                {heroImage && typeof heroImage !== 'string' && (
                  <div className="flex-shrink-0 w-16 h-16 rounded border-2 border-transparent hover:border-primary cursor-pointer overflow-hidden bg-muted">
                    <Media resource={heroImage} className="object-contain w-full h-full p-1" />
                  </div>
                )}

                {/* Gallery Thumbnails */}
                {gallery &&
                  gallery.length > 0 &&
                  gallery.map(
                    (item, index) =>
                      item.image &&
                      typeof item.image !== 'string' && (
                        <div
                          key={item.id || index}
                          className="flex-shrink-0 w-16 h-16 rounded border-2 border-transparent hover:border-primary cursor-pointer overflow-hidden bg-muted"
                        >
                          <Media
                            resource={item.image}
                            className="object-contain w-full h-full p-1"
                            alt={item.alt || `Miniatura ${index + 1}`}
                          />
                        </div>
                      ),
                  )}
              </div>
            )}

            {/* Brand logo if available */}
            {brandHeroImage && typeof brandHeroImage !== 'string' && (
              <div className="relative h-16 overflow-hidden rounded-lg border bg-background p-4">
                <Media resource={brandHeroImage} className="h-full w-full object-contain" />
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Categories */}
            <Categories showCategories={true} hasCategories={true} categories={categories} />

            {/* Title and Brand */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{title}</h1>
              {(brandTitle || modelTitle) && (
                <p className="text-xl text-muted-foreground">
                  {brandTitle && modelTitle
                    ? `${brandTitle} - ${modelTitle}`
                    : brandTitle || modelTitle}
                </p>
              )}
            </div>

            {/* Description */}
            {description && <p className="text-muted-foreground">{description}</p>}

            {/* Features */}
            {features && features.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold">
                    <Star className="h-4 w-4" />
                    Características Destacadas
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {features.map((feature, index) => (
                      <div key={feature.id || index} className="flex items-center gap-3">
                        {feature.icon ? (
                          <LucideIcon
                            name={feature.icon}
                            size={16}
                            className="text-muted-foreground flex-shrink-0"
                          />
                        ) : (
                          <Star className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <p className="text-sm font-medium">{feature.feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Specifications */}
            {keySpecs.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold">
                    <Info className="h-4 w-4" />
                    Especificaciones Clave
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {keySpecs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <spec.icon className="h-4 w-4 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{spec.label}</p>
                          <p className="text-sm text-muted-foreground truncate">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Publicado {formatDateTime(publishedAt)}</span>
                </div>
              )}
              {warranty && (
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>Garantía {warranty} días</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Specifications Tabs */}
        <div className="mt-12">
          <Tabs
            defaultValue={
              type === 'scale' ? 'scale' : type === 'consumable' ? 'consumable' : 'general'
            }
            className="w-full"
          >
            <TabsList
              className={`grid w-full ${
                type === 'scale' && scaleSpecs
                  ? 'grid-cols-2'
                  : type === 'consumable' && consumableSpecs
                    ? 'grid-cols-2'
                    : 'grid-cols-2'
              }`}
            >
              {type !== 'scale' && type !== 'consumable' && (
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Especificaciones
                </TabsTrigger>
              )}
              {type === 'scale' && scaleSpecs && (
                <TabsTrigger value="scale" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Especificaciones
                </TabsTrigger>
              )}
              {type === 'consumable' && consumableSpecs && (
                <TabsTrigger value="consumable" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Especificaciones
                </TabsTrigger>
              )}
              <TabsTrigger value="additional" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Información Adicional
              </TabsTrigger>
            </TabsList>

            {/* General Specifications Tab */}
            <TabsContent value="general" className="space-y-6">
              {generalSpecs ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Basic Information */}
                  {(generalSpecs.physicalSpecs?.dimensions ||
                    generalSpecs.physicalSpecs?.weight ||
                    generalSpecs.physicalSpecs?.material) && (
                    <Card>
                      <CardHeader className="p-6">
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          Información Básica
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableBody>
                            {generalSpecs.physicalSpecs?.dimensions && (
                              <TableRow>
                                <TableCell className="font-medium">Dimensiones</TableCell>
                                <TableCell>{generalSpecs.physicalSpecs.dimensions}</TableCell>
                              </TableRow>
                            )}
                            {generalSpecs.physicalSpecs?.weight && (
                              <TableRow>
                                <TableCell className="font-medium">Peso</TableCell>
                                <TableCell>{generalSpecs.physicalSpecs.weight}</TableCell>
                              </TableRow>
                            )}
                            {generalSpecs.physicalSpecs?.material && (
                              <TableRow>
                                <TableCell className="font-medium">Material</TableCell>
                                <TableCell>{generalSpecs.physicalSpecs.material}</TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  )}

                  {/* Power and Connectivity */}
                  {(generalSpecs.powerSupply || generalSpecs.connectivity) && (
                    <Card>
                      <CardHeader className="p-6">
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          Alimentación y Conectividad
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {generalSpecs.powerSupply && (
                          <div>
                            <h4 className="font-medium mb-2">Alimentación</h4>
                            <p className="text-sm text-muted-foreground">
                              {generalSpecs.powerSupply.specifications ||
                                getPowerSupplyLabel(generalSpecs.powerSupply.type || '')}
                            </p>
                          </div>
                        )}
                        {generalSpecs.connectivity && generalSpecs.connectivity.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Conectividad</h4>
                            <div className="flex flex-wrap gap-2">
                              {generalSpecs.connectivity.map((conn, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  title={conn.description || undefined}
                                >
                                  {getLabel('connectivity', conn.type)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : null}

              {/* Show message when no general specs are available */}
              {!generalSpecs && (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      No hay especificaciones generales disponibles para este producto.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            {/* Scale Specifications Tab */}
            {type === 'scale' && scaleSpecs && (
              <TabsContent value="scale" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Capacity and Platform */}
                  <Card>
                    <CardHeader className="p-6">
                      <CardTitle className="flex items-center gap-2">
                        <Scale className="h-5 w-5" />
                        Capacidad y Plataforma
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Capacidad Máxima</TableCell>
                            <TableCell>{scaleSpecs.capacity.maximum}</TableCell>
                          </TableRow>
                          {scaleSpecs.capacity.minimumDivision && (
                            <TableRow>
                              <TableCell className="font-medium">División Mínima</TableCell>
                              <TableCell>{scaleSpecs.capacity.minimumDivision}</TableCell>
                            </TableRow>
                          )}
                          <TableRow>
                            <TableCell className="font-medium">Dimensiones del Plato</TableCell>
                            <TableCell>{scaleSpecs.platform.dimensions}</TableCell>
                          </TableRow>
                          {scaleSpecs.platform.material && (
                            <TableRow>
                              <TableCell className="font-medium">Material del Plato</TableCell>
                              <TableCell>
                                {getMaterialLabel(scaleSpecs.platform.material)}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Display and Interface */}
                  {(scaleSpecs.display || scaleSpecs.units) && (
                    <Card>
                      <CardHeader className="p-6">
                        <CardTitle className="flex items-center gap-2">
                          <Monitor className="h-5 w-5" />
                          Pantalla e Interfaz
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableBody>
                            {scaleSpecs.display?.description && (
                              <TableRow>
                                <TableCell className="font-medium">Tipo de Pantalla</TableCell>
                                <TableCell>{scaleSpecs.display.description}</TableCell>
                              </TableRow>
                            )}
                            {scaleSpecs.units && scaleSpecs.units.length > 0 && (
                              <TableRow>
                                <TableCell className="font-medium">Unidades</TableCell>
                                <TableCell>
                                  {scaleSpecs.units.map((unit, index) => (
                                    <span key={unit.id || index}>
                                      {unit.unit}
                                      {index < scaleSpecs.units!.length - 1 ? ', ' : ''}
                                    </span>
                                  ))}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            )}

            {/* Consumable Specifications Tab */}
            {type === 'consumable' && consumableSpecs && (
              <TabsContent value="consumable" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Electrical Specifications */}
                  {consumableSpecs.electricalSpecs && (
                    <Card>
                      <CardHeader className="p-6">
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          Especificaciones Eléctricas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableBody>
                            {consumableSpecs.electricalSpecs.inputVoltage && (
                              <TableRow>
                                <TableCell className="font-medium">Voltaje de Entrada</TableCell>
                                <TableCell>
                                  {consumableSpecs.electricalSpecs.inputVoltage}
                                </TableCell>
                              </TableRow>
                            )}
                            {consumableSpecs.electricalSpecs.outputVoltage && (
                              <TableRow>
                                <TableCell className="font-medium">Voltaje de Salida</TableCell>
                                <TableCell>
                                  {consumableSpecs.electricalSpecs.outputVoltage}
                                </TableCell>
                              </TableRow>
                            )}
                            {consumableSpecs.electricalSpecs.power && (
                              <TableRow>
                                <TableCell className="font-medium">Potencia</TableCell>
                                <TableCell>{consumableSpecs.electricalSpecs.power}</TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  )}

                  {/* Lifespan Information */}
                  {consumableSpecs.lifespan && (
                    <Card>
                      <CardHeader className="p-6">
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Vida Útil
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableBody>
                            {consumableSpecs.lifespan.expectedLife && (
                              <TableRow>
                                <TableCell className="font-medium">Vida Esperada</TableCell>
                                <TableCell>{consumableSpecs.lifespan.expectedLife}</TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            )}

            {/* Additional Information Tab */}
            <TabsContent value="additional" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="p-6">
                    <CardTitle>Información Adicional</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Garantía</h4>
                        <p className="text-sm text-muted-foreground">
                          {warranty ? `${warranty} días` : 'No especificada'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Tipo de Producto</h4>
                        <Badge variant="outline">
                          {type === 'scale'
                            ? 'Báscula'
                            : type === 'consumable'
                              ? 'Consumible'
                              : 'General'}
                        </Badge>
                      </div>
                      {publishedAt && (
                        <div>
                          <h4 className="font-medium mb-2">Fecha de Publicación</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDateTime(publishedAt)}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Features Card */}
                {features && features.length > 0 && (
                  <Card>
                    <CardHeader className="p-6">
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Características
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {features.map((feature, index) => (
                          <div key={feature.id || index} className="flex items-start gap-3">
                            {feature.icon ? (
                              <LucideIcon
                                name={feature.icon}
                                size={18}
                                className="text-primary mt-0.5 flex-shrink-0"
                              />
                            ) : (
                              <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            )}
                            <p className="text-sm">{feature.feature}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Applications Card */}
                {applications && applications.length > 0 && (
                  <Card>
                    <CardHeader className="p-6">
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Aplicaciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {applications.map((app, index) => (
                          <div key={app.id || index} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                            <p className="text-sm">{app.application}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
