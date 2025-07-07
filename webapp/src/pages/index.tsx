import { useEffect, useState } from 'react'
import { Offer } from '../types/Offer'
import { CategoryTabs } from '../components/CategoryTabs'
import { OfferCard } from '../components/OfferCard'
import { useOffers } from '../hooks/useOffers'
import WebApp from '@twa-dev/sdk'

type Category = 'ua' | 'world' | 'crypto'

export default function HomePage() {
  const [category, setCategory] = useState<Category>('ua')
  const { offers, loading } = useOffers(category)
  const [customLinks, setCustomLinks] = useState<string[] | null>(null)

  useEffect(() => {
    WebApp.expand()
    WebApp.ready()
    document.body.style.background = WebApp.themeParams.bg_color || '#fff'

    const userId = WebApp.initDataUnsafe?.user?.id
    if (userId) {
      fetch(`/api/links/${userId}`)
        .then(res => res.json())
        .then(data => setCustomLinks(data.links))
        .catch(() => setCustomLinks(null))
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4 pb-[15vh]">
      <CategoryTabs selected={category} onSelect={setCategory} />

      {loading ? (
        <p className="text-center mt-8 text-gray-400">Загрузка офферов...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
          {offers.map((offer, i) => (
            <OfferCard
              key={offer.id}
              {...offer}
              link={customLinks?.[i] || offer.link}
            />
          ))}
        </div>
      )}
    </div>
  )
}