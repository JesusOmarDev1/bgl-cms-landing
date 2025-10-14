import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Separator } from '@/components/ui/separator'
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: null, // TikTok no está en lucide-react por defecto
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
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Product Section */}
          {productSection && productSection.items && productSection.items.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">{productSection.title || 'Producto'}</h3>
              <nav className="flex flex-col space-y-3">
                {productSection.items.map((item, i) => (
                  <CMSLink
                    key={i}
                    {...item.link}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Company Section */}
          {companySection && companySection.items && companySection.items.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">{companySection.title || 'Compañía'}</h3>
              <nav className="flex flex-col space-y-3">
                {companySection.items.map((item, i) => (
                  <CMSLink
                    key={i}
                    {...item.link}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Resources Section */}
          {resourcesSection && resourcesSection.items && resourcesSection.items.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">{resourcesSection.title || 'Recursos'}</h3>
              <nav className="flex flex-col space-y-3">
                {resourcesSection.items.map((item, i) => (
                  <CMSLink
                    key={i}
                    {...item.link}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Legal Section */}
          {legalSection && legalSection.items && legalSection.items.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">{legalSection.title || 'Legal'}</h3>
              <nav className="flex flex-col space-y-3">
                {legalSection.items.map((item, i) => (
                  <CMSLink
                    key={i}
                    {...item.link}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Social Section */}
          {socialSection && socialSection.items && socialSection.items.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">{socialSection.title || 'Social'}</h3>
              <nav className="flex flex-col space-y-3">
                {socialSection.items.map((item, i) => (
                  <CMSLink
                    key={i}
                    {...item.link}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Follow Us Section with Social Icons */}
          {followUsSection &&
            followUsSection.socialLinks &&
            followUsSection.socialLinks.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">{followUsSection.title || 'Síguenos'}</h3>
                <div className="flex gap-4">
                  {followUsSection.socialLinks.map((social, i) => {
                    if (!social.platform || !social.url) return null

                    const Icon = socialIcons[social.platform as SocialPlatform]
                    if (!Icon) return null

                    return (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={social.platform}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
        </div>

        <Separator className="my-8 bg-zinc-200 dark:bg-zinc-800" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p>
            {copyrightText || '© 2025 BGL BASCULAS INDUSTRIALES. Todos los derechos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
