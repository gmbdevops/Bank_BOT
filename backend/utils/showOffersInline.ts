import path from 'path'
import { MyContext } from '../types/context'
import { Offer } from '../types/types'
import { getOffersWithMenuKeyboard } from '../keyboards/mainMenu'
import { ensureReplyMenu } from './ensureReplyMenu'

function getCategoryImage(category: 'ua' | 'world' | 'crypto') {
  const images = {
    ua: 'ukraine.png',
    world: 'world.png',
    crypto: 'crypto.png'
  }

  return images[category] || ''
}

/**
 * Показывает inline-перечень офферов в выбранной категории.
 * Включает:
 * - reply-клавиатуру
 * - шапку категории (изображение)
 * - офферы через inline-кнопки
 */
export async function showOffersInline(
  ctx: MyContext,
  offers: Offer[],
  category: 'ua' | 'world' | 'crypto'
) {
  if (offers.length === 0) {
    await ctx.reply('😔 В этой категории пока нет офферов.')
    return await ensureReplyMenu(ctx, category)
  }

  await ensureReplyMenu(ctx, category)

  const imagePath = path.resolve(__dirname, '../img', getCategoryImage(category))
  await ctx.replyWithPhoto({ source: imagePath })

  await ctx.reply(`📋 Офферы в категории *${category.toUpperCase()}*:`, {
    reply_markup: getOffersWithMenuKeyboard(offers),
    parse_mode: 'Markdown'
  })
}