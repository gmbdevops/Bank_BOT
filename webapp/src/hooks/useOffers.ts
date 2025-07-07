import { useEffect, useState } from 'react'
import { Offer } from '../types/Offer'

export function useOffers(category?: string) {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('http://localhost:3000/offers', {
          signal: controller.signal
        })

        if (!res.ok) {
          throw new Error(`Ошибка загрузки: ${res.status}`)
        }

        const data: Offer[] = await res.json()

        const filtered = category
          ? data.filter(o => o.category === category)
          : data

        setOffers(filtered)
      } catch (err) {
        if (!(err instanceof DOMException)) {
          setError((err as Error).message)
        }
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [category])

  return { offers, loading, error }
}