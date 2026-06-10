import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchExamTips } from '../api/examTips'
import ExamTipCard from '../components/ExamTipCard'
import { filterTipsByCategory, listUniqueCategories } from '../utils/tipUtils'

export default function Tipy() {
  const [activeCategory, setActiveCategory] = useState('')
  const { data: tips, isLoading, isError, refetch } = useQuery({
    queryKey: ['exam-tips'],
    queryFn: fetchExamTips,
  })

  if (isLoading) {
    return <p className="tip-state">Načítám tipy…</p>
  }

  if (isError) {
    return (
      <div className="tip-state tip-state-error">
        <p>Nepodařilo se načíst tipy ze serveru.</p>
        <button className="tip-retry" onClick={() => refetch()}>Zkusit znovu</button>
      </div>
    )
  }

  const categories = listUniqueCategories(tips ?? [])
  const filtered = filterTipsByCategory(tips ?? [], activeCategory)

  return (
    <div className="tipy-page">
      <div className="page-title">Tipy ke státnicím</div>
      <p className="page-subtitle">Načítáno přes TanStack Query z public/exam-tips.json.</p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
        <button
          onClick={() => setActiveCategory('')}
          style={{
            padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: activeCategory === '' ? 700 : 400,
            border: `1px solid ${activeCategory === '' ? '#1d4ed8' : '#e2e8f0'}`,
            background: activeCategory === '' ? '#eff6ff' : '#fff',
            color: activeCategory === '' ? '#1d4ed8' : '#64748b', cursor: 'pointer',
          }}
        >
          Vše ({tips?.length ?? 0})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: activeCategory === cat ? 700 : 400,
              border: `1px solid ${activeCategory === cat ? '#1d4ed8' : '#e2e8f0'}`,
              background: activeCategory === cat ? '#eff6ff' : '#fff',
              color: activeCategory === cat ? '#1d4ed8' : '#64748b', cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="tipy-grid">
        {filtered.map((tip) => (
          <ExamTipCard key={tip.id} tip={tip} />
        ))}
      </div>
    </div>
  )
}
