import { useState, useMemo, useCallback } from 'react'
import { WIKI, WIKI_BY_ID, WIKI_AREAS, WIKI_SUBJECTS } from '../data/wiki'
import type { WikiEntry } from '../data/wiki'

export default function Wiki() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null)
  const [areaFilter, setAreaFilter] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])

  const navigate = useCallback((id: string) => {
    setHistory(h => activeId ? [...h, activeId] : h)
    setActiveId(id)
    window.scrollTo(0, 0)
  }, [activeId])

  const goBack = useCallback(() => {
    if (history.length > 0) {
      const prev = history[history.length - 1]
      setHistory(h => h.slice(0, -1))
      setActiveId(prev)
    } else {
      setActiveId(null)
    }
    window.scrollTo(0, 0)
  }, [history])

  const goIndex = useCallback(() => {
    setActiveId(null)
    setHistory([])
    window.scrollTo(0, 0)
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return WIKI.filter(e => {
      if (subjectFilter && !e.subjects.includes(subjectFilter)) return false
      if (areaFilter && e.area !== areaFilter) return false
      if (q) return e.title.toLowerCase().includes(q) || e.body.toLowerCase().includes(q)
      return true
    }).sort((a, b) => a.title.localeCompare(b.title, 'cs'))
  }, [search, subjectFilter, areaFilter])

  const grouped = useMemo(() => {
    const map = new Map<string, WikiEntry[]>()
    for (const e of filtered) {
      const letter = e.title[0].toUpperCase()
      if (!map.has(letter)) map.set(letter, [])
      map.get(letter)!.push(e)
    }
    return map
  }, [filtered])

  if (activeId) {
    const entry = WIKI_BY_ID[activeId]
    if (!entry) return null
    return <EntryView entry={entry} navigate={navigate} goBack={goBack} goIndex={goIndex} />
  }

  const hasFilter = !!(search || subjectFilter || areaFilter)

  return (
    <div className="page">
      <div className="page-title">Wiki</div>
      <div className="page-subtitle">Pojmový slovník napříč předměty a sylabem státnice.</div>

      {/* Search */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Hledat pojem…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, color: '#0f172a', outline: 'none', background: '#fff', fontFamily: 'inherit' }}
        />
        {hasFilter && (
          <button
            onClick={() => { setSearch(''); setSubjectFilter(null); setAreaFilter(null) }}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 13, color: '#64748b', whiteSpace: 'nowrap' }}
          >
            Zrušit filtry
          </button>
        )}
      </div>

      {/* Subject filter chips */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 7, flexWrap: 'wrap' }}>
        {WIKI_SUBJECTS.map(s => (
          <button
            key={s}
            onClick={() => setSubjectFilter(f => f === s ? null : s)}
            style={{
              padding: '3px 9px', border: `1px solid ${subjectFilter === s ? '#1d4ed8' : '#e2e8f0'}`,
              borderRadius: 20, fontSize: 11, fontWeight: subjectFilter === s ? 700 : 400,
              background: subjectFilter === s ? '#eff6ff' : '#fff',
              color: subjectFilter === s ? '#1d4ed8' : '#64748b', cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Area filter chips */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 24, flexWrap: 'wrap' }}>
        {WIKI_AREAS.map(a => (
          <button
            key={a}
            onClick={() => setAreaFilter(f => f === a ? null : a)}
            style={{
              padding: '3px 9px', border: `1px solid ${areaFilter === a ? '#0369a1' : '#e2e8f0'}`,
              borderRadius: 20, fontSize: 11, fontWeight: areaFilter === a ? 700 : 400,
              background: areaFilter === a ? '#f0f9ff' : '#fff',
              color: areaFilter === a ? '#0369a1' : '#64748b', cursor: 'pointer',
            }}
          >
            {a}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ fontSize: 11.5, color: '#94a3b8', marginBottom: 18 }}>
        {filtered.length} {filtered.length === 1 ? 'heslo' : filtered.length < 5 ? 'hesla' : 'hesel'}
      </div>

      {/* A-Z index */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8', fontSize: 14 }}>
          Žádné heslo neodpovídá hledání.
        </div>
      ) : (
        Array.from(grouped.entries()).map(([letter, entries]) => (
          <div key={letter} style={{ marginBottom: 22 }}>
            <div style={{
              fontSize: 10.5, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#1d4ed8', padding: '0 0 6px', borderBottom: '2px solid #eff6ff', marginBottom: 4,
            }}>
              {letter}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {entries.map(e => (
                <button
                  key={e.id}
                  onClick={() => navigate(e.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '7px 8px',
                    background: 'none', border: 'none', borderRadius: 6, cursor: 'pointer',
                    textAlign: 'left', transition: 'background 0.08s',
                  }}
                  onMouseEnter={el => (el.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={el => (el.currentTarget.style.background = 'none')}
                >
                  <span style={{ fontSize: 13.5, color: '#1d4ed8', fontWeight: 500, flex: 1 }}>{e.title}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 3,
                    background: '#f1f5f9', color: '#64748b', whiteSpace: 'nowrap',
                  }}>
                    {e.area}
                  </span>
                  {e.subjects[0] && (
                    <span style={{
                      fontSize: 10, fontWeight: 500, padding: '2px 6px', borderRadius: 3,
                      background: '#eff6ff', color: '#3b82f6', whiteSpace: 'nowrap',
                    }}>
                      {e.subjects[0]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function EntryView({
  entry, navigate, goBack, goIndex,
}: {
  entry: WikiEntry
  navigate: (id: string) => void
  goBack: () => void
  goIndex: () => void
}) {
  // Build breadcrumb chain upwards
  const breadcrumb: WikiEntry[] = []
  let cur: WikiEntry | undefined = WIKI_BY_ID[entry.parentId ?? '']
  while (cur) {
    breadcrumb.unshift(cur)
    cur = WIKI_BY_ID[cur.parentId ?? '']
  }

  const children = WIKI.filter(e => e.parentId === entry.id)
    .sort((a, b) => a.title.localeCompare(b.title, 'cs'))

  const relatedEntries = entry.related
    .map(id => WIKI_BY_ID[id])
    .filter((e): e is WikiEntry => !!e)

  const handleBodyClick = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
    const a = (ev.target as HTMLElement).closest('a[href^="#"]')
    if (a) {
      ev.preventDefault()
      const id = a.getAttribute('href')?.slice(1)
      if (id && WIKI_BY_ID[id]) navigate(id)
    }
  }, [navigate])

  return (
    <div className="page">
      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <button
          onClick={goBack}
          style={{ fontSize: 13, color: '#64748b', background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }}
        >
          ← Zpět
        </button>
        <button
          onClick={goIndex}
          style={{ fontSize: 13, color: '#64748b', background: 'none', border: 'none', padding: '5px 4px', cursor: 'pointer' }}
        >
          Rejstřík
        </button>
      </div>

      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 10, fontSize: 12, color: '#94a3b8', flexWrap: 'wrap' }}>
          {breadcrumb.map((b, i) => (
            <span key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {i > 0 && <span style={{ color: '#cbd5e1' }}>›</span>}
              <button
                onClick={() => navigate(b.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#1d4ed8', padding: 0 }}
              >
                {b.title}
              </button>
            </span>
          ))}
          <span style={{ color: '#cbd5e1' }}>›</span>
          <span style={{ color: '#475569', fontWeight: 500 }}>{entry.title}</span>
        </div>
      )}

      {/* Title */}
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 10, lineHeight: 1.1 }}>
        {entry.title}
      </h1>

      {/* Badges */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 4, background: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd' }}>
          {entry.area}
        </span>
        {entry.subjects.map(s => (
          <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 4, background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }}>
            {s}
          </span>
        ))}
      </div>

      {/* Body */}
      <div
        className="wiki-body"
        dangerouslySetInnerHTML={{ __html: entry.body }}
        onClick={handleBodyClick}
      />

      {/* Relations panel */}
      {(entry.parentId || children.length > 0 || relatedEntries.length > 0) && (
        <div style={{ marginTop: 40, borderTop: '1px solid #f1f5f9', paddingTop: 28 }}>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {entry.parentId && WIKI_BY_ID[entry.parentId] && (
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>Nadřazené heslo</div>
                <button
                  onClick={() => navigate(entry.parentId!)}
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontSize: 13, color: '#1d4ed8', fontWeight: 500 }}
                >
                  ↑ {WIKI_BY_ID[entry.parentId!]?.title}
                </button>
              </div>
            )}

            {children.length > 0 && (
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>Součásti</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {children.map(c => (
                    <button
                      key={c.id}
                      onClick={() => navigate(c.id)}
                      style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontSize: 13, color: '#0f172a' }}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {relatedEntries.length > 0 && (
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>Příbuzná hesla</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {relatedEntries.map(r => (
                    <button
                      key={r.id}
                      onClick={() => navigate(r.id)}
                      style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontSize: 13, color: '#0f172a' }}
                    >
                      {r.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
