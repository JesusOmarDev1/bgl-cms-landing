'use client'

import React from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command'
import { CopyIcon, SearchIcon } from 'lucide-react'

export const GlobalSearcher = () => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])
  return (
    <>
      <div
        id="global-searcher"
        data-slot="command-input-wrapper"
        className="flex h-9 items-center gap-1.5 border mb-4 rounded-3xl border-zinc-200 dark:border-zinc-800 px-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4 shrink-0 opacity-50" />
        <p className="text-zinc-500 dark:text-zinc-400">Buscar...</p>
      </div>
      <CommandDialog
        showCloseButton={false}
        open={open}
        onOpenChange={setOpen}
        className="border-zinc-200 dark:border-zinc-800 border z-50 w-full md:min-w-[400px] lg:min-w-[600px] xl:min-w-[800px]"
      >
        <CommandInput placeholder="Buscar..." />
        <CommandList>
          <CommandEmpty>No hay resultados</CommandEmpty>
          <CommandGroup heading="Recientes">
            <CommandItem></CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default GlobalSearcher
