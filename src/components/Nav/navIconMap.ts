import { CollectionSlug, GlobalSlug } from 'payload'
import {
  BotMessageSquare,
  CircleCheck,
  Component,
  ContactRound,
  Copyright,
  Database,
  File,
  FileLock,
  Images,
  LayoutGrid,
  List,
  LucideProps,
  Milestone,
  BookText,
  Package,
  PenLine,
  Search,
  Send,
  Settings2,
  ShoppingCart,
  Truck,
  UsersRound,
  Wrench,
  Activity,
} from 'lucide-react'
import { ExoticComponent } from 'react'

export const navIconMap: Partial<
  Record<CollectionSlug | GlobalSlug, ExoticComponent<LucideProps>>
> = {
  categories: List,
  media: Images,
  pages: File,
  posts: LayoutGrid,
  users: UsersRound,
  suppliers: Truck,
  brands: Copyright,
  products: ShoppingCart,
  clients: ContactRound,
  forms: PenLine,
  models: Package,
  redirects: Milestone,
  search: Search,
  'form-submissions': Send,
  header: Component,
  footer: Component,
  'payload-jobs': CircleCheck,
  'payload-migrations': Database,
  'payload-locked-documents': FileLock,
  'payload-preferences': Settings2,
  chatbot: BotMessageSquare,
  services: Wrench,
  manuals: BookText,
  'activity-log': Activity,
}

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug) ? navIconMap[slug as CollectionSlug | GlobalSlug] : undefined
