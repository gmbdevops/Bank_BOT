import { MyContext } from '../types/context'
import { getCategoriesReplyKeyboard } from '../keyboards/mainMenu'
import { sendKeyboard } from './sendKeyboard'
import { getActiveCategory } from './session'

/**
 * Показывает reply-клавиатуру с активной категорией.
 * Можно передать категорию вручную или взять её из сессии.
 */
export async function ensureReplyMenu(
  ctx: MyContext,
  category?: 'ua' | 'world' | 'crypto'
) {
  const active = category ?? getActiveCategory(ctx)

  try {
    await sendKeyboard(ctx, getCategoriesReplyKeyboard(active))
    console.log(`✅ Reply-клавиатура обновлена: ${active}`)
  } catch (err) {
    console.error('❌ Ошибка при показе reply-клавиатуры:', err)
  }
}