import { cn } from '@/utilities/ui'
import React from 'react'

import { CardPosts, CardPostData } from '@/components/Card/PostCard'

export type Props = {
  posts: CardPostData[]
}

export const PostArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 place-items-center justify-items-center md:place-items-start md:justify-items-start">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <CardPosts className="h-full" doc={result} relationTo="posts" />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
