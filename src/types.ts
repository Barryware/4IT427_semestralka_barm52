export type SectionId =
  | 'dashboard'
  | 'ucebnice'
  | 'predmety'
  | 'wiki'
  | 'mapy'
  | 'shrnuti'
  | 'trener'
  | 'komise'
  | 'zdroje'
  | 'tipy'
  | 'progress'

// 0=unseen 1=read 2=recognized 3=explainable 4=oral-ready 5=mastered
export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5

export interface NavSection {
  id: SectionId
  label: string
  icon: string
}

export interface Subject {
  id: string
  label: string
  file: string | null
  ready: boolean
  priority: 'high' | 'medium' | 'low'
}

export interface TopicProgress {
  mastery: MasteryLevel
  lastSeen: number
}

export interface AppProgress {
  totalXP: number
  topics: Record<string, TopicProgress>
  achievements: string[]
  lastActive: number
}
