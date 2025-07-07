import { Markup } from 'telegraf'

export function getBackToCategoriesKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('⬅️ Назад к категориям', 'back:categories')]
  ]).reply_markup
}