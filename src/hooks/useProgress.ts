import { useState, useCallback } from 'react'
import type { AppProgress, MasteryLevel } from '../types'

const STORAGE_KEY = 'statnice-progress-v1'

const XP_FOR_LEVEL: Record<number, number> = { 0: 0, 1: 10, 2: 20, 3: 40, 4: 60, 5: 100 }

export const ACHIEVEMENTS: Array<{ id: string; label: string; desc: string }> = [
  { id: 'first-step',    label: 'První krok',   desc: 'Otevřel jsi první téma' },
  { id: 'reader-10',     label: 'Čtenář',       desc: '10 témat přečteno' },
  { id: 'recognized-5',  label: 'Znám to',      desc: '5 témat na úrovni Recognized' },
  { id: 'explainer-3',   label: 'Vysvětluji',   desc: '3 témata na úrovni Explainable' },
  { id: 'oral-ready-1',  label: 'Před komisí',  desc: 'První téma oral-ready' },
  { id: 'mastered-1',    label: 'Zvládnuto',    desc: 'První téma na mastery 5' },
  { id: 'xp-500',        label: '500 XP',       desc: 'Celkem 500 XP' },
  { id: 'xp-1000',       label: '1 000 XP',     desc: 'Celkem 1 000 XP' },
  { id: 'xp-2000',       label: '2 000 XP',     desc: 'Celkem 2 000 XP' },
]

type AchievementCheck = (p: AppProgress) => boolean

const ACHIEVEMENT_CONDITIONS: Record<string, AchievementCheck> = {
  'first-step':    p => p.totalXP >= 10,
  'reader-10':     p => Object.values(p.topics).filter(t => t.mastery >= 1).length >= 10,
  'recognized-5':  p => Object.values(p.topics).filter(t => t.mastery >= 2).length >= 5,
  'explainer-3':   p => Object.values(p.topics).filter(t => t.mastery >= 3).length >= 3,
  'oral-ready-1':  p => Object.values(p.topics).filter(t => t.mastery >= 4).length >= 1,
  'mastered-1':    p => Object.values(p.topics).filter(t => t.mastery >= 5).length >= 1,
  'xp-500':        p => p.totalXP >= 500,
  'xp-1000':       p => p.totalXP >= 1000,
  'xp-2000':       p => p.totalXP >= 2000,
}

function loadProgress(): AppProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as AppProgress
  } catch {}
  return { totalXP: 0, topics: {}, achievements: [], lastActive: Date.now() }
}

function saveProgress(p: AppProgress): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch {}
}

function checkAchievements(p: AppProgress): AppProgress {
  const unlocked = new Set(p.achievements)
  for (const a of ACHIEVEMENTS) {
    if (!unlocked.has(a.id) && ACHIEVEMENT_CONDITIONS[a.id]?.(p)) {
      unlocked.add(a.id)
    }
  }
  if (unlocked.size === p.achievements.length) return p
  return { ...p, achievements: Array.from(unlocked) }
}

export function useProgress() {
  const [progress, setProgress] = useState<AppProgress>(() => loadProgress())

  const setMastery = useCallback((topicId: string, level: MasteryLevel) => {
    setProgress(prev => {
      const oldLevel = (prev.topics[topicId]?.mastery ?? 0) as MasteryLevel
      if (level <= oldLevel) return prev
      const xpDelta = (XP_FOR_LEVEL[level] ?? 0) - (XP_FOR_LEVEL[oldLevel] ?? 0)
      const next: AppProgress = {
        ...prev,
        totalXP: prev.totalXP + xpDelta,
        topics: {
          ...prev.topics,
          [topicId]: { mastery: level, lastSeen: Date.now() },
        },
        lastActive: Date.now(),
      }
      const withAch = checkAchievements(next)
      saveProgress(withAch)
      return withAch
    })
  }, [])

  const getMastery = useCallback((topicId: string): MasteryLevel => {
    return (progress.topics[topicId]?.mastery ?? 0) as MasteryLevel
  }, [progress])

  const addXP = useCallback((amount: number) => {
    setProgress(prev => {
      const next: AppProgress = { ...prev, totalXP: prev.totalXP + amount, lastActive: Date.now() }
      const withAch = checkAchievements(next)
      saveProgress(withAch)
      return withAch
    })
  }, [])

  return { progress, setMastery, getMastery, addXP }
}
