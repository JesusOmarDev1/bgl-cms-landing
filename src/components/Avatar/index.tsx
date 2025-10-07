import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { ServerProps } from 'payload'
import { FC } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatars/avatar'
import ProfilePicture from './ProfilePicture'

const baseClass = 'avatar'

const AvatarComponent: FC<ServerProps> = (props) => {
  const { user } = props

  const name = `${user?.name || ''}`

  return (
    <div className="flex items-center justify-center gap-2.5 w-fit">
      <div className="avatar flex items-center justify-start gap-2.5 w-fit">
        <Avatar className="size-8 lg:size-10">
          <ProfilePicture />
          <AvatarFallback className="uppercase bg-red-500 text-white">
            {name?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <ChevronDown className={cn(`${baseClass}__chevron`, 'size-4')} />
      </div>
    </div>
  )
}

export default AvatarComponent
