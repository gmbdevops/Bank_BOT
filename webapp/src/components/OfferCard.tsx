import { Offer } from '../types/Offer'

export const OfferCard = ({ id, title, image, features, link }: Offer) => {
  return (
    <div className="rounded-xl shadow-sm bg-white dark:bg-gray-800 p-4 transition hover:shadow-md">
      <img
        src={`/img/${image}`}
        alt={title}
        className="rounded-md mb-3 w-full h-40 object-cover"
        loading="lazy"
      />

      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">{title}</h3>

      {(features?.length ?? 0) > 0 ? (
        <ul className="...">...</ul>
      ) : (
        <p className="text-sm text-gray-400 italic">Описание отсутствует</p>
      )}

      <div className="flex flex-col gap-2">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-md font-medium transition"
        >
          🔗 Получить
        </a>

        <a
          href={`/offer/${id}`}
          className="text-sm text-center text-blue-500 hover:underline"
        >
          Подробнее →
        </a>
      </div>
    </div>
  )
}