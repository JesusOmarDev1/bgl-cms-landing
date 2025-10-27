import { DotsRotate } from '@/assets/spinners/dots-rotate'
import { StaticLogo } from '@/components/Logo/StaticLogo'

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 w-full h-dvh items-center justify-center -mt-36">
      <StaticLogo className="size-24" />
      <DotsRotate />
    </div>
  )
}
