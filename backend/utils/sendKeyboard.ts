import { MyContext } from '../types/context'
import {
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup
} from 'telegraf/typings/core/types/typegram'

// 🎯 Тип оформления метки меню
export type MenuStyle = 'minimal' | 'emoji' | 'textual' | 'fancy'

/**
 * Генератор красивой метки меню в зависимости от стиля и категории
 */
function getSafeMenuLabel(
  style: MenuStyle = 'emoji',
  category: 'ua' | 'world' | 'crypto' = 'ua'
): string {
  const map: Record<MenuStyle, () => string> = {
    minimal: () => '▫️',
    emoji: () => '🔽',
    textual: () => 'Меню',
    fancy: () => {
      switch (category) {
        case 'ua':
          return '🇺🇦 Украина'
        case 'world':
          return '🌍 Мир'
        case 'crypto':
          return '🪙 Крипто'
        default:
          return '📂 Категории'
      }
    }
  }

  return map[style]?.() ?? '📂'
}

/**
 * Универсальный хелпер для отправки reply- или inline-клавиатуры
 */
export async function sendKeyboard(
  ctx: MyContext,
  keyboard:
    | InlineKeyboardMarkup
    | ReplyKeyboardMarkup
    | { reply_markup: InlineKeyboardMarkup | ReplyKeyboardMarkup },
  options?: {
    category?: 'ua' | 'world' | 'crypto'
    style?: MenuStyle
  }
): Promise<void> {
  try {
    const replyMarkup =
      typeof keyboard === 'object' && 'reply_markup' in keyboard
        ? keyboard.reply_markup
        : keyboard

    const style = options?.style ?? 'fancy'
    const category = options?.category ?? ctx.session?.category ?? 'ua'
    const label = getSafeMenuLabel(style, category)

    await ctx.reply(label, { reply_markup: replyMarkup })
  } catch (err) {
    console.error('❌ Ошибка при отправке клавиатуры:', err)
  }
}