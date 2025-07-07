import WebApp from '@twa-dev/sdk'
import { Offer } from '../types/Offer'

type Props = {
  offer: Offer
}

const OfferDetail: React.FC<Props> = ({ offer }) => {
  const openLink = () => {
    if (offer.link) {
      WebApp.openLink(offer.link)
    }
  }

  return (
    <div className="bg-white rounded shadow-md p-4">
      <img
        src={`/img/${offer.image}`}
        alt={offer.title}
        className="w-full h-auto rounded mb-4 object-cover"
      />
      <h1 className="text-xl font-bold mb-3">{offer.title}</h1>

      {offer.features?.length > 0 && (
        <ul className="list-disc text-gray-700 pl-5 mb-4 text-sm">
          {offer.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}

      <button
        onClick={openLink}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        🔗 Перейти к офферу
      </button>
    </div>
  )
}

export default OfferDetail