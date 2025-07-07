//getCategoriesReplyKeyboard.ts
import { Markup } from 'telegraf'

function getCategoryIcon(category: 'ua' | 'world' | 'crypto', activeCategory: string): string {
  const icons = {
    ua: { active: '🟢', inactive: '⚪' },
    world: { active: '🟢', inactive: '⚪' },
    crypto: { active: '🟢', inactive: '⚪' }
  }
  return category === activeCategory ? icons[category].active : icons[category].inactive
}

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