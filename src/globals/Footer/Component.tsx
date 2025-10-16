import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Separator } from '@/components/ui/separator'
import { FacebookIcon } from '@/assets/social/facebook'
import { TwitterXIcon } from '@/assets/social/twitterX'
import { InstagramIcon } from '@/assets/social/instagram'
import { LinkedInIcon } from '@/assets/social/linkedIn'
import { YouTubeIcon } from '@/assets/social/youtube'
import { TiktokIcon } from '@/assets/social/tiktok'
import { Link } from 'next-view-transitions'
import { getIconComponent } from '@/fields/iconPicker'

const socialIcons = {
  facebook: FacebookIcon,
  twitter: TwitterXIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  tiktok: TiktokIcon,
}

type SocialPlatform = keyof typeof socialIcons

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const productSection = footerData?.productSection
  const companySection = footerData?.companySection
  const resourcesSection = footerData?.resourcesSection
  const legalSection = footerData?.legalSection
  const socialSection = footerData?.socialSection
  const followUsSection = footerData?.followUsSection
  const copyrightText = footerData?.copyrightText

  return (
    <footer className="w-full bg-background">
      <div className="container min-w-full px-8 pt-12 pb-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Product Section */}
          {productSection && productSection.items && productSection.items.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">{productSection.title || 'Producto'}</h3>
              <nav className="flex flex-col space-y-3">
                {productSection.items.map((item, i) => {
                  const IconComponent = item.icon ? getIconComponent(item.icon) : null
                  return (
                    <CMSLink
                      key={i}
                      type={item.link?.type}
                      url={item.link?.url}
                      newTab={item.link?.newTab}
                      reference={item.link?.reference}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        <span>{item.link?.label}</span>
                      </div>
                    </CMSLink>
                  )
                })}
              </nav>
            </div>
          )}

          {/* Company Section */}
          {companySection && companySection.items && companySection.items.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">{companySection.title || 'Compañía'}</h3>
              <nav className="flex flex-col space-y-3">
                {companySection.items.map((item, i) => {
                  const IconComponent = item.icon ? getIconComponent(item.icon) : null
                  return (
                    <CMSLink
                      key={i}
                      type={item.link?.type}
                      url={item.link?.url}
                      newTab={item.link?.newTab}
                      reference={item.link?.reference}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        <span>{item.link?.label}</span>
                      </div>
                    </CMSLink>
                  )
                })}
              </nav>
            </div>
          )}

          {/* Resources Section */}
          {resourcesSection && resourcesSection.items && resourcesSection.items.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">{resourcesSection.title || 'Recursos'}</h3>
              <nav className="flex flex-col space-y-3">
                {resourcesSection.items.map((item, i) => {
                  const IconComponent = item.icon ? getIconComponent(item.icon) : null
                  return (
                    <CMSLink
                      key={i}
                      type={item.link?.type}
                      url={item.link?.url}
                      newTab={item.link?.newTab}
                      reference={item.link?.reference}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        <span>{item.link?.label}</span>
                      </div>
                    </CMSLink>
                  )
                })}
              </nav>
            </div>
          )}

          {/* Legal Section */}
          {legalSection && legalSection.items && legalSection.items.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">{legalSection.title || 'Legal'}</h3>
              <nav className="flex flex-col space-y-3">
                {legalSection.items.map((item, i) => {
                  const IconComponent = item.icon ? getIconComponent(item.icon) : null
                  return (
                    <CMSLink
                      key={i}
                      type={item.link?.type}
                      url={item.link?.url}
                      newTab={item.link?.newTab}
                      reference={item.link?.reference}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        <span>{item.link?.label}</span>
                      </div>
                    </CMSLink>
                  )
                })}
              </nav>
            </div>
          )}

          {/* Social Section */}
          {socialSection && socialSection.items && socialSection.items.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">{socialSection.title || 'Social'}</h3>
              <nav className="flex flex-col space-y-3">
                {socialSection.items.map((item, i) => {
                  const IconComponent = item.icon ? getIconComponent(item.icon) : null
                  return (
                    <CMSLink
                      key={i}
                      type={item.link?.type}
                      url={item.link?.url}
                      newTab={item.link?.newTab}
                      reference={item.link?.reference}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        <span>{item.link?.label}</span>
                      </div>
                    </CMSLink>
                  )
                })}
              </nav>
            </div>
          )}

          {/* Follow Us Section with Social Icons */}
          {followUsSection &&
            followUsSection.socialLinks &&
            followUsSection.socialLinks.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold">{followUsSection.title || 'Síguenos'}</h3>
                <div className="flex gap-4">
                  {followUsSection.socialLinks.map((social, i) => {
                    if (!social.platform || !social.url) return null

                    const Icon = socialIcons[social.platform as SocialPlatform]
                    if (!Icon) return null

                    return (
                      <Link
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-all hover:text-foreground hover:scale-125"
                        aria-label={social.platform}
                        title={`Red social - ${social.platform}`}
                      >
                        <Icon className="size-8" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p>{copyrightText || '© BGL BASCULAS INDUSTRIALES. Todos los derechos reservados.'}</p>
        </div>
      </div>
    </footer>
  )
}
