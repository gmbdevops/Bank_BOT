import { Link } from 'react-router-dom'
import { Offer } from '../types/Offer'

export const OfferCard = ({ id, title, image, features, link }: Offer) => (
  <div className="bg-white rounded-lg shadow p-4 max-w-md w-full">
    <img
      src={`/img/${image}`}
      alt={title}
      className="rounded mb-3 w-full object-cover"
    />
    <h2 className="font-semibold text-lg mb-2">{title}</h2>

    {features && (
      <ul className="text-sm text-gray-700 list-disc pl-5 mb-3">
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
    )}

    <div className="flex flex-col gap-2">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
      >
        🔗 Получить
      </a>

      <Link
        to={`/offer/${id}`}
        className="text-center text-sm text-blue-500 hover:underline"
      >
        Подробнее →
      </Link>
    </div>
  </div>
)