import { Access, FieldAccess } from 'payload'
import { User } from '@/payload-types'

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.includes('editor')) {
      return true
    } else if (user.roles?.includes('admin')) {
      return true
    }
  }

  return false
}

export const isAdminOrEditorFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor'))
}
