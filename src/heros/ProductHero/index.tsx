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
import Share from '@/components/ui/share'

// Utilidades centralizadas de etiquetas y traducciones
const LABELS = {
  powerSupply: {
    ac_electric: 'Eléctrica AC',
    battery: 'Batería',
    rechargeable_battery: 'Batería Recargable',
    internal_battery: 'Batería Interna',
    mixed: 'Mixta',
    usb: 'USB',
    eliminator: 'Eliminador',
    none: 'Ninguna',
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
    stainless_steel_coating: 'Recubrimiento Acero Inoxidable',
  },
  displayType: {
    lcd_backlit: 'LCD Retroiluminado',
    led_high_visibility: 'LED Alta Visibilidad',
    lcd_green: 'LCD Verde',
    double_red: 'Doble Rojo',
    led_red_tower: 'Torre LED Roja',
    led_6_digits: 'LED 6 Dígitos',
  },
  platformType: {
    standard_plate: 'Plato Estándar',
    heavy_duty_wheels: 'Ruedas Trabajo Pesado',
    platform_pedestal: 'Plataforma con Pedestal',
  },
  capacityType: {
    multirange: 'Multirango',
    single_range: 'Rango Único',
    configurable: 'Configurable',
  },
  consumableType: {
    charger_eliminator: 'Cargador/Eliminador',
    battery: 'Batería',
    cable: 'Cable',
    accessory: 'Accesorio',
    spare_part: 'Repuesto',
  },
  certifications: {
    ce: 'CE',
    fcc: 'FCC',
    ul: 'UL',
    rohs: 'RoHS',
  },
} as const

const getLabel = (category: keyof typeof LABELS, key: string): string => {
  return LABELS[category][key as keyof (typeof LABELS)[typeof category]] || key
}

// Funciones de utilidad para etiquetas
const getPowerSupplyLabel = (type: string): string => {
  return getLabel('powerSupply', type)
}

const getMaterialLabel = (material: string): string => {
  return getLabel('material', material)
}

const getDisplayTypeLabel = (type: string): string => {
  return getLabel('displayType', type)
}

const getPlatformTypeLabel = (type: string): string => {
  return getLabel('platformType', type)
}

const getCapacityTypeLabel = (type: string): string => {
  return getLabel('capacityType', type)
}

const getConsumableTypeLabel = (type: string): string => {
  return getLabel('consumableType', type)
}

