import { Media } from '@/components/Media'

export default async function Test() {
  return (
    <div className="flex h-dvh justify-center relative items-center -mt-24">
      <Media
        priority
        resource={
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
        className="w-full h-full"
        fill
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-white">Hola</h1>
        </div>
      </div>
    </div>
  )
}
