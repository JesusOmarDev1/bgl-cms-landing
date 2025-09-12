import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { CardPosts } from '../../components/Card/PostCard'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: SerializedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <CardPosts
              key={index}
              doc={{
                slug: doc.slug,
                categories: doc.categories,
                meta: doc.meta,
                title: doc.title,
                publishedAt: doc.publishedAt,
                content: doc.content,
                authors: doc.authors,
                populatedAuthors: doc.populatedAuthors,
                heroImage: doc.heroImage,
              }}
              relationTo="posts"
              showCategories
            />
          )
        })}
      </div>
    </div>
  )
}
