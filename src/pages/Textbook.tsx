import { useState } from 'react'
import { SUBJECTS } from '../data'
import type { Subject } from '../types'
import { useProgress } from '../hooks/useProgress'

const SUBJECT_READ_KEY = 'textbook-subject-read-v1'
const SUBJECT_XP = 6

const SUBJECT_QUESTIONS: Record<string, string> = {
  '4SA310': 'Umíš vysvětlit, jak se propojuje IT governance, business strategie, COBIT/ITIL a měření hodnoty IT?',
  '4SA313': 'Umíš popsat hlavní bezpečnostní hrozby, opatření a rozdíl mezi prevencí, detekcí a reakcí?',
  '4SA415': 'Umíš propojit informační management s cíli organizace, procesy, daty a rolí CIO?',
  '4IT418': 'Umíš vysvětlit řízení podnikové informatiky od IT strategie, CIO, ITSM/SLA a COBIT/ITIL po náklady, compliance, BCM a DRP?',
  '4SA418': 'Umíš vysvětlit, jak organizace pracuje s informacemi, kulturou, strukturou a rozhodováním?',
  '4SA420': 'Umíš říct rozdíl mezi systémovým myšlením, informační etikou a dopady ICT na společnost?',
  '4SA440': 'Umíš popsat informační společnost, digitální propast, eGovernment a sociální dopady ICT?',
  '4SA513': 'Umíš vysvětlit audit IS od cílů přes rizika, kontrolní mechanismy až po auditní důkazy?',
  '4SA515': 'Umíš popsat ISMS, ISO 27001, řízení rizik bezpečnosti a bezpečnostní politiku organizace?',
  '4SA516': 'Umíš propojit project governance, ERP, implementaci, změnové řízení a smluvní zajištění?',
  '4SA540': 'Umíš vysvětlit digitální forenzní analýzu od zajištění stop přes chain of custody po reporting?',
  '4SA551': 'Umíš popsat moderní řízení rizik, identifikaci, hodnocení, mitigaci a reporting rizik?',
}

function loadSubjectReads(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(SUBJECT_READ_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {}
}

function saveSubjectReads(reads: Record<string, boolean>) {
  try { localStorage.setItem(SUBJECT_READ_KEY, JSON.stringify(reads)) } catch {}
}

function subjectQuestion(subject: Subject): string {
  return SUBJECT_QUESTIONS[subject.id] ?? `Umíš vysvětlit hlavní pointu předmětu ${subject.label} a napojit ji na státnice?`
}

interface Props {
  subjectId?: string
  onSelect: (id: string) => void
  onBack: () => void
}

export default function Textbook({ subjectId, onSelect, onBack }: Props) {
  const subject = SUBJECTS.find(s => s.id === subjectId)
  const [subjectReads, setSubjectReads] = useState<Record<string, boolean>>(loadSubjectReads)
  const { progress, addXP } = useProgress()
  const readySubjects = SUBJECTS.filter(s => s.ready)
  const readCount = readySubjects.filter(s => subjectReads[s.id]).length

  function markSubjectRead(id: string) {
    if (subjectReads[id]) return
    const next = { ...subjectReads, [id]: true }
    setSubjectReads(next)
    saveSubjectReads(next)
    addXP(SUBJECT_XP)
  }

  if (subject?.ready && subject.file) {
    const isRead = !!subjectReads[subject.id]
    return (
      <div className="textbook-iframe-wrap">
        <div className="textbook-back-bar">
          <button className="textbook-back-btn" onClick={onBack}>
            ← Zpět
          </button>
          <span className="textbook-back-subject">{subject.label}</span>
          <span className="textbook-back-code">{subject.id}</span>
        </div>
        <div className={`textbook-subject-check${isRead ? ' read' : ''}`}>
          <div className="textbook-subject-check-main">
            <div className="textbook-subject-check-label">Kontrolní otázka předmětu</div>
            <div className="textbook-subject-check-question">{subjectQuestion(subject)}</div>
          </div>
          <div className="textbook-subject-check-actions">
            <span className="textbook-subject-xp">{progress.totalXP} XP celkem</span>
            <button className={`textbook-subject-check-btn${isRead ? ' read' : ''}`} onClick={() => markSubjectRead(subject.id)} disabled={isRead}>
              {isRead ? 'Odškrtnuto' : `Vím, zapsat +${SUBJECT_XP} XP`}
            </button>
          </div>
        </div>
        <iframe
          key={subject.file}
          src={`content/textbook/${subject.file}`}
          className="textbook-iframe"
          title={subject.label}
        />
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-title">Učebnice</div>
      <div className="page-subtitle">Kompletní studijní materiál předmět po předmětu — ze zdrojových přednášek a knih.</div>
      <div className="textbook-progress-pill">
        {readCount} / {readySubjects.length} předmětů zapsáno · +{SUBJECT_XP} XP za předmět
      </div>
      <div className="textbook-grid">
        {SUBJECTS.map(s => {
          const isRead = !!subjectReads[s.id]
          return (
          <button
            key={s.id}
            className={`textbook-card${!s.ready ? ' not-ready' : ''}${isRead ? ' done' : ''}`}
            onClick={() => s.ready && onSelect(s.id)}
            disabled={!s.ready}
          >
            <div className={`textbook-card-badge ${isRead ? 'done' : s.ready ? 'ready' : 'pending'}`}>
              {isRead ? 'Zapsáno' : s.ready ? 'Dostupné' : 'Připravuje se'}
            </div>
            <div className="textbook-card-name">{s.label}</div>
            <div className="textbook-card-code">{s.id}</div>
            <div className="textbook-card-check">
              {s.ready ? (isRead ? '✓ otázka hotová' : `čeká otázka +${SUBJECT_XP} XP`) : 'bez obsahu'}
            </div>
          </button>
          )
        })}
      </div>
    </div>
  )
}
