import { useNavigate } from 'react-router-dom'

export type Category = 'ua' | 'world' | 'crypto'

const categories: { id: Category; label: string }[] = [
  { id: 'ua', label: '🇺🇦 Украина' },
  { id: 'world', label: '🌍 Мир' },
  { id: 'crypto', label: '💰 Крипто' }
]

interface CategoryTabsProps {
  selected: Category
  onChange?: (category: Category) => void
}

export default function CategoryTabs({ selected, onChange }: CategoryTabsProps) {
  const navigate = useNavigate()

  const handleClick = (categoryId: Category) => {
    navigate(`?category=${categoryId}`)
    onChange?.(categoryId)
  }

  return (
    <div className="flex gap-2 mb-4">
      {categories.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`px-3 py-2 rounded-md border text-sm font-medium transition
            ${
              id === selected
                ? 'bg-emerald-500 text-white border-transparent'
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}