import type { CollectionBeforeValidateHook } from 'payload'

export const validateUser: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  // Solo aplicar validaciones en creación y actualización
  if (operation !== 'create' && operation !== 'update') {
    return data
  }

  // Verificar que data existe
  if (!data) {
    return data
  }

  // Validar que al menos un rol esté asignado
  if (!data.roles || data.roles.length === 0) {
    data.roles = ['user'] // Asignar rol por defecto
  }

  return data
}
