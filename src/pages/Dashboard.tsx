import { useState } from 'react'
import { EXAM_DATE, SUBJECTS, NAV_SECTIONS } from '../data'
import { UCEBNICE } from '../data/ucebnice'
import { KILLER_QUESTIONS } from '../data/gamifikace-data'
import { HISTORICAL_SIGNAL_QUESTIONS } from '../data/historicke-komise-data'
import { SHRNUTI } from '../data/shrnuti-data'
import { WIKI } from '../data/wiki'
import { useProgress } from '../hooks/useProgress'
import type { SectionId } from '../types'

interface Props {
  onNavigate: (section: SectionId, subjectId?: string) => void
}

const DAILY_PLAN_KEY = 'dashboard-daily-plan-v1'
const FINAL_PASS_KEY = 'dashboard-final-pass-v1'

type DailyPlanItem = {
  id: string
  label: string
  desc: string
  section: SectionId
  xp: number
  tone: 'blue' | 'orange' | 'green' | 'red'
}

type QuickSearchResult = {
  id: string
  title: string
  detail: string
  source: string
  section: SectionId
  subjectId?: string
  tone: DailyPlanItem['tone']
  haystack: string
}

type FinalPassItem = DailyPlanItem & {
  subjectId?: string
}

const DAILY_PLAN: DailyPlanItem[] = [
  { id: 'sos', label: 'SOS komise', desc: '2 krizové situace: okno, přerušení nebo moc obecná odpověď.', section: 'trener', xp: 8, tone: 'red' },
  { id: 'smutny', label: 'Smutný pressure', desc: 'Aspoň 3 karty ze Smutný na chleba.', section: 'trener', xp: 10, tone: 'orange' },
  { id: 'last24', label: 'Posledních 24 hodin', desc: 'Jeden průchod napříč předměty nebo jen co nevím.', section: 'trener', xp: 12, tone: 'blue' },
  { id: 'ucebnice', label: 'Učebnice bloky', desc: 'Zapsat 3 bloky s kontrolní otázkou.', section: 'ucebnice', xp: 8, tone: 'green' },
  { id: 'predmety', label: 'Předmět nahlas', desc: 'Otevřít jeden předmět a odškrtnout otázku předmětu.', section: 'predmety', xp: 8, tone: 'blue' },
]

const FINAL_PASS: FinalPassItem[] = [
  { id: 'predmety-all', label: '1. Předměty zleva doprava', desc: 'Otevři každý předmět a u každého řekni jednu kontrolní odpověď nahlas.', section: 'predmety', xp: 10, tone: 'blue' },
  { id: 'rpi-anchor', label: '2. Řízení podnikové informatiky', desc: 'Kotva: 4SA310. Governance, COBIT, ITIL/ITSM/SLA, metriky, audit a vazba na praxi.', section: 'predmety', subjectId: '4SA310', xp: 10, tone: 'orange' },
  { id: 'ucebnice-linear', label: '3. Učebnice lineárně', desc: 'Projdi bloky v pořadí a odškrtni jen ty, kde zvládneš otázku po bloku.', section: 'ucebnice', xp: 10, tone: 'green' },
  { id: 'shrnuti-gotchas', label: '4. Shrnutí a háčky', desc: 'Projdi gotcha/contrast věty: tady se nejrychleji chytají nepřesnosti.', section: 'shrnuti', xp: 8, tone: 'blue' },
  { id: 'last24-spectrum', label: '5. Posledních 24 hodin', desc: 'Dej jeden průchod napříč spektrem. Co nejde, appka hází do slabin.', section: 'trener', xp: 12, tone: 'red' },
  { id: 'sos-oral', label: '6. SOS komise', desc: 'Natrénuj první větu, záchrannou větu a návrat k otázce, když přijde okno.', section: 'trener', xp: 8, tone: 'red' },
  { id: 'smutny-pressure', label: '7. Tlakový blok', desc: 'Tlakový blok: sociotechnika, metodologie, governance a vazba na praxi.', section: 'trener', xp: 12, tone: 'orange' },
  { id: 'komise-diplomka', label: '8. Komise + praxe mosty', desc: 'Otevři profily komise a řekni 3 jisté mosty z praxe do státnic.', section: 'komise', xp: 10, tone: 'green' },
  { id: 'rpi-4it418-anchor', label: '9. 4IT418 Řízení podnikové informatiky', desc: 'IT strategie, CIO, ITSM/SLA, COBIT, EA/cloud, GDPR, NIS2/ZoKB, TCO/CBA/NPV/IRR, BCM/DRP.', section: 'predmety', subjectId: '4IT418', xp: 10, tone: 'orange' },
]

function localDateKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function loadDailyPlan(dateKey: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(DAILY_PLAN_KEY)
    const data = raw ? JSON.parse(raw) : {}
    return data[dateKey] ?? {}
  } catch {}
  return {}
}

function saveDailyPlan(dateKey: string, done: Record<string, boolean>) {
  try {
    const raw = localStorage.getItem(DAILY_PLAN_KEY)
    const data = raw ? JSON.parse(raw) : {}
    localStorage.setItem(DAILY_PLAN_KEY, JSON.stringify({ ...data, [dateKey]: done }))
  } catch {}
}

function loadFinalPass(dateKey: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(FINAL_PASS_KEY)
    const data = raw ? JSON.parse(raw) : {}
    return data[dateKey] ?? {}
  } catch {}
  return {}
}

function saveFinalPass(dateKey: string, done: Record<string, boolean>) {
  try {
    const raw = localStorage.getItem(FINAL_PASS_KEY)
    const data = raw ? JSON.parse(raw) : {}
    localStorage.setItem(FINAL_PASS_KEY, JSON.stringify({ ...data, [dateKey]: done }))
  } catch {}
}

const TONE_STYLE: Record<DailyPlanItem['tone'], { bg: string; border: string; color: string }> = {
  blue: { bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8' },
  orange: { bg: '#fff7ed', border: '#fed7aa', color: '#c2410c' },
  green: { bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a' },
  red: { bg: '#fef2f2', border: '#fecaca', color: '#ef4444' },
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
}

function normalizeSearch(text: string): string {
  return stripHtml(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function searchText(...parts: Array<string | undefined>): string {
  return normalizeSearch(parts.filter(Boolean).join(' '))
}

const QUICK_SEARCH_INDEX: QuickSearchResult[] = [
  ...UCEBNICE.flatMap(group => group.okruhy.flatMap(okruh => okruh.items.map(item => ({
    id: `ucebnice-${group.id}-${okruh.id}-${item.id}`,
    title: item.title,
    detail: `${group.title} / ${okruh.title}`,
    source: 'Učebnice',
    section: 'ucebnice' as SectionId,
    tone: 'green' as const,
    haystack: searchText(item.title, group.title, okruh.title, item.content),
  })))),
  ...SHRNUTI.map(card => ({
    id: `shrnuti-${card.id}`,
    title: card.topic,
    detail: `${card.subject} · ${card.gotcha}`,
    source: 'Shrnutí',
    section: 'shrnuti' as SectionId,
    tone: 'blue' as const,
    haystack: searchText(card.topic, card.subject, card.open, card.body.join(' '), card.gotcha, card.contrast),
  })),
  ...WIKI.map(entry => ({
    id: `wiki-${entry.id}`,
    title: entry.title,
    detail: `${entry.area} · ${entry.subjects.join(', ')}`,
    source: 'Wiki',
    section: 'wiki' as SectionId,
    tone: 'blue' as const,
    haystack: searchText(entry.title, entry.area, entry.subjects.join(' '), entry.body),
  })),
  ...KILLER_QUESTIONS.map(q => ({
    id: `killer-${q.id}`,
    title: q.title,
    detail: `${q.subject} · ${q.q}`,
    source: 'Killer otázka',
    section: 'trener' as SectionId,
    tone: 'red' as const,
    haystack: searchText(q.title, q.subject, q.q, q.modelAnswer, q.followUp, q.hook),
  })),
  ...HISTORICAL_SIGNAL_QUESTIONS.map(q => ({
    id: `historie-${q.id}`,
    title: q.topic,
    detail: `${q.examiner} · ${q.question}`,
    source: 'Komise',
    section: 'trener' as SectionId,
    tone: q.examiner === 'Smutný' ? 'orange' as const : 'red' as const,
    haystack: searchText(q.topic, q.examiner, q.question, q.pattern, q.modelAnswer, q.practicalBridge, q.syllabusLink),
  })),
  ...SUBJECTS.map(subject => ({
    id: `predmet-${subject.id}`,
    title: subject.label,
    detail: subject.id,
    source: 'Předmět',
    section: 'predmety' as SectionId,
    subjectId: subject.id,
    tone: 'green' as const,
    haystack: searchText(subject.id, subject.label),
  })),
]

export default function Dashboard({ onNavigate }: Props) {
  const { progress, getMastery, addXP } = useProgress()
  const dateKey = localDateKey()
  const [dailyDone, setDailyDone] = useState<Record<string, boolean>>(() => loadDailyPlan(dateKey))
  const [finalPassDone, setFinalPassDone] = useState<Record<string, boolean>>(() => loadFinalPass(dateKey))
  const [quickSearch, setQuickSearch] = useState('')

  const now = new Date()
  const diff = EXAM_DATE.getTime() - now.getTime()
  const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))

  const allItems = UCEBNICE.flatMap(g => g.okruhy.flatMap(o => o.items))
  const totalTopics = allItems.length
  const readTopics = allItems.filter(i => getMastery(i.id) >= 1).length
  const explainableTopics = allItems.filter(i => getMastery(i.id) >= 3).length

  const weakTopics = allItems
    .filter(i => getMastery(i.id) === 0)
    .slice(0, 5)
  const dailyDoneCount = DAILY_PLAN.filter(item => dailyDone[item.id]).length
  const dailyXP = DAILY_PLAN.filter(item => dailyDone[item.id]).reduce((sum, item) => sum + item.xp, 0)
  const finalPassDoneCount = FINAL_PASS.filter(item => finalPassDone[item.id]).length
  const finalPassXP = FINAL_PASS.filter(item => finalPassDone[item.id]).reduce((sum, item) => sum + item.xp, 0)
  const searchTerms = normalizeSearch(quickSearch).split(/\s+/).filter(Boolean)
  const searchResults = searchTerms.length
    ? QUICK_SEARCH_INDEX
        .filter(result => searchTerms.every(term => result.haystack.includes(term)))
        .slice(0, 8)
    : []

  function markDailyDone(item: DailyPlanItem) {
    if (dailyDone[item.id]) return
    const next = { ...dailyDone, [item.id]: true }
    setDailyDone(next)
    saveDailyPlan(dateKey, next)
    addXP(item.xp)
  }

  function markFinalPassDone(item: FinalPassItem) {
    if (finalPassDone[item.id]) return
    const next = { ...finalPassDone, [item.id]: true }
    setFinalPassDone(next)
    saveFinalPass(dateKey, next)
    addXP(item.xp)
  }

  function openSearchResult(result: QuickSearchResult) {
    onNavigate(result.section, result.subjectId)
  }

  return (
    <div className="page">
      {/* Countdown */}
      <div className="countdown">
        <div>
          <div className="countdown-label">Státní závěrečná zkouška · 3. června 2026</div>
          <div className="countdown-number">{daysLeft}</div>
          <div className="countdown-sub">{daysLeft === 1 ? 'den zbývá' : daysLeft < 5 ? 'dny zbývají' : 'dní zbývá'}</div>
        </div>
        <div className="countdown-right">
          <div className="countdown-right-label">Komise</div>
          <div className="countdown-right-names">doc. Smutný<br />doc. Sedláček<br />doc. Sigmund</div>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Celkem XP', value: progress.totalXP },
          { label: 'Přečteno', value: `${readTopics} / ${totalTopics}` },
          { label: 'Vysvětluji', value: explainableTopics },
          { label: 'Achievementy', value: `${progress.achievements.length} / 9` },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'18px 20px', marginBottom:32 }}>
        <div style={{ display:'flex', justifyContent:'space-between', gap:14, alignItems:'flex-start', marginBottom:14 }}>
          <div>
            <div className="section-label" style={{ marginBottom:6 }}>Co teď</div>
            <div style={{ fontSize:15, fontWeight:800, color:'#0f172a', marginBottom:4 }}>Denní tah na zkoušku</div>
            <div style={{ fontSize:12.5, color:'#64748b', lineHeight:1.5 }}>Otevři appku, projeď tyhle kroky, odškrtni hotovo. Zítra se checklist resetuje.</div>
          </div>
          <div style={{ textAlign:'right', flexShrink:0 }}>
            <div style={{ fontSize:22, fontWeight:900, color:'#0f172a' }}>{dailyDoneCount}/{DAILY_PLAN.length}</div>
            <div style={{ fontSize:11.5, color:'#16a34a', fontWeight:800 }}>+{dailyXP} XP dnes</div>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {DAILY_PLAN.map(item => {
            const done = !!dailyDone[item.id]
            const tone = TONE_STYLE[item.tone]
            return (
              <div key={item.id} style={{ display:'flex', gap:10, alignItems:'center', justifyContent:'space-between', border:`1px solid ${done ? '#bbf7d0' : '#e2e8f0'}`, borderRadius:9, background:done ? '#fbfefc' : '#fff', padding:'10px 12px' }}>
                <div style={{ minWidth:0 }}>
                  <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', marginBottom:3 }}>
                    <span style={{ fontSize:10, fontWeight:900, color:tone.color, background:tone.bg, border:`1px solid ${tone.border}`, borderRadius:20, padding:'2px 7px' }}>{done ? 'hotovo' : `+${item.xp} XP`}</span>
                    <span style={{ fontSize:13, fontWeight:800, color:'#0f172a' }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize:12, color:'#64748b', lineHeight:1.4 }}>{item.desc}</div>
                </div>
                <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                  <button onClick={() => onNavigate(item.section)} style={{ padding:'7px 10px', border:'1px solid #bfdbfe', borderRadius:7, background:'#eff6ff', color:'#1d4ed8', fontSize:12, fontWeight:800, cursor:'pointer' }}>Otevřít</button>
                  <button onClick={() => markDailyDone(item)} disabled={done} style={{ padding:'7px 10px', border:`1px solid ${done ? '#e2e8f0' : '#bbf7d0'}`, borderRadius:7, background:done ? '#f8fafc' : '#f0fdf4', color:done ? '#64748b' : '#16a34a', fontSize:12, fontWeight:800, cursor:done ? 'default' : 'pointer' }}>{done ? 'Odškrtnuto' : 'Hotovo'}</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'18px 20px', marginBottom:32 }}>
        <div style={{ display:'flex', justifyContent:'space-between', gap:14, alignItems:'flex-start', marginBottom:14 }}>
          <div>
            <div className="section-label" style={{ marginBottom:6 }}>Zítra státnice</div>
            <div style={{ fontSize:15, fontWeight:800, color:'#0f172a', marginBottom:4 }}>Jednou celé projít</div>
            <div style={{ fontSize:12.5, color:'#64748b', lineHeight:1.5 }}>Finální průchod bez vymýšlení pořadí. Otevři, řekni odpověď nahlas, odškrtni.</div>
          </div>
          <div style={{ textAlign:'right', flexShrink:0 }}>
            <div style={{ fontSize:22, fontWeight:900, color:'#0f172a' }}>{finalPassDoneCount}/{FINAL_PASS.length}</div>
            <div style={{ fontSize:11.5, color:'#16a34a', fontWeight:800 }}>+{finalPassXP} XP průchod</div>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {FINAL_PASS.map(item => {
            const done = !!finalPassDone[item.id]
            const tone = TONE_STYLE[item.tone]
            return (
              <div key={item.id} style={{ display:'flex', gap:10, alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', border:`1px solid ${done ? '#bbf7d0' : '#e2e8f0'}`, borderRadius:9, background:done ? '#fbfefc' : '#fff', padding:'10px 12px' }}>
                <div style={{ minWidth:220, flex:'1 1 320px' }}>
                  <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', marginBottom:3 }}>
                    <span style={{ fontSize:10, fontWeight:900, color:tone.color, background:tone.bg, border:`1px solid ${tone.border}`, borderRadius:20, padding:'2px 7px' }}>{done ? 'hotovo' : `+${item.xp} XP`}</span>
                    <span style={{ fontSize:13, fontWeight:800, color:'#0f172a' }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize:12, color:'#64748b', lineHeight:1.4 }}>{item.desc}</div>
                </div>
                <div style={{ display:'flex', gap:6, flex:'0 0 auto' }}>
                  <button onClick={() => onNavigate(item.section, item.subjectId)} style={{ padding:'7px 10px', border:'1px solid #bfdbfe', borderRadius:7, background:'#eff6ff', color:'#1d4ed8', fontSize:12, fontWeight:800, cursor:'pointer' }}>Otevřít</button>
                  <button onClick={() => markFinalPassDone(item)} disabled={done} style={{ padding:'7px 10px', border:`1px solid ${done ? '#e2e8f0' : '#bbf7d0'}`, borderRadius:7, background:done ? '#f8fafc' : '#f0fdf4', color:done ? '#64748b' : '#16a34a', fontSize:12, fontWeight:800, cursor:done ? 'default' : 'pointer' }}>{done ? 'Odškrtnuto' : 'Hotovo'}</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'18px 20px', marginBottom:32 }}>
        <div style={{ display:'flex', justifyContent:'space-between', gap:14, alignItems:'flex-start', marginBottom:12 }}>
          <div>
            <div className="section-label" style={{ marginBottom:6 }}>Rychlé hledání</div>
            <div style={{ fontSize:15, fontWeight:800, color:'#0f172a', marginBottom:4 }}>Najdi pojem napříč appkou</div>
            <div style={{ fontSize:12.5, color:'#64748b', lineHeight:1.5 }}>Hledá v učebnici, wiki, shrnutí, předmětech, killer otázkách a komisních signálech.</div>
          </div>
          <span style={{ fontSize:11.5, color:'#64748b', fontWeight:800, background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:20, padding:'4px 9px', flexShrink:0 }}>
            {QUICK_SEARCH_INDEX.length} položek
          </span>
        </div>
        <input
          value={quickSearch}
          onChange={e => setQuickSearch(e.target.value)}
          placeholder="Zkus: Smutný, DSR, COBIT, SoD, FOR cyklus, paradox produktivity..."
          style={{ width:'100%', border:'1px solid #cbd5e1', borderRadius:9, padding:'10px 12px', font:'inherit', fontSize:13.5, color:'#0f172a', marginBottom: searchTerms.length ? 12 : 0 }}
        />
        {searchTerms.length > 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
            {searchResults.length > 0 ? searchResults.map(result => {
              const tone = TONE_STYLE[result.tone]
              return (
                <button key={result.id} onClick={() => openSearchResult(result)}
                  style={{ display:'flex', justifyContent:'space-between', gap:12, alignItems:'center', border:'1px solid #e2e8f0', borderRadius:9, background:'#fff', padding:'10px 12px', textAlign:'left', cursor:'pointer' }}>
                  <div style={{ minWidth:0 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', marginBottom:4 }}>
                      <span style={{ fontSize:10, fontWeight:900, color:tone.color, background:tone.bg, border:`1px solid ${tone.border}`, borderRadius:20, padding:'2px 7px' }}>{result.source}</span>
                      <span style={{ fontSize:13, fontWeight:800, color:'#0f172a' }}>{result.title}</span>
                    </div>
                    <div style={{ fontSize:12, color:'#64748b', lineHeight:1.4, overflow:'hidden', textOverflow:'ellipsis', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{result.detail}</div>
                  </div>
                  <span style={{ fontSize:12, color:'#1d4ed8', fontWeight:800, flexShrink:0 }}>Otevřít</span>
                </button>
              )
            }) : (
              <div style={{ padding:'12px 14px', border:'1px solid #fde68a', borderRadius:9, background:'#fffbeb', color:'#92400e', fontSize:12.5, fontWeight:700 }}>
                Nic přesného. Zkus kratší pojem nebo zkratku: COBIT, ITIL, DSR, ERP, audit, Smutný.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="two-col">
        <div>
          {/* Mastery per module */}
          <div className="section-label">Zvládnutost modulů</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
            {UCEBNICE.map(group => {
              const items = group.okruhy.flatMap(o => o.items)
              const read = items.filter(i => getMastery(i.id) >= 1).length
              const pct = items.length > 0 ? Math.round((read / items.length) * 100) : 0
              return (
                <div key={group.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '11px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: '#0f172a' }}>{group.title}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{read}/{items.length}</div>
                  </div>
                  <div style={{ height: 3, background: '#f1f5f9', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: pct >= 80 ? '#16a34a' : pct >= 40 ? '#f59e0b' : '#1d4ed8', borderRadius: 2, transition: 'width 0.4s' }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Slabiny — nepřečtená témata */}
          {weakTopics.length > 0 && (
            <>
              <div className="section-label">Nepřečtené — začít tady</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {weakTopics.map(item => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate('ucebnice')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#fff', border: '1px solid #fde68a', borderRadius: 7, cursor: 'pointer', textAlign: 'left' }}
                  >
                    <span style={{ fontSize: 12.5, color: '#0f172a' }}>{item.title}</span>
                    <span style={{ fontSize: 10, color: '#d97706', fontWeight: 600, background: '#fef3c7', padding: '2px 6px', borderRadius: 3 }}>nepřečteno</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          {/* Předměty */}
          <div className="section-label">Předměty — {SUBJECTS.length} z {SUBJECTS.length}</div>
          <div className="subject-list" style={{ marginBottom: 24 }}>
            {SUBJECTS.map(s => (
              <button
                key={s.id}
                className="subject-row clickable"
                onClick={() => onNavigate('predmety', s.id)}
              >
                <div>
                  <div className="subject-name">{s.label}</div>
                  <div className="subject-code">{s.id}</div>
                </div>
                <span className="subject-status-ready">✓</span>
              </button>
            ))}
          </div>

          {/* Quick nav */}
          <div className="section-label">Sekce</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {NAV_SECTIONS.filter(s => s.id !== 'dashboard').map(s => (
              <button
                key={s.id}
                className="section-card"
                onClick={() => onNavigate(s.id)}
              >
                <span style={{ marginRight: 8 }}>{s.icon}</span>
                <div className="section-card-label">{s.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
