import { Markup } from 'telegraf'
import { InlineKeyboardMarkup } from 'telegraf/types'
import { Offer } from '../types/types'
import dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/../.env' })

const WEBAPP_URL = process.env.WEBAPP_URL || 'https://your-webapp-link.com'
const isHttps = WEBAPP_URL.startsWith('https://')

export function getOfferKeyboard(offer: Offer): InlineKeyboardMarkup {
  const buttons: ReturnType<typeof Markup.button.url | typeof Markup.button.webApp | typeof Markup.button.callback>[][] = [
    [Markup.button.url('🔗 Перейти', offer.link)]
  ]

  if (offer.showBackButton) {
    buttons.push([
      Markup.button.callback('🔙 Назад к списку', `back:offers:${offer.category}`)
    ])
  }

  if (isHttps) {
    buttons.push([
      Markup.button.webApp('📱 Открыть WebApp', WEBAPP_URL)
    ])
  }

  return Markup.inlineKeyboard(buttons).reply_markup
}