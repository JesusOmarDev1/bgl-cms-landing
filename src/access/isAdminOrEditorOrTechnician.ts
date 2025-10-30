import { Access, FieldAccess } from 'payload'
import { User } from '@/payload-types'

export const isAdminOrEditorOrTechnician: Access = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.includes('technician')) {
      return true
    } else if (user.roles?.includes('editor')) {
      return true
    } else if (user.roles?.includes('admin')) {
      return true
    }
  }

  return false
}

export const isAdminOrEditorOrTechnicianFieldLevel: FieldAccess<{ id: string }, User> = ({
  req: { user },
}) => {
  // Return true or false based on if the user has an admin role
  return Boolean(
    user?.roles?.includes('admin') ||
      user?.roles?.includes('technician') ||
      user?.roles?.includes('editor'),
  )
}
