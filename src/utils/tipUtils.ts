import type { ExamTip } from '../api/examTips'

export function filterTipsByCategory(tips: ExamTip[], category: string): ExamTip[] {
  const normalized = category.trim().toLowerCase()

  if (normalized === '') {
    return tips
  }

  return tips.filter((tip) => tip.category.toLowerCase() === normalized)
}

export function listUniqueCategories(tips: ExamTip[]): string[] {
  const categories = new Set<string>()

  for (const tip of tips) {
    categories.add(tip.category)
  }

  return Array.from(categories).sort()
}
