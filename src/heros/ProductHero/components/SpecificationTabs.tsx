import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Product } from '@/payload-types'
import { tabsConfig } from '../config/tabsConfig'
import { PhysicalSpecsTab } from './tabs/PhysicalSpecsTab'
import { TechnicalSpecsTab } from './tabs/TechnicalSpecsTab'
import { ConnectivityTab } from './tabs/ConnectivityTab'
import { AdditionalInfoTab } from './tabs/AdditionalInfoTab'

interface SpecificationTabsProps {
  product: Product
}

const tabComponents = {
  physical: PhysicalSpecsTab,
  technical: TechnicalSpecsTab,
  connectivity: ConnectivityTab,
  additional: AdditionalInfoTab,
}

export const SpecificationTabs: React.FC<SpecificationTabsProps> = ({ product }) => {
  const visibleTabs = tabsConfig.filter((tab) => !tab.condition || tab.condition(product))

  const gridCols = `grid-cols-${Math.min(visibleTabs.length, 4)}`

  return (
    <div className="mt-12">
      <Tabs defaultValue="physical" className="w-full">
        <TabsList className={`grid w-full grid-cols-1 sm:grid-cols-2 lg:${gridCols} h-fit gap-1`}>
          {visibleTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {visibleTabs.map((tab) => {
          const TabComponent = tabComponents[tab.id as keyof typeof tabComponents]
          return (
            <TabsContent key={tab.id} value={tab.id}>
              <TabComponent product={product} />
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
