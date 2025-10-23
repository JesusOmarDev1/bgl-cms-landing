import { Badge } from './badge'

interface CategoriesProps {
  showCategories?: boolean
  hasCategories?: boolean | undefined | null
  categories?: any
}

export default function Categories({ showCategories, hasCategories, categories }: CategoriesProps) {
  return (
    <>
      {showCategories && hasCategories && (
        <div className="flex flex-wrap gap-2">
          {categories?.map((category: any, index: any) => {
            if (typeof category === 'object') {
              const { title: titleFromCategory } = category
              const categoryTitle = titleFromCategory || 'Untitled category'

              return (
                <Badge key={index} variant={'secondary'} className="text-xs font-normal uppercase">
                  #{categoryTitle}
                </Badge>
              )
            }
            return null
          })}
        </div>
      )}
    </>
  )
}
