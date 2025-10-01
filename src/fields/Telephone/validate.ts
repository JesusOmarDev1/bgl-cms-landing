import type { Validate } from 'payload'

import { isPossiblePhoneNumber } from 'libphonenumber-js'

export const validate =
  (required?: boolean): Validate =>
  (value) => {
    if (!required && (!value || value === '')) {
      return true
    } else if (Boolean(required) && (!value || value === '')) {
      return 'Este campo es requerido.'
    }
    if (isPossiblePhoneNumber(value)) {
      return true
    }

    return 'Es un numero invalido'
  }
