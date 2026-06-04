import { describe, it, expect } from 'vitest'
import { filterTipsByCategory, listUniqueCategories } from './tipUtils'
import type { ExamTip } from '../api/examTips'

const sampleTips: ExamTip[] = [
  { id: '1', title: 'A', body: 'a', category: 'Příprava' },
  { id: '2', title: 'B', body: 'b', category: 'Komunikace' },
  { id: '3', title: 'C', body: 'c', category: 'Příprava' },
  { id: '4', title: 'D', body: 'd', category: 'Postoj' },
]

describe('filterTipsByCategory', () => {
  it('vrátí jen tipy odpovídající kategorii (case-insensitive)', () => {
    const result = filterTipsByCategory(sampleTips, 'příprava')
    expect(result).toHaveLength(2)
    expect(result.map((t) => t.id)).toEqual(['1', '3'])
  })

  it('vrátí všechny tipy při prázdné kategorii', () => {
    const result = filterTipsByCategory(sampleTips, '')
    expect(result).toEqual(sampleTips)
  })

  it('vrátí prázdné pole pro neznámou kategorii', () => {
    expect(filterTipsByCategory(sampleTips, 'neexistuje')).toEqual([])
  })
})

describe('listUniqueCategories', () => {
  it('vrátí seřazený seznam unikátních kategorií', () => {
    expect(listUniqueCategories(sampleTips)).toEqual(['Komunikace', 'Postoj', 'Příprava'])
  })

  it('vrátí prázdné pole pro prázdný vstup', () => {
    expect(listUniqueCategories([])).toEqual([])
  })
})
