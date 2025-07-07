import { useEffect, useState } from 'react'
import { Offer } from '../types/Offer'

export function useOffers(category?: string) {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/offers')
      .then(res => res.json())
      .then(data => {
        const filtered = category
          ? data.filter((o: Offer) => o.category === category)
          : data
        setOffers(filtered)
        setLoading(false)
      })
  }, [category])

  return { offers, loading }
}