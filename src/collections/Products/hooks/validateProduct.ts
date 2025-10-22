import type { CollectionBeforeValidateHook } from 'payload'

export const validateProduct: CollectionBeforeValidateHook = async ({ data, req: { payload } }) => {
  // Guard clause to ensure data exists
  if (!data) {
    throw new Error('No data provided for validation')
  }

  // Validar que el descuento no sea mayor al precio
  if (data.discount && data.price && data.discount > data.price) {
    throw new Error('El descuento no puede ser mayor al precio del producto')
  }

  // Validar que el stock sea un número válido
  if (data.stock !== undefined && data.stock < 0) {
    throw new Error('El stock no puede ser negativo')
  }

  // Validar que el precio sea válido
  if (data.price !== undefined && data.price < 0) {
    throw new Error('El precio no puede ser negativo')
  }

  // Log para debugging
  payload.logger.info('Product validation passed', {
    title: data.title,
    price: data.price,
    discount: data.discount,
    stock: data.stock,
  })

  return data
}
