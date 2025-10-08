import clsx from 'clsx'
import React from 'react'
import RichText from '../../components/RichText'

import type { Service } from '../../payload-types'

import { CardServices } from '@/components/Card/ServiceCard'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedServicesProps = {
  className?: string
  docs?: Service[]
  introContent?: SerializedEditorState
}

export const RelatedServices: React.FC<RelatedServicesProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <CardServices
              key={index}
              doc={{
                slug: doc.slug,
                meta: doc.meta,
                title: doc.title,
                publishedAt: doc.publishedAt,
                content: doc.content,
                heroImage: doc.heroImage,
              }}
              relationTo="services"
            />
          )
        })}
      </div>
    </div>
  )
}
