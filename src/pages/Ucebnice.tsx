import { useState } from 'react'
import { UCEBNICE } from '../data/ucebnice'
import type { L1Group, L2Okruh, L3Item } from '../data/ucebnice'
import { useProgress } from '../hooks/useProgress'

const READ_BLOCKS_KEY = 'ucebnice-read-blocks-v1'

type ContentBlock = {
  id: string
  title: string
  html: string
  question: string
}

type LinearItem = {
  groupId: string
  groupTitle: string
  okruhId: string
  okruhTitle: string
  itemId: string
  itemTitle: string
}

type View =
  | { type: 'overview' }
  | { type: 'okruh'; groupId: string; okruhId: string }
  | { type: 'item'; groupId: string; okruhId: string; itemId: string }

function findOkruh(groupId: string, okruhId: string): { group: L1Group; okruh: L2Okruh } | null {
  const group = UCEBNICE.find(g => g.id === groupId)
  if (!group) return null
  const okruh = group.okruhy.find(o => o.id === okruhId)
  if (!okruh) return null
  return { group, okruh }
}

function findItem(groupId: string, okruhId: string, itemId: string): { group: L1Group; okruh: L2Okruh; item: L3Item } | null {
  const found = findOkruh(groupId, okruhId)
  if (!found) return null
  const item = found.okruh.items.find(i => i.id === itemId)
  if (!item) return null
  return { ...found, item }
}

function loadReadBlocks(): Record<string, boolean> {
  try { const raw = localStorage.getItem(READ_BLOCKS_KEY); if (raw) return JSON.parse(raw) } catch {}
  return {}
}

function saveReadBlocks(blocks: Record<string, boolean>) {
  try { localStorage.setItem(READ_BLOCKS_KEY, JSON.stringify(blocks)) } catch {}
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
}

function makeBlockId(title: string, index: number): string {
  return `${index}-${stripHtml(title).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'blok'}`
}

function splitContentBlocks(content: string, itemTitle: string): ContentBlock[] {
  const headings = Array.from(content.matchAll(/<h([23])[^>]*>(.*?)<\/h\1>/gi))
  if (!headings.length) {
    return [{ id:'0-uvod', title:'Hlavní blok', html:content, question:`Vysvětli hlavní pointu tématu „${itemTitle}“ jednou větou.` }]
  }
  const blocks: ContentBlock[] = []
  const intro = content.slice(0, headings[0].index ?? 0).trim()
  if (intro) blocks.push({ id:'0-uvod', title:'Úvod', html:intro, question:`Co je hlavní definice nebo účel tématu „${itemTitle}“?` })
  headings.forEach((heading) => {
    const title = stripHtml(heading[2]) || `Blok ${blocks.length + 1}`
    const start = (heading.index ?? 0) + heading[0].length
    const next = headings.find(h => (h.index ?? 0) > (heading.index ?? 0))
    const end = next?.index ?? content.length
    const html = content.slice(start, end).trim()
    if (stripHtml(html).length > 0) {
      blocks.push({
        id: makeBlockId(title, blocks.length),
        title,
        html,
        question: `Umíš vysvětlit blok „${title}“ bez koukání a napojit ho na zkoušku?`,
      })
    }
  })
  return blocks
}

function blockStorageKey(groupId: string, okruhId: string, itemId: string, blockId: string): string {
  return `${groupId}/${okruhId}/${itemId}/${blockId}`
}

function transitionText(prev: ContentBlock, next: ContentBlock): string {
  return `Přechod: z bloku „${prev.title}“ si odnes pointu a navazuj na „${next.title}“. U komise to řekni jako plynulé pokračování, ne jako nový izolovaný seznam.`
}

function linearItems(): LinearItem[] {
  return UCEBNICE.flatMap(group => group.okruhy.flatMap(okruh => okruh.items.map(item => ({
    groupId: group.id,
    groupTitle: group.title,
    okruhId: okruh.id,
    okruhTitle: okruh.title,
    itemId: item.id,
    itemTitle: item.title,
  }))))
}

