export interface Offer {
  id: string
  title: string
  country: string
  category: 'ua' | 'world' | 'crypto'
  link: string
  image: string
   features?: string[]  // вот тут важно: `?` говорит, что поле не обязательно
}