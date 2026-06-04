import { useState, useEffect, useRef, useCallback } from 'react'
import { MAPS, OKRUH_MAPS, MAP_BY_ID, EDGE_CONFIG, AREA_COLOR } from '../data/maps'
import type { KnowledgeMap, MapNode, MapEdge } from '../data/maps'

// ─── Force simulation ─────────────────────────────────────────

interface SimNode {
  id: string
  x: number
  y: number
  vx: number
  vy: number
}

const W = 1060
const H = 720
const NODE_R = 22

function initSim(map: KnowledgeMap): SimNode[] {
  const n = map.nodes.length || 1
  const r  = Math.max(220, n * 17)
  const ry = Math.max(170, n * 13)
  return map.nodes.map((node, i) => {
    const angle = (2 * Math.PI * i) / n
    return {
      id: node.id,
      x: W / 2 + Math.cos(angle) * r  + (Math.random() - 0.5) * 50,
      y: H / 2 + Math.sin(angle) * ry + (Math.random() - 0.5) * 50,
      vx: 0, vy: 0,
    }
  })
}

function tickSim(nodes: SimNode[], edges: MapEdge[], nodeSet: Set<string>) {
  const REP = 9500
  const SPRING_K = 0.022
  const SPRING_L = 210
  const DAMP = 0.72
  const GRAV = 0.003

  const n = nodes.length
  const ax = new Float64Array(n)
  const ay = new Float64Array(n)
  const idx: Record<string, number> = {}
  nodes.forEach((nd, i) => { idx[nd.id] = i })

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = nodes[j].x - nodes[i].x || 0.01
      const dy = nodes[j].y - nodes[i].y || 0.01
      const d2 = dx * dx + dy * dy + 1
      const d = Math.sqrt(d2)
      const f = REP / d2
      ax[i] -= f * dx / d; ay[i] -= f * dy / d
      ax[j] += f * dx / d; ay[j] += f * dy / d
    }
  }

  for (const e of edges) {
    if (!nodeSet.has(e.source) || !nodeSet.has(e.target)) continue
    const si = idx[e.source]; const ti = idx[e.target]
    if (si === undefined || ti === undefined) continue
    const dx = nodes[ti].x - nodes[si].x
    const dy = nodes[ti].y - nodes[si].y
    const d = Math.sqrt(dx * dx + dy * dy) + 0.01
    const f = SPRING_K * (d - SPRING_L)
    ax[si] += f * dx / d; ay[si] += f * dy / d
    ax[ti] -= f * dx / d; ay[ti] -= f * dy / d
  }

  for (let i = 0; i < n; i++) {
    ax[i] -= GRAV * (nodes[i].x - W / 2)
    ay[i] -= GRAV * (nodes[i].y - H / 2)
    nodes[i].vx = (nodes[i].vx + ax[i]) * DAMP
    nodes[i].vy = (nodes[i].vy + ay[i]) * DAMP
    nodes[i].x = Math.max(NODE_R + 4, Math.min(W - NODE_R - 4, nodes[i].x + nodes[i].vx))
    nodes[i].y = Math.max(NODE_R + 4, Math.min(H - NODE_R - 4, nodes[i].y + nodes[i].vy))
  }
}

// ─── Edge rendering helpers ───────────────────────────────────

function edgePoints(sx: number, sy: number, tx: number, ty: number) {
  const dx = tx - sx; const dy = ty - sy
  const d = Math.sqrt(dx * dx + dy * dy) + 0.01
  const ox = (dx / d) * NODE_R
  const oy = (dy / d) * NODE_R
  return { x1: sx + ox, y1: sy + oy, x2: tx - ox, y2: ty - oy }
}

// ─── Component ───────────────────────────────────────────────

