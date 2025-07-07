import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'
import path from 'path'
import LocalSession from 'telegraf-session-local'
import offersRaw from './offers.json'
import { Offer } from './types/types'
import { MyContext, SessionData } from './types/context'
import { getOfferMessage } from './handlers/offerHandlers'
import { handleReplyCategory } from './handlers/replyHandlers'
import { sendKeyboard } from './utils/sendKeyboard'
import { ensureReplyMenu } from './utils/ensureReplyMenu'
import { showOffersInline } from './utils/showOffersInline'
import { getProfileInfo } from './keyboards/mainMenu'
import { getOfferKeyboard } from './keyboards/getOfferKeyboard'

import {
  getActiveCategory,
  setActiveCategory
} from './utils/session'

dotenv.config({ path: path.resolve(__dirname, '.env') })

import { getWebAppLaunchKeyboard } from './keyboards/mainMenu' // путь — откуда экспортируешь


const WEBAPP_URL = process.env.WEBAPP_URL || 'https://your-miniapp-link.com'
const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN!)
const offers: Offer[] = offersRaw as Offer[]

bot.use(new LocalSession<SessionData>({ database: 'session_db.json' }).middleware())

// ▶️ Старт
bot.start(async ctx => {
  const user = ctx.from
  const defaultCategory: Offer['category'] = 'ua'

  setActiveCategory(ctx, defaultCategory)
  const categoryOffers = offers.filter(o => o.category === defaultCategory)

  await ctx.replyWithAnimation({ source: path.resolve(__dirname, 'img', 'money-5944.gif') })
  await ctx.reply(getProfileInfo(user), { parse_mode: 'Markdown' })
  await showOffersInline(ctx, categoryOffers, defaultCategory)
})

bot.command('webapp', async ctx => {
  await ctx.reply('🌐 Нажми на кнопку ниже, чтобы запустить Web App:', getWebAppLaunchKeyboard(WEBAPP_URL))
})


// 👤 Профиль
bot.hears('👤 Профиль', async ctx => {
  const user = ctx.from
  const category = getActiveCategory(ctx)

  await ctx.replyWithAnimation({ source: path.resolve(__dirname, 'img', 'money-5944.gif') })
  await ctx.reply(getProfileInfo(user), { parse_mode: 'Markdown' })
  await ensureReplyMenu(ctx, category)
})

// ⚙️ Настройки
bot.hears('⚙️ Настройки', async ctx => {
  const category = getActiveCategory(ctx)

  await ctx.reply('⚙️ В будущем здесь можно будет:\n• включить уведомления\n• выбрать язык\n• задать фильтры')
  await ensureReplyMenu(ctx, category)
})

// 📍 Reply-категории
bot.hears(/(Украина|Мир|Crypto)/, ctx => handleReplyCategory(ctx, offers))

// 📂 Категория (inline)
bot.action(/^category:(.+)$/, async ctx => {
  const selected = ctx.match[1] as Offer['category']
  setActiveCategory(ctx, selected)

  const filtered = offers.filter(o => o.category === selected)
  await ctx.answerCbQuery()
  await showOffersInline(ctx, filtered, selected)
})

// 📦 Просмотр оффера
bot.action(/^offer:(.+)$/, async ctx => {
  const offer = offers.find(o => o.id === ctx.match[1])
  await ctx.answerCbQuery()

  if (!offer) return ctx.reply('❌ Оффер не найден')

  setActiveCategory(ctx, offer.category)

  await ctx.replyWithPhoto(
    { source: path.resolve(__dirname, 'img', offer.image) },
    {
      caption: getOfferMessage(offer),
      parse_mode: 'Markdown',
      reply_markup: getOfferKeyboard(offer)
    }
  )

  await ensureReplyMenu(ctx, offer.category)
})

// ⬅️ Назад к офферам
bot.action(/^back:offers:(.+)$/, async ctx => {
  const category = ctx.match[1] as 'ua' | 'world' | 'crypto'
  setActiveCategory(ctx, category)

  const filtered = offers.filter(o => o.category === category)
  await ctx.answerCbQuery()
  await showOffersInline(ctx, filtered, category)
})

// ⬅️ Назад к категориям
bot.action('back:categories', async ctx => {
  const category = getActiveCategory(ctx)
  await ctx.answerCbQuery()
  await ensureReplyMenu(ctx, category)
})

// 🌐 WebApp
bot.command('webapp', ctx => {
  return ctx.reply(`🧭 Открыть WebApp: ${WEBAPP_URL}`)
})

bot.launch()
console.log('🤖 Бот запущен и работает!')