export interface WikiEntry {
  id: string
  title: string
  area: WikiArea
  subjects: string[]
  parentId?: string
  related: string[]
  body: string // HTML; cross-links as <a href="#entry-id">text</a>
}

export type WikiArea =
  | 'Governance'
  | 'Audit'
  | 'Bezpečnost'
  | 'ITSM'
  | 'Informační management'
  | 'Procesní řízení'
  | 'Teorie systémů'
  | 'Sociální informatika'
  | 'Organizace'
  | 'Řízení rizik'
  | 'Forenzní analýza'

// Entries are split into chunks and merged here
import { WIKI_GOVERNANCE } from './wiki-governance'
import { WIKI_SECURITY } from './wiki-security'
import { WIKI_MANAGEMENT } from './wiki-management'
import { WIKI_SYSTEMS } from './wiki-systems'
import { WIKI_RISK_FORENSICS } from './wiki-risk-forensics'
import { WIKI_RPI } from './wiki-rpi'

export const WIKI: WikiEntry[] = [
  ...WIKI_GOVERNANCE,
  ...WIKI_SECURITY,
  ...WIKI_MANAGEMENT,
  ...WIKI_RPI,
  ...WIKI_SYSTEMS,
  ...WIKI_RISK_FORENSICS,
]

export const WIKI_BY_ID: Record<string, WikiEntry> = Object.fromEntries(
  WIKI.map(e => [e.id, e])
)

export const WIKI_AREAS: WikiArea[] = [
  'Governance', 'Audit', 'ITSM', 'Bezpečnost',
  'Informační management', 'Procesní řízení',
  'Teorie systémů', 'Sociální informatika', 'Organizace',
  'Řízení rizik', 'Forenzní analýza',
]

export const WIKI_SUBJECTS = [
  '4SA310', '4SA313', '4SA415', '4IT418', '4SA418', '4SA420',
  '4SA440', '4SA513', '4SA515', '4SA516', '4SA540', '4SA551',
]
