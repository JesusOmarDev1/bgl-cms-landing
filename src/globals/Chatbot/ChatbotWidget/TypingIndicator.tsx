import { StaticLogo } from '@/components/Logo/StaticLogo'
import { Message, MessageContent } from '@/components/ui/ai/message'
import { Spinner } from '@/components/ui/spinner'
import React from 'react'

interface TypingIndicatorProps {
  className?: string
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className = '' }) => {
  return (
    <Message from="assistant">
      <StaticLogo className="size-10" />
      <MessageContent variant="contained">
        <Spinner />
      </MessageContent>
    </Message>
  )
}
