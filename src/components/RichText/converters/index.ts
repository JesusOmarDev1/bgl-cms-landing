import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { NodeTypes } from '../types'
import { textConverter } from './textConverter'
import { blockConverters } from './blockConverters'
import { linkConverter } from './linkConverter'

export const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...linkConverter,
  text: textConverter,
  blocks: blockConverters,
})
