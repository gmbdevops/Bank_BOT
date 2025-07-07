import { Markup } from 'telegraf'

export function getBackToOffersKeyboard(category: 'ua' | 'world' | 'crypto') {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🔙 Назад к списку', `back:offers:${category}`)]
  ]).reply_markup
}