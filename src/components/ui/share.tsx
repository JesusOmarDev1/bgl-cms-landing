'use client'
import React from 'react'
import useShare from '../../hooks/useShare'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { ShareIcon } from 'lucide-react'

interface ShareProps {
  title?: string
  text?: string
  url?: string
  className?: string
}

export default function Share({ title, text, url, className }: ShareProps) {
  const share = useShare({
    onSuccess: () => toast.success('Compartido exitosamente!'),
    onError: (error) => toast.error('Error al compartir. Intentalo mas tarde.'),
    fallbackCopy: true,
  })

  const handleShare = async () => {
    await share.share({ title, text, url })
  }

  return (
    <Button
      variant={'outline'}
      className={className}
      onClick={handleShare}
      icon={ShareIcon}
      iconPlacement="left"
    >
      Compartir
    </Button>
  )
}
