import { Offer } from './types/types'

export function getOfferMessage(offer: Offer): string {
  const features = offer.features.map(f => `▪️ ${f}`).join('\n')
  const bonus = offer.bonus ? `🎁 *Бонус:* ${offer.bonus}\n` : ''
  const valid = offer.validUntil ? `📆 *Действует до:* ${offer.validUntil}\n` : ''
  const country = `🌍 *Страна:* ${offer.country}`

  return `*${offer.title}*\n\n${features}\n\n${bonus}${valid}${country}`
}