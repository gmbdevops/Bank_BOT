import { useParams, useNavigate } from 'react-router-dom'
import { useOffers } from '../../hooks/useOffers'
import { OfferCard } from '../../components/OfferCard'
import { useEffect } from 'react'

export default function OfferPage() {
  const { id } = useParams<{ id: string }>()
  const { offers } = useOffers()
  const offer = offers.find(o => o.id === id)
  const navigate = useNavigate()

  useEffect(() => {
    if (!offer) document.title = 'Оффер не найден'
    else document.title = offer.title
  }, [offer])

  if (!offer) return <div className="p-4">❌ Оффер не найден</div>

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 text-sm mb-4"
      >
        ← Назад
      </button>
      <OfferCard {...offer} />
    </div>
  )
}