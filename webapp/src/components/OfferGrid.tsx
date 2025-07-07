import { Offer } from '../types/Offer'
import { OfferCard } from './OfferCard'

interface OfferGridProps {
  offers: Offer[]
  customLinks?: string[]
}

export const OfferGrid = ({ offers, customLinks }: OfferGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {offers.map((offer, i) => (
        <OfferCard
          key={offer.id}
          {...offer}
          link={customLinks?.[i] ?? offer.link}
        />
      ))}
    </div>
  )
}