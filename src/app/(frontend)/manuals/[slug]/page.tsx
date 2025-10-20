import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Media, Manual } from '@/payload-types'

import { ServiceHero } from '@/heros/ServiceHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { MediaSchema, ManualSchema } from '@/components/Schema'
import Script from 'next/script'
import { RelatedManuals } from '@/blocks/RelatedTo/RelatedManuals'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const manuals = await payload.find({
    collection: 'manuals',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = manuals.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/services/' + slug
  const service = await queryServiceBySlug({ slug })

  if (!service) return <PayloadRedirects url={url} />

  const schema = [ManualSchema(service), MediaSchema(service.meta?.image as Media)]

  return (
    <article className="py-4">
      <Script
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        key={service.slug}
      />
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <ServiceHero service={service} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-5xl mx-auto" data={service.content} enableGutter={false} />
          {service.relatedManuals && service.relatedManuals.length > 0 && (
            <RelatedManuals
              className="mt-12 max-w-208 lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={service.relatedManuals.filter(
                (manual): manual is Manual => typeof manual === 'object',
              )}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const service = await queryServiceBySlug({ slug })

  return generateMeta({ doc: service })
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'manuals',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 4,
  })

  return result.docs?.[0] || null
})