// Función para manejar valores null/vacíos
const getValueOrNA = (value: string | null | undefined): string => {
  return value && value.trim() !== '' ? value : 'N/A'
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
    slug,
  } = product

  const href = `/${'products'}/${slug}`

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

    if (type === 'scale' && scaleSpecs?.capacity?.minimumDivision) {
      specs.push({
        icon: Scale,
        label: 'División Mín.',
        value: scaleSpecs.capacity.minimumDivision,
      })
    }

    if (type === 'scale' && scaleSpecs?.capacity?.type) {
      specs.push({ icon: Scale, label: 'Tipo de Capacidad', value: scaleSpecs.capacity.type })
    }

    return specs.slice(0, 6) // Limit to 6 key specs
  }

  const keySpecs = getKeySpecs()

  return (
    <section className="py-8">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Image Carousel */}
            <div className="relative">
              <Carousel className="w-full" opts={{ align: 'start', loop: true }}>
                <CarouselContent>
                  {/* Hero Image */}
                  {heroImage && typeof heroImage !== 'string' && (
                    <CarouselItem>
                      <div className="relative overflow-hidden rounded-lg border bg-white shadow-sm">
                        <AspectRatio ratio={1}>
                          <Media
                            priority
                            resource={heroImage}
                            className="object-contain w-full h-full p-4"
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
                            <div className="relative overflow-hidden rounded-lg border bg-white shadow-sm">
                              <AspectRatio ratio={1}>
                                <Media
                                  resource={item.image}
                                  className="object-contain w-full h-full p-4"
                                  alt={`Imagen ${index + 1} del producto`}
                                />
                              </AspectRatio>
                            </div>
                          </CarouselItem>
                        ),
                    )}
                </CarouselContent>

                {/* Navigation buttons - only show if there are multiple images */}
                {(heroImage && typeof heroImage !== 'string' ? 1 : 0) + (gallery?.length || 0) >
                  1 && (
                  <>
                    <CarouselPrevious className="left-2 bg-white/90 hover:bg-white shadow-md border" />
                    <CarouselNext className="right-2 bg-white/90 hover:bg-white shadow-md border" />
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
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {/* Hero Image Thumbnail */}
                {heroImage && typeof heroImage !== 'string' && (
                  <div className="flex-shrink-0 w-16 h-16 rounded border-2 border-transparent hover:border-primary cursor-pointer overflow-hidden bg-white shadow-sm transition-all duration-200">
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
                          className="flex-shrink-0 w-16 h-16 rounded border-2 border-transparent hover:border-primary cursor-pointer overflow-hidden bg-white shadow-sm transition-all duration-200"
                        >
                          <Media
                            resource={item.image}
                            className="object-contain w-full h-full p-1"
                            alt={`Miniatura ${index + 1}`}
                          />
                        </div>
                      ),
                  )}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Categories */}
            <Categories showCategories={true} hasCategories={true} categories={categories} />

            {/* Title and Brand */}
            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{title}</h1>

                {(brandTitle || modelTitle) && (
                  <p className="text-xl text-muted-foreground">
                    {brandTitle && modelTitle
                      ? `${brandTitle} - ${modelTitle}`
                      : brandTitle || modelTitle}
                  </p>
                )}
              </div>

              {brandHeroImage && typeof brandHeroImage === 'object' && brandHeroImage.url && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border shadow-sm flex-shrink-0">
                    <Media
                      resource={brandHeroImage}
                      className="w-full h-full object-contain p-1"
                      alt={`Logo de ${brandTitle}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">Marca</p>
                    <p className="text-lg font-semibold">{brandTitle}</p>
                  </div>
                </div>
              )}

              {/* Product Status Badge */}
              {product.status && (
                <div className="flex items-center gap-2 flex-wrap">
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
                  >
                    {product.status === 'active' && 'Activo'}
                    {product.status === 'discontinued' && 'Descontinuado'}
                    {product.status === 'coming_soon' && 'Próximamente'}
                    {product.status === 'out_of_stock' && 'Agotado'}
                  </Badge>
                  {product.productCode && (
                    <Badge variant="outline" className="text-xs">
                      {product.productCode}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {description && <p className="text-muted-foreground">{description}</p>}

            {/* Key Specifications */}
            {keySpecs.length > 0 && (
              <Card className="pb-0">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold">
                    <Info className="h-4 w-4" />
                    Especificaciones Clave
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                    {keySpecs.map((spec, index) => (
                      <div key={index} className="flex items-start gap-3 p-0">
                        <spec.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground">{spec.label}</p>
                          <p className="text-sm text-muted-foreground mt-1 break-words">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Share className="w-full" text="Compartir" url={href} />

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
          <Tabs defaultValue="physical" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-fit gap-1">
              {/* Especificaciones Físicas */}
              <TabsTrigger value="physical" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Físicas</span>
                <span className="sm:hidden">Físicas</span>
              </TabsTrigger>

              {/* Especificaciones Técnicas */}
              {type === 'scale' && scaleSpecs && (
                <TabsTrigger value="technical" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  <span className="hidden sm:inline">Técnicas</span>
                  <span className="sm:hidden">Téc.</span>
                </TabsTrigger>
              )}
              {type === 'consumable' && consumableSpecs && (
                <TabsTrigger value="technical" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span className="hidden sm:inline">Técnicas</span>
                  <span className="sm:hidden">Téc.</span>
                </TabsTrigger>
              )}
              {type !== 'scale' && type !== 'consumable' && (
                <TabsTrigger value="technical" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Técnicas</span>
                  <span className="sm:hidden">Téc.</span>
                </TabsTrigger>
              )}

              {/* Funciones y Conectividad */}
              <TabsTrigger value="connectivity" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span className="hidden sm:inline">Conectividad</span>
                <span className="sm:hidden">Conex.</span>
              </TabsTrigger>

              {/* Información Adicional */}
              <TabsTrigger value="additional" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Adicional</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
            </TabsList>

            {/* Physical Specifications Tab */}
            <TabsContent value="physical" className="space-y-6">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
                {/* Dimensiones y Peso */}
                {(generalSpecs?.physicalSpecs?.dimensions ||
                  generalSpecs?.physicalSpecs?.weight ||
                  generalSpecs?.physicalSpecs?.material ||
                  (type === 'scale' && scaleSpecs?.dimensions) ||
                  (type === 'consumable' && consumableSpecs?.physicalSpecs)) && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Package className="h-5 w-5 text-primary" />
                        Dimensiones y Peso
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          {/* General Specs */}
                          <TableRow>
                            <TableCell className="font-medium">Dimensiones</TableCell>
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
                                <TableCell className="font-medium">Dimensiones</TableCell>
                                <TableCell className="text-right">
                                  {getValueOrNA(consumableSpecs?.physicalSpecs?.dimensions)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Peso</TableCell>
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
                )}

                {/* Plataforma (Solo para básculas) */}
                {type === 'scale' && scaleSpecs?.platform && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Scale className="h-5 w-5 text-primary" />
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
                {(generalSpecs?.operatingConditions?.temperature ||
                  generalSpecs?.operatingConditions?.humidity ||
                  (type === 'scale' && scaleSpecs?.operatingTemperature) ||
                  (type === 'consumable' && consumableSpecs?.operatingConditions)) && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Settings className="h-5 w-5 text-primary" />
                        Condiciones de Operación
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Temperatura</TableCell>
                            <TableCell className="text-right">
                              {getValueOrNA(generalSpecs?.operatingConditions?.temperature)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Humedad</TableCell>
                            <TableCell className="text-right">
                              {getValueOrNA(generalSpecs?.operatingConditions?.humidity)}
                            </TableCell>
                          </TableRow>
                          {type === 'scale' && (
                            <TableRow>
                              <TableCell className="font-medium">
                                Temperatura de Operación (Báscula)
                              </TableCell>
                              <TableCell className="text-right">
                                {getValueOrNA(scaleSpecs?.operatingTemperature)}
                              </TableCell>
                            </TableRow>
                          )}
                          {type === 'consumable' && (
                            <>
                              <TableRow>
                                <TableCell className="font-medium">
                                  Temperatura (Consumible)
                                </TableCell>
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
                )}
              </div>
            </TabsContent>

            {/* Technical Specifications Tab */}
            <TabsContent value="technical" className="space-y-6">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
                {/* Capacidad (Solo para básculas) */}
                {type === 'scale' && scaleSpecs?.capacity && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Scale className="h-5 w-5 text-primary" />
                        Capacidad y Precisión
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Capacidad Máxima</TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              {scaleSpecs.capacity.maximum}
                            </TableCell>
                          </TableRow>
                          {scaleSpecs.capacity.minimumDivision && (
                            <TableRow>
                              <TableCell className="font-medium">División Mínima</TableCell>
                              <TableCell className="text-right">
                                {scaleSpecs.capacity.minimumDivision}
                              </TableCell>
                            </TableRow>
                          )}
                          {scaleSpecs.capacity.type && (
                            <TableRow>
                              <TableCell className="font-medium">Tipo de Capacidad</TableCell>
                              <TableCell className="text-right">
                                {getCapacityTypeLabel(scaleSpecs.capacity.type)}
                              </TableCell>
                            </TableRow>
                          )}
                          {scaleSpecs.capacity.ranges && scaleSpecs.capacity.ranges.length > 0 && (
                            <TableRow>
                              <TableCell className="font-medium">Rangos</TableCell>
                              <TableCell className="text-right">
                                <div className="space-y-1">
                                  {scaleSpecs.capacity.ranges.map((range, index) => (
                                    <div key={range.id || index} className="text-xs">
                                      {range.range}
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
                {((type === 'scale' && scaleSpecs?.display) ||
                  (type === 'scale' && scaleSpecs?.units)) && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Monitor className="h-5 w-5 text-primary" />
                        Pantalla e Interfaz
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          {scaleSpecs?.display?.type && (
                            <TableRow>
                              <TableCell className="font-medium">Tipo de Display</TableCell>
                              <TableCell className="text-right">
                                {getDisplayTypeLabel(scaleSpecs.display.type)}
                              </TableCell>
                            </TableRow>
                          )}
                          {scaleSpecs?.display?.description && (
                            <TableRow>
                              <TableCell className="font-medium">Descripción</TableCell>
                              <TableCell className="text-right">
                                {scaleSpecs.display.description}
                              </TableCell>
                            </TableRow>
                          )}
                          {scaleSpecs?.units && scaleSpecs.units.length > 0 && (
                            <TableRow>
                              <TableCell className="font-medium">Unidades</TableCell>
                              <TableCell className="text-right">
                                <div className="flex flex-wrap gap-1 justify-end">
                                  {scaleSpecs.units.map((unit, index) => (
                                    <Badge
                                      key={unit.id || index}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {unit.unit}
                                    </Badge>
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

                {/* Tipo de Consumible */}
                {type === 'consumable' && consumableSpecs?.consumableType && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Package className="h-5 w-5 text-primary" />
                        Tipo de Consumible
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <Badge variant="secondary" className="text-sm">
                          {getConsumableTypeLabel(consumableSpecs.consumableType)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Especificaciones Eléctricas (Para consumibles) */}
                {type === 'consumable' && consumableSpecs?.electricalSpecs && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Zap className="h-5 w-5 text-primary" />
                        Especificaciones Eléctricas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          {consumableSpecs.electricalSpecs.inputVoltage && (
                            <TableRow>
                              <TableCell className="font-medium">Voltaje de Entrada</TableCell>
                              <TableCell className="text-right">
                                {consumableSpecs.electricalSpecs.inputVoltage}
                              </TableCell>
                            </TableRow>
                          )}
                          {consumableSpecs.electricalSpecs.outputVoltage && (
                            <TableRow>
                              <TableCell className="font-medium">Voltaje de Salida</TableCell>
                              <TableCell className="text-right">
                                {consumableSpecs.electricalSpecs.outputVoltage}
                              </TableCell>
                            </TableRow>
                          )}
                          {consumableSpecs.electricalSpecs.power && (
                            <TableRow>
                              <TableCell className="font-medium">Potencia</TableCell>
                              <TableCell className="text-right">
                                {consumableSpecs.electricalSpecs.power}
                              </TableCell>
                            </TableRow>
                          )}
                          {consumableSpecs.electricalSpecs.frequency && (
                            <TableRow>
                              <TableCell className="font-medium">Frecuencia</TableCell>
                              <TableCell className="text-right">
                                {consumableSpecs.electricalSpecs.frequency}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {/* Alimentación */}
                {(generalSpecs?.powerSupply || (type === 'scale' && scaleSpecs?.powerSupply)) && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Zap className="h-5 w-5 text-primary" />
                        Alimentación
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {generalSpecs?.powerSupply && (
                          <div>
                            <h4 className="font-medium mb-2 text-sm">Tipo</h4>
                            <p className="text-sm text-muted-foreground">
                              {getPowerSupplyLabel(generalSpecs.powerSupply.type || '')}
                            </p>
                            {generalSpecs.powerSupply.specifications && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {generalSpecs.powerSupply.specifications}
                              </p>
                            )}
                            {generalSpecs.powerSupply.batteryLife && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Duración batería: {generalSpecs.powerSupply.batteryLife}
                              </p>
                            )}
                          </div>
                        )}
                        {type === 'scale' && scaleSpecs?.powerSupply && (
                          <div>
                            <h4 className="font-medium mb-2 text-sm">Báscula</h4>
                            <p className="text-sm text-muted-foreground">
                              {getPowerSupplyLabel(scaleSpecs.powerSupply.type || '')}
                            </p>
                            {scaleSpecs.powerSupply.specifications && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {scaleSpecs.powerSupply.specifications}
                              </p>
                            )}
                            {scaleSpecs.powerSupply.batteryDetails && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {scaleSpecs.powerSupply.batteryDetails}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Teclado (Solo para básculas) */}
                {type === 'scale' && scaleSpecs?.keyboard && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Settings className="h-5 w-5 text-primary" />
                        Teclado
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          {scaleSpecs.keyboard.keys && (
                            <TableRow>
                              <TableCell className="font-medium">Número de Teclas</TableCell>
                              <TableCell className="text-right">
                                {scaleSpecs.keyboard.keys}
                              </TableCell>
                            </TableRow>
                          )}
                          {scaleSpecs.keyboard.description && (
                            <TableRow>
                              <TableCell className="font-medium">Descripción</TableCell>
                              <TableCell className="text-right">
                                {scaleSpecs.keyboard.description}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {/* Especificaciones Generales (Para productos que no son básculas ni consumibles) */}
                {type !== 'scale' && type !== 'consumable' && generalSpecs && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Settings className="h-5 w-5 text-primary" />
                        Especificaciones Técnicas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {generalSpecs.powerSupply && (
                          <div>
                            <h4 className="font-medium mb-2 text-sm">Alimentación</h4>
                            <p className="text-sm text-muted-foreground">
                              {getPowerSupplyLabel(generalSpecs.powerSupply.type || '')}
                            </p>
                            {generalSpecs.powerSupply.specifications && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {generalSpecs.powerSupply.specifications}
                              </p>
                            )}
                            {generalSpecs.powerSupply.batteryLife && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Duración batería: {generalSpecs.powerSupply.batteryLife}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Connectivity Tab */}
            <TabsContent value="connectivity" className="space-y-6">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
                {/* Conectividad General */}
                {((generalSpecs?.connectivity && generalSpecs.connectivity.length > 0) ||
                  (type === 'scale' &&
                    scaleSpecs?.communication &&
                    scaleSpecs.communication.length > 0)) && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Monitor className="h-5 w-5 text-primary" />
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
                                <TableCell className="text-right">
                                  {getValueOrNA(conn.description)}
                                </TableCell>
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
                                <TableCell className="text-right">
                                  {getValueOrNA(comm.description)}
                                </TableCell>
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
                )}

                {/* Funciones (Solo para básculas) */}
                {type === 'scale' && scaleSpecs?.functions && scaleSpecs.functions.length > 0 && (
                  <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Settings className="h-5 w-5 text-primary" />
                        Funciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {scaleSpecs.functions.map((func, index) => (
                          <div key={func.id || index} className="p-3 rounded-lg bg-muted/30">
                            <h5 className="font-medium text-sm mb-1">{func.function}</h5>
                            {func.description && (
                              <p className="text-xs text-muted-foreground">{func.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Compatibilidad (Para consumibles) */}
                {type === 'consumable' &&
                  consumableSpecs?.compatibility &&
                  consumableSpecs.compatibility.length > 0 && (
                    <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                      <CardHeader className="p-6 pb-1">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Package className="h-5 w-5 text-primary" />
                          Compatibilidad
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {consumableSpecs.compatibility.map((comp, index) => (
                            <div key={comp.id || index} className="p-2 rounded-lg bg-muted/30">
                              <span className="text-sm font-medium">{comp.model}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                {/* Certificaciones (Para consumibles) */}
                {type === 'consumable' &&
                  consumableSpecs?.certifications &&
                  consumableSpecs.certifications.length > 0 && (
                    <Card className="h-fit transition-all duration-200 hover:shadow-md hover:border-primary/20">
                      <CardHeader className="p-6 pb-1">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Award className="h-5 w-5 text-primary" />
                          Certificaciones
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {consumableSpecs.certifications.map((cert, index) => (
                            <Badge key={cert.id || index} variant="outline" className="text-xs">
                              {cert.certification.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
              </div>
            </TabsContent>

            {/* Additional Information Tab */}
            <TabsContent value="additional" className="space-y-6">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
                {/* Información del Producto */}
                <Card className="h-fit">
                  <CardHeader className="p-6 pb-1">
                    <CardTitle className="text-lg">Información del Producto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">SKU / Código</TableCell>
                          <TableCell className="text-right">
                            {getValueOrNA(product.productCode)}
                          </TableCell>
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
                          <TableCell className="font-medium">Tipo de Producto</TableCell>
                          <TableCell className="text-right">
                            {type === 'scale'
                              ? 'Báscula'
                              : type === 'consumable'
                                ? 'Consumible'
                                : 'General'}
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
                        <TableRow>
                          <TableCell className="font-medium">Garantía</TableCell>
                          <TableCell className="text-right">
                            {warranty ? `${warranty} días` : 'N/A'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Fecha de Publicación</TableCell>
                          <TableCell className="text-right">
                            {publishedAt ? formatDateTime(publishedAt) : 'N/A'}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Incluye / Accesorios */}
                {((generalSpecs?.includes && generalSpecs.includes.length > 0) ||
                  (type === 'scale' && scaleSpecs?.includes && scaleSpecs.includes.length > 0) ||
                  (type === 'consumable' &&
                    consumableSpecs?.includes &&
                    consumableSpecs.includes.length > 0)) && (
                  <Card className="h-fit">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Package className="h-5 w-5 text-primary" />
                        Incluye
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {generalSpecs?.includes &&
                          generalSpecs.includes.map((item, index) => (
                            <div
                              key={item.id || index}
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]"
                            >
                              {(item as any).icon ? (
                                <LucideIcon
                                  name={(item as any).icon}
                                  size={18}
                                  className="text-primary flex-shrink-0 mt-0.5"
                                />
                              ) : (
                                <Package className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              )}
                              <p className="text-sm font-medium leading-relaxed">{item.item}</p>
                            </div>
                          ))}
                        {type === 'scale' &&
                          scaleSpecs?.includes &&
                          scaleSpecs.includes.map((item, index) => (
                            <div
                              key={item.id || index}
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]"
                            >
                              {(item as any).icon ? (
                                <LucideIcon
                                  name={(item as any).icon}
                                  size={18}
                                  className="text-primary flex-shrink-0 mt-0.5"
                                />
                              ) : (
                                <Scale className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              )}
                              <p className="text-sm font-medium leading-relaxed">{item.item}</p>
                            </div>
                          ))}
                        {type === 'consumable' &&
                          consumableSpecs?.includes &&
                          consumableSpecs.includes.map((item, index) => (
                            <div
                              key={item.id || index}
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]"
                            >
                              {(item as any).icon ? (
                                <LucideIcon
                                  name={(item as any).icon}
                                  size={18}
                                  className="text-primary flex-shrink-0 mt-0.5"
                                />
                              ) : (
                                <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              )}
                              <p className="text-sm font-medium leading-relaxed">{item.item}</p>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Vida Útil (Para consumibles) */}
                {type === 'consumable' && consumableSpecs?.lifespan && (
                  <Card className="h-fit">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                        Vida Útil
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          {consumableSpecs.lifespan.expectedLife && (
                            <TableRow>
                              <TableCell className="font-medium">Vida Esperada</TableCell>
                              <TableCell className="text-right">
                                {consumableSpecs.lifespan.expectedLife}
                              </TableCell>
                            </TableRow>
                          )}
                          {consumableSpecs.lifespan.warrantyPeriod && (
                            <TableRow>
                              <TableCell className="font-medium">Período de Garantía</TableCell>
                              <TableCell className="text-right">
                                {consumableSpecs.lifespan.warrantyPeriod}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {/* Características */}
                {features && features.length > 0 && (
                  <Card className="h-fit">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Star className="h-5 w-5 text-primary" />
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

                {/* Aplicaciones */}
                {applications && applications.length > 0 && (
                  <Card className="h-fit">
                    <CardHeader className="p-6 pb-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Package className="h-5 w-5 text-primary" />
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
