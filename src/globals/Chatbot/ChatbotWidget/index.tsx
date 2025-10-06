'use client'

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, X, Send, ChevronLeft } from 'lucide-react'
import { Message, MessageContent, MessageAvatar } from '@/components/ui/ai/message'
import { StaticLogo } from '../../../components/Logo/StaticLogo'
import { Spinner } from '@/components/ui/spinner'
import { Status, StatusIndicator, StatusLabel } from '@/components/ui/status'
import { Input } from '@/components/ui/input'
import { ChatbotLogo } from '@/components/Logo/ChatbotLogo'
import { motion } from 'motion/react'

// Constantes de configuración
const STORAGE_KEY = 'bgl-chatbot-messages'
const MAX_MESSAGE_LENGTH = 500
const MAX_MESSAGES_STORED = 50
const MAX_STORAGE_SIZE = 1024 * 100 // 100KB
const TYPING_DELAY_MIN = 800
const TYPING_DELAY_MAX = 1800
const RATE_LIMIT_MS = 1000 // Mínimo 1 segundo entre mensajes

interface FollowUpQuestion {
  question: string
  url?: string | null
  id?: string | null
}

interface ChatbotQuestion {
  id: string
  question: string
  keywords: Array<{ keyword: string }>
  answer: string
  followUpQuestions: Array<FollowUpQuestion>
  category: string | { id: string; title: string }
  priority: number
}

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  followUpQuestions?: Array<{ question: string; url?: string }>
}

interface DefaultResponse {
  answer: string
  followUp: Array<{ question: string; url?: string }>
}

interface WelcomeMessage {
  text: string
  followUpQuestions: Array<{ question: string; url?: string }>
}

interface ChatbotWidgetProps {
  questions: ChatbotQuestion[]
  welcomeMessage: WelcomeMessage | null
  defaultResponse: DefaultResponse | null
}

// Utilidades de seguridad y validación
const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, '') // Eliminar caracteres peligrosos
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH)
}

const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url, window.location.origin)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

const validateMessage = (msg: any): msg is ChatMessage => {
  return (
    msg &&
    typeof msg.id === 'string' &&
    typeof msg.text === 'string' &&
    typeof msg.isUser === 'boolean' &&
    msg.timestamp
  )
}

