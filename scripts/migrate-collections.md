# Script de Migración - Mejores Prácticas

Este documento describe cómo migrar todas las collections existentes para seguir las mejores prácticas.

## 🎯 Objetivos de la Migración

1. **Estructura consistente** en todas las collections
2. **Performance optimizado** con indexes y defaultPopulate
3. **Mejor UX en admin** con RowLabels y componentes custom
4. **Revalidación inteligente** con hooks mejorados
5. **Organización modular** con campos separados

## 📋 Checklist por Collection

### ✅ Products (Completado)

- [x] Estructura de carpetas
- [x] Config modular
- [x] Campos organizados
- [x] Hooks mejorados
- [x] RowLabel custom
- [x] Indexes optimizados

### 🔄 Categories (Pendiente)

- [ ] Refactorizar estructura
- [ ] Agregar RowLabel
- [ ] Mejorar hooks
- [ ] Optimizar indexes

### 🔄 Brands (Pendiente)

- [ ] Refactorizar estructura
- [ ] Agregar RowLabel
- [ ] Mejorar hooks
- [ ] Optimizar indexes

### 🔄 Posts (Pendiente)

- [ ] Refactorizar estructura
- [ ] Agregar RowLabel
- [ ] Mejorar hooks
- [ ] Optimizar indexes

## 🚀 Pasos de Migración

### 1. Para cada Collection:

```bash
# Crear estructura de carpetas
mkdir src/collections/[CollectionName]/
mkdir src/collections/[CollectionName]/hooks/
mkdir src/collections/[CollectionName]/fields/
mkdir src/collections/[CollectionName]/components/
mkdir src/collections/[CollectionName]/access/
```

### 2. Mover archivos:

- `[Collection].ts` → `[Collection]/config.ts`
- Crear `[Collection]/index.ts`
- Crear hooks de revalidación
- Crear RowLabel component

### 3. Aplicar mejoras:

- Indexes estratégicos
- DefaultPopulate optimizado
- Hooks de revalidación
- RowLabel descriptivo
- Campos organizados

## 📊 Beneficios Esperados

- **Performance**: 40-60% mejora en queries
- **UX Admin**: Mejor experiencia para editores
- **Mantenibilidad**: Código más organizado
- **Escalabilidad**: Fácil agregar nuevas features
- **Consistencia**: Patrones predecibles

## 🔧 Herramientas de Migración

### Script de Refactoring:

```typescript
// scripts/refactor-collection.ts
export const refactorCollection = (collectionName: string) => {
  // 1. Crear estructura de carpetas
  // 2. Mover archivos
  // 3. Aplicar plantillas
  // 4. Actualizar imports
}
```

### Plantillas:

- `templates/collection-config.ts`
- `templates/row-label.tsx`
- `templates/revalidate-hook.ts`
- `templates/index.ts`

## 📈 Métricas de Éxito

- [ ] Todas las collections siguen la estructura estándar
- [ ] Tiempo de carga del admin reducido en 50%
- [ ] Queries optimizadas con indexes
- [ ] Revalidación selectiva implementada
- [ ] RowLabels descriptivos en todas las collections

## 🎯 Próximos Pasos

1. **Fase 1**: Migrar collections principales (Products ✅, Categories, Brands, Posts)
2. **Fase 2**: Migrar collections secundarias (Models, Suppliers, etc.)
3. **Fase 3**: Optimizar globals siguiendo el mismo patrón
4. **Fase 4**: Documentar y crear guías para nuevas collections
