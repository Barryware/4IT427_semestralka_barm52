import { useState } from 'react'
import { SHRNUTI } from '../data/shrnuti-data'
import type { ShrnutiCard } from '../data/shrnuti-data'

const SUBJECT_LABEL: Record<string, string> = {
  '4SA310': 'IT Governance',
  '4SA313': 'Bezpečnost IS',
  '4SA415': 'Informační management',
  '4SA418': 'Organizace a informace',
  '4SA440': 'Sociální informatika',
  '4SA513': 'Audit IS',
  '4SA515': 'ISMS & Regulace',
  '4SA516': 'Project Gov. + ERP',
  '4SA540': 'Forenzní analýza',
  '4SA551': 'Řízení rizik',
  'přehled': 'Přehled',
}

const SUBJECT_COLOR: Record<string, string> = {
  '4SA310': '#3b82f6', '4SA313': '#ef4444', '4SA415': '#8b5cf6',
  '4SA418': '#06b6d4', '4SA440': '#84cc16', '4SA513': '#f59e0b',
  '4SA515': '#10b981', '4SA516': '#f97316', '4SA540': '#78716c',
  '4SA551': '#64748b', 'přehled': '#94a3b8',
}

function CardView({ card, onClose }: { card: ShrnutiCard; onClose: () => void }) {
  const color = SUBJECT_COLOR[card.subject] ?? '#94a3b8'
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '28px 32px', maxWidth: 760, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', background: color, padding: '3px 9px', borderRadius: 4, marginBottom: 10 }}>
            {SUBJECT_LABEL[card.subject] ?? card.subject}
          </span>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>{card.topic}</h2>
        </div>
        <button onClick={onClose} style={{ fontSize: 13, color: '#64748b', background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', flexShrink: 0, marginLeft: 16 }}>
          ← Zpět
        </button>
      </div>

      {/* Opening sentence */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '14px 18px', marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0369a1', marginBottom: 8 }}>Říct jako první</div>
        <p style={{ fontSize: 14.5, color: '#0c4a6e', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{card.open}</p>
      </div>

      {/* Key points */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569', marginBottom: 10 }}>Klíčové body</div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {card.body.map((point, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, width: 20, height: 20, background: color + '22', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: color, marginTop: 1 }}>{i + 1}</span>
              <span style={{ fontSize: 13.5, color: '#1e293b', lineHeight: 1.6 }}>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Gotcha */}
      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, padding: '14px 18px', marginBottom: card.contrast ? 16 : 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c2410c', marginBottom: 8 }}>Zkouškový háček — tohle komise chytá</div>
        <p style={{ fontSize: 13.5, color: '#7c2d12', lineHeight: 1.65, margin: 0 }}>{card.gotcha}</p>
      </div>

      {/* Contrast */}
      {card.contrast && (
        <div style={{ background: '#faf5ff', border: '1px solid #ddd6fe', borderRadius: 8, padding: '14px 18px', marginTop: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6d28d9', marginBottom: 8 }}>Typická X vs. Y otázka</div>
          <p style={{ fontSize: 13.5, color: '#3b0764', lineHeight: 1.65, margin: 0 }}>{card.contrast}</p>
        </div>
      )}
    </div>
  )
}

export default function Shrnuti() {
  const [selected, setSelected] = useState<ShrnutiCard | null>(null)
  const [search, setSearch] = useState('')
  const [filterSubject, setFilterSubject] = useState<string | null>(null)

  const subjects = [...new Set(SHRNUTI.map(c => c.subject))]

  const filtered = SHRNUTI.filter(c => {
    if (filterSubject && c.subject !== filterSubject) return false
    if (search) {
      const q = search.toLowerCase()
      return c.topic.toLowerCase().includes(q) || c.open.toLowerCase().includes(q) || c.body.some(b => b.toLowerCase().includes(q))
    }
    return true
  })

  if (selected) {
    return (
      <div className="page">
        <CardView card={selected} onClose={() => setSelected(null)} />
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-title">Shrnutí</div>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20, lineHeight: 1.6 }}>
        {SHRNUTI.length} karet — pro každý klíčový okruh: co říct jako první, co musíš zmínit a co komise chytá. Jdi od první karty nebo filtruj dle předmětu.
      </p>

      {/* Filter row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Hledat…"
          style={{ flex: '1 1 180px', minWidth: 140, padding: '7px 12px', border: '1px solid #e2e8f0', borderRadius: 7, fontSize: 13, outline: 'none', background: '#fff' }}
        />
        <button
          onClick={() => setFilterSubject(null)}
          style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e2e8f0', background: !filterSubject ? '#1d4ed8' : '#fff', color: !filterSubject ? '#fff' : '#374151', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
        >
          Vše
        </button>
        {subjects.map(s => (
          <button key={s} onClick={() => setFilterSubject(filterSubject === s ? null : s)}
            style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${filterSubject === s ? SUBJECT_COLOR[s] : '#e2e8f0'}`, background: filterSubject === s ? SUBJECT_COLOR[s] : '#fff', color: filterSubject === s ? '#fff' : '#374151', fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>
            {s === 'přehled' ? 'Přehled' : s}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map(card => {
          const color = SUBJECT_COLOR[card.subject] ?? '#94a3b8'
          return (
            <button
              key={card.id}
              onClick={() => setSelected(card)}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.1s, box-shadow 0.1s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#cbd5e1'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none' }}
            >
              <span style={{ width: 4, height: 36, borderRadius: 2, background: color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 3 }}>{card.topic}</div>
                <div style={{ fontSize: 11.5, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {SUBJECT_LABEL[card.subject] ?? card.subject}  ·  {card.body.length} bodů
                </div>
              </div>
              <span style={{ fontSize: 16, color: '#cbd5e1', flexShrink: 0 }}>›</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8', fontSize: 14 }}>
          Nic nenalezeno — zkus jiný výraz nebo filtr.
        </div>
      )}
    </div>
  )
}