export const ChatbotWidget = ({
  questions,
  welcomeMessage,
  defaultResponse,
}: ChatbotWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const lastMessageTime = useRef<number>(0)

  // Memoizar las preguntas del chatbot
  const chatbotQuestions = useMemo(() => questions, [questions])

  // Cargar mensajes desde localStorage de forma segura
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY)
      if (!savedMessages) return

      const parsed = JSON.parse(savedMessages)

      // Validar que sea un array
      if (!Array.isArray(parsed)) {
        localStorage.removeItem(STORAGE_KEY)
        return
      }

      // Validar y sanitizar cada mensaje
      const validMessages = parsed
        .filter(validateMessage)
        .slice(-MAX_MESSAGES_STORED) // Limitar cantidad de mensajes
        .map((msg) => ({
          ...msg,
          text: sanitizeText(msg.text),
          timestamp: new Date(msg.timestamp),
          followUpQuestions: msg.followUpQuestions?.filter(
            (q: any) => q.question && (!q.url || isValidUrl(q.url)),
          ),
        }))

      if (validMessages.length > 0) {
        setMessages(validMessages)
      }
    } catch (error) {
      // Si hay error, limpiar localStorage corrupto
      localStorage.removeItem(STORAGE_KEY)
      console.warn('Error al cargar mensajes, se limpió el historial')
    }
  }, [])

  // Guardar mensajes en localStorage con validación de tamaño
  useEffect(() => {
    if (messages.length === 0) return

    try {
      // Limitar mensajes guardados
      const messagesToSave = messages.slice(-MAX_MESSAGES_STORED)
      const serialized = JSON.stringify(messagesToSave)

      // Verificar tamaño antes de guardar
      if (serialized.length > MAX_STORAGE_SIZE) {
        // Si excede el tamaño, guardar solo los más recientes
        const reducedMessages = messages.slice(-20)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedMessages))
      } else {
        localStorage.setItem(STORAGE_KEY, serialized)
      }
    } catch (error) {
      console.warn('Error al guardar mensajes en localStorage')
    }
  }, [messages])

  // Mensaje de bienvenida cuando se abre el chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: ChatMessage = {
        id: '1',
        text: welcomeMessage?.text || '',
        isUser: false,
        timestamp: new Date(),
        followUpQuestions: welcomeMessage?.followUpQuestions || [],
      }
      setMessages([initialMessage])
    }
  }, [isOpen, welcomeMessage, messages.length])

  // Función para hacer scroll automático al último mensaje
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Función optimizada y memoizada para encontrar la mejor respuesta
  const findBestMatch = useCallback(
    (userMessage: string): ChatbotQuestion | null => {
      const message = sanitizeText(userMessage.toLowerCase())
      if (!message) return null

      let bestMatch: ChatbotQuestion | null = null
      let highestPriority = -1
      let highestScore = 0

      for (const question of chatbotQuestions) {
        let score = 0

        // Coincidencia exacta tiene prioridad
        if (question.question.toLowerCase() === message) {
          return question
        }

        // Verificar si la pregunta principal coincide
        if (question.question.toLowerCase().includes(message)) {
          score = message.length / question.question.length
          if (
            question.priority > highestPriority ||
            (question.priority === highestPriority && score > highestScore)
          ) {
            bestMatch = question
            highestPriority = question.priority
            highestScore = score
          }
          continue
        }

        // Verificar si alguna keyword coincide
        for (const keywordObj of question.keywords) {
          const keyword = keywordObj.keyword.toLowerCase()
          if (message.includes(keyword) || keyword.includes(message)) {
            score = 0.8 // Keywords tienen menor peso que coincidencia directa
            if (
              question.priority > highestPriority ||
              (question.priority === highestPriority && score > highestScore)
            ) {
              bestMatch = question
              highestPriority = question.priority
              highestScore = score
            }
            break
          }
        }
      }

      return bestMatch
    },
    [chatbotQuestions],
  )

  // Procesar mensaje del usuario con memoización
  const processMessage = useCallback(
    (
      userMessage: string,
    ): { answer: string; followUp: Array<{ question: string; url?: string }> } => {
      const bestMatch = findBestMatch(userMessage)

      if (bestMatch) {
        return {
          answer: sanitizeText(bestMatch.answer),
          followUp: bestMatch.followUpQuestions
            .filter((q) => q.question && (!q.url || isValidUrl(q.url || '')))
            .map((q) => ({
              question: sanitizeText(q.question),
              url: q.url || undefined,
            })),
        }
      }

      // Respuesta por defecto desde CMS o fallback estático
      if (defaultResponse) {
        return {
          answer: sanitizeText(defaultResponse.answer),
          followUp: defaultResponse.followUp.filter(
            (q) => q.question && (!q.url || isValidUrl(q.url || '')),
          ),
        }
      }

      // Fallback si no hay respuesta por defecto configurada
      return {
        answer:
          'Lo siento, no tengo información sobre eso en este momento. ¿Puedo ayudarte con algo más?',
        followUp: [],
      }
    },
    [findBestMatch, defaultResponse],
  )

  const handleSubmit = useCallback(
    (messageText?: string) => {
      const textToSend = sanitizeText(messageText || inputValue)
      if (!textToSend) return

      // Rate limiting - prevenir spam
      const now = Date.now()
      if (now - lastMessageTime.current < RATE_LIMIT_MS) {
        return
      }
      lastMessageTime.current = now

      const userMessage: ChatMessage = {
        id: `${now}-user`,
        text: textToSend,
        isUser: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInputValue('')
      setIsTyping(true)

      // Simular tiempo de respuesta con variación natural
      const delay = TYPING_DELAY_MIN + Math.random() * (TYPING_DELAY_MAX - TYPING_DELAY_MIN)
      setTimeout(() => {
        const { answer, followUp } = processMessage(textToSend)
        const botMessage: ChatMessage = {
          id: `${Date.now()}-bot`,
          text: answer,
          isUser: false,
          timestamp: new Date(),
          followUpQuestions: followUp,
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      }, delay)
    },
    [inputValue, processMessage],
  )

  const handleFollowUpClick = useCallback(
    (question: string) => {
      handleSubmit(question)
    },
    [handleSubmit],
  )

  const handleNewChat = useCallback(() => {
    // Limpiar localStorage
    localStorage.removeItem(STORAGE_KEY)

    const defaultWelcomeText =
      '¡Hola! 👋 Soy el asistente virtual de BGL. ¿En qué puedo ayudarte hoy?'
    const initialMessage: ChatMessage = {
      id: `${Date.now()}-welcome`,
      text: welcomeMessage?.text || defaultWelcomeText,
      isUser: false,
      timestamp: new Date(),
      followUpQuestions:
        welcomeMessage?.followUpQuestions?.filter(
          (q) => q.question && (!q.url || isValidUrl(q.url)),
        ) || [],
    }
    setMessages([initialMessage])
    lastMessageTime.current = 0 // Reset rate limit
  }, [welcomeMessage])

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="fixed bottom-6 right-6 size-16 rounded-full shadow-lg z-50 bg-[#EC2224] hover:bg-[#CD2027] text-white"
        >
          <MessageCircle className="size-12" />
        </Button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed bottom-6 right-6 w-full max-w-xs md:max-w-md z-50 shadow-2xl rounded-2xl"
        >
          <Card className="h-[600px] flex flex-col pb-0 border-0">
            <CardHeader className="border-b bg-[#EC2224] text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {messages.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNewChat}
                      className="size-10 hover:bg-[#CD2027]"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full flex items-center bg-white justify-center">
                      <ChatbotLogo className="size-10" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">Asistente BGL</CardTitle>
                      <Status status="online" className="bg-transparent p-0">
                        <StatusIndicator />
                        <StatusLabel className="text-white" />
                      </Status>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="size-10 hover:bg-[#CD2027] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full px-4" ref={scrollAreaRef}>
                <div className="space-y-2 py-4">
                  {messages.map((msg) => (
                    <Message key={msg.id} from={msg.isUser ? 'user' : 'assistant'}>
                      {!msg.isUser && <StaticLogo className="size-10" />}
                      <MessageContent
                        variant="contained"
                        className={msg.isUser ? 'bg-[#E3F2FD]' : 'bg-[#F5F5F5]'}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>

                        {!msg.isUser &&
                          msg.followUpQuestions &&
                          msg.followUpQuestions.length > 0 && (
                            <div className="mt-2 space-y-2">
                              <p className="text-xs text-muted-foreground">
                                Elige una de las siguientes opciones:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {msg.followUpQuestions.map((item, index) => {
                                  if (item.url) {
                                    return (
                                      <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="text-xs rounded-full border-2 hover:bg-[#FFE5E5] hover:border-[#EC2224]"
                                      >
                                        <a
                                          href={item.url}
                                          target={item.url.startsWith('http') ? '_blank' : '_self'}
                                          rel={
                                            item.url.startsWith('http')
                                              ? 'noopener noreferrer'
                                              : undefined
                                          }
                                        >
                                          {item.question}
                                        </a>
                                      </Button>
                                    )
                                  } else {
                                    return (
                                      <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleFollowUpClick(item.question)}
                                        className="text-xs rounded-full border-2 hover:bg-[#FFE5E5] hover:border-[#EC2224]"
                                      >
                                        {item.question}
                                      </Button>
                                    )
                                  }
                                })}
                              </div>
                            </div>
                          )}
                      </MessageContent>
                      {msg.isUser && <MessageAvatar />}
                    </Message>
                  ))}

                  {isTyping && (
                    <Message from="assistant">
                      <StaticLogo className="size-10" />
                      <MessageContent variant="contained">
                        <Spinner />
                      </MessageContent>
                    </Message>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            <div className="border-t p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
                className="flex gap-2 items-center justify-center"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1"
                  disabled={isTyping}
                  maxLength={MAX_MESSAGE_LENGTH}
                  aria-label="Mensaje del chatbot"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-[#EC2224] hover:bg-[#CD2027] text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-zinc-500 mt-2 text-center">
                ¿Tu chat ha terminado?.{' '}
                <Button
                  onClick={handleNewChat}
                  className="text-[#EC2224] px-0 text-base"
                  variant="link"
                >
                  Iniciar un nuevo chat
                </Button>
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </>
  )
}
