import { useState } from 'react'
import CategoryTabs from '../components/CategoryTabs'
import { OfferCard } from '../components/OfferCard'
import { useOffers } from '../hooks/useOffers'
import { Loader } from '../components/Loader'

export default function Home() {
  const [category, setCategory] = useState<'ua' | 'world' | 'crypto'>('ua')
  const { offers, loading } = useOffers(category)

  return (
    <div className="p-4 flex flex-col items-center">
      <CategoryTabs selected={category} onSelect={setCategory} />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center gap-6">
          {offers.map(o => <OfferCard key={o.id} {...o} />)}
        </div>
      )}
    </div>
  )
}