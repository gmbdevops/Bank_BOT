import { Markup } from 'telegraf'
import { InlineKeyboardButton } from 'telegraf/types'
import { Offer } from '../types/types'

// ✅ Символ для подсветки выбранной категории в reply-меню
function getCategoryIcon(category: 'ua' | 'world' | 'crypto', activeCategory: string): string {
  const icons = {
    active: '✅',
    inactive: ''
  }
  return category === activeCategory ? icons.active : icons.inactive
}

// 👤 Профиль пользователя
export function getProfileInfo(user: any) {
  return [
    `👤 *Ваш Профиль*`,
    `🆔: \`${user.id}\``,
    `Рефералов: 0`,
    `Ваша реферальная ссылка:`,
    `[Получить](https://t.me/your_bot?start=${user.id})`,
    `Поддержка: @YourSupport`
  ].join('\n')
}

// 📋 Только офферы, без inline-категорий
export function getOffersWithMenuKeyboard(offers: Offer[]) {
  return Markup.inlineKeyboard(
    offers.map(o => [
      Markup.button.callback(` ▸  ${o.title}`, `offer:${o.id}`)
    ])
  ).reply_markup
}

// ⌨️ Клавиатура категорий под строкой ввода
export function getCategoriesReplyKeyboard(activeCategory: 'ua' | 'world' | 'crypto') {
  return Markup.keyboard([
    [
      `${getCategoryIcon('ua', activeCategory)} Украина`,
      `${getCategoryIcon('world', activeCategory)} Мир`,
      `${getCategoryIcon('crypto', activeCategory)} Crypto`
    ],
    ['👤 Профиль', '⚙️ Настройки']
  ])
    .resize()
    .oneTime(false)
}

// 📦 Компактные инлайн-кнопки без категорий
export function getOffersInlineKeyboard(offers: Offer[]) {
  return {
    reply_markup: {
      inline_keyboard: offers.map(o => [
        { text: `⪢ ${o.title}`, callback_data: `offer:${o.id}` }
      ])
    }
  }
}
export function getWebAppLaunchKeyboard(url: string) {
  return {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🚀 Запустить Web App',
          web_app: { url }
        }
      ]]
    }
  }
}
