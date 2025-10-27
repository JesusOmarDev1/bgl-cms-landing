import { ChatbotClient } from './Component.client'

import { getCachedGlobal } from '@/utilities/payload/getGlobals'
import React from 'react'

import type { Chatbot as ChatbotType } from '@/payload-types'

export async function Chatbot() {
  const chatbotData: ChatbotType = await getCachedGlobal('chatbot', 1)()

  // Si el chatbot está deshabilitado, no renderizar nada
  if (chatbotData?.disabled) {
    return null
  }

  // Obtener preguntas activas del chatbot desde el global
  const activeQuestions = (chatbotData?.questions || [])
    .filter((question) => question.active !== false)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))

  // Configurar mensaje de bienvenida
  const welcomeMessage = chatbotData?.welcomeMessage
    ? {
        text:
          chatbotData.welcomeMessage.text ||
          '¡Hola! 👋 Soy el asistente virtual de BGL. ¿En qué puedo ayudarte hoy?',
        followUpQuestions: chatbotData.welcomeMessage.quickOptions || [],
      }
    : null

  // Configurar respuesta por defecto
  const defaultResponse = chatbotData?.defaultResponse
    ? {
        answer:
          chatbotData.defaultResponse.answer ||
          'Lo siento, no tengo información específica sobre eso. ¿Puedo ayudarte con algo más?',
        followUp: chatbotData.defaultResponse.followUpQuestions || [],
      }
    : null

  return (
    <ChatbotClient
      questions={activeQuestions as any}
      welcomeMessage={welcomeMessage as any}
      defaultResponse={defaultResponse as any}
    />
  )
}
