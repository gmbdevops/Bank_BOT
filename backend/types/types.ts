export type Category = 'ua' | 'world' | 'crypto'

export interface Offer {
  id: string
  title: string
  features: string[]
  country: string
  link: string
  category: Category
  image: string
  bonus?: string         // 💰 например: "100 грн бонус"
  validUntil?: string    // 📆 например: "до 31.07.2025"
  showBackButton?: boolean // ✅ вот это!
}