import { useQuery } from '@tanstack/react-query'
import { fetchExamTips } from '../api/examTips'
import ExamTipCard from '../components/ExamTipCard'

export default function Tipy() {
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

  return (
    <div className="tipy-page">
      <div className="page-title">Tipy ke státnicím</div>
      <p className="page-subtitle">Načítáno přes TanStack Query z public/exam-tips.json.</p>
      <div className="tipy-grid">
        {tips?.map((tip) => (
          <ExamTipCard key={tip.id} tip={tip} />
        ))}
      </div>
    </div>
  )
}
