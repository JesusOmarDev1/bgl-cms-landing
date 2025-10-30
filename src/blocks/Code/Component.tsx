import React from 'react'
import { Code } from './Component.client'
import type { CodeBlock as CodeBlockType } from '@/payload-types'

type Props = CodeBlockType & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <Code code={code} language={language || undefined} />
    </div>
  )
}