export default function Mapy() {
  const [activeMapId, setActiveMapId] = useState('it-governance-map')
  const [prevMapId, setPrevMapId] = useState<string | null>(null)
  const [renderNodes, setRenderNodes] = useState<SimNode[]>([])
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null)
  const [hoveredEdge, setHoveredEdge] = useState<MapEdge | null>(null)
  const [dragId, setDragId] = useState<string | null>(null)

  const simRef = useRef<SimNode[]>([])
  const rafRef = useRef<number | undefined>(undefined)
  const tickRef = useRef(0)
  const draggingRef = useRef(false)
  const mouseDownPos = useRef({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  const activeMap = MAP_BY_ID[activeMapId]
  const nodeSet = new Set(activeMap.nodes.map(n => n.id))
  const nodeById = Object.fromEntries(activeMap.nodes.map(n => [n.id, n]))

  const navigateTo = useCallback((mapId: string) => {
    if (!MAP_BY_ID[mapId] || MAP_BY_ID[mapId].nodes.length === 0) return
    setPrevMapId(activeMapId)
    setActiveMapId(mapId)
    setSelectedNode(null)
  }, [activeMapId])

  // Init + run simulation when map changes
  useEffect(() => {
    if (activeMap.nodes.length === 0) {
      setRenderNodes([])
      return
    }
    const initial = initSim(activeMap)
    simRef.current = initial
    setRenderNodes([...initial])
    tickRef.current = 0

    const run = () => {
      if (tickRef.current < 350 || draggingRef.current) {
        tickSim(simRef.current, activeMap.edges, nodeSet)
        tickRef.current++
        setRenderNodes([...simRef.current])
        rafRef.current = requestAnimationFrame(run)
      }
    }
    rafRef.current = requestAnimationFrame(run)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [activeMapId])

  const restartSim = useCallback(() => {
    if (tickRef.current >= 350) {
      tickRef.current = 0
      const run = () => {
        if (tickRef.current < 350 || draggingRef.current) {
          tickSim(simRef.current, activeMap.edges, nodeSet)
          tickRef.current++
          setRenderNodes([...simRef.current])
          rafRef.current = requestAnimationFrame(run)
        }
      }
      rafRef.current = requestAnimationFrame(run)
    }
  }, [activeMapId])

  const getSvgPos = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return { x: 0, y: 0 }
    const rect = svgRef.current.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (W / rect.width),
      y: (e.clientY - rect.top) * (H / rect.height),
    }
  }

  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    mouseDownPos.current = { x: e.clientX, y: e.clientY }
    setDragId(nodeId)
    draggingRef.current = false
    restartSim()
  }, [restartSim])

  const handleSvgMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragId) return
    const dx = e.clientX - mouseDownPos.current.x
    const dy = e.clientY - mouseDownPos.current.y
    if (Math.sqrt(dx * dx + dy * dy) > 5) draggingRef.current = true
    const { x, y } = getSvgPos(e)
    const nd = simRef.current.find(n => n.id === dragId)
    if (nd) { nd.x = x; nd.y = y; nd.vx = 0; nd.vy = 0 }
  }, [dragId])

  const handleSvgMouseUp = useCallback(() => {
    if (dragId) {
      const nd = simRef.current.find(n => n.id === dragId)
      if (nd) { nd.vx = 0; nd.vy = 0 }
      if (tickRef.current >= 350) tickRef.current = 310
    }
    setDragId(null)
    draggingRef.current = false
  }, [dragId])

  const handleNodeClick = useCallback((nodeId: string) => {
    if (draggingRef.current) return
    const node = nodeById[nodeId]
    if (!node) return
    if (node.crossMapId) {
      navigateTo(node.crossMapId)
    } else {
      setSelectedNode(prev => prev?.id === nodeId ? null : node)
    }
  }, [nodeById, navigateTo])

  // Edge connections for selected node side panel
  const nodeEdges = selectedNode
    ? activeMap.edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
    : []

  const simMap = Object.fromEntries(renderNodes.map(n => [n.id, n]))

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: '#f8fafc' }}>

      {/* ── Left: map list ── */}
      <div style={{
        width: 220, flexShrink: 0, borderRight: '1px solid #e2e8f0',
        background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 14px 10px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 2 }}>
            Mapy znalostí
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '4px 6px 6px' }}>
            Předměty
          </div>
          {MAPS.map(m => {
            const isActive = m.id === activeMapId
            return (
              <button
                key={m.id}
                onClick={() => { setPrevMapId(null); setActiveMapId(m.id); setSelectedNode(null) }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '6px 10px', borderRadius: 6, border: 'none',
                  background: isActive ? '#eff6ff' : 'none',
                  color: isActive ? '#1d4ed8' : '#374151',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 12.5, cursor: 'pointer', marginBottom: 1,
                }}
              >
                <span>{m.title}</span>
                {m.subjectId && (
                  <span style={{ display: 'block', fontSize: 10, color: isActive ? '#93c5fd' : '#9ca3af', marginTop: 1 }}>
                    {m.subjectId}
                  </span>
                )}
              </button>
            )
          })}

          <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '12px 6px 6px', borderTop: '1px solid #f1f5f9', marginTop: 8 }}>
            Okruhy
          </div>
          {OKRUH_MAPS.map(m => {
            const isActive = m.id === activeMapId
            return (
              <button
                key={m.id}
                onClick={() => { setPrevMapId(null); setActiveMapId(m.id); setSelectedNode(null) }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '5px 10px', borderRadius: 6, border: 'none',
                  background: isActive ? '#eff6ff' : 'none',
                  color: isActive ? '#1d4ed8' : '#374151',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 11.5, cursor: 'pointer', marginBottom: 1,
                }}
              >
                {m.title}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Center: graph ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

        {/* Header */}
        <div style={{
          padding: '10px 16px 8px', borderBottom: '1px solid #e2e8f0',
          background: '#fff', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          {prevMapId && (
            <button
              onClick={() => { setActiveMapId(prevMapId); setPrevMapId(null); setSelectedNode(null) }}
              style={{ fontSize: 12, color: '#64748b', background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}
            >
              ← Zpět
            </button>
          )}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em' }}>{activeMap.title}</div>
            <div style={{ fontSize: 11.5, color: '#64748b' }}>{activeMap.description}</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {Object.entries(EDGE_CONFIG).map(([type, cfg]) => (
              <span key={type} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: '#475569' }}>
                <span style={{
                  display: 'inline-block', width: 20, height: 2,
                  background: cfg.color,
                  borderTop: cfg.dash ? `2px dashed ${cfg.color}` : undefined,
                  borderBottom: 'none',
                  verticalAlign: 'middle',
                }} />
                {cfg.label}
              </span>
            ))}
          </div>
        </div>

        {/* Graph SVG */}
        {activeMap.nodes.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 14 }}>
            Tato mapa se připravuje.
          </div>
        ) : (
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              style={{ width: '100%', height: '100%', cursor: dragId ? 'grabbing' : 'default' }}
              onMouseMove={handleSvgMouseMove}
              onMouseUp={handleSvgMouseUp}
              onMouseLeave={handleSvgMouseUp}
            >
              <defs>
                {Object.entries(EDGE_CONFIG).map(([type, cfg]) => (
                  <marker
                    key={type}
                    id={`arrow-${type}`}
                    markerWidth="8" markerHeight="7"
                    refX="7" refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3.5, 0 7" fill={cfg.color} opacity="0.85" />
                  </marker>
                ))}
                <marker id="arrow-cross-map" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
                  <polygon points="0 0, 8 3.5, 0 7" fill="#94a3b8" opacity="0.85" />
                </marker>
              </defs>

              {/* Edges */}
              {activeMap.edges.map((edge, i) => {
                const s = simMap[edge.source]
                const t = simMap[edge.target]
                if (!s || !t) return null
                const cfg = EDGE_CONFIG[edge.type]
                const { x1, y1, x2, y2 } = edgePoints(s.x, s.y, t.x, t.y)
                const isHovered = hoveredEdge === edge
                const mx = (x1 + x2) / 2
                const my = (y1 + y2) / 2

                return (
                  <g key={i}>
                    {/* Hover hitbox */}
                    <line
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="transparent" strokeWidth={12}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHoveredEdge(edge)}
                      onMouseLeave={() => setHoveredEdge(null)}
                    />
                    {/* Visible line */}
                    <line
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={cfg.color}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      strokeDasharray={cfg.dash}
                      strokeOpacity={isHovered ? 1 : 0.55}
                      markerEnd={`url(#arrow-${edge.type})`}
                      style={{ pointerEvents: 'none' }}
                    />
                    {/* Edge label on hover */}
                    {isHovered && (
                      <g transform={`translate(${mx},${my})`}>
                        <rect
                          x={-46} y={-11} width={92} height={22}
                          rx={4} fill="#fff" stroke={cfg.color}
                          strokeWidth={1.2} opacity={0.97}
                        />
                        <text
                          textAnchor="middle" dominantBaseline="central"
                          fontSize={10.5} fill={cfg.color} fontWeight={600}
                          style={{ pointerEvents: 'none', userSelect: 'none' }}
                        >
                          {cfg.label}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}

              {/* Nodes */}
              {renderNodes.map(sn => {
                const node = nodeById[sn.id]
                if (!node) return null
                const isSelected = selectedNode?.id === node.id
                const isCross = !!node.crossMapId
                const color = isCross ? '#94a3b8' : (AREA_COLOR[node.area] || '#6366f1')

                return (
                  <g
                    key={node.id}
                    transform={`translate(${sn.x},${sn.y})`}
                    style={{ cursor: isCross ? 'alias' : 'pointer' }}
                    onMouseDown={e => handleNodeMouseDown(e, node.id)}
                    onClick={() => handleNodeClick(node.id)}
                  >
                    {/* Selection ring */}
                    {isSelected && (
                      <circle r={NODE_R + 6} fill="none" stroke={color} strokeWidth={2.5} opacity={0.35} />
                    )}
                    {/* Node circle */}
                    <circle
                      r={NODE_R}
                      fill={isCross ? '#f8fafc' : color}
                      stroke={color}
                      strokeWidth={isCross ? 2 : 1.5}
                      strokeDasharray={isCross ? '4 2' : undefined}
                      opacity={isCross ? 0.85 : 1}
                      filter={isSelected ? `drop-shadow(0 0 6px ${color}88)` : undefined}
                    />
                    {/* Cross-map icon */}
                    {isCross && (
                      <text textAnchor="middle" dominantBaseline="central" fontSize={13} fill={color} dy={-1} style={{ pointerEvents: 'none', userSelect: 'none' }}>
                        ↗
                      </text>
                    )}
                    {/* Area color dot for non-cross nodes */}
                    {!isCross && (
                      <circle r={5} fill="white" opacity={0.3} cy={-6} cx={0} style={{ pointerEvents: 'none' }} />
                    )}
                    {/* Label */}
                    <text
                      textAnchor="middle"
                      dy={NODE_R + 13}
                      fontSize={11}
                      fontWeight={600}
                      fill={isSelected ? color : '#1e293b'}
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {node.label.length > 18 ? node.label.slice(0, 16) + '…' : node.label}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Hovered edge note tooltip */}
            {hoveredEdge?.note && (
              <div style={{
                position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(15,23,42,0.85)', color: '#f1f5f9', fontSize: 12,
                padding: '6px 14px', borderRadius: 8, maxWidth: 440, textAlign: 'center',
                pointerEvents: 'none', backdropFilter: 'blur(4px)',
              }}>
                {hoveredEdge.note}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Right: node detail panel ── */}
      {selectedNode && (
        <div style={{
          width: 300, flexShrink: 0, borderLeft: '1px solid #e2e8f0',
          background: '#fff', overflow: 'auto', padding: '18px 16px',
        }}>
          {/* Close */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{
              fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
              background: `${AREA_COLOR[selectedNode.area] || '#6366f1'}18`,
              color: AREA_COLOR[selectedNode.area] || '#6366f1',
              border: `1px solid ${AREA_COLOR[selectedNode.area] || '#6366f1'}33`,
            }}>
              {selectedNode.area}
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#94a3b8', padding: 0, lineHeight: 1 }}
            >
              ×
            </button>
          </div>

          <div style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1.2 }}>
            {selectedNode.label}
          </div>

          <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>
            {selectedNode.description}
          </div>

          {/* Wiki link */}
          {selectedNode.wikiId && (
            <div style={{ marginBottom: 16 }}>
              <a
                href={`#wiki-${selectedNode.wikiId}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 12.5, color: '#1d4ed8', fontWeight: 600,
                  textDecoration: 'none', border: '1px solid #bfdbfe',
                  borderRadius: 6, padding: '5px 10px', background: '#eff6ff',
                }}
              >
                📖 Zobrazit ve Wiki
              </a>
            </div>
          )}

          {/* Relationships */}
          {nodeEdges.length > 0 && (
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>
                Vztahy
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {nodeEdges.map((edge, i) => {
                  const cfg = EDGE_CONFIG[edge.type]
                  const isSource = edge.source === selectedNode.id
                  const otherId = isSource ? edge.target : edge.source
                  const other = nodeById[otherId]
                  if (!other) return null
                  return (
                    <div
                      key={i}
                      style={{
                        padding: '6px 10px', borderRadius: 7,
                        background: '#f8fafc', border: '1px solid #f1f5f9',
                        fontSize: 12,
                      }}
                    >
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ color: '#0f172a', fontWeight: 600 }}>
                          {isSource ? selectedNode.label : other.label}
                        </span>
                        <span style={{
                          fontSize: 10.5, padding: '1px 6px', borderRadius: 3,
                          background: `${cfg.color}18`, color: cfg.color, fontWeight: 600,
                          border: `1px solid ${cfg.color}33`,
                        }}>
                          {cfg.label}
                        </span>
                        <span style={{ color: '#475569', fontWeight: 600 }}>
                          {isSource ? other.label : selectedNode.label}
                        </span>
                      </div>
                      {edge.note && (
                        <div style={{ fontSize: 11, color: '#64748b', marginTop: 4, lineHeight: 1.4 }}>
                          {edge.note}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
