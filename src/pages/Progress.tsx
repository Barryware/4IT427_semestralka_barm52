import { UCEBNICE } from '../data/ucebnice'
import { useProgress, ACHIEVEMENTS } from '../hooks/useProgress'
import type { MasteryLevel } from '../types'

const MASTERY_COLOR: Record<MasteryLevel, string> = {
  0: '#e2e8f0', 1: '#93c5fd', 2: '#a78bfa', 3: '#fcd34d', 4: '#6ee7b7', 5: '#4ade80',
}
const MASTERY_LABEL: Record<MasteryLevel, string> = {
  0: 'Nepřečteno', 1: 'Přečteno', 2: 'Poznávám', 3: 'Vysvětluji', 4: 'Oral-ready', 5: 'Zvládnuto',
}

function xpToLevel(xp: number): { level: number; label: string; nextXP: number } {
  const thresholds = [0, 100, 300, 600, 1000, 1600, 2400, 3500]
  const labels = ['Začátečník', 'Čtenář', 'Student', 'Znalec', 'Expert', 'Mistr', 'Šampion', 'Legenda']
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) {
      return { level: i + 1, label: labels[i], nextXP: thresholds[i + 1] ?? thresholds[i] }
    }
  }
  return { level: 1, label: labels[0], nextXP: thresholds[1] }
}

export default function Progress() {
  const { progress, getMastery } = useProgress()
  const { level, label, nextXP } = xpToLevel(progress.totalXP)
  const levelPct = nextXP > 0 ? Math.min(100, Math.round((progress.totalXP / nextXP) * 100)) : 100

  const allItems = UCEBNICE.flatMap(g => g.okruhy.flatMap(o => o.items))
  const masteryDist = [0, 1, 2, 3, 4, 5].map(l => ({
    level: l as MasteryLevel,
    count: allItems.filter(i => getMastery(i.id) === l).length,
  }))

  return (
    <div className="page">
      <div className="page-title">Progress</div>

      {/* XP & Level */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px', marginBottom: 28, display: 'flex', gap: 32, alignItems: 'center' }}>
        <div style={{ textAlign: 'center', minWidth: 80 }}>
          <div style={{ fontSize: 42, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1 }}>{level}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>Úroveň</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{label}</span>
            <span style={{ fontSize: 13, color: '#64748b' }}>{progress.totalXP} / {nextXP} XP</span>
          </div>
          <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${levelPct}%`, background: 'linear-gradient(90deg, #1d4ed8, #7c3aed)', borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>{nextXP - progress.totalXP} XP do další úrovně</div>
        </div>
      </div>

      {/* Mastery distribution */}
      <div className="section-label">Distribuce mastery — {allItems.length} témat celkem</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 28 }}>
        {masteryDist.map(({ level: l, count }) => {
          const pct = allItems.length > 0 ? Math.round((count / allItems.length) * 100) : 0
          return (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 100, fontSize: 11, fontWeight: 600, color: '#475569', flexShrink: 0 }}>{MASTERY_LABEL[l]}</div>
              <div style={{ flex: 1, height: 12, background: '#f1f5f9', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: MASTERY_COLOR[l], borderRadius: 6, transition: 'width 0.4s', minWidth: count > 0 ? 8 : 0 }} />
              </div>
              <div style={{ width: 48, fontSize: 12, color: '#64748b', textAlign: 'right', flexShrink: 0 }}>{count} <span style={{ color: '#94a3b8' }}>({pct}%)</span></div>
            </div>
          )
        })}
      </div>

      {/* Per-module breakdown */}
      <div className="section-label">Moduly</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
        {UCEBNICE.map(group => {
          const items = group.okruhy.flatMap(o => o.items)
          const read = items.filter(i => getMastery(i.id) >= 1).length
          const explainable = items.filter(i => getMastery(i.id) >= 3).length
          const mastered = items.filter(i => getMastery(i.id) >= 5).length
          const readPct = items.length > 0 ? Math.round((read / items.length) * 100) : 0
          return (
            <div key={group.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '14px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>{group.title}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: '#f0f9ff', color: '#0369a1' }}>{read} přečteno</span>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: '#fef3c7', color: '#d97706' }}>{explainable} vysvětluji</span>
                  {mastered > 0 && <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: '#f0fdf4', color: '#15803d' }}>{mastered} zvládnuto</span>}
                </div>
              </div>
              <div style={{ height: 4, background: '#f1f5f9', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${readPct}%`, background: readPct >= 80 ? '#16a34a' : readPct >= 40 ? '#f59e0b' : '#3b82f6', borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 5 }}>{read} / {items.length} témat přečteno ({readPct}%)</div>
            </div>
          )
        })}
      </div>

      {/* Achievements */}
      <div className="section-label">Achievementy — {progress.achievements.length} / {ACHIEVEMENTS.length}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
        {ACHIEVEMENTS.map(a => {
          const unlocked = progress.achievements.includes(a.id)
          return (
            <div key={a.id} style={{ padding: '12px 14px', background: unlocked ? '#f0fdf4' : '#f8fafc', border: `1px solid ${unlocked ? '#bbf7d0' : '#e2e8f0'}`, borderRadius: 8, opacity: unlocked ? 1 : 0.5 }}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>{unlocked ? '★' : '☆'}</div>
              <div style={{ fontWeight: 600, fontSize: 12.5, color: unlocked ? '#15803d' : '#475569', marginBottom: 3 }}>{a.label}</div>
              <div style={{ fontSize: 11.5, color: '#64748b' }}>{a.desc}</div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
