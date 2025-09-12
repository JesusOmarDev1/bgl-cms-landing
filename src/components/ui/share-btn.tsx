import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { ArrowUpRight, Share2 } from 'lucide-react'
import {
  WhatsappIcon,
  WhatsappShareButton,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'next-share'
import { Link } from 'next-view-transitions'

interface ShareBtnProps {
  href: string
  link: any
}

export default function ShareBtn({ href, link }: ShareBtnProps) {
  return (
    <>
      <Link className="w-full" href={href as any} ref={link.ref} passHref>
        <Button className="w-full" icon={ArrowUpRight} iconPlacement="right">
          <span>Leer Mas</span>
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full" variant={'outline'} icon={Share2} iconPlacement="right">
            Compartir
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuGroup className="flex flex-wrap gap-2.5">
            <DropdownMenuItem asChild>
              <WhatsappShareButton url={href}>
                <WhatsappIcon size={24} round />
              </WhatsappShareButton>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <FacebookShareButton url={href}>
                <FacebookIcon size={24} round />
              </FacebookShareButton>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <TwitterShareButton url={href}>
                <TwitterIcon size={24} round />
              </TwitterShareButton>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <TelegramShareButton url={href}>
                <TelegramIcon size={24} round />
              </TelegramShareButton>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
