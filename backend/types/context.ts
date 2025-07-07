import type { Context as TelegrafContext } from 'telegraf'

/**
 * Данные, сохраняемые в ctx.session
 */
export interface SessionData {
  category?: 'ua' | 'world' | 'crypto'
  // можно добавить другие поля, например:
  // language?: 'ru' | 'uk' | 'en'
  // notified?: boolean
  // viewedOffers?: string[]
}

/**
 * Расширенный контекст бота, включающий сессию
 */
export type MyContext = TelegrafContext & {
  session: SessionData
}