'use client'

import { Accordion, AccordionContent, AccordionItem } from './accordion'
import { cn } from '../../utilities/ui'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import RichText from '../RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface Props {
  faq: {
    question: string
    answer: DefaultTypedEditorState
  }[]
}

const FAQ = ({ faq }: Props) => {
  const [value, setValue] = useState<string>()

  return (
    <div className="h-auto flex items-center justify-center">
      <div className="w-full">
        <h2 className="text-4xl md:text-5xl leading-[1.15]! font-semibold tracking-tighter">
          Preguntas Frecuentes
        </h2>

        <div className="mt-6 w-full grid md:grid-cols-2 gap-x-10">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(0, 5).map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      'flex flex-1 items-center justify-between py-4 font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-45',
                      'text-start text-lg',
                    )}
                  >
                    {question}
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-base text-muted-foreground text-pretty">
                  <RichText data={answer} enableGutter={false} enableProse={false} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(5).map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index + 5}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      'flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45',
                      'text-start text-lg',
                    )}
                  >
                    {question}
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-base text-muted-foreground text-pretty">
                  <RichText data={answer} enableGutter={false} enableProse={false} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default FAQ
