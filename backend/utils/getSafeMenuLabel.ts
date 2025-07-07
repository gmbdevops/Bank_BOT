export type MenuStyle = 'minimal' | 'emoji' | 'textual' | 'fancy'

export function getSafeMenuLabel(
  style: MenuStyle = 'emoji',
  category?: 'ua' | 'world' | 'crypto'
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