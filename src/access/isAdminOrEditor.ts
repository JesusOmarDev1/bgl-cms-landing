import { Access } from 'payload'

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
