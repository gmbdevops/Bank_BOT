import { MyContext } from '../types/context'

/**
 * Получает текущую активную категорию из сессии.
 * Если не установлена — возвращает 'ua' по умолчанию.
 */
export function getActiveCategory(ctx: MyContext): 'ua' | 'world' | 'crypto' {
  return ctx.session?.category ?? 'ua'
}

/**
 * Устанавливает активную категорию в сессию.
 */
export function setActiveCategory(
  ctx: MyContext,
  category: 'ua' | 'world' | 'crypto'
) {
  ctx.session.category = category
}

/**
 * Сбрасывает категорию в значение 'ua'.
 */
export function resetCategory(ctx: MyContext) {
  ctx.session.category = 'ua'
}