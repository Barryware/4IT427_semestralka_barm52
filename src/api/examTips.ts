export interface ExamTip {
  id: string
  title: string
  body: string
  category: string
}

export async function fetchExamTips(): Promise<ExamTip[]> {
  const response = await fetch('/exam-tips.json')

  if (!response.ok) {
    throw new Error(`Načtení tipů selhalo: HTTP ${response.status}`)
  }

  return response.json()
}
