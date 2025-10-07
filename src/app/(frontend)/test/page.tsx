import { Media } from '@/components/Media'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default async function Test() {
  return (
    <div className="flex h-dvh justify-center flex-col items-center -mt-24">
      <AspectRatio ratio={16 / 9}>
        <Media
          priority
          resource={
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
          }
          fill
        />
      </AspectRatio>
    </div>
  )
}
