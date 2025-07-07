import { Offer } from '../types/types'

export function getOfferMessage(offer: Offer): string {
  return [
    `🏦 *${offer.title}*`,
    ``,
    `📂 Категория: \`${formatCategory(offer.category)}\``,
    offer.features?.length ? formatFeatures(offer.features) : '',
    ``,
    `🔗 [Перейти по ссылке](${offer.link})`,
    ``,
    `📝 Подробнее — нажми кнопку ниже 👇`
  ].filter(Boolean).join('\n')
}

function formatCategory(cat: 'ua' | 'world' | 'crypto'): string {
  const map = {
    ua: 'Украина 🇺🇦',
    world: 'Мир 🌍',
    crypto: 'Crypto ₿'
  }
  return map[cat]
}

function formatFeatures(features: string[]): string {
  return features.map(f => `• ${f}`).join('\n')
}