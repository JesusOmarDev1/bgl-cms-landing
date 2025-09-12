import CardFAQ from '@/components/ui/faq'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface FAQItem {
  question: string
  answer: DefaultTypedEditorState // richText content from Lexical editor
}

interface FAQBlockProps {
  faqs: FAQItem[]
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ faqs }) => {
  return (
    <div className="container">
      <CardFAQ faq={faqs} />
    </div>
  )
}
