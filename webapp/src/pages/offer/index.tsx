import { useParams, useNavigate } from 'react-router-dom'
import { useOffers } from '../../hooks/useOffers'
import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import OfferDetail from '../../components/OfferDetail'

export default function OfferPage() {
  const { id } = useParams<{ id: string }>()
  const { offers } = useOffers()
  const offer = offers.find(o => o.id === id)
  const navigate = useNavigate()

  useEffect(() => {
    if (offer) {
      document.title = offer.title
    } else {
      document.title = 'Оффер не найден'
    }

    WebApp.BackButton.show()
    WebApp.BackButton.onClick(() => navigate(-1))

    return () => {
      WebApp.BackButton.hide()
      WebApp.BackButton.offClick(() => navigate(-1))
    }
  }, [offer, navigate])

  if (!offer) return <div className="p-4">❌ Оффер не найден</div>

  return (
    <div className="p-4">
      <OfferDetail offer={offer} />
    </div>
  )
}