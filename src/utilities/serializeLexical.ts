import escapeHTML from 'escape-html'
import { replaceDoubleCurlys } from './replaceDoubleCurlys'

interface EmailVariable {
  field: string
  value: string
}

type EmailVariables = EmailVariable[]

interface LexicalNode {
  type?: string
  version?: number
  [key: string]: unknown
}

interface LexicalTextNode extends LexicalNode {
  type: 'text'
  text: string
  format?: number
  detail?: number
  mode?: string
}

interface LexicalElementNode extends LexicalNode {
  children?: LexicalNode[]
  direction?: string | null
  format?: string | number
  indent?: number
  tag?: string
  listType?: string
  start?: number
  value?: number
}

interface LexicalRoot {
  root: LexicalElementNode
}

const serializeTextNode = (node: LexicalTextNode, submissionData?: EmailVariables): string => {
  let text = escapeHTML(replaceDoubleCurlys(node.text || '', submissionData))

  const format = node.format || 0

  if (format & 1) {
    text = `<strong>${text}</strong>`
  }
  if (format & 2) {
    text = `<em>${text}</em>`
  }
  if (format & 16) {
    text = `<code>${text}</code>`
  }
  if (format & 8) {
    text = `<u>${text}</u>`
  }
  if (format & 4) {
    text = `<s>${text}</s>`
  }

  return text
}
const serializeChildren = (children?: LexicalNode[], submissionData?: EmailVariables): string => {
  if (!children || !Array.isArray(children)) return ''

  return children
    .map((child) => serializeNode(child, submissionData))
    .filter(Boolean)
    .join('')
}
const serializeNode = (node: LexicalNode, submissionData?: EmailVariables): string => {
  if (!node || !node.type) return ''

  if (node.type === 'text') {
    return serializeTextNode(node as LexicalTextNode, submissionData)
  }

  const elementNode = node as LexicalElementNode

  switch (node.type) {
    case 'paragraph':
      return `<p>${serializeChildren(elementNode.children, submissionData)}</p>`

    case 'heading':
      const tag = elementNode.tag || 'h2'
      return `<${tag}>${serializeChildren(elementNode.children, submissionData)}</${tag}>`

    case 'quote':
      return `<blockquote>${serializeChildren(elementNode.children, submissionData)}</blockquote>`

    case 'list':
      const listTag = elementNode.listType === 'number' ? 'ol' : 'ul'
      return `<${listTag}>${serializeChildren(elementNode.children, submissionData)}</${listTag}>`

    case 'listitem':
      return `<li>${serializeChildren(elementNode.children, submissionData)}</li>`

    case 'link':
      const url = (elementNode as any).url || '#'
      return `<a href="${escapeHTML(url)}">${serializeChildren(elementNode.children, submissionData)}</a>`

    case 'linebreak':
      return '<br>'

    case 'root':
      return serializeChildren(elementNode.children, submissionData)

    default:
      return serializeChildren(elementNode.children, submissionData)
  }
}

export const serializeLexical = (
  content: LexicalRoot | null | undefined,
  submissionData?: EmailVariables,
): string => {
  if (!content || !content.root) return ''

  return serializeNode(content.root, submissionData)
}