function itemViewFromLinear(item: LinearItem): View {
  return { type: 'item', groupId: item.groupId, okruhId: item.okruhId, itemId: item.itemId }
}

export default function Ucebnice() {
  const [view, setView] = useState<View>({ type: 'overview' })
  const [readBlocks, setReadBlocks] = useState<Record<string, boolean>>(loadReadBlocks)
  const { progress, addXP } = useProgress()

  const totalItems = UCEBNICE.flatMap(g => g.okruhy.flatMap(o => o.items)).length
  const doneItems = UCEBNICE.flatMap(g => g.okruhy.flatMap(o => o.items)).filter(i => i.content).length
  const allBlocks = UCEBNICE.flatMap(g => g.okruhy.flatMap(o => o.items.flatMap(i =>
    i.content ? splitContentBlocks(i.content, i.title).map(b => blockStorageKey(g.id, o.id, i.id, b.id)) : []
  )))
  const readCount = allBlocks.filter(k => readBlocks[k]).length

  function markRead(key: string) {
    if (readBlocks[key]) return
    const next = { ...readBlocks, [key]: true }
    setReadBlocks(next)
    saveReadBlocks(next)
    addXP(6)
  }

  if (view.type === 'item') {
    const found = findItem(view.groupId, view.okruhId, view.itemId)
    if (!found) return null
    const { group, okruh, item } = found
    const linear = linearItems()
    const idx = linear.findIndex(i => i.groupId === group.id && i.okruhId === okruh.id && i.itemId === item.id)
    const prev = linear[idx - 1]
    const next = linear[idx + 1]
    const blocks = item.content ? splitContentBlocks(item.content, item.title) : []
    const itemRead = blocks.filter(b => readBlocks[blockStorageKey(group.id, okruh.id, item.id, b.id)]).length

    return (
      <div className="uc-shell">
        <div className="uc-topbar">
          <button className="uc-back" onClick={() => setView({ type: 'okruh', groupId: view.groupId, okruhId: view.okruhId })}>
            ← {okruh.title}
          </button>
          <span className="uc-breadcrumb">{group.title}</span>
        </div>
        <div className="uc-content">
          <div className="uc-item-header">
            <div className="uc-item-okruh">{okruh.title}</div>
            <h1 className="uc-item-title">{item.title}</h1>
            {blocks.length > 0 && (
              <div className="uc-item-read-state">
                <span>{itemRead} / {blocks.length} bloků zapsáno</span>
                <span>{progress.totalXP} XP celkem</span>
              </div>
            )}
          </div>
          {item.content
            ? (
              <div className="uc-block-reader">
                {blocks.map((block, blockIdx) => {
                  const key = blockStorageKey(group.id, okruh.id, item.id, block.id)
                  const isRead = !!readBlocks[key]
                  return (
                    <div key={block.id}>
                      {blockIdx > 0 && <div className="uc-block-transition">{transitionText(blocks[blockIdx - 1], block)}</div>}
                      <section className={`uc-read-block${isRead ? ' read' : ''}`}>
                        <div className="uc-read-block-top">
                          <span>Blok {blockIdx + 1}</span>
                          <span className={`uc-read-block-status${isRead ? ' read' : ''}`}>{isRead ? '✓ zapsáno' : 'čeká'}</span>
                        </div>
                        <h2 className="uc-read-block-title">{block.title}</h2>
                        <div className="uc-item-body" dangerouslySetInnerHTML={{ __html: block.html }} />
                        <div className="uc-block-check">
                          <div>
                            <div className="uc-block-check-label">Kontrolní otázka</div>
                            <div className="uc-block-check-question">{block.question}</div>
                          </div>
                          <button className={`uc-block-check-btn${isRead ? ' read' : ''}`} onClick={() => markRead(key)} disabled={isRead}>
                            {isRead ? 'Odškrtnuto' : 'Vím, zapsat +6 XP'}
                          </button>
                        </div>
                      </section>
                    </div>
                  )
                })}
              </div>
            )
            : (
              <div className="uc-empty">
                <div className="uc-empty-icon">◦</div>
                <div className="uc-empty-text">Obsah se připravuje</div>
              </div>
            )
          }
          <div className="uc-item-nav">
            {prev
              ? (
                <button className="uc-item-nav-btn" onClick={() => setView(itemViewFromLinear(prev))}>
                  <span>← {prev.itemTitle}</span>
                  <span className="uc-item-nav-meta">{prev.groupTitle} / {prev.okruhTitle}</span>
                </button>
              )
              : <span />
            }
            {next
              ? <button className="uc-item-nav-btn uc-item-nav-next" onClick={() => setView(itemViewFromLinear(next))}>
                  <span>{next.itemTitle} →</span>
                  <span className="uc-item-nav-meta">{next.groupTitle} / {next.okruhTitle}</span>
                </button>
              : <span className="uc-item-nav-done">Konec učebnice</span>
            }
          </div>
        </div>
      </div>
    )
  }

  if (view.type === 'okruh') {
    const found = findOkruh(view.groupId, view.okruhId)
    if (!found) return null
    const { group, okruh } = found

    return (
      <div className="uc-shell">
        <div className="uc-topbar">
          <button className="uc-back" onClick={() => setView({ type: 'overview' })}>← Učebnice</button>
          <span className="uc-breadcrumb">{group.title}</span>
        </div>
        <div className="uc-content">
          <h1 className="uc-okruh-title">{okruh.title}</h1>
          <div className="uc-items-list">
            {okruh.items.map(item => {
              const blocks = item.content ? splitContentBlocks(item.content, item.title) : []
              const read = blocks.filter(b => readBlocks[blockStorageKey(group.id, okruh.id, item.id, b.id)]).length
              const itemDone = blocks.length > 0 && read === blocks.length
              return (
              <button
                key={item.id}
                className={`uc-item-row${itemDone ? ' done' : ''}`}
                onClick={() => setView({ type: 'item', groupId: view.groupId, okruhId: view.okruhId, itemId: item.id })}
              >
                <span className="uc-item-row-title">{item.title}</span>
                <span className={`uc-item-row-badge${itemDone ? ' done' : ''}`}>
                  {blocks.length ? `${read}/${blocks.length}` : '·'}
                </span>
              </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="uc-shell">
      <div className="uc-content">
        <div className="uc-overview-header">
          <h1 className="uc-overview-title">Učebnice</h1>
          <p className="uc-overview-sub">
            Lineární průchod všemi okruhy státní zkoušky. {doneItems} / {totalItems} témat zpracováno. Zapsáno {readCount} / {allBlocks.length} bloků čtení.
          </p>
          <div className="uc-progress-bar">
            <div className="uc-progress-fill" style={{ width: `${allBlocks.length ? (readCount / allBlocks.length) * 100 : 0}%` }} />
          </div>
        </div>

        {UCEBNICE.map(group => (
          <div key={group.id} className="uc-group">
            <div className="uc-group-title">{group.title}</div>
            <div className="uc-group-okruhy">
              {group.okruhy.map(okruh => {
                const okruhBlocks = okruh.items.flatMap(i => i.content ? splitContentBlocks(i.content, i.title).map(b => blockStorageKey(group.id, okruh.id, i.id, b.id)) : [])
                const done = okruhBlocks.filter(k => readBlocks[k]).length
                const total = okruh.items.length
                const totalBlocks = okruhBlocks.length
                return (
                  <button
                    key={okruh.id}
                    className="uc-okruh-card"
                    onClick={() => setView({ type: 'okruh', groupId: group.id, okruhId: okruh.id })}
                  >
                    <div className="uc-okruh-card-name">{okruh.title}</div>
                    <div className="uc-okruh-card-meta">
                      <span className="uc-okruh-card-count">{total} témat</span>
                      {totalBlocks > 0 && <span className="uc-okruh-card-done">{done} / {totalBlocks} bloků</span>}
                    </div>
                    <div className="uc-okruh-mini-bar">
                      <div className="uc-okruh-mini-fill" style={{ width: `${totalBlocks ? (done / totalBlocks) * 100 : 0}%` }} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
