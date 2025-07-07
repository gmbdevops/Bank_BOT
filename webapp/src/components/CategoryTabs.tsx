// components/CategoryTabs.tsx
import { useNavigate } from 'react-router-dom'

const categories = [
  { id: 'ua', label: '🇺🇦 Украина' },
  { id: 'world', label: '🌍 Мир' },
  { id: 'crypto', label: '💰 Крипто' }
]

const CategoryTabs = ({ selected }: { selected: string }) => {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => navigate(`?category=${cat.id}`)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #ccc',
            background: cat.id === selected ? '#00bfa5' : '#f2f2f2',
            color: cat.id === selected ? '#fff' : '#333',
            fontWeight: 500
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs