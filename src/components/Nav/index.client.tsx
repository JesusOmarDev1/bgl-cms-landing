'use client'

import { getTranslation } from '@payloadcms/translations'
import { NavGroup, useConfig, useTranslation } from '@payloadcms/ui'
import { baseClass } from './index'
import { EntityType, formatAdminURL, NavGroupType } from '@payloadcms/ui/shared'
import { usePathname } from 'next/navigation'
import LinkWithDefault from 'next/link'
import { NavPreferences } from 'payload'
import { FC, Fragment } from 'react'
import { getNavIcon } from './navIconMap'
import { cn } from '@/utilities/ui/cn'

type Props = {
  groups: NavGroupType[]
  navPreferences: NavPreferences | null
}

export const NavClient: FC<Props> = ({ groups, navPreferences }) => {
  const pathname = usePathname()

  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  const { i18n } = useTranslation()

  return (
    <Fragment>
      {groups.map(({ entities, label }, key) => {
        return (
          <NavGroup isOpen={navPreferences?.groups?.[label]?.open} key={key} label={label}>
            {entities.map(({ slug, type, label }, i) => {
              let href: string
              let id: string

              if (type === EntityType.collection) {
                href = formatAdminURL({ adminRoute, path: `/collections/${slug}` })
                id = `nav-${slug}`
              } else {
                href = formatAdminURL({ adminRoute, path: `/globals/${slug}` })
                id = `nav-global-${slug}`
              }

              const Link = LinkWithDefault

              const LinkElement = Link || 'a'
              const activeCollection =
                pathname.startsWith(href) && ['/', undefined].includes(pathname[href.length])

              const Icon = getNavIcon(slug)

              return (
                <LinkElement
                  className={cn(
                    `${baseClass}__link`,
                    activeCollection && 'active',
                    'hover:bg-zinc-100 p-1.5 rounded-2xl no-underline dark:hover:bg-zinc-800',
                  )}
                  href={href}
                  id={id}
                  key={i}
                  prefetch={false}
                >
                  {activeCollection && <div className={`${baseClass}__link-indicator`} />}
                  {Icon && (
                    <Icon
                      className={cn(
                        `${baseClass}__icon`,
                        activeCollection && 'active',
                        'stroke-zinc-500 dark:stroke-zinc-400 size-5 mx-2',
                      )}
                    />
                  )}
                  <span className={`${baseClass}__link-label`}>{getTranslation(label, i18n)}</span>
                </LinkElement>
              )
            })}
          </NavGroup>
        )
      })}
    </Fragment>
  )
}
