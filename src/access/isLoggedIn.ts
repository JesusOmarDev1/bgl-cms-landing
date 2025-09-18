import { Access } from 'payload'
import { User } from '../payload-types'

export const isAuthenticated: Access<User> = ({ req: { user } }) => {
  // Return true if user is logged in, false if not
  return Boolean(user)
}
