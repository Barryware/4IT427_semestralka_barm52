import type { ExamTip } from '../api/examTips'

interface ExamTipCardProps {
  tip: ExamTip
}

export default function ExamTipCard({ tip }: ExamTipCardProps) {
  return (
    <article className="tip-card">
      <header className="tip-card-header">
        <span className="tip-card-category">{tip.category}</span>
        <h3 className="tip-card-title">{tip.title}</h3>
      </header>
      <p className="tip-card-body">{tip.body}</p>
    </article>
  )
}
