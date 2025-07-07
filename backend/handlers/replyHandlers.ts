import path from 'path'
import { Offer } from '../types/types'
import { MyContext } from '../types/context'
import {
  getOffersWithMenuKeyboard,
  getCategoriesReplyKeyboard
} from '../keyboards/mainMenu'
import { sendKeyboard } from '../utils/sendKeyboard'
import { setActiveCategory } from '../utils/session'

const categoryImageMap: Record<'ua' | 'world' | 'crypto', string> = {
  ua: 'ukraine.png',
  world: 'world.png',
  crypto: 'crypto.png'
}

const keywordMap: Record<string, 'ua' | 'world' | 'crypto'> = {
  украина: 'ua',
  ukraine: 'ua',
  мир: 'world',
  world: 'world',
  crypto: 'crypto',
  крипто: 'crypto'
}

/**
 * Определяет категорию из текста reply-кнопки.
 */
function resolveCategoryFromText(text: string): 'ua' | 'world' | 'crypto' {
  const normalized = text.toLowerCase().replace(/[^\wа-яё]/gi, '')

  for (const [key, value] of Object.entries(keywordMap)) {
    if (normalized.includes(key)) return value
  }

  return 'ua'
}

/**
 * Обрабатывает выбор категории через reply-кнопку.
 */
export async function handleReplyCategory(ctx: MyContext, offers: Offer[]) {
  if (
    !ctx.message ||
    typeof ctx.message !== 'object' ||
    !('text' in ctx.message)
  ) return

  const rawText = ctx.message.text || ''
  const category = resolveCategoryFromText(rawText)

  setActiveCategory(ctx, category)
  const filtered = offers.filter(o => o.category === category)
  const image = categoryImageMap[category]

  // Клавиатура
  await sendKeyboard(ctx, getCategoriesReplyKeyboard(category))

  // Шапка
  if (image) {
    await ctx.replyWithPhoto({ source: path.resolve(__dirname, '../img', image) })
  }

// 📦 Офферы
if (filtered.length > 0) {
  await ctx.reply(
    `📋 Офферы в категории *${category.toUpperCase()}*:\n` +
    `🔹 Выбери интересующий оффер из списка ниже.\n` +
    `💡 Не забудь, что ты можешь сменить категорию внизу меню.\n`+
    ` \n`,
    {
      parse_mode: 'Markdown',
      reply_markup: getOffersWithMenuKeyboard(filtered)
    }
  )
} else {
  await ctx.reply('😔 В этой категории пока нет офферов.')
}
}