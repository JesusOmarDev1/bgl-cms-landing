import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ChatbotWidget } from './index'

export async function ChatbotWrapper() {
  const payload = await getPayload({ config: configPromise })

  // Fetch chatbot configuration
  const chatbotConfig = await payload.findGlobal({
    slug: 'chatbot',
    depth: 1,
  })

  if (chatbotConfig.disabled === true) {
    return null
  }

  // Filtrar solo las preguntas activas
  const activeQuestions = (chatbotConfig.questions || [])
    .filter((q: any) => q.active !== false)
    .map((q: any) => ({
      id: q.id || String(Math.random()),
      question: q.question,
      keywords: q.keywords || [],
      answer: q.answer,
      followUpQuestions: q.followUpQuestions || [],
      category: q.category,
      priority: q.priority || 0,
    }))

  // Ordenar por prioridad
  activeQuestions.sort((a, b) => (b.priority || 0) - (a.priority || 0))

  // Preparar mensaje de bienvenida
  const welcomeMessage = chatbotConfig.welcomeMessage
    ? {
        text: chatbotConfig.welcomeMessage.text,
        followUpQuestions:
          chatbotConfig.welcomeMessage.quickOptions?.map((q: any) => ({
            question: q.question,
            typeMessage: q.typeMessage,
            url: q.url || undefined,
          })) || [],
      }
    : null

  // Preparar respuesta por defecto
  const defaultResponse = chatbotConfig.defaultResponse
    ? {
        answer: chatbotConfig.defaultResponse.answer,
        followUp:
          chatbotConfig.defaultResponse.followUpQuestions?.map((q: any) => ({
            question: q.question,
            typeMessage: q.typeMessage,
            url: q.url || undefined,
          })) || [],
      }
    : null

  return (
    <ChatbotWidget
      questions={activeQuestions}
      welcomeMessage={welcomeMessage}
      defaultResponse={defaultResponse}
    />
  )
}
