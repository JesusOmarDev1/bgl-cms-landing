/**
 * Utilidad para reemplazar variables {{variable}} en strings
 * Basado en: https://github.com/payloadcms/plugin-form-builder/blob/main/src/utilities/replaceDoubleCurlys.ts
 */

interface EmailVariable {
  field: string
  value: string
}

type EmailVariables = EmailVariable[]

export const replaceDoubleCurlys = (str: string, variables?: EmailVariables): string => {
  const regex = /{{(.+?)}}/g
  if (str && variables) {
    return str.replace(regex, (_, variable) => {
      const foundVariable = variables.find(({ field: fieldName }) => variable === fieldName)
      if (foundVariable) return foundVariable.value
      return variable
    })
  }
  return str
}
