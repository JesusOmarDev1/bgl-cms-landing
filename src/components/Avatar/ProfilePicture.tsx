'use client'

import React from 'react'
import { Media, User } from '../../payload-types'
import { useAuth } from '@payloadcms/ui'
import { AvatarImage } from '../ui/avatars/avatar'

const ProfilePicture: React.FC = () => {
  const { user } = useAuth<User>()
  return (
    <AvatarImage
      src={(user?.avatar as Media)?.url || undefined}
      alt={user?.name || 'Imagen de perfil'}
      role="img"
      aria-label={(user?.avatar as Media)?.title || undefined}
    />
  )
}

export default ProfilePicture
