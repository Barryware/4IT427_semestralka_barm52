import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ExamTipCard from './ExamTipCard'
import type { ExamTip } from '../api/examTips'

const sampleTip: ExamTip = {
  id: 'tip-test',
  title: 'Strukturovaný úvod',
  body: 'Začni definicí pojmu, pak ukaž rozdíl od podobných pojmů.',
  category: 'Komunikace',
}

describe('ExamTipCard', () => {
  it('zobrazí název tipu', () => {
    render(<ExamTipCard tip={sampleTip} />)
    expect(screen.getByText('Strukturovaný úvod')).toBeInTheDocument()
  })

  it('zobrazí tělo tipu', () => {
    render(<ExamTipCard tip={sampleTip} />)
    expect(screen.getByText(/začni definicí pojmu/i)).toBeInTheDocument()
  })

  it('zobrazí kategorii tipu', () => {
    render(<ExamTipCard tip={sampleTip} />)
    expect(screen.getByText('Komunikace')).toBeInTheDocument()
  })
})
