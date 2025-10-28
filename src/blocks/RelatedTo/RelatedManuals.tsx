import clsx from 'clsx'
import React from 'react'
import RichText from '../../components/RichText'

import type { Manual } from '../../payload-types'

import { CardManual } from '../../components/Card/ManualCard'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedManualsProps = {
  className?: string
  docs?: Manual[]
  introContent?: SerializedEditorState
}

export const RelatedManuals: React.FC<RelatedManualsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <CardManual
              key={index}
              doc={{
                slug: doc.slug,
                meta: doc.meta,
                title: doc.title,
                publishedAt: doc.publishedAt,
                content: doc.content,
                heroImage: doc.heroImage,
              }}
              relationTo="manuals"
            />
          )
        })}
      </div>
    </div>
  )
}
