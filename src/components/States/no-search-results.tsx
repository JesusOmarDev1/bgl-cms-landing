import BlankCanvasIllustration from '@/assets/undraw/blank-canvas'
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from '../ui/empty'

export default function NoSearchResults() {
  return (
    <Empty>
      <EmptyTitle className="text-lg font-semibold" role="log">
        No se encontraron resultados para la búsqueda.
      </EmptyTitle>
      <EmptyContent>
        <div className="container flex flex-col items-center gap-4 text-center mt-10">
          <BlankCanvasIllustration className="size-48" />
        </div>
      </EmptyContent>
    </Empty>
  )
}
