import BlankCanvasIllustration from '@/assets/undraw/blank-canvas'

export default function NoResults() {
  return (
    <div className="container flex flex-col items-center gap-4 text-center mt-10">
      <BlankCanvasIllustration className="size-48" />
      <p className="text-lg font-semibold" role="log">
        No se encontraron resultados para la búsqueda.
      </p>
    </div>
  )
}
