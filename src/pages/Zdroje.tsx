import { SUBJECTS } from '../data'
import type { SectionId } from '../types'

interface Props {
  onNavigate: (section: SectionId, subjectId?: string) => void
}

const SOURCE_MAP: Record<string, { type: string; name: string }[]> = {
  '4SA310': [
    { type: 'PDF',  name: 'ITG — Záznamy přednášek (Smutný)' },
    { type: 'PDF',  name: 'COBIT 2019 Framework (ISACA)' },
    { type: 'PDF',  name: 'ITG — Risk a etika (cvičení)' },
    { type: 'PDF',  name: 'Zadání zákonů — 4SA310' },
  ],
  '4SA313': [
    { type: 'PDF',  name: '4SA313 — Přednášky bezpečnost IS' },
    { type: 'PDF',  name: 'ISO/IEC 27002 — Controls' },
  ],
  '4SA415': [
    { type: 'PDF',  name: 'IM — Přednáškové slidy (Sigmund)' },
    { type: 'PDF',  name: 'IM — COBIT pro IM' },
  ],
  '4IT418': [
    { type: 'PDF',  name: '4IT418 ZS 25 úvod — cíl, témata, SLA zkouška' },
    { type: 'PDF',  name: 'IT strategie, metodiky a role CIO' },
    { type: 'PDF',  name: 'ITIL v3, ITIL 4 + slovník zkratek' },
    { type: 'PPTX', name: 'COBIT 2019 + Audit IT' },
    { type: 'PPTX', name: 'Enterprise architektura + cloud computing' },
    { type: 'PPTX', name: 'ISO 20000, ITSM, ISO 9000' },
    { type: 'PPTX', name: 'Incident, problem, change, release & deployment' },
    { type: 'PPTX', name: 'GDPR + zákon č. 110/2019 Sb.' },
    { type: 'PPTX', name: 'ISO 27000, NIS2, ZoKB/VoKB' },
    { type: 'PDF',  name: 'Náklady a přínosy IS — TCO, CBA, NPV, IRR, IT BSC' },
    { type: 'PDF',  name: 'BCM, řízení dostupnosti, kontinuita služeb, DRP' },
  ],
  '4SA418': [
    { type: 'PDF',  name: '4SA418 — Organizace a informace (přednášky)' },
  ],
  '4SA420': [
    { type: 'PDF',  name: '4SA420 — Teorie systémů' },
    { type: 'PDF',  name: '4SA420 — Informační etika' },
  ],
  '4SA440': [
    { type: 'PDF',  name: 'SI — Regulativy (přednášky)' },
    { type: 'PPTX', name: 'SI — Přednáškové slidy' },
    { type: 'PDF',  name: 'Zákon č. 110/2019 Sb. — GDPR implementace' },
  ],
  '4SA513': [
    { type: 'PDF',  name: 'Audit IS — Přednášky (Smutný)' },
    { type: 'PDF',  name: 'CISA Review Manual — ISACA' },
  ],
  '4SA515': [
    { type: 'PDF',  name: 'ISMS — Přednášky (Sedláček)' },
    { type: 'PDF',  name: 'ISO/IEC 27001:2022 — Requirements' },
    { type: 'PDF',  name: 'Zákon č. 181/2014 Sb. — ZKB' },
  ],
  '4SA516': [
    { type: 'PDF',  name: '4SA516 — Project Governance + ERP' },
    { type: 'PDF',  name: 'ERP Activate Methodology' },
  ],
  '4SA540': [
    { type: 'PDF',  name: 'DFA — Přednášky (Smutný)' },
    { type: 'PDF',  name: 'NIST SP 800-86 — Digital Forensics' },
  ],
  '4SA551': [
    { type: 'PDF',  name: 'Řízení rizik — Přednášky' },
    { type: 'PDF',  name: 'ISO 31000:2018 — Risk Management' },
    { type: 'PDF',  name: 'COSO ERM 2017' },
  ],
}

const TYPE_COLOR: Record<string, string> = {
  PDF:  '#ef4444',
  PPTX: '#f59e0b',
  TXT:  '#3b82f6',
  HTML: '#10b981',
}

export default function Zdroje({ onNavigate }: Props) {
  return (
    <div className="page">
      <div className="page-title">Zdroje</div>
      <div className="page-subtitle">Studijní materiály ke každému předmětu. Zdroje jsou v adresáři statnice/01-inbox/ZPRACOVANO/.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SUBJECTS.map(s => {
          const sources = SOURCE_MAP[s.id] ?? []
          return (
            <div key={s.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '14px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: sources.length > 0 ? 12 : 0 }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 13.5, color: '#0f172a' }}>{s.label}</span>
                  <span style={{ marginLeft: 8, fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>{s.id}</span>
                </div>
                <button
                  onClick={() => onNavigate('predmety', s.id)}
                  style={{ fontSize: 12, color: '#1d4ed8', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 5, padding: '4px 10px', cursor: 'pointer', fontWeight: 500 }}
                >
                  Otevřít
                </button>
              </div>
              {sources.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {sources.map((src, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', border: '1px solid #f1f5f9', borderRadius: 6, background: '#f8fafc', fontSize: 12, color: '#475569' }}>
                      <span style={{ fontWeight: 700, fontSize: 10, color: TYPE_COLOR[src.type] ?? '#94a3b8' }}>{src.type}</span>
                      {src.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
