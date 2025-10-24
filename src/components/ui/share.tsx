'use client'
import React from 'react'
import { useShare } from '@/utilities/hooks/useShare'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { ShareIcon } from 'lucide-react'

interface ShareProps {
  title?: string
  text?: string
  url?: string
  className?: string
  disabled?: boolean
}

export default function Share({ title, text, url, className, disabled }: ShareProps) {
  const share = useShare({
    onSuccess: () => toast.info('Compartiendo publicación...'),
    onError: (error) => toast.error('Error al compartir. Intentalo mas tarde.'),
    fallbackCopy: true,
  })

  const handleShare = async () => {
    if (!disabled) {
      await share.share({ title, text, url })
    }
  }

  return (
    <Button
      className={className}
      onClick={handleShare}
      icon={ShareIcon}
      iconPlacement="left"
      disabled={disabled}
    >
      Compartir
    </Button>
  )
}
