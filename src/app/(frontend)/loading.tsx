import { DotsRotate } from '@/assets/spinners/dots-rotate'
import { Logo } from '@/components/Logo/Logo'

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 w-full h-dvh items-center justify-center">
      <Logo />
      <DotsRotate />
    </div>
  )
}
