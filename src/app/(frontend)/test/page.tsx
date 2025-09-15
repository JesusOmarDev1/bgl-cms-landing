import { cn } from '@/utilities/ui'
import { Plasma } from '@/components/ui/plasma'

export default function Test() {
  return (
    <>
      <div className="w-full h-dvh absolute z-0">
        <Plasma
          color="#FF2B00"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={1}
          mouseInteractive={false}
        />
      </div>
      <div className="relative flex flex-col gap-4 lg:flex-row z-10 h-dvh w-full items-center justify-center">
        <h1 className="relative mx-0 max-w-[43.5rem] text-balance bg-gradient-to-br from-black from-50% to-neutral-200/60 bg-clip-text pt-5 text-left text-5xl font-semibold tracking-tighter text-transparent sm:text-7xl md:mx-auto md:px-4 md:py-2 md:text-center md:text-7xl lg:text-7xl dark:text-white">
          Templates for Design Engineers
        </h1>
      </div>
    </>
  )
}
