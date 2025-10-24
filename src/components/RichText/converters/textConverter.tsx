import React from 'react'

// Color mappings for text states
const COLOR_MAP: Record<string, React.CSSProperties> = {
  // Text colors
  'text-red': { color: '#ef4444' },
  'text-blue': { color: '#3b82f6' },
  'text-green': { color: '#10b981' },
  'text-yellow': { color: '#f59e0b' },
  'text-purple': { color: '#8b5cf6' },
  'text-pink': { color: '#ec4899' },
  'text-cyan': { color: '#06b6d4' },
  'text-orange': { color: '#f97316' },
  'text-gray': { color: '#6b7280' },
  'text-white': { color: '#ffffff' },
  'text-black': { color: '#000000' },

  // Background colors
  'bg-red': { backgroundColor: '#ef4444', color: '#ffffff' },
  'bg-blue': { backgroundColor: '#3b82f6', color: '#ffffff' },
  'bg-green': { backgroundColor: '#10b981', color: '#ffffff' },
  'bg-yellow': { backgroundColor: '#f59e0b', color: '#000000' },
  'bg-purple': { backgroundColor: '#8b5cf6', color: '#ffffff' },
  'bg-pink': { backgroundColor: '#ec4899', color: '#ffffff' },
  'bg-cyan': { backgroundColor: '#06b6d4', color: '#ffffff' },
  'bg-orange': { backgroundColor: '#f97316', color: '#ffffff' },
  'bg-gray': { backgroundColor: '#6b7280', color: '#ffffff' },
} as const

const UNDERLINE_MAP: Record<string, React.CSSProperties> = {
  solid: {
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
  'yellow-dashed': {
    textDecoration: 'underline dashed',
    textDecorationColor: '#eab308',
    textUnderlineOffset: '4px',
  },
  'blue-wavy': {
    textDecoration: 'underline wavy',
    textDecorationColor: '#3b82f6',
    textUnderlineOffset: '4px',
  },
  'red-double': {
    textDecoration: 'underline double',
    textDecorationColor: '#ef4444',
    textUnderlineOffset: '4px',
  },
} as const

const HIGHLIGHT_MAP: Record<string, React.CSSProperties> = {
  yellow: {
    backgroundColor: '#fef08a',
    color: '#713f12',
    padding: '2px 4px',
    borderRadius: '3px',
  },
  green: {
    backgroundColor: '#bbf7d0',
    color: '#14532d',
    padding: '2px 4px',
    borderRadius: '3px',
  },
  blue: {
    backgroundColor: '#bfdbfe',
    color: '#1e3a8a',
    padding: '2px 4px',
    borderRadius: '3px',
  },
  pink: {
    backgroundColor: '#fbcfe8',
    color: '#831843',
    padding: '2px 4px',
    borderRadius: '3px',
  },
} as const

interface TextNode {
  text: string
  $?: {
    color?: string
    underline?: string
    highlight?: string
  }
}

export const textConverter = ({ node }: { node: TextNode }) => {
  const nodeStates = node.$ || {}
  const hasStates = nodeStates.color || nodeStates.underline || nodeStates.highlight

  if (!hasStates) {
    return <span>{node.text}</span>
  }

  const style: React.CSSProperties = {}

  // Apply color styles
  if (nodeStates.color && COLOR_MAP[nodeStates.color]) {
    Object.assign(style, COLOR_MAP[nodeStates.color])
  }

  // Apply underline styles
  if (nodeStates.underline && UNDERLINE_MAP[nodeStates.underline]) {
    Object.assign(style, UNDERLINE_MAP[nodeStates.underline])
  }

  // Apply highlight styles
  if (nodeStates.highlight && HIGHLIGHT_MAP[nodeStates.highlight]) {
    Object.assign(style, HIGHLIGHT_MAP[nodeStates.highlight])
  }

  return <span style={style}>{node.text}</span>
}
